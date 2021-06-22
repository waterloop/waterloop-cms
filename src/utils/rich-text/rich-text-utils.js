import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export const getRichText = (value) => {
    // text from database are generally html blocks e.g <h3>description</h3>, so we are required to convert it to just strings
    const blocksFromHTML = convertFromHTML(value);
    // error is editorstate.getImmutable is not a function
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );

    const editorObject = EditorState.createWithContent(state);

    return editorObject
}

export const submitRichText = (value) => { // value should be an EditorState Object
    const currentContentAsHTML = convertToHTML(value.getCurrentContent());

    return currentContentAsHTML
}
