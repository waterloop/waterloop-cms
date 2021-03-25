import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import EditPostingsForm from './forms/EditPostingsForm';
import EditOpeningsForm from './forms/EditOpeningsForm';
import PostingsPage from './PostingsPage';

const PostingsRouter = () => {
  const { path } = useRouteMatch();
  console.log(path);
  return (
    <Switch>
      <Route path={path} exact>
        <PostingsPage />
      </Route>
      <Route path={`${path}/editOpenings`}>
        <EditOpeningsForm />
      </Route>
      <Route path={`${path}/:postingId`}>
        <EditPostingsForm />
      </Route>
    </Switch>
  );
};
export default PostingsRouter;
