import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import App from './components/App';
import About from './components/About';
import Home from './components/Home';
import Repos from './components/Repos';
import Repo from './components/Repo';

render(
  (

    <Router history={hashHistory}>
      {/*根路由*/}
      <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='/about' component={About}></Route>
        <Route path='/repos' component={Repos}>
          <Route path="/repos/:username/:repoName" component={Repo}></Route>
        </Route>
      </Route>
    </Router>
  ),
  document.getElementById('root')
);
