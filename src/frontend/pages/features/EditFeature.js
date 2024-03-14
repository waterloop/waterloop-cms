import React, { useMemo } from 'react';
import ImagePreview from '../../components/ImagePreview/index';
import FormContainer from '../../components/FormContainer/index';
import Button from '../../components/Button/index';
import TextInput from '../../components/TextInput/index';
import useFeaturesForm from '../../hooks/geese-features-form';
import styled from 'styled-components';

const EditFeaturePage = styled.div`
  padding: 64px 88px 65px 58px;
`;

const TopRow = styled.div`
  display: flex;
`;

const LastUpdated = styled.div`
  font-family: IBM Plex Sans;
  font-size: 18px;
  font-weight: 500;
  text-align: right;
  flex: auto;
`;

const EditFeatureBody = styled.div`
  padding-left: 30px;
`;

const FeatureInfo = styled.div`
  padding-left: 10px;
`;

const FeatureImages = styled.div`
  margin-bottom: 60px;
`;

const ImagesText = styled.div`
  font-family: IBM Plex Sans;
  font-size: 18px;
  color: #232535;
  margin: 0;
`;

const ImageCard = styled.div`
  margin-right: 18px;
`;

const ImageCards = styled.div`
  padding-top: 20px;
  display: flex;
`;

const FeatureButtons = styled.div`
  padding-left: 10px;
`;

const EditFeature = ({ add }) => {
  const {
    featureName,
    setFeatureName,
    picture,
    setPicture,
    pictureUrl,
    setPictureUrl,
    description,
    setDescription,
    imageUpload,
    imageDelete,
    saveForm,
    deleteForm,
    showModal,
    openModal,
    closeModal,
    closeForm
  } = useFeaturesForm();

 
  const displayImages = useMemo(() => {
    if (pictureUrl){
    return [
      <ImageCard>
      <ImagePreview
        src={pictureUrl}
        onDelete={() => {
          imageDelete();
        }}
      />
    </ImageCard>
    ]};

  }, [picture, pictureUrl]);

  return (
    <EditFeaturePage>
      <TopRow>
        <Button cancel onClick={closeForm}>
          &#60; Back
        </Button>
        {/* <LastUpdated>{`Last updated: ${getLastUpdated()}`}</LastUpdated> */}
      </TopRow>

      <EditFeatureBody>
        <FormContainer title="Name (required)">
          <TextInput
            value={featureName}
            onChange={setFeatureName}
            placeholder="Feature V"
            className="feature-info"
          />
        </FormContainer>

        <FormContainer title="Description (required)">
          <FeatureInfo>
            <TextInput
              value={description}
              onChange={setDescription}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
              multiLine={true}
            />
          </FeatureInfo>
        </FormContainer>

        <FeatureImages>
          <FormContainer title="Image">
            <FeatureInfo>
              <ImagesText>
                If this Feature is not selected as the "current Feature", only
                the leftmost image will be displayed.
              </ImagesText>
              <ImagesText>
                The images can be rearranged by dragging them into the desired
                order.
              </ImagesText>
              <ImageCards>
                {displayImages}
                <ImagePreview onNew={imageUpload} />
              </ImageCards>
            </FeatureInfo>
          </FormContainer>
        </FeatureImages>

        <FeatureButtons>
          <Button label="Save" onClick={saveForm} />
          <Button label="Cancel" cancel onClick={closeForm} />
        </FeatureButtons>
      </EditFeatureBody>
    </EditFeaturePage>
  );
};

export default EditFeature;
