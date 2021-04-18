import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter,
  Redirect,
} from 'react-router-dom';

import LandingPage from './pages/landing/LandingPage';
import GeesePage from './pages/geese/GeesePage';
import FeaturesPage from './pages/features/FeaturesPage';
import SignInPage from './pages/sign-in/SignInPage';
import TeamDescriptionsPage from './pages/descriptions/TeamDescriptionsPage';
import TopBar from './components/TopBar';
import * as userSelectors from './state/user/selectors';
import { useSelector } from 'react-redux';
import PostingsRouter from './pages/postings/Postings.router';
import SponsorsRouter from './pages/sponsors/Sponsors.router';

const App = () => {
  const token = useSelector(userSelectors.token);

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
        <Route path="/geese" exact>
          <div>
            {!token && <Redirect to="/sign-in" />}
            <TopBar />
            <GeesePage />
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
        <Route path="/team-descriptions" exact>
          {!token && <Redirect to="/sign-in" />}
          <TopBar />
          <TeamDescriptionsPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
