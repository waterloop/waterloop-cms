import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ProductsPage from './ProductsPage';
import EditProduct from './edit-a-product/EditProduct';

const ProductsRouter = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact>
        <ProductsPage />
      </Route>
      <Route path={`${path}/add`}>
        <EditProduct add />
      </Route>
      <Route path={`${path}/:productId`}>
        <EditProduct />
      </Route>
    </Switch>
  );
};
export default ProductsRouter;
