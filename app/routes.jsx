import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import { authWrapper } from './containers/authorization';
import * as Routes from './routeComponents';

export const NavBar = loadable(() => import('./containers/ui/NavBar'));

class RouteConfigurations extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Routes.Main} />
        </Switch>
      </div>
    );
  }
}

export default RouteConfigurations;
