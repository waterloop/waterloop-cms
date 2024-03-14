import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import FeaturesPage from './FeaturesPage';
import EditFeature from './EditFeature';

const FeaturesRouter = () => {
  const { path } = useRouteMatch();
  console.log(path)
  return (
    <Switch>
      <Route path={path} exact>
        <FeaturesPage />
      </Route>
      <Route path={`${path}/add`}>
        <EditFeature add/>
      </Route>
      <Route path={`${path}/:featureId`}>
        <EditFeature />
      </Route>
    </Switch>
  );
};
export default FeaturesRouter;
