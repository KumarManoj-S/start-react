import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { Provider } from 'react-redux';
import { StaticRouter as Router } from 'react-router-dom';
import { SheetsRegistry } from 'jss';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import { Helmet } from 'react-helmet';
import { ChunkExtractor } from '@loadable/server';
import App from '../app/App';
import configureStore from '../app/store/configureStore';
import renderFullPage from './template';
import sagas from '../app/sagas';

const path = require('path');

const context = {};
const store = configureStore();
const statsFile = path.resolve('dist/loadable-stats.json');
const extractor = new ChunkExtractor({ statsFile });

const sheet = new ServerStyleSheet();
const sheetsRegistry = new SheetsRegistry();
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#7986cb',
      main: '#53a2dc',
      dark: '#303f9f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff4081',
      main: '#f50057',
      dark: '#c51162',
      contrastText: '#fff',
    },
  }
});

const handleRender = (req, res) => {
  const sheetsManager = new Map();
  
  const generateClassName = createGenerateClassName();

  const getJSX = url => renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <StyleSheetManager sheet={sheet.instance}>
          <Provider store={store}>
            <Router location={url} context={context}>
              {extractor.collectChunks(<App />)}
            </Router>
          </Provider>
        </StyleSheetManager>
      </MuiThemeProvider>
    </JssProvider>
  );

  const styledComponentCss = sheet.getStyleTags();
  const materialUiCss = sheetsRegistry.toString();
  const header = {
    styledComponentCss,
    materialUiCss
  };

  store.runSaga(sagas).done.then(() => {
    const preloadedState = store.getState();
    const jsx = getJSX(req.url);

    if (context.url) {
      return res.redirect(301, context.url);
    }

    const helmet = Helmet.renderStatic();
    res
      .send(
        renderFullPage(
          header,
          helmet,
          jsx,
          preloadedState,
          extractor.getScriptTags(),
        )
      );
  });

  getJSX(req.url);
  store.close();
};

export default handleRender;
