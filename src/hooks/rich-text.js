import { useState, useEffect } from 'react';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';  


const useRichText = (value, next) => { 
    const currentContentAsHTML = convertToHTML(value.getCurrentContent());
    
    return currentContentAsHTML
    
}

export default useRichText;