import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';  


export const getRichText = (value) => {
    const blocksFromHTML = convertFromHTML(value);
    return EditorState.createWithContent(ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    ))
}

export const submitRichText = (value) => { 
    const currentContentAsHTML = convertToHTML(value.getCurrentContent());
    
    return currentContentAsHTML
}