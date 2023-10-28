import React, { useCallback } from 'react';
import styled from 'styled-components';
import UnstyledButton from '../../components/Button';
import PreviewTable from '../../components/PreviewTable';
import TableCell from '@mui/material/TableCell';
import useProducts from '../../hooks/products';
import * as moment from 'moment';
import { useHistory } from 'react-router-dom';

const Button = styled(UnstyledButton)``;

const Container = styled.div`
  margin: ${(props) => props.theme.pageMargin};
`;


const ButtonContainer = styled.div`
  ${Button} {
    margin-right: 28px;
    box-shadow: ${({ theme }) => theme.shadows.shadow1};
  }
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

  const rowProduct= products?.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
  }));

  const onEdit = useCallback(() => {
    // TODO: Implement functionality
    console.log('Go to edit');
  }, []);

  const onPreview = useCallback(() => {
    // TODO: Implement functionality
    console.log('Go to preview');
  }, []);

  const addProduct = useCallback(() => {
    history.push('/products/add');
  }, [history]);

  const onEditProduct = useCallback(
    (id) => {
      history.push(`/products/${id}`);
    },
    [history],
  );

  return (
    <Container>
      <ButtonContainer>
        <Button label="Edit Description" secondary onClick={onEdit} />
        <Button label="Preview" onClick={onPreview} />
      </ButtonContainer>
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
