import React, { Component } from 'react'
import { gmapStyles } from './gmapStyles'
import { withScript } from './withScript'
import { food_image, food_image_small } from '../FoodIcon'
import { GMAP_API_KEY } from '../../config'

const createLatLng = ({ lat, lon }) => new google.maps.LatLng(lat, lon)

class GMap_ extends Component {
  map = null

  marked = {}

  constructor() {
    super()
    this.containerDOM = React.createRef()
  }

  render() {
    if (!this.containerDOM.current) {
      //
      setTimeout(() => this.forceUpdate(), 0)
    }

    if (this.props.scriptLoaded && !this.map) {
      //
      this.map = new google.maps.Map(this.containerDOM.current, {
        streetViewControl: false,
        fullscreenControl: false,
        disableDefaultUI: false,
        mapTypeControl: false,
        rotateControl: false,
        scaleControl: false,
        zoomControl: false,
        panControl: false,
        draggable: false,
        zoom: 15,
        center: createLatLng(this.props.location),
        mapTypeId: 'roadmap',
        background: '#ddd',
        styles: gmapStyles,
      })
    }

    if (this.map) {
      //

      if (this.props.location) {
        this.map.setCenter(createLatLng(this.props.location))
      }

      //
      this.props.events.filter(x => !this.marked[x.key]).forEach(x => {
        this.marked[x.key] = Date.now()

        const url = food_image_small[x.food] + `?key=${x.key}`

        const icon = {
          origin: google.maps.Point(0, 0),
          anchor: google.maps.Point(32, 32),
          size: google.maps.Size(512, 512),
          scaledSize: google.maps.Size(64, 64),
          url,
        }

        const marker = new google.maps.Marker({
          position: createLatLng(x.location),
          icon: url,
          visible: true,
          opacity: 0,
          map: this.map,
        })

        // kind of superhacky
        // i'm not sorry
        setTimeout(() => {
          marker.setOpacity(1)

          const elements = document.querySelectorAll(`[src="${url}"]`)

          elements.forEach(el =>
            el.parentNode.animate(
              [
                {
                  offset: 0,
                  opacity: 0.6,
                  transform: 'translate3d(0,0,0) scale(0.2,0.2)',
                },
                {
                  offset: 0.032,
                  opacity: 1,
                  transform: 'translate3d(0,-50px,0) scale(1.3,1.3)',
                },
                {
                  offset: 0.06,
                  opacity: 1,
                  transform: 'translate3d(0,-10px,0) scale(0.7,0.7)',
                },
                {
                  offset: 0.08,
                  opacity: 1,
                  transform: 'translate3d(0,-160px,0) scale(1,1)',
                },
                {
                  offset: 0.1,
                  opacity: 0,
                  transform: 'translate3d(0,-200px,0) scale(0.6,0.6)',
                },
                {
                  offset: 1,
                  opacity: 0,
                  transform: 'scale(0.6,0.6)',
                },
              ],
              { duration: 7400 }
            )
          )

          setTimeout(() => marker.setVisible(false), 2000)
        }, 100)
      })
    }

    return (
      <div ref={this.containerDOM} style={{ width: '100%', height: '100%' }} />
    )
  }
}

export const GMap = withScript(GMap_)
