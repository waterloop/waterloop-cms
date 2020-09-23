import React from 'react'
import FeaturePreview from './components/FeaturePreview'
import useFeatures from './hooks/features';

const FeaturesPage = () => {
  const { features, editFeature, deleteFeature, createFeature } = useFeatures();

  const handleEdit = (id) => () => {
    console.log(`Edit the Feature with id ${id}`);
  };

  const featureItems = features.map(
    (feature) => <FeaturePreview key={feature.id} onEdit={handleEdit(feature.id)} {...feature} />);

  return (
    <div>
      {featureItems}
    </div>
  )
}

export default FeaturesPage;
