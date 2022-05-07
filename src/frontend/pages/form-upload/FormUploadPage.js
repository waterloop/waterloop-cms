import React, { useState } from 'react';

import ImagePreview from '../../components/ImagePreview';
import Button from '../../components/Button';
import api from '../../api';
import FormData from 'form-data';

const FormUploadPage = () => {
  const [images, setImages] = useState([]);

  const imageUpload = (image) => {
    // can't upload same image twice
    setImages((prevImages) => [...prevImages, image]);
  };

  const dataUpload = (e) => {
    e.preventDefault();

    const data = new FormData();

    images.forEach((image) => {
      data.append('files', image, image.name);
    });

    api.formUpload(data);
    setImages([]);
  };

  return (
    <div>
      <ImagePreview onNew={imageUpload} />
      <br />
      <Button onClick={dataUpload}>Submit Form</Button>
    </div>
  );
};

export default FormUploadPage;
