import {useState, useEffect, useCallback} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useGeeseInfo from '../hooks/geese-info';
import api from '../api';
import moment from 'moment';

const useGooseForm = () => {
    const [gooseName, setGooseName] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const history = useHistory();
    const params = useParams();
    const { geeseInfo } = useGeeseInfo();

    useEffect(() => {
        if (geeseInfo.length > 0) {
          (async () => {
            try {
              if (params.gooseId) {
                const gooseId = parseInt(params.gooseId, 10);
                const gooseInfo = geeseInfo.find((goose) => goose.id === gooseId);
                if (gooseInfo) {
                  setGooseName(gooseInfo.name);
                  setDescription(gooseInfo.description);
                  const response = await api.geeseInfo.getGeeseImages(gooseId);
                  setImageUrls(response.data);
                }
              }
            } catch (err) {
              console.log(err);
            }
          })();
        }
      }, [setGooseName, setDescription, setImageUrls, params, geeseInfo]);
    
      const imageUpload = useCallback((image) => {
        // can't upload same image twice
        setImages((prevImages) => [...prevImages, image]);
      }, [setImages]);
    
      const imageDelete = useCallback((imageIndex) => {
        setImages((prevImages) =>
          prevImages.filter((_prevImage, index) => {
            return index !== imageIndex;
          })
        );
      }, [setImages]);
    
      const imageUrlDelete = useCallback((imageIndex) => {
        setImagesToDelete((images) => [...images, imageUrls[imageIndex].id]);
        setImageUrls((prevImages) =>
          prevImages.filter((_prevImage, index) => {
            return index !== imageIndex;
          })
        );
      }, [setImagesToDelete, setImageUrls, imageUrls]);
    
      const closeForm = useCallback(() => {
        history.push('/geese');
      }, [history]);

      const saveForm = useCallback(async () => {
        // TODO: Validation checks here.
    
        // Send data to server:
        try {
          const files = images;
          let imageUrls = [];
    
          if (files.length > 0) {
            const data = new FormData();
    
            files.forEach((file) => {
              data.append('files', file, file.name);
            });
    
            const res = await api.formUpload(data);
    
            // eslint-disable-next-line no-console
            console.log('Done image upload!');
    
            imageUrls = res.data.data;
            if (imageUrls.length === 0) {
              throw new Error('Failed to upload image.');
            }
          }
    
          const gooseInfo = {
            name: gooseName,
            description,
            updatedAt: Date.now(),
          };
    
          if (params.gooseId) {
            await api.geeseInfo.updateGeeseInfo(params.gooseId, gooseInfo);
            await Promise.all(
              imagesToDelete.map((imageId) => {
                return api.geeseInfo.deleteGeeseImages(imageId);
              })
            );
            if (imageUrls.length) {
              await api.geeseInfo.addGeeseImages(
                imageUrls.map((image) => {
                  return {
                    gooseId: params.gooseId,
                    imgDir: image,
                  };
                })
              );
            }
          } else {
            // TODO when new goose is implemented
            // const res = await api.geeseInfo.addGeeseInfo(gooseInfo);
            // console.log(res);
            // await api.geeseInfo.addGeeseImages(imageUrls.map((image) => {
            //   return {
            //     gooseId: ,
            //     imgDir: image
            //   }
            // }))
          }
    
          // onSuccess:
          closeForm();
        } catch (e) {
          // TODO: Display "could not add/update" error to user as dialogue.
          // eslint-disable-next-line no-console
          console.error(e);
        }
      }, [images, params, gooseName, description, closeForm, imagesToDelete]);
    
      const getLastUpdated = useCallback(() => {
        const gooseInfo = geeseInfo.find((goose) => goose.id == params.gooseId);
        if (gooseInfo) {
          return moment.utc(gooseInfo.updatedAt).local().format('MMMM D, YYYY');
        }
        return '';
      }, [geeseInfo, params.gooseId]);

      return {
          gooseName, 
          setGooseName, 
          description, 
          setDescription,
          images, 
          setImages,
          imageUrls, 
          setImageUrls,
          imagesToDelete, 
          setImagesToDelete,
          getLastUpdated,
          imageUpload,
          imageDelete,
          imageUrlDelete,
          closeForm,
          saveForm,
      }
};

export default useGooseForm;