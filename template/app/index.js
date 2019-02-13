import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import ErrorBoundary from './ErrorBoundary';
import theme from '../common/material-ui/Theme';
import App from './App';
import configureStore from './store/configureStore';

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
    );
  }
}

const generateClassName = createGenerateClassName();
const initialState = window.REDUX_DATA;
const store = configureStore(initialState);

loadableReady(() => {
  ReactDOM.hydrate(
    <ErrorBoundary>
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <BrowserRouter>
              <Main />
            </BrowserRouter>
          </Provider>
        </MuiThemeProvider>
      </JssProvider>
    </ErrorBoundary>,
    document.getElementById('root')
  );
});

if (module.hot) {
  module.hot.accept();
}
