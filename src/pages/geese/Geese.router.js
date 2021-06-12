import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import GeesePage from './GeesePage';
import EditGoose from './edit-a-goose/EditGoose';

const GeeseRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact>
        <GeesePage />
      </Route>
      <Route path={`${path}/:gooseId`}>
        <EditGoose />
      </Route>
    </Switch>
  );
};
export default GeeseRouter;
