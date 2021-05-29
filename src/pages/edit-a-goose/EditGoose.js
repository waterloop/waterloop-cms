import React, { useState } from "react";
import ImagePreview from "../../components/ImagePreview/index";
import FormContainer from "../../components/FormContainer/index";
import Button from "../../components/Button/index";
import TextInput from "../../components/TextInput/index";
import api from "../../api";

const EditGoose = () => {
  const [gooseName, setGooseName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const imageUpload = (image) => {
    // can't upload same image twice
    setImages((prevImages) => [...prevImages, image]);
  };

  const dataUpload = (e) => {
    e.preventDefault();

    const data = new FormData();

    images.forEach((image) => {
      data.append("files", image, image.name);
    });

    api.formUpload(data);
    setImages([]);
  };

  return (
    <div>
      <div>
        <FormContainer
          title="Name (required)"
          children={
            <TextInput
              value={gooseName}
              onChange={setGooseName}
              placeholder="Goose V"
            />
          }
        />
      </div>
      <div>
        <FormContainer
          title="Description (required)"
          children={
            <TextInput
              value={description}
              onChange={setDescription}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
              multiLine={true}
            />
          }
        />
      </div>
      <div>
        <FormContainer
          title="Images (at least one is required)"
          children={`If this Goose is not selected as the "current Goose", 
          only the leftmost image will be displayed.
          The images can be rearranged by dragging them into the desired order.`}
        />
        <ImagePreview onNew={imageUpload} />
      </div>
      <div>
        <Button label="Save" />
        <Button label="Cancel" cancel={true} />
        <Button label="Delete" del={true} />
      </div>
    </div>
  );
};

export default EditGoose;
