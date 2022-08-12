import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import BlogPage from './BlogPage';
import EditBlog from './edit-a-blog/EditBlog'

const BlogsRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact>
        <BlogPage />
      </Route>
      <Route path={`${path}/add`}>
        <EditBlog add />
      </Route>
      <Route path={`${path}/:blogId`}>
        <EditBlog />
      </Route>
    </Switch>
  );
};

export default BlogsRouter;