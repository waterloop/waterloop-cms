import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import api from '../../../api';
import TextInput from '../../../components/TextInput';
import FormContainer from '../../../components/FormContainer';
import Button from '../../../components/Button';

const Header = styled.h1`
  font-size: 36px;
  font-style: italic;
  font-weight: ${({ theme }) => theme.fonts.bold36};
  margin: 0px;
  padding: 0px;
  color: #2b2b2b;
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
  const singleLineInputWidth = '70%';
  const textAreaInputWidth = '100%';

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
      if (data && data.data) {
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

  const saveForm = async () => {
    await api.openingsDescription.updateDescriptions(formData);
  };

  return (
    <OuterFormContainer>
      <SingleFormContainer>
        <Header>When there is at least one active opening</Header>
        <FormContainer title="Heading (required)">
          <TextInput
            width={singleLineInputWidth}
            value={formData.active.heading}
            onChange={onChange('active', 'heading')}
            placeholder="Active heading text..."
          />
        </FormContainer>
        <FormContainer title="Body (required)">
          <TextInput
            multiLine={true}
            width={textAreaInputWidth}
            value={formData.active.body}
            onChange={onChange('active', 'body')}
            placeholder="Active body text..."
          />
        </FormContainer>
      </SingleFormContainer>

      <SingleFormContainer>
        <Header>When there are no active openings</Header>
        <FormContainer title="Heading (required)">
          <TextInput
            width={singleLineInputWidth}
            value={formData.nonActive.heading}
            onChange={onChange('nonActive', 'heading')}
            placeholder="Nonactive heading text..."
          />
        </FormContainer>
        <FormContainer title="Body (required)">
          <TextInput
            multiLine={true}
            width={textAreaInputWidth}
            value={formData.nonActive.body}
            onChange={onChange('nonActive', 'body')}
            placeholder="Nonactive body text "
          />
        </FormContainer>
      </SingleFormContainer>

      <ButtonContainer>
        <Button onClick={saveForm}>Save</Button>
        <Button cancel={true}>Cancel</Button>
      </ButtonContainer>
    </OuterFormContainer>
  );
};

export default EditOpeningsForm;
