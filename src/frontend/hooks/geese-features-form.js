import { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useGeeseFeatures from '../hooks/geese-features';
import api from '../api';
import moment from 'moment';

const useGeeseFeaturesForm = () => {
  const [featureName, setFeatureName] = useState('');
  const [picture, setPicture] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();
  const params = useParams();

  const { geeseFeatures } = useGeeseFeatures();

  useEffect(() => {
    if (geeseFeatures.length > 0) {
      (async () => {
        try {
          if (params.featureId) {
            const featureId = parseInt(params.featureId, 10);

            const feature = geeseFeatures.find(
              (feature) => feature.id === featureId,
            );

            if (feature) {
              setFeatureName(feature.featureName);
              setPictureUrl(feature.picture);
              setDescription(feature.description);
            }
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [
    setFeatureName,
    setPicture,
    setPictureUrl,
    setDescription,
    params,
    geeseFeatures,
  ]);

  const imageUpload = useCallback(
    (image) => {
      setPicture(image);
    },
    [setPicture],
  );

  const imageDelete = useCallback(() => {
    setPicture('');
  }, [setPicture]);

  const imageUrlDelete = useCallback(() => {
    setPictureUrl('');
  }, [setPictureUrl]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeForm = useCallback(() => {
    history.push('/features');
  }, [history]);

  const saveForm = useCallback(async () => {
    try {
      let newPictureUrl = pictureUrl;

      if (picture instanceof File) {
        const formData = new FormData();
        formData.append('image', picture, picture.name);
        const response = await api.formUpload(formData);

        if (!response.data.data) {
          throw new Error('Error uploading image');
        }

        newPictureUrl = response.data.data[0];
      }

      const feature = {
        name: featureName,
        picture: newPictureUrl,
        description,
      };

      if (featureName && picture && description) {
        if (params.featureId) {
          await api.geeseFeatures.addGeeseFeature({ ...feature });
        } else {
          await api.geeseFeatures.updateGeeseFeature(params.featureId, {
            ...feature,
          });
        }
      } else {
        throw new Error('Fields must be non empty');
      }
    } catch (error) {
      throw new Error(error);
    }
  }, [featureName, picture, pictureUrl, description, params]);

  const deleteForm = useCallback(async (featureId) => {
    await api.geeseFeatures.deleteGeeseFeature(featureId);
  }, [params.featureId, closeForm]);

  return {
    featureName,
    setFeatureName,
    picture,
    setPicture,
    pictureUrl,
    setPictureUrl,
    description,
    setDescription,
  };
};

export default useGeeseFeaturesForm;
