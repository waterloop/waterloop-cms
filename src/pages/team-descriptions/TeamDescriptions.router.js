import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import TeamDescriptionsPage from './TeamDescriptionsPage';
import EditTeamDescriptions from './forms/EditTeamDescriptions';
import EditTeam from './forms/EditTeam';

const TeamDescriptionsRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <TeamDescriptionsPage />
      </Route>
      <Route path={`${path}/description`}>
        <EditTeamDescriptions />
      </Route>
      <Route path={`${path}/:id`}>
        <EditTeam />
      </Route>
    </Switch>
  );
};

export default TeamDescriptionsRouter;
