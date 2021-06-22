import React, {useState} from 'react';
import styled from 'styled-components';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { getRichText } from '../../utils/rich-text/rich-text-utils';


const Container = styled.div`
  width: 500px;
`;

const TextInputContainer = styled.input`
  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 10px;
  height: 47px;
  width: 100%;
  background-color: ${({ theme }) => theme.colours.white};
  font: ${({ theme }) => theme.fonts.medium14};

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;

  ::placeholder,
  ::-webkit-input-placeholder {
    font: ${({ theme }) => theme.fonts.medium18};
    line-height: 47px;
    color: ${({ theme }) => theme.colours.greys.grey2};
  }
`;

const TextAreaContainer = styled.textarea`
  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 10px;
  width: 100%;
  min-width: 500px;
  max-width: 1200px;
  background-color: ${({ theme }) => theme.colours.white};
  font: ${({ theme }) => theme.fonts.medium14};

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;

  ::placeholder,
  ::-webkit-input-placeholder {
    font: ${({ theme }) => theme.fonts.medium18};
    color: ${({ theme }) => theme.colours.greys.grey2};
  }
`;

const TAContainer = styled.div`
  .wrapper-class {
    width: 100%;
    min-width: 550px;
    max-width: 1200px;
    font: ${({ theme }) => theme.fonts.medium14};

    display: flex;
    flex-direction: column;
    justify-content: space-between;


    ::placeholder,
    ::-webkit-input-placeholder {
      font: ${({ theme }) => theme.fonts.medium18};
      color: ${({ theme }) => theme.colours.greys.grey2};
    }
  }

  .editor-class {
    border: ${({ theme }) => theme.borders.solidGrey1};
    border-radius: 10px;
    width: 100%;
    min-width: 500px;
    max-width: 1200px;
    min-height: 200px;

    padding-left: 1rem;
    padding-right: 1rem;

    background-color: ${({ theme }) => theme.colours.white};
    font: ${({ theme }) => theme.fonts.medium14};

  }

  .toolbar-class {
    max-width:500px;
  }

  .toolbar-class a {
    color: #000;
  }


`

const TextInput = ({
  className /* Allows for external styles to be applied to the component
                using the styled components library
                className prop needs to be passed to the parent JSX element */,
  multiLine = true,
  richText = true,
  value /* The current value of the input */,
  rows=10,
  onChange /* Callback to be called each time that the user changes the input */,
  placeholder = 'Place Holder Text',
  width,
}) => {
  return (
    <Container width={width} className={className}>
      {multiLine ? (
        richText ?
          <TAContainer>
            <Editor
              editorState={value}
              onEditorStateChange={onChange}
              editorClassName="editor-class"
              wrapperClassName="wrapper-class"
              toolbarClassName="toolbar-class"
            />
            {/* <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}
          </TAContainer>
          :
          <TextAreaContainer
            rows={rows}
            cols="60"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />

      ) : (
        <TextInputContainer
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </Container>
  )
};

export default TextInput;
