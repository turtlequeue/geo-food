export const TURTLEQUEUE_USER_TOKEN = process.env.TURTLEQUEUE_USER_TOKEN
export const TURTLEQUEUE_API_KEY = process.env.TURTLEQUEUE_API_KEY

export const GMAP_API_KEY = process.env.GMAP_API_KEY

console.log('CONFIG', TURTLEQUEUE_USER_TOKEN, TURTLEQUEUE_API_KEY);

if (!TURTLEQUEUE_USER_TOKEN) {
  console.error('Missing user token');
}

if (!TURTLEQUEUE_API_KEY) {
  console.error('Missing api key');
}

if (!GMAP_API_KEY) {
  console.error('Missing GMAPS api key');
}
