import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AddImageIconSvg from './assets/addImageIcon.svg';
import CloseIconSvg from './assets/closeIcon.svg';
import * as R from 'ramda';

const CloseButton = styled.img.attrs({
  src: CloseIconSvg,
})`
  position: absolute;
  top: -10px;
  left: 245px;
  visibility: hidden;
  cursor: pointer;

  width: 24px;
  height: 24px;

  &:hover {
    visibility: visible;
  }
`;

const Container = styled.div`
  display: flex;
  position: relative;
  width: 256px;
  height: 180px;
  background-color: ${({ theme }) => theme.colours.white};

  border: ${({ theme, error }) => error ? theme.borders.solidRed : theme.borders.solidGrey1};
  border-radius: 15px;

  &:hover {
    ${CloseButton} {
      visibility: visible;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 15px;
`;

const AddImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 100%;
  height: 100%;

  font: ${({ theme }) => theme.fonts.bold18};

  cursor: pointer;
`;

const FileInput = styled.input.attrs({
  type: "file",
})`
  visibility: hidden;
  width: 0px;
  height: 0px;
`;

const AddImageIcon = styled.img.attrs({
  src: AddImageIconSvg,
})`
  padding-right: 8px;
`;

const ImagePreview = ({
  className,
  src,
  alt = "image-preview-form-component",
  onDelete,
  onNew, // Takes in a File object as the only parameter
  isError = false // Sets component as error state visually if true.
}) => {
  const inputRef = useRef(null);

  const handleNew = useCallback((event) => {
    event.preventDefault();
    inputRef.current.click();
  }, []);

  const handleFileUpload = useCallback((event) => {
    event.preventDefault();
    const fileList = inputRef.current.files;

    if (fileList.length === 1) {
      // console.log(`File uploaded: ${fileList[0].name}`);
      onNew(R.clone(fileList[0]));
    }

    // Remove image file from inputRef since we no longer need that image to be stored on inputRef.:
    // This fixes an issue where the same image can't be reuploaded if the user accidentally removes it.
    event.target.value = "";
  }, [onNew]);

  const handleFileDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        if (event.dataTransfer.items.length === 1) {
          const file = event.dataTransfer.items[0].getAsFile();
          // console.log(`File uploaded: ${file.name}`);
          onNew(file);
        }
      } else if (event.dataTransfer.files.length === 1) {
        // Use DataTransfer interface to access the file(s)
        const file = event.dataTransfer.files[0];
        // console.log(`File uploaded: ${file.name}`);
        onNew(file);
      }
    },
    [onNew]
  );

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    src ? (
      <Container error={isError} className={className}>
        <CloseButton onClick={onDelete}/>
        <Image src={src} alt={alt} />
      </Container>
    ) : (
      <Container error={isError} className={className}>
        <AddImage onClick={handleNew} onDrop={handleFileDrop} onDragOver={handleDragOver}>
          <AddImageIcon/> Add a new Image
        </AddImage>
        {/* FileInput is a hidden element. We use it's ref to access the file upload api
        without needing to try to style the input element itself.  */}
      <FileInput ref={inputRef} onChange={handleFileUpload} accept="image/*" />
    </Container>
  );
};

ImagePreview.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  onNew: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ImagePreview;
