const config = {
  turtlequeue: {
    userToken: process.env.REACT_APP_TURTLEQUEUE_USER_TOKEN as string,
    apiKey: process.env.REACT_APP_TURTLEQUEUE_API_KEY as string,
  },
  gmaps: {
    apiKey: process.env.REACT_APP_GMAP_API_KEY as string,
  },
};

console.log("CONFIG IS", JSON.stringify(config, null, 2));

export default config;
