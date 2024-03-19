import React from 'react';
import { useHistory } from 'react-router-dom';

import FeaturePreview from './components/FeaturePreview';
import useGeeseFeatures from './hooks/geese-features';
import styled from 'styled-components';

const FeaturesPage = () => {
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

  const AddButton = styled(Button)`
    background-color: #FED138;
    position: absolute;
    top: -40px;
    right: 50px;
    margin: 5px;
  `;

  const history = useHistory();
  const { geeseFeatures, deleteFeature } = useGeeseFeatures();

  const handleEdit = (id) => () => {
    history.push(`features/${id}`);
  };

  const handleDelete = (id) => () => {
    deleteFeature(id)
  };

  const handleAdd = () => {
    history.push(`features/add`)
  }

  const featureItems = geeseFeatures?.map((feature) => (
    <FeaturePreview
      key={feature.id}
      onEdit={handleEdit(feature.id)}
      onDelete={handleDelete(feature.id)}
      {...feature}
    />
  ));

  return (
    <>
    <div style={{ position: 'relative' }}>
      <AddButton onClick={handleAdd}>Add</AddButton>
      {featureItems}
    </div>
    </>
  );
};

export default FeaturesPage;
