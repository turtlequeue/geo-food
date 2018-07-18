import React, { Component } from 'react'
import { GMAP_API_KEY } from '../../config'

const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.33&key=${GMAP_API_KEY}`

let scriptLoaded = false

export const withScript = C =>
  class WithScript extends Component {
    constructor() {
      super()
      this.state = { scriptLoaded }
    }

    componentDidMount() {
      const script = document.createElement('script')

      script.addEventListener('load', () => {
        scriptLoaded = true

        this.setState({ scriptLoaded })
      })

      script.src = googleMapURL
      script.id = 'google-map-script'

      document.body.appendChild(script)
    }

    render() {
      return <C {...this.props} {...this.state} />
    }
  }
