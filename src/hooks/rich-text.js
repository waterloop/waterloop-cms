import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { convertToHTML } from 'draft-convert';



const useRichText = (value) => { 
    //if someone sets multiline and richtext to true, they need to use this hook to manage value and onChange for text input
    //call converted value for getConverted value
    //provides fn for conversion of content to HTML 
    //and from HTML

}

export default useRichText;