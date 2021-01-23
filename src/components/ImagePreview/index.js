import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AddImageIconSvg from './assets/addImageIcon.svg';
import CloseIconSvg from './assets/closeIcon.svg';

const CloseButton = styled.img.attrs({
  src: CloseIconSvg,
})`
  position: absolute;
  top: 0px;
  left: 252px;
  visibility: hidden;
  cursor: pointer;

  width: 24px;
  height: 24px;
  ${'' /* border-radius: 12px;
  border: ${({ theme }) => theme.borders.solidGrey1};
  background-color: ${({ theme }) => theme.colours.white}; */}

  &:hover {
    visibility: visible;
  }
`;

const Container = styled.div`
  display: flex;
  width: 256px;
  height: 180px;
  background-color: ${({ theme }) => theme.colours.white};

  border: ${({ theme }) => theme.borders.solidGrey1};
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

const AddImageIcon = styled.img.attrs({
  src: AddImageIconSvg,
})`
  padding-right: 8px;
`;

const ImagePreview = ({
  className,
  src,
  alt = 'image-preview-form-component',
  onDelete,
  onNew,
}) => (
  src ? (
    <Container className={className}>
      <CloseButton onClick={onDelete}/>
      <Image src={src} alt={alt} />
    </Container>
  ) : (
    <Container className={className}>
      <AddImage onClick={onNew}>
        <AddImageIcon/> Add a new Image
      </AddImage>
    </Container>
  )
);

ImagePreview.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  onNew: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ImagePreview;
