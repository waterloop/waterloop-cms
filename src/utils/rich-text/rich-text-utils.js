import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { convertToHTML } from 'draft-convert';

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

    return editorObject
}

export const submitRichText = (value) => { // value should be an EditorState Object

    // get string value from the current ContentState from the Editor component
    const currentContent = value.getCurrentContent()

    // convert string to HTML blocks to put into database
    const currentContentAsHTML = convertToHTML(currentContent);

    return currentContentAsHTML
}
