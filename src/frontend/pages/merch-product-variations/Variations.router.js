import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import EditVariation from './edit-a-variation/EditVariation';
import AddVariation from './add-a-variation/AddVariation.js'
import VariationsPage from './VariationsPage';

const VariationsRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact>
        <VariationsPage />
      </Route>
      <Route path={`${path}/add`}>
        <AddVariation add />
      </Route>
      <Route path={`${path}/edit/:variationId`}>
        <EditVariation />
      </Route>
    </Switch>
  );
};
export default VariationsRouter;
