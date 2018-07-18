import React, { Component } from 'react'

const getUserCoord = () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(x => resolve(x.coords), reject)
  )

const defaultLocation = {
  lat: 60.2353439 + Math.random() * 0.01,
  lon: 7.604292 + Math.random() * 0.01,
  radius: '50km',
}

export const withLocation = C =>
  class WithLocation extends Component {
    state = { location: defaultLocation, isDefaultLocation: true }

    async componentDidMount() {
      const location = await getUserCoord()
        .then(x => ({ lat: x.latitude, lon: x.longitude, radius: '50km' }))
        .catch(error => console.log(error) || null)

      this.setState({ location })
    }

    render() {
      return <C {...this.state} {...this.props} />
    }
  }
