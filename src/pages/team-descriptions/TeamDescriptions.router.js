import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import TeamDescriptionsPage from './TeamDescriptionsPage';
import EditTeamDescriptions from './EditTeamDescriptionsPage';

const TeamDescriptionsRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <TeamDescriptionsPage />
      </Route>
      <Route path={`${path}/:id`}>
        <EditTeamDescriptions />
      </Route>
    </Switch>
  );
};

export default TeamDescriptionsRouter;
