import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import LoginPage from './LoginPage/index';
import RegisterPage from './RegisterPage/index';
import FeedPage from './FeedPage';
import PostPage from './PostPage';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LoginPage/>
        </Route>
        <Route exact path="/RegisterPage">
          <RegisterPage/>
        </Route>
        <Route exact path="/FeedPage">
          <FeedPage/>
        </Route>
        <Route exact path="/PostPage">
          <PostPage/>
        </Route>
        <Route path="/">
          <h1>Página não encontrada...</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
