import React from "react";

import { MapPage } from "./component/_page/MapPage";
import { WaitingPage } from "./component/_page/WaitingPage";
import { useSubscription } from "./component/_hook/useSubscription";
import { useLocation } from "./component/_hook/useLocation";
import { useGoogleApi } from "./component/_hook/useGoogleApi";
import config from "./config";

const TURTLEQUEUE_CHANNEL = "#food";

const App = () => {
  const googleMapReady = useGoogleApi(config?.gmaps.apiKey);
  const { location } = useLocation();
  const { events, status, publish } = useSubscription(
    config.turtlequeue.userToken,
    config.turtlequeue.apiKey,
    TURTLEQUEUE_CHANNEL,
    location
  );

  if (!googleMapReady || status !== "ready") return <WaitingPage />;

  return (
    <MapPage
      googleApiKey={config.gmaps.apiKey}
      events={events}
      publish={publish}
      location={location}
    />
  );
};

export default App;
