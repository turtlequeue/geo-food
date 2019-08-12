import React, { Component } from 'react'
import { TURTLEQUEUE_USER_TOKEN, TURTLEQUEUE_API_KEY } from '../../config'

// the "create" API allows instanciating several turtle instances
import {create as turtle} from 'turtlequeue'
import 'websocket'

const CHANNEL = '#food'

const wait = delay => new Promise(resolve => setTimeout(resolve, delay))

export const withSubscription = C =>
  class WithSubscription extends Component {
    state = { connected: false, events: [] }

    turtle = null;

    onSubscribeCallback = (error, data, metadata) => {
      if (error) console.log(error)

      if (
        data.location &&
        !this.state.events.some(x => x.key === data.payload.key)
      )
        this.setState({
          events: [
            ...this.state.events,
            {
              location: data.location,
              food: data.payload.food,
              key: data.payload.key,
            },
          ],
        })
    }

    async componentDidMount() {

      // make a turtle instance for this react component
      this.turtle = turtle.make({ host: 'turtlequeue.com', type: 'ws', protocol: 'https' })

      this.turtle.on('error', err => console.log(err))

      await new Promise((resolve, reject) => {
        this.turtle.on('connect', resolve)
        this.turtle.on('error', reject)

        this.turtle.connect({
          userToken: TURTLEQUEUE_USER_TOKEN,
          apiKey: TURTLEQUEUE_API_KEY,
        })
      })

      await wait(200)

      this.turtle.subscribe(
        { channel: CHANNEL, location: this.props.location },
        this.onSubscribeCallback
      )

      this.setState({ connected: true })
    }

    publish = food => {
      const key = Math.random()
        .toString(16)
        .slice(2)

      this.setState({
        events: [
          ...this.state.events,
          {
            location: this.props.location,
            food,
            key,
          },
        ],
      })

      this.turtle.publish(
        {
          payload: { key, food, location: this.props.location },
          channel: CHANNEL,
          location: this.props.location,
        },
        (err, data, metadata) => {
          if (err) console.log(err)
        }
      )
    }

    render() {
      return <C {...this.state} {...this.props} publish={this.publish} />
    }
  }
