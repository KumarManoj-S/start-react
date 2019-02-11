import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore, { history } from './store/configureStore';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { loadableReady } from '@loadable/component';
import ErrorBoundary from './ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';

class Main extends React.Component {
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() {
    return (
      <App />
    )
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#7986cb",
      main: "#53a2dc",
      dark: "#303f9f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff4081",
      main: "#f50057",
      dark: "#c51162",
      contrastText: "#fff",
    },
  }
});
const generateClassName = createGenerateClassName();
const initialState = window.REDUX_DATA;
const store = configureStore(initialState);

loadableReady(() => {
  ReactDOM.hydrate(
    <ErrorBoundary>
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <Provider store={store} >
            <BrowserRouter history={history}>
              <Main />
            </BrowserRouter>
          </Provider >
        </MuiThemeProvider>
      </JssProvider>
    </ErrorBoundary>
    ,
    document.getElementById('root')
  );
})

if (module.hot) {
  module.hot.accept();
}
