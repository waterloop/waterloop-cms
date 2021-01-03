import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import LandingPage from './pages/landing/LandingPage';
import GeesePage from './pages/geese/GeesePage';
import FeaturesPage from './pages/features/FeaturesPage';
import SignInPage from './pages/sign-in/SignInPage';
import TeamDesc from './pages/descriptions/TeamDesc';
import TopBar from './components/TopBar';
import * as userSelectors from './state/user/selectors';
import { useSelector } from 'react-redux';
import PostingsPage from './pages/postings/PostingsPage';


function App() {
  const userId = useSelector(userSelectors.userId);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <div>
            {typeof userId !== 'number' && <Redirect to="/sign-in" />}
            <TopBar />
            <LandingPage />
          </div>
        </Route>
        <Route path="/geese" exact>
          <div>
            {typeof userId !== 'number' && <Redirect to="/sign-in" />}
            <TopBar />
            <GeesePage />
          </div>
        </Route>
        <Route path="/features" exact>
          <div>
            {typeof userId !== 'number' && <Redirect to="/sign-in" />}
            <TopBar />
            <FeaturesPage />
          </div>
        </Route>
        <Route path="/postings" exact>
          <PostingsPage />
        </Route>
        <Route path="/sign-in" exact>
          <SignInPage />
        </Route>
        <Route path="/descriptions" exact>
          <TeamDesc />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
