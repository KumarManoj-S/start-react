import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import * as Routes from './routeComponents';
import AppBar from './components/ui/AppBar';

class RouteConfigurations extends React.Component {
  render() {
    return (
      <div>
        <AppBar />
        <Switch>
          <Route exact path="/" component={Routes.Main} />
          <Route exact path="/about" component={Routes.About} />
          <Route exact path="/features" component={Routes.Features} />
        </Switch>
      </div>
    );
  }
}

export default RouteConfigurations;
