import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Workspace from './modules/Workspace';
import Home from './modules/Home';
import PusherApp from './modules/PusherApp';

export default (
  <Route path="/" component={Workspace}>
    <IndexRoute component={Home}/>
    <Route path="pusher" component={PusherApp}/>
  </Route>
)
