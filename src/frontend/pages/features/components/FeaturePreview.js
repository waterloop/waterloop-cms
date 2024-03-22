import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  height: auto;
  padding-bottom: 40px;
  align-content: center;
  padding: 32px;
  margin: 50px;
  justify-content: space-between;

  @media screen and (max-width: 425px) {
    display: flex;
    flex-direction: column;
    padding-bottom: 25px;
  }

  border: 1px solid black;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 70%;
`;

const FeatImage = styled.img`
  border: 10px;
  max-width: 340px;
  height: 10em;
  padding-right: 30px;

  @media screen and (max-width: 425px) {
    display: flex;
    width: 90%;
    height: 100%;
    object-fit: cover;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 85%
`;

const Button = styled.button`
  height: 32px;
  width: 100px;

  background-color: #FED138;
  font-weight: 700;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    border: 1px solid black;
  }
`;

const EditButton = styled(Button)`
  background-color: #FED138;
`;

const DeleteButton = styled(Button)`
  background-color: red;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${Button}:not(first-child) {
    margin-top: 8px;
  }
`;

const FeaturePreview = ({
  name,
  description,
  picture,
  onEdit,
  onDelete,
}) => {
  return (
    <Container>
      <FlexContainer>
        <FeatImage
          className="FeatImage"
          src={picture}
          alt="Example alt text"
        />
        <Column>
          <h3>{name}</h3>
          <p>{description}</p>
        </Column>
      </FlexContainer>
      <ButtonContainer>
        <EditButton onClick={onEdit}>Edit</EditButton>
        <DeleteButton onClick={onDelete}>Delete</DeleteButton>
      </ButtonContainer>
    </Container>
  )};

export default FeaturePreview;
