import { useState, useEffect } from "react";

const getUserCoord = () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      x => resolve(x.coords),
      err => reject(err),
      {
        timeout: 10000
      }
    )
  );

const defaultLocation = {
  lat: 60.2353439 + Math.random() * 0.01,
  lon: 7.604292 + Math.random() * 0.01
};

export const useLocation = () => {
  const [location, setLocation] = useState(defaultLocation);

  const located = location !== defaultLocation;

  useEffect(() => {
    getUserCoord().then(x =>
      setLocation({ lat: x.latitude, lon: x.longitude })
    );
  }, []);

  return { location, located };
};
