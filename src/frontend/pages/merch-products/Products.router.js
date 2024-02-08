import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ProductsPage from './ProductsPage';
import EditProduct from './edit-a-product/EditProduct';
import VariationsPage from '../merch-product-variations/VariationsPage';
import AddProductVariation from '../merch-product-variations/add-a-variation/AddVariation';
import EditProductVariation from '../merch-product-variations/edit-a-variation/EditVariation';

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
      <Route path={`${path}/:productId/edit`}>
        <EditProduct />
      </Route>
         <Route path={`${path}/:productId/variations`} exact>
        <VariationsPage />
      </Route>
      <Route path={`${path}/:productId/variations/add`} exact>
        <AddProductVariation add />
      </Route>
      <Route path={`${path}/:productId/variations/edit/:variationId`} exact>
        <EditProductVariation />
      </Route>

    </Switch>
  );
};
export default ProductsRouter;
