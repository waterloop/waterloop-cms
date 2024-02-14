import React, { useCallback } from 'react';
import styled from 'styled-components';
import UnstyledButton from '../../components/Button';
import PreviewTable from '../../components/PreviewTable';
import TableCell from '@mui/material/TableCell';
import useProducts from '../../hooks/products';
import { useHistory } from 'react-router-dom';

const Button = styled(UnstyledButton)``;

const Container = styled.div`
  margin: ${(props) => props.theme.pageMargin};
`;

const ProductsHeader = styled.p`
  font: ${({ theme }) => theme.fonts.medium24};
`;

const TableLabelHeader = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    justify-content: center;
    flex-direction: column;
    margin-bottom: 20px;
  }
`;

const TableHeader = styled.p`
  font: ${({ theme }) => theme.fonts.bold36};
`;

const headers = [
  {
    id: 'name',
    value: 'Product',
  },
  {
    id: 'category',
    value: 'Category',
  },
];

const RowComponent = ({ name, category }) => (
  <>
    <TableCell>{name}</TableCell>
    <TableCell>{category}</TableCell>
  </>
);

const ProductsPage = () => {
  const { products } = useProducts();
  const history = useHistory();

  const rowProduct = products?.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
  }));

  const addProduct = useCallback(() => {
    history.push('/products/add');
  }, [history]);

  const onEditProduct = useCallback(
    (id) => {
      history.push(`/products/${id}/edit`);
    },
    [history],
  );

  return (
    <Container>
      <ProductsHeader>Merch Store Products</ProductsHeader>
      <TableLabelHeader>
        <TableHeader>All Products</TableHeader>
        <Button label="New Product +" onClick={addProduct} />
      </TableLabelHeader>
      <PreviewTable
        headers={headers}
        RowComponent={RowComponent}
        rows={rowProduct}
        onEdit={onEditProduct}
      />
    </Container>
  );
};

export default ProductsPage;
