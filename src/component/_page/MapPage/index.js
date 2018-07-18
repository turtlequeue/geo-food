import React from 'react'
import { SendBar } from '../../SendBar'
import { GMap } from '../../GMap'
import styled from 'react-emotion'

export const MapPage = ({ events, location, ...props }) => (
  <Container>
    <MapWrapper>
      <GMap location={location} events={events} />
    </MapWrapper>

    <SendBar {...props} />
  </Container>
)

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
const MapWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
