import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import { useHistory } from 'react-router-dom';

import api from '../../../api';
import UnstyledTextInput from '../../../components/TextInput';
import FormContainer from '../../../components/FormContainer';
import Button from '../../../components/Button';

const SingleLineTextInput = styled(UnstyledTextInput)`
  width: 70%;
`;

const TextArea = styled(UnstyledTextInput)`
  width: 100%;
`;

const Header = styled.h1`
  font: ${({ theme }) => theme.fonts.bold36};
  font-style: italic;
  margin: 0px;
  padding: 0px;
`;

const SingleFormContainer = styled.div`
  width: 100%;
  margin-bottom: 50px;
  margin-right: 30px;
`;

const OuterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5% 5%;
  width: 90%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const EditOpeningsForm = () => {
  const history = useHistory();

  const [formData, setformData] = useState({
    active: {
      heading: '',
      body: '',
    },
    nonActive: {
      heading: '',
      body: '',
    },
  });

  useEffect(() => {
    api.openingsDescription.getDescriptions().then((data) => {
      if (!R.isEmpty(data.data)) {
        setformData(data.data);
      }
    });
  }, []);

  const onChange = (type, name) => (text) => {
    const newState = {
      ...formData,
      [type]: { ...formData[type], [name]: text },
    };
    setformData(newState);
  };

  const goBack = () => {
    history.push('/postings');
  };

  const saveForm = () => {
    api.openingsDescription
      .updateDescriptions(formData)
      .then(() => history.push('/postings'));
  };

  return (
    <OuterFormContainer>
      <Button onClick={goBack} cancel={true}>
        {'< Back'}
      </Button>
      <br />
      <SingleFormContainer>
        <Header>When there is at least one active opening</Header>
        <FormContainer title="Heading (required)">
          <SingleLineTextInput
            value={formData.active.heading}
            onChange={onChange('active', 'heading')}
            placeholder="Active heading text..."
          />
        </FormContainer>
        <FormContainer title="Body (required)">
          <TextArea
            multiLine={true}
            value={formData.active.body}
            onChange={onChange('active', 'body')}
            placeholder="Active body text..."
          />
        </FormContainer>
      </SingleFormContainer>

      <SingleFormContainer>
        <Header>When there are no active openings</Header>
        <FormContainer title="Heading (required)">
          <SingleLineTextInput
            value={formData.nonActive.heading}
            onChange={onChange('nonActive', 'heading')}
            placeholder="Nonactive heading text..."
          />
        </FormContainer>
        <FormContainer title="Body (required)">
          <TextArea
            multiLine={true}
            value={formData.nonActive.body}
            onChange={onChange('nonActive', 'body')}
            placeholder="Nonactive body text "
          />
        </FormContainer>
      </SingleFormContainer>

      <ButtonContainer>
        <Button onClick={saveForm}>Save</Button>
        <Button onClick={goBack} cancel={true}>
          Cancel
        </Button>
      </ButtonContainer>
    </OuterFormContainer>
  );
};

export default EditOpeningsForm;
