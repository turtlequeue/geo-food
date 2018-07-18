import React, { Component } from 'react'
import { GEODB_USER_TOKEN, GEODB_API_KEY } from '../../config'

import Geodb from 'geodb'
import 'websocket'

const getUserCoord = () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(x => resolve(x.coords), reject)
  )

const CHANNEL = '#food'

export const withSubscription = C =>
  class WithSubscription extends Component {
    state = { connected: false, events: [], location: null }

    geodb = null

    async componentDidMount() {
      this.geodb = Geodb.api

      this.geodb.init({
        host: 'geodb.io',
        type: 'ws',
        protocol: 'https',
      })

      this.geodb.on('error', err => console.log(err))

      await new Promise((resolve, reject) => {
        this.geodb.on('connect', resolve)
        this.geodb.on('error', reject)

        this.geodb.connect({
          userToken: GEODB_USER_TOKEN,
          apiKey: GEODB_API_KEY,
        })
      })

      const location = await getUserCoord()
        .then(x => ({ lat: x.latitude, lon: x.longitude, radius: '50km' }))
        .catch(error => console.log(error) || null)

      this.setState({ location })

      this.geodb.subscribe(
        { channel: CHANNEL, location },
        (error, data, metadata) => {
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
            location: this.state.location,
            food,
            key,
          },
        ],
      })

      this.geodb.publish(
        {
          payload: {
            key,
            food,
          },
          channel: CHANNEL,
          location: this.state.location,
        },
        (err, data, metadata) => {
          if (err) console.log(err)
        }
      )
    }

    render() {
      return (
        <C
          {...this.state}
          {...this.props}
          publish={this.state.connected && this.publish}
        />
      )
    }
  }
