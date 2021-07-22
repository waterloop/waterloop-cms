import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import useTeamForm from "../hooks/team-form";
import { commonCopies, teamCopies, buttonCopies } from "../Copies";
import UnstyledFormContainer from "../../../components/FormContainer";
import UnstyledTextInput from "../../../components/TextInput";
import Button from "../../../components/Button";

const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
  & input,
  textarea {
    box-sizing: border-box;
  }
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    margin: ${({ theme }) => theme.mobilePageMargin};
  }
`;

const FormGroup = styled.div`
  & > * {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 40px;
    }
  }
`;

const FormContainer = styled(UnstyledFormContainer)`
  max-width: initial;
`;

const TopInfo = styled.span`
  display: flex;
  flex-direction: row;

  justify-content: space-between;

  & button {
    padding: 0;
  }
`;

const DateUpdated = styled.span`
  display: inherit;
  & > * {
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const Text = styled.p`
  font: ${({ theme }) => theme.fonts.medium18};
`;
const TextBold = styled.p`
  font: ${({ theme }) => theme.fonts.bold18};
`;

const TextInput = styled(UnstyledTextInput)`
  max-width: 500px;
  width: 100%;
`;

const TextMultilineInput = styled(UnstyledTextInput)`
  width: 100%;
`;

// TODO: Abstract component as utility for forms:
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditTeam = () => {
  const { id } = useParams();

  const {
    loading,

    teamName,
    description,
    lastUpdated,

    updateName,
    updateDescription,

    saveForm,
    closeForm,
    deleteForm,
  } = useTeamForm(parseInt(id));

  return (
    !loading && (
      <Container id="team-root">
        <TopInfo>
          <Button cancel onClick={closeForm}>
            {buttonCopies.BACK}
          </Button>
          {lastUpdated && (
            <DateUpdated>
              <TextBold>{commonCopies.LAST_UPDATED_DATE}</TextBold>
              <Text>{lastUpdated}</Text>
            </DateUpdated>
          )}
        </TopInfo>
        <FormGroup>
          <FormContainer title={teamCopies.NAME_LABEL}>
            <TextInput
              placeholder={teamCopies.NAME_PLACEHOLDER}
              value={teamName}
              onChange={updateName}
            />
          </FormContainer>
          <FormContainer title={teamCopies.DESCRIPTION_LABEL}>
            <TextMultilineInput
              multiLine
              placeholder={teamCopies.DESCRIPTION_PLACEHOLDER}
              value={description}
              onChange={updateDescription}
            />
          </FormContainer>
        </FormGroup>
        <ButtonContainer>
          <div>
            <Button onClick={saveForm}>{buttonCopies.SAVE}</Button>
            <Button cancel onClick={closeForm}>
              {buttonCopies.CANCEL}
            </Button>
          </div>
          <Button del onClick={deleteForm}>
            {buttonCopies.DELETE}
          </Button>
        </ButtonContainer>
      </Container>
    )
  );
};

export default EditTeam;
