# Construct React

Construct React is a boilerplate for web development built on top of Express and React, containing modern web development tools such as [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/). It will be the good starting point for professionals. You don't need this kit if you don't want SSR, code-splitting and other SEO stuffs.

# Main Features!

  - Provides Server Side Rendering (SSR). Web application is being served by [Express](https://expressjs.com/) server
  - Configures React router which provides the Routing functionality.
  - Configures Code Splitting using [@loadable/component](https://www.smooth-code.com/open-source/loadable-components/).
  - Configures [Material UI](https://material-ui.com/) which provides React Components that implement Google's Material design.
  - Configures [styled-components](https://www.styled-components.com/). It allows you to write actual CSS code to style your components.
  - Configures [React-redux](https://react-redux.js.org/). It lets your React components read data from a Redux store, and dispatch actions to the store to update data.
  - Configures [Redux-saga](https://redux-saga.js.org/). It is a redux middleware library, that is designed to make handling side effects in your redux app nice and simple.
  - Configures [redux-saga-test-plan](https://github.com/jfairbank/redux-saga-test-plan) for testing sagas.
  - Configures [axios](https://github.com/axios/axios). It is Promise based HTTP client for the browser and node.js.
  - Configures [Enzyme](https://airbnb.io/enzyme/). It is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.
  - Configures [React-Helmet](https://github.com/nfl/react-helmet#readme).
  - Configures [nodemon](https://nodemon.io/). It is a utility for auto restarting the express server.
  - Configures [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) and [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware).
  - Configures [airbnb](https://github.com/airbnb/javascript) for linting.
  - Configures [Snapshot testing](https://jestjs.io/docs/en/snapshot-testing).



### Installation

Install the construct-react library

```sh
 npm install -g construct-react
            (or)
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

To start the development server

```sh
 yarn dev
```

To start the production server

```sh
 yarn prod
```
By default, it will start the app in the port `3000`. If you want to change the port, edit the value in the `port.js` file.

To build the application in development environment

```sh
 yarn build:dev
```

To build the application in production environment

```sh
 yarn build:prod
```

To run the lint

```sh
 yarn lint
```

To update the components for snapshot testing

```sh
 yarn update-snapshot <file-name>
```

# Set up

### React - Helmet
If you want to set up your [react-helmet](https://github.com/nfl/react-helmet#readme), just create helmet files under `/app/helmets` and use them in you components. The server side setup are already in place.

### Error Boundary
[Error boundary](https://reactjs.org/docs/error-boundaries.html) file is configured. If you want to change the error content, you can change the `/app/ErrorBoundary.jsx`.

### Load date
If you want to load your data during the server side rendering itself, then you can dispatch the actions in componentWillMount lifecycle method of a component.

For Example,

```sh
componentWillMount() {
    const { getAllPosts } = this.props;
    getAllPosts();
  }
```
you can find this example in `/app/components/Posts.jsx`. If you trigger an action, then saga will take care of calling API and storing data into the redux store. Below saga configuration has been set up to defer the *server side rendering* till data are loaded.

```sh
store.runSaga(sagas).done.then(() => {
   // send the response
  });
```
you can find this code in the file `/server/Renderer.jsx`

Note:  If you dispatch an action in componentDidMount, data will be loaded only at client side. componentWillMount will be executed at both server and client sides while componentDidMount will be executed only at client side.

Happy hacking!