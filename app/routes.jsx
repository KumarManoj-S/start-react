import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import * as Routes from './routeComponents';

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
