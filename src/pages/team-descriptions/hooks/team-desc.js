import { useReducer, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const initialState = (inputState) => ({
  loading: true,
  userFriendlyErrorMessage: '',
  form: {
    title: '',
    description: '',
    images: [],
    imageFiles: [], // NOTE: Image files represents the user uploaded files
    // corresponding to any new entries in images.
    lastUpdated: '',
    ...inputState, // May overwrite any of the above defaults
  },
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_SUCCESS':
      return {
        ...state,
        loading: false,
        form: {
          ...state.form,
          ...action.payload.data,
        },
      };
    case 'LOAD_FAILURE':
      return {
        ...state,
        loading: false,
        userFriendlyErrorMessage: action.payload,
      };

    // Redux stores acting as react states:
    case 'UPDATE_TITLE':
      return {
        ...state,
        form: {
          ...state.form,
          title: action.payload,
        },
      };
    case 'UPDATE_DESCRIPTION':
      return {
        ...state,
        form: {
          ...state.form,
          description: action.payload,
        },
      };
    case 'UPDATE_IMAGES':
      return {
        ...state,
        form: {
          ...state.form,
          images: action.payload.images,
          imageFiles: action.payload.imageFiles,
        },
      };

    default:
      return {
        ...state,
      };
  }
};

const useTeamDescForm = (input = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState(input));
  const history = useHistory();

  // TODO: Load team data by ID using the useEffect hook.

  /**
   * FORM Functions
   */
  const updateTitle = useCallback(
    (title) => {
      dispatch({ type: 'UPDATE_TITLE', payload: title });
    },
    [dispatch]
  );

  const updateDescription = useCallback(
    (description) => {
      dispatch({ type: 'UPDATE_DESCRIPTION', payload: description });
    },
    [dispatch]
  );

  const updateImage = useCallback(
    (newImage, newImageFile) => {
      dispatch({
        type: 'UPDATE_IMAGES',
        payload: {
          images: [...state.form.images, newImage],
          imageFiles: [...state.form.imageFiles, newImageFile],
        },
      });
    },
    [dispatch, state.form.images, state.form.imageFiles]
  );

  const deleteImage = useCallback(
    (imgNum) => {
      dispatch({
        type: 'UPDATE_IMAGES',
        payload: {
          images: state.form.images.filter((_, idx) => idx !== imgNum),
          imageFiles: state.form.imageFiles.filter((_, idx) => idx !== imgNum),
        },
      });
    },
    [dispatch, state.form.images, state.form.imageFiles]
  );

   /**
   * Save and close Functions
   */
  const closeForm = useCallback(() => {
    history.push('/team-descriptions');
  }, [history]);

  // TODO: Implement the saveForm function.

  return {
    ...state.form,
    loading: state.loading,
    updateTitle,
    updateDescription,
    updateImage,
    deleteImage,
    // saveForm,
    closeForm,
  };
};

export default useTeamDescForm;
