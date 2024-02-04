import React, { useCallback } from 'react';
import styled from 'styled-components';
import UnstyledButton from '../../components/Button';
import PreviewTable from '../../components/PreviewTable';
import TableCell from '@mui/material/TableCell';
import useProductVariations from '../../hooks/product-variations';
import { useHistory } from 'react-router-dom';
import moment from 'moment'

const Button = styled(UnstyledButton)``;

const Container = styled.div`
  margin: ${(props) => props.theme.pageMargin};
`;

const VariationsHeader = styled.p`
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
  {
    id: 'lastUpdated',
    value: 'Last Updated'
  }
];

const RowComponent = ({variationName, price, stock, lastUpdated }) => (

  <>
    <TableCell>{variationName}</TableCell>
    <TableCell>${price.toFixed(2)}</TableCell>
    <TableCell>{stock}</TableCell>
    <TableCell>{lastUpdated}</TableCell>
  </>
);

const VariationsPage = () => {
  const { productVariations } = useProductVariations();

  const productId = productVariations[0]?.productId

  const history = useHistory();

  const rowVariation = productVariations?.map((variation) => ({
    id: variation.id,
    variationName: variation.variationName,
    price: variation.price,
    stock: variation.stock,
    lastUpdated: moment.utc(variation.lastUpdated).local().format('MMMM D, YYYY'),
  }));

  const productName = productVariations[0]?.productName

  const addVariation = useCallback(() => {
    history.push(`/variations/add/${productId}`);
  }, [history, productId]);

  const onEditVariation = useCallback(
    (variationId) => {
      history.push(`/variations/${productId}/edit/${variationId}/`);
    },
    [history, productId],
  );
  return (
    <Container>
      <VariationsHeader>
        Merch Product Variations
      </VariationsHeader>
      <TableLabelHeader>
        <TableHeader>{productName ? `${productName} Variations`: ''}</TableHeader>
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
