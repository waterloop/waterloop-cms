import { useCallback } from 'react';

// This would come from the server (backend) eventually
const mockFeatures = [
  {
    id: 0,
    title: 'Feat1 - Medium Body text',
    body: 'To scale to Hyperloop speeds, we need contactless propulsion. LIMs provide a way to levitate, stabilize, and propel, all in the same package, and they require a simple metal track with no magnets - perfect for minimizing infrastructure cost.',
    img: 'https://teamwaterloop.ca/static/media/LIM.46c5a4f0.png',
  },
  {
    id: 1,
    title: 'Feat1 - Short Body text',
    body: 'To scale to Hyperloop speeds, we need contactless propulsion.',
    img: 'https://teamwaterloop.ca/static/media/LIM.46c5a4f0.png',
  },
  {
    id: 2,
    title: 'Feat1 - Long Body Text',
    body: 'To scale to Hyperloop speeds, we need contactless propulsion. LIMs provide a way to levitate, stabilize, and propel, all in the same package, and they require a simple metal track with no magnets - perfect for minimizing infrastructure cost.To scale to Hyperloop speeds, we need contactless propulsion. LIMs provide a way to levitate, stabilize, and propel, all in the same package, and they require a simple metal track with no magnets - perfect for minimizing infrastructure cost.To scale to Hyperloop speeds, we need contactless propulsion. LIMs provide a way to levitate, stabilize, and propel, all in the same package, and they require a simple metal track with no magnets - perfect for minimizing infrastructure cost.To scale to Hyperloop speeds, we need contactless propulsion. LIMs provide a way to levitate, stabilize, and propel, all in the same package, and they require a simple metal track with no magnets - perfect for minimizing infrastructure cost.',
    img: 'https://teamwaterloop.ca/static/media/LIM.46c5a4f0.png',
  },
];

const useFeatures = () => {
  /**
   * TODO:
   * These all need to make calls to the server eventually
   */
  const create = useCallback(
    (feature) => {
      console.log(`Creating feature The new Feature is ${feature}`);
    },
    [feature],
  );

  const edit = useCallback((id, updatedFeature) => {
    console.log(
      `Updating feature with id: ${id}. The new Feature is ${updatedFeature}`,
    );
  }, []);

  const del = useCallback((id) => {
    console.log(`Deleting feature with id: ${id}.`);
  }, []);

  return {
    features: mockFeatures,
    createFeature: create,
    editFeature: edit,
    deleteFeature: del,
  };
};

export default useFeatures;
