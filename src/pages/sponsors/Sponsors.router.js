import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import SponsorsPage from './SponsorsPage';
import EditPageDescription from './forms/EditPageDescription';
import EditSponsors from './forms/EditSponsors';

const SponsorsRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact>
        <SponsorsPage />
      </Route>
      <Route path={`${path}/description`}>
        <EditPageDescription />
      </Route>
      <Route path={`${path}/:id`}>
        <EditSponsors />
      </Route>
    </Switch>
  );
};
export default SponsorsRouter;