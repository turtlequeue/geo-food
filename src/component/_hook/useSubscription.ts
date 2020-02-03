import { useMemo, useEffect } from "react";
import turtlequeue from "turtlequeue";
import "websocket";
import { useState } from "react";

const wait = delay => new Promise(resolve => setTimeout(resolve, delay));

const connectAndSubscribe = async (
  userToken,
  apiKey,
  channel,
  location,
  onMessage
) => {
  // create a new instance
  const queue = turtlequeue.create.make({
    host: "turtlequeue.com",
    type: "ws",
    protocol: "https"
  });

  // connect
  await new Promise((resolve, reject) => {
    queue.on("ready", resolve);
    queue.on("connected", resolve);
    queue.on("connect", resolve);

    queue.on("error", reject);

    queue.connect({ userToken, apiKey });
  });

  // avoid race condition :(
  await wait(200);

  // subscribe
  queue.subscribe(
    { channel, location: { ...location, radius: "5000km" } },
    onMessage
  );

  return queue;
};

export const useSubscription = (
  userToken: string,
  apiKey: string,
  channel: string,
  location: any
) => {
  const [queue, setQueue] = useState(null as any);
  const [events, setEvents] = useState([] as {
    key: string;
    food: string;
    location: { lat: number; lon: number };
  }[]);
  const pushEvent = e => setEvents([...events, e]);

  useEffect(() => {
    if (!location) return;

    const onMessage = (error, data, meta) => {
      console.log(error, data);
      if (data.location) pushEvent(data);
    };

    setQueue(null);

    connectAndSubscribe(userToken, apiKey, channel, location, onMessage).then(
      setQueue
    );
  }, [userToken, apiKey, channel, location]);

  const generateKey = () =>
    Math.random()
      .toString(16)
      .slice(2);

  const publish = useMemo(() => {
    return food => {
      const key = generateKey();

      pushEvent({ food, location, key });

      if (queue)
        return new Promise((resolve, reject) => {
          queue.publish(
            {
              payload: { food, key, location },
              channel,
              location
            },
            (err, _data, _metadata) => {
              if (err) reject(err);
              resolve();
            }
          );
        });
    };
  }, [queue, location, channel]);

  return { publish, connected: !!queue, events };
};
