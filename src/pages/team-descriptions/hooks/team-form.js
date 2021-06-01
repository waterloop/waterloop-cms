import { useReducer, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const initialState = (inputState) => ({
  loading: true,
  userFriendlyErrorMessage: '',
  exists: false,
  form: {
    teamId: 0,
    name: '',
    description: '',
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
        exists: action.payload.exists,
        form: {
          ...state.form,
          ...action.payload.teamData,
          teamId: action.payload.teamId,
        },
      };
    case 'LOAD_FAILURE':
      return {
        ...state,
        loading: false,
        userFriendlyErrorMessage: action.payload,
      };

    // Redux stores acting as react states:
    case 'UPDATE_TEAM_NAME':
      return {
        ...state,
        form: {
          ...state.form,
          name: action.payload,
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
    default:
      return {
        ...state,
      };
  }
};

// Middleware:
const useTeamForm = (teamId, input = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState(input));
  const history = useHistory();

  // TODO: Load team data by ID using the useEffect hook.

  /**
   * FORM Functions
   */
  const updateName = useCallback(
    (name) => {
      dispatch({ type: 'UPDATE_TEAM_NAME', payload: name });
    },
    [dispatch],
  );

  const updateDescription = useCallback(
    (description) => {
      dispatch({ type: 'UPDATE_DESCRIPTION', payload: description });
    },
    [dispatch],
  );

  /**
   * Save and close Functions
   */
  const closeForm = useCallback(() => {
    history.push('/team-descriptions');
  }, [history]);

  // TODO: Implement the saveForm and deleteForm functions.

  return {
    ...state.form,
    loading: state.loading,
    updateName,
    updateDescription,
    // saveForm,
    closeForm,
    // deleteForm,
  };
};

export default useTeamForm;
