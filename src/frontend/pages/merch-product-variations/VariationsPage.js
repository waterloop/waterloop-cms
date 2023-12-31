import React, { useCallback } from 'react';
import styled from 'styled-components';
import UnstyledButton from '../../components/Button';
import PreviewTable from '../../components/PreviewTable';
import TableCell from '@mui/material/TableCell';
import useProductVariations from '../../hooks/product-variations';
import useProducts from '../../hooks/products';

import * as moment from 'moment';
import { useHistory } from 'react-router-dom';


const Button = styled(UnstyledButton)``;

const Container = styled.div`
  margin: ${(props) => props.theme.pageMargin};
`;

const VariationsHeader = styled.p`
  font: ${({ theme }) => theme.fonts.medium24};
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
    id:'productName',
    value:"Product"
  },
  {
    id: 'variationName',
    value: 'Variation',
  },
  {
    id: 'price',
    value: 'Price',
  },
  {
    id: 'stock',
    value: 'Stock',
  },
];

const RowComponent = ({productName, variationName, price, stock }) => (
  <>
    <TableCell>{productName}</TableCell>
    <TableCell>{variationName}</TableCell>
    <TableCell>${price.toFixed(2)}</TableCell>
    <TableCell>{stock}</TableCell>
  </>
);

const VariationsPage = () => {
  const { productVariations } = useProductVariations();
  const history = useHistory();

  const rowVariation = productVariations?.map((variation) => ({
    id: variation.id,
    productName: variation.productName,
    variationName: variation.variationName,
    price: variation.price,
    stock: variation.stock
  }));

  const onEdit = useCallback(() => {
    // TODO: Implement functionality
    console.log('Go to edit');
  }, []);

  const onPreview = useCallback(() => {
    // TODO: Implement functionality
    console.log('Go to preview');
  }, []);

  const addVariation = useCallback(() => {
    history.push('/variations/add');
  }, [history]);

  const onEditVariation = useCallback(
    (variationId) => {
      history.push(`/variations/edit/${variationId}/`);
    },
    [history],
  );

  return (
    <Container>
      <VariationsHeader>
        Merch Product Variations
      </VariationsHeader>
      <ButtonContainer>
        <Button label="Edit Description" secondary onClick={onEdit} />
        <Button label="Preview" onClick={onPreview} />
      </ButtonContainer>
      <TableLabelHeader>
        <TableHeader>All Variations</TableHeader>
        <Button label="New Variation +" onClick={addVariation} />
      </TableLabelHeader>
      <PreviewTable
        headers={headers}
        RowComponent={RowComponent}
        rows={rowVariation}
        onEdit={onEditVariation}
      />
    </Container>
  );
};

export default VariationsPage;
