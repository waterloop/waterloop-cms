import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import BlogPage from './BlogPage';
import AddBlog from './add-a-blog/AddBlog'

const BlogsRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact>
        <BlogPage />
      </Route>
      <Route path={`${path}/add`}>
        <AddBlog add />
      </Route>
    </Switch>
  );
};

export default BlogsRouter;