import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import LandingPage from './pages/landing/LandingPage';
import GeesePage from './pages/geese/GeesePage';
import FeaturesPage from './pages/features/FeaturesPage';
import SignInPage from './pages/sign-in/SignInPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/geese" exact>
          <GeesePage />
        </Route>
        <Route path="/features" exact>
          <FeaturesPage />
        </Route>
        <Route path="/sign-in" exact>
          <SignInPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
