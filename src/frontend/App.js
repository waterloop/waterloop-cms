import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

import * as userSelectors from './state/user/selectors';
import TopBar from './components/TopBar';
import LandingPage from './pages/landing/LandingPage';
import FeaturesPage from './pages/features/FeaturesPage';
import SignInPage from './pages/sign-in/SignInPage';
import NotFoundPage from './pages/NotFound';
import PostingsRouter from './pages/postings/Postings.router';
import SponsorsRouter from './pages/sponsors/Sponsors.router';
import GeeseRouter from './pages/geese/Geese.router';
import TeamDescriptionsRouter from './pages/team-descriptions/TeamDescriptions.router';
import { addAuthTokenToRequests } from './api/server';

const App = () => {
  let token = useSelector(userSelectors.token);
  if (!token) {
    token = Cookies.get('tokenId');
    if (token) {
      addAuthTokenToRequests(token);
    }
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <div>
            {!token && <Redirect to="/sign-in" />}
            <TopBar />
            <LandingPage />
          </div>
        </Route>
        <Route path="/geese">
          <div>
            {/* {!token && <Redirect to="/sign-in" />} */}
            <TopBar />
            <GeeseRouter />
          </div>
        </Route>
        <Route path="/features" exact>
          <div>
            {!token && <Redirect to="/sign-in" />}
            <TopBar />
            <FeaturesPage />
          </div>
        </Route>
        <Route path="/postings">
          {!token && <Redirect to="/sign-in" />}
          <TopBar />
          <PostingsRouter />
        </Route>
        <Route path="/sign-in" exact>
          <SignInPage />
        </Route>
        <Route path="/sponsors">
          {!token && <Redirect to="/sign-in" />}
          <TopBar />
          <SponsorsRouter />
        </Route>
        <Route path="/team-descriptions">
          {!token && <Redirect to="/sign-in" />}
          <TopBar />
          <TeamDescriptionsRouter />
        </Route>
        <Route component={NotFoundPage}>
          {/* {!token && <Redirect to="/sign-in" />} */}
          <TopBar />
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
