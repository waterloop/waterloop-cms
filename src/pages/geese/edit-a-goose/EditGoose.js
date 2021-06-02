import React, { useState, useMemo, useEffect, useCallback } from "react";
import ImagePreview from "../../../components/ImagePreview/index";
import FormContainer from "../../../components/FormContainer/index";
import Button from "../../../components/Button/index";
import TextInput from "../../../components/TextInput/index";
import api from "../../../api";
import { useHistory, useParams } from "react-router-dom";
import useGeeseInfo from "../../../hooks/geese-info";

const EditGoose = () => {
  const [gooseName, setGooseName] = useState("");
  const [description, setDescription] = useState("");
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
            console.log(params.gooseId);
            const gooseInfo = geeseInfo.find((goose) => goose.id === gooseId);
            console.log(geeseInfo);
            console.log(gooseInfo);
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

  const imageUpload = (image) => {
    // can't upload same image twice
    setImages((prevImages) => [...prevImages, image]);
  };

  const imageDelete = (imageIndex) => {
    setImages((prevImages) =>
      prevImages.filter((_prevImage, index) => {
        return index !== imageIndex;
      })
    );
  };

  const imageUrlDelete = (imageIndex) => {
    setImagesToDelete((images) => [...images, imageUrls[imageIndex].id]);
    setImageUrls((prevImages) =>
      prevImages.filter((_prevImage, index) => {
        return index !== imageIndex;
      })
    );
  };

  const closeForm = () => {
    history.push("/geese");
  };

  const displayImages = useMemo(() => {
    return [
      ...images.map((image, index) => {
        return (
          <ImagePreview
            src={URL.createObjectURL(image)}
            onDelete={() => {
              imageDelete(index);
            }}
            key={`${image.filename}-${index}`}
          />
        );
      }),
      ...imageUrls.map((image, index) => {
        return (
          <ImagePreview
            src={image.imgDir}
            onDelete={() => {
              imageUrlDelete(index);
            }}
            key={`${image.id}-${index}`}
          />
        );
      }),
    ];
  }, [images, imageUrls, imageUrlDelete]);

  const saveForm = useCallback(async () => {
    // TODO: Validation checks here.

    // Send data to server:
    try {
      const files = images;
      let imageUrls = [];

      if (files.length > 0) {
        const data = new FormData();

        files.forEach((file) => {
          data.append("files", file, file.name);
        });

        const res = await api.formUpload(data);

        // eslint-disable-next-line no-console
        console.log("Done image upload!");

        imageUrls = res.data.data;
        if (imageUrls.length === 0) {
          throw new Error("Failed to upload image.");
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
  }, [images, params, gooseName, description, closeForm]);

  return (
    <div style={{ paddingLeft: 88 }}>
      <Button cancel onClick={closeForm}>
        &#60; Back
      </Button>
      <div>
        <FormContainer title="Name (required)">
          <TextInput
            value={gooseName}
            onChange={setGooseName}
            placeholder="Goose V"
          />
        </FormContainer>
      </div>
      <div>
        <FormContainer title="Description (required)">
          <TextInput
            value={description}
            onChange={setDescription}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
            multiLine={true}
          />
        </FormContainer>
      </div>
      <div style={{ paddingBottom: 70 }}>
        <FormContainer title="Images (at least one is required)">
          `If this Goose is not selected as the "current Goose", only the
          leftmost image will be displayed. The images can be rearranged by
          dragging them into the desired order.`{displayImages}
          <ImagePreview onNew={imageUpload} />
        </FormContainer>
      </div>
      <div>
        <Button label="Save" onClick={saveForm} />
        <Button label="Cancel" cancel={true} onClick={closeForm} />
        <Button label="Delete" del={true} />
      </div>
    </div>
  );
};

export default EditGoose;
