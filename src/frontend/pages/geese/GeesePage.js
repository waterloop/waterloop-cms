import React, { useCallback } from 'react';
import styled from 'styled-components';
import UnstyledButton from '../../components/Button';
import PreviewTable from '../../components/PreviewTable';
import TableCell from '@material-ui/core/TableCell';
import useGeeseInfo from '../../hooks/geese-info';
import * as moment from 'moment';
import { useHistory } from 'react-router-dom';

const Button = styled(UnstyledButton)``;

const Container = styled.div`
  margin: ${(props) => props.theme.pageMargin};
`;

const CurrentGooseHeader = styled.p`
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
    id: 'name',
    value: 'Goose',
  },
  {
    id: 'updatedAt',
    value: 'Last Updated',
  },
];

const RowComponent = ({ name, updatedAt }) => (
  <>
    <TableCell>{name}</TableCell>
    <TableCell>{updatedAt}</TableCell>
  </>
);

const GeesePage = () => {
  const { geeseInfo } = useGeeseInfo();
  const history = useHistory();
  const currentGoose = 'Goose V';

  const geese = geeseInfo?.map((goose) => ({
    id: goose.id,
    name: goose.name,
    updatedAt: moment.utc(goose.updatedAt).local().format('MMMM D, YYYY'),
  }));

  const onEdit = useCallback(() => {
    // TODO: Implement functionality
    console.log('Go to edit');
  }, []);

  const onPreview = useCallback(() => {
    // TODO: Implement functionality
    console.log('Go to preview');
  }, []);

  const addGoose = useCallback(() => {
    history.push('/geese/add');
  }, [history]);

  const onEditGoose = useCallback(
    (id) => {
      history.push(`/geese/${id}`);
    },
    [history],
  );

  return (
    <Container>
      <CurrentGooseHeader>
        Current Goose: <strong>{currentGoose}</strong>
      </CurrentGooseHeader>
      <ButtonContainer>
        <Button label="Edit Description" secondary onClick={onEdit} />
        <Button label="Preview" onClick={onPreview} />
      </ButtonContainer>
      <TableLabelHeader>
        <TableHeader>All Geese</TableHeader>
        <Button label="New Goose +" onClick={addGoose} />
      </TableLabelHeader>
      <PreviewTable
        headers={headers}
        RowComponent={RowComponent}
        rows={geese}
        onEdit={onEditGoose}
      />
    </Container>
  );
};

export default GeesePage;
