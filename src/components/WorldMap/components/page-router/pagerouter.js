import React from 'react';
import Route from 'react-router-dom/Route';
import { spring, AnimatedSwitch } from 'react-router-transition';
import Sample from '../country-profile/sample_profile.js';
import Worldmap from '../map/worldmap.js';
import Router from 'react-router-dom/BrowserRouter';

export default () => (
  <Router>
    <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="switch-wrapper"
    >
      <Route exact path="/" component={Worldmap} />
      <Route path="/sample_profile" component={Sample}/>
    </AnimatedSwitch>
  </Router>
)