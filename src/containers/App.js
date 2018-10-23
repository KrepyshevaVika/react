import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NodeContainer from './Tree';
import { TableContainer, MyTableContainer } from './Table';
import MasonryContainer from './Masonry';
import Slider from '../components/Slider';

export default function App(){
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={NodeContainer} />
          <Route exact path="/Table" component={TableContainer} />
          <Route exact path="/Masonry" component={MasonryContainer} />
          <Route exact path="/MyTable" component={MyTableContainer} />
          <Route exact path="/Slider" component={Slider} />
        </Switch>
      </BrowserRouter>
  );
};

