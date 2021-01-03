import React from 'react';
import styled from 'styled-components';

const Description = styled.div`
  position: relative;
  margin-left: 6.11%;
  margin-top: 12%;
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 31px;
  color: #2B2B2B;
`;

const Button = styled.button`
  font-weight: 700;
  font-size: 18px;
  border: none;
  border-radius: 15px;
  line-height: 23.4px;
`;

const PreviewButton = styled(Button)`
  height: 27px;
  width: 113px;
  color: #1A1A1A;
  position: relative;
  background-color: #FED95A;
  position: absolute;
  margin-left: 20.35%;
  margin-top: 5%;
`;

const EditButton = styled(Button)`
  background-color: #1A1A1A;
  color: #FED95A;
  height: 27px;
  width: 177px;
  position: absolute;
  margin-left: 6.11%;
  margin-top: 5%;
`;

const HeadersPreview = ({
  header
}) => (
    <div>
<Description>{header}</Description>
<EditButton>Edit description</EditButton>
<PreviewButton>Preview</PreviewButton>
</div>
);
  

export default HeadersPreview;