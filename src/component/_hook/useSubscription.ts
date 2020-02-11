import { useEffect } from "react";
import turtlequeue from "turtlequeue";
import "websocket";
import { useState } from "react";
import useConstant from "./useConstant";

export const useSubscription = (
  userToken: string,
  apiKey: string,
  channel: string,
  location: Location
) => {
  // hold the events
  const [events, setEvents] = useState<Event[]>([]);
  const pushEvent = (e: Event) =>
    setEvents(
      [...events, e]

        // re-sort by date
        .sort((a, b) => a.date - b.date)

        // remove duplicate (based on key)
        .filter((x, i, arr) => i === arr.findIndex(u => u.key === x.key))
    );

  // instanciate the queue object
  const queue = useConstant(() =>
    turtlequeue.create.make({
      host: "turtlequeue.com",
      type: "ws",
      protocol: "https"
    })
  );

  // handle status lifecycle
  const [status, setStatus] = useState<Status>("disconnected");
  useEffect(() => {
    const onReady = () => setStatus("ready");
    const onConnect = () =>
      setStatus(s => (s === "ready" ? "ready" : "connected"));
    const onDisconnect = () => setStatus("disconnected");

    queue.on("ready", onReady);
    queue.on("connect", onConnect);
    queue.on("disconnect", onDisconnect);

    return () => {
      queue.unbind("ready", onReady);
      queue.unbind("connect", onConnect);
      queue.unbind("disconnect", onDisconnect);
    };
  }, [queue]);

  // connect once
  useEffect(() => {
    queue.connect({ userToken, apiKey });

    return () => {
      queue.disconnect();
    };
  }, [userToken, apiKey]);

  // subscribe
  useEffect(() => {
    if (status !== "ready") return;

    const onMessage = (error: Error | null, data, _meta) => {
      if (isEvent(data)) pushEvent(data);
    };

    const options = { channel };

    queue.subscribe(options, onMessage);

    return () => {
      queue.unsubscribe(options, onMessage);
    };
  }, [status, channel, location]);

  //
  const publish = (food: Food) => {
    if (status !== "ready") return;

    const event = {
      food,
      key: generateRandomKey(),
      date: Date.now(),
      location
    };

    // in order to provide an instant feedback,
    // push the event into the list right away,
    // without waiting for the request to come back
    // (it will be filtered based on the key to not appear twice)
    pushEvent(event);

    // publish
    return new Promise((resolve, reject) => {
      queue.publish(
        { payload: event, channel },
        (err: Error | null, _data, _metadata) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  };

  return { publish, status, events };
};

const generateRandomKey = () =>
  Math.random()
    .toString(16)
    .slice(2);

type Food = "taco" | "fries" | "pizza" | "burrito";

type Status =
  //
  | "disconnected"

  // the server answered and the handshake happened
  | "connected"

  // the server authorised the credentials
  | "ready";

type Location = { lat: number; lon: number };

type Event = {
  key: string;
  date: number;
  food: Food;
  location: Location;
};

// return true if the object shape looks like an event (roughly)
const isEvent = (x: any): x is Event =>
  typeof x.key === "string" && typeof x.food === "string" && x.location;
