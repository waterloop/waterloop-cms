import {
  EditorState,
  ContentState,
  ContentBlock,
  convertFromHTML,
  genKey,
  CharacterMetadata,
} from 'draft-js';
import { List, Repeat } from 'immutable';
import { convertToHTML } from 'draft-convert';
import * as R from 'ramda';

export const getRichText = (value) => {
  // text from database are generally html blocks e.g <h3>description</h3>, so we are required to convert it to just strings
  const blocksFromHTML = convertFromHTML(value);

  // need to convert to object that is required to construct a ContentState
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );

  // use ContentState to create EditorState for actual rich text components
  const editorObject = EditorState.createWithContent(state);

  return editorObject;
};

export const submitRichText = (value) => {
  // value should be an EditorState Object

  // get string value from the current ContentState from the Editor component
  const currentContent = value.getCurrentContent();

  // convert string to HTML blocks to put into database
  const currentContentAsHTML = convertToHTML(currentContent);

  return currentContentAsHTML;
};

export const convertArrayToEditorStateBulletedList = (strArr) => {
  // Creates a bullet point (Content Block) for every array element

  const contentBlocksArray = strArr
    .filter((str) => !R.isEmpty(str))
    .map((str) => {
      return new ContentBlock({
        key: genKey(),
        type: 'unordered-list-item',
        characterList: new List(Repeat(CharacterMetadata.create(), str.length)),
        text: str,
      });
    });

  // Converts the array of bullet points (Content Block(s)) to EditorState to be used
  return R.isEmpty(contentBlocksArray)
    ? EditorState.createEmpty()
    : EditorState.createWithContent(
        ContentState.createFromBlockArray(contentBlocksArray),
      );
};

export const convertEditorStateBulletListToArray = (editorState) => {
  return editorState.getCurrentContent().getPlainText().split('\n');
};
