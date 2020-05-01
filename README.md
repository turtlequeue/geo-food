# Geo Food

![type definitions](https://img.shields.io/npm/types/typescript?style=flat-square)
![code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)

> Tasty demo for turtlequeue event subscription sdk 🌯

![](./src/asset/screenshot/demo.gif)

# Usage

### Credentials

Get your credentials for turtlequeue by logging in at [turtlequeue.com](https://turtlequeue.com)

Get your api key for gmap from [developers.google.com/maps/documentation/javascript/get-api-key](https://developers.google.com/maps/documentation/javascript/get-api-key)

Then fill in the blanks of [.env.development](./.env.development)

```
REACT_APP_GMAP_API_KEY=
REACT_APP_TURTLEQUEUE_API_KEY=
REACT_APP_TURTLEQUEUE_USER_TOKEN=
```

### Launch

```
yarn install

yarn start
```

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Technologies

### TurtleQueue

Used to broadcast a message (ie: a burito emoji) to peers connected to the app.

### React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and relies on react hooks. Which are quite cool but might look weird if you are not used to them. Take a look at [reactjs.org/docs/hooks-intro](https://reactjs.org/docs/hooks-intro.html)

### GMap

Expect some hacky piece of code to achieve marker animation on the map 🙍

### Emotion

Provides elegant way to use css in js

# Authors

- Arthur Brongniart https://github.com/Platane (main author)
