# Construct React

Construct React is a boilerplate for web development built on top of Express and React, containing modern web development tools such as [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/). It will be the good starting point which suits for both professionals and new comers.

# Main Features!

  - Provides Server Side Rendering (SSR). Web application is being served by [Express](https://expressjs.com/) server
  - Configures React router which provides the Routing functionality.
  - Configures Code Splitting using [@loadable/component](https://www.smooth-code.com/open-source/loadable-components/).
  - Configures [Material UI](https://material-ui.com/) which provides React Components that implement Google's Material design.
  - Configures [styled-components](https://www.styled-components.com/). It allows you to write actual CSS code to style your components.
  - Configures [React-redux](https://react-redux.js.org/). It lets your React components read data from a Redux store, and dispatch actions to the store to update data.
  - Configures [Redux-saga](https://redux-saga.js.org/). It is a redux middleware library, that is designed to make handling side effects in your redux app nice and simple.
  - Configures [axios](https://github.com/axios/axios). It is Promise based HTTP client for the browser and node.js.
  - Configures [Enzyme](https://airbnb.io/enzyme/). It is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.
  - Configures [react-Helmet](https://github.com/nfl/react-helmet#readme).


### Installation

Install the Construct-React library

```sh
 yarn global add construct-react
```

Create a new project with construct-react

```sh
 construct-react app-name
 cd app-name
```

Install the dependencies and devDependencies.

```sh
 yarn install
```

To start the server in development environment

```sh
 yarn dev
```

To start the server in development environment

```sh
 yarn prod
```
By default, it will start the app in the port 3000. If you want to change the port, edit the value in the `port.js` file.

To build the application in development environment

```sh
 yarn build:dev
```

To build the application in development environment

```sh
 yarn build:prod
```