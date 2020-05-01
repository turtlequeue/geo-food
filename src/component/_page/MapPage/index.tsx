import React from "react";
import { SendBar } from "../../SendBar";
import { GMap } from "../../GMap";
import styled from "@emotion/styled";

// @ts-ignore
export const MapPage = ({ events, location, googleApiKey, publish }) => (
  <Container>
    <MapWrapper>
      <GMap center={location} events={events} googleApiKey={googleApiKey} />
    </MapWrapper>

    <SendBar publish={publish} />
  </Container>
);

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const MapWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
