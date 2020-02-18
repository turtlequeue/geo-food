import React from "react";

import { MapPage } from "../_page/MapPage";
import { WaitingPage } from "../_page/WaitingPage";
import { useSubscription } from "../_hook/useSubscription";
import { useLocation } from "../_hook/useLocation";
import { useGoogleApi } from "../_hook/useGoogleApi";

const TURTLEQUEUE_USER_TOKEN = process.env.TURTLEQUEUE_USER_TOKEN as string;
const TURTLEQUEUE_API_KEY = process.env.TURTLEQUEUE_API_KEY as string;
const TURTLEQUEUE_CHANNEL = "#food";
const GMAP_API_KEY = process.env.GMAP_API_KEY as string;

export const App = () => {
  const googleMapReady = useGoogleApi(GMAP_API_KEY);
  const { location } = useLocation();
  const { events, status, publish } = useSubscription(
    TURTLEQUEUE_USER_TOKEN,
    TURTLEQUEUE_API_KEY,
    TURTLEQUEUE_CHANNEL,
    location
  );

  if (!googleMapReady || status !== "ready") return <WaitingPage />;

  return (
    <MapPage
      googleApiKey={GMAP_API_KEY}
      events={events}
      publish={publish}
      location={location}
    />
  );
};
