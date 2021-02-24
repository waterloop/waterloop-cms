import React, { useReducer, useCallback, useEffect } from 'react';
import Dialog from '../../../components/Dialog';
import api from '../../../api';
import useTeams from '../../../hooks/teams';
import { useHistory } from 'react-router-dom';

const initialState = (inputState) => ({
  loading: true,
  userFriendlyErrorMessage: '',
  form: {
    title: '',
    teamId: 1,
    deadline: new Date(),
    location: '',
    termYear: (new Date()).getFullYear(),
    termSeason: 'WINTER',
    description: '',
    requirements: [],
    tasks: [],
    info: [],
    timeCommitment: '',
    ...inputState, // May overwrite any of the above defaults
  },
  dialog: {
    title: '',
    value: '',
    formField: '',
    open: false,
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
          ...action.payload,
        },
      };
    case 'LOAD_FAILURE':
      return {
        ...state,
        loading: false,
        userFriendlyErrorMessage: action.payload,
      };
    case 'UPDATE_POSTING_TITLE':
      return {
        ...state,
        form: {
          ...state.form,
          title: action.payload,
        },
      };
    case 'UPDATE_TERM_SEASON':
      return {
        ...state,
        form: {
          ...state.form,
          termSeason: action.payload,
        },
      };
    case 'UPDATE_TERM_YEAR':
      return {
        ...state,
        form: {
          ...state.form,
          termYear: action.payload,
        },
      };
    case 'UPDATE_TIME_COMMITMENT':
      return {
        ...state,
        form: {
          ...state.form,
          timeCommitment: action.payload,
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
    case 'UPDATE_SUBTEAM':
      return {
        ...state,
        form: {
          ...state.form,
          teamId: action.payload,
        },
      };
    case 'UPDATE_APPLICATION_DEADLINE':
      return {
        ...state,
        form: {
          ...state.form,
          deadline: action.payload,
        },
      };
    case 'REMOVE_REQUIREMENT':
      return {
        ...state,
        form: {
          ...state.form,
          requirements: state.form.requirements.filter((data) => data.id !== action.payload),
        },
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        form: {
          ...state.form,
          tasks: state.form.tasks.filter((data) => data.id !== action.payload),
        },
      };
    case 'REMOVE_ADDITIONAL_INFORMATION':
      return {
        ...state,
        form: {
          ...state.form,
          info: state.form.info.filter((data) => data.id !== action.payload),
        },
      };
    case 'OPEN_DIALOG':
      return {
        ...state,
        dialog: action.payload,
      };
    case 'UPDATE_DIALOG_VALUE':
      return {
        ...state,
        dialog: {
          ...state.dialog,
          value: action.payload,
        },
      };
    case 'SAVE_DIALOG_VALUE_TO_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          [state.dialog.formField]: action.payload,
        },
        dialog: {
          open: false,
          formField: '',
          title: '',
          value: '',
        },
      };
    case 'CLOSE_DIALOG_WITHOUT_SAVING':
      return {
        ...state,
        dialog: {
          open: false,
          formField: '',
          title: '',
          value: '',
        },
      };
    default:
      return {
        ...state,
      };
  }
};

const usePostingForm = (postingId, input = initialState({})) => {
  const [state, dispatch] = useReducer(reducer, initialState(input));
  const { teams } = useTeams();
  const history = useHistory();
  useEffect(() => {
    console.log('teams', teams);
  }, [teams]);
  /**
   * Load Posting Data By posting ID
   */
  useEffect(() => {
    if (state.loading) {
      api
        .postings
        .getPostingById(postingId)
        .then((response) => {
          if (response && response.status === 200) {
            dispatch({
              type: 'LOAD_SUCCESS',
              payload: {
                ...response.data,
                deadline: new Date(response.data.deadline),
              },
            });
          } else {
            throw new Error('Failed to Load Resources, please refresh the page. If you continue to experience difficulties, please contact the web team');
          }
        })
        .catch((err) => {
          dispatch({ type: 'LOAD_FAILURE', payload: err });
        });
    }
  }, [state.loading, dispatch, postingId]);

  /**
   * FORM Functions
   */
  const updateTitle = useCallback((title) => {
    dispatch({ type: 'UPDATE_POSTING_TITLE', payload: title });
  }, [dispatch]);

  const updateTermSeason = useCallback((termSeason) => {
    dispatch({ type: 'UPDATE_TERM_SEASON', payload: termSeason });
  }, [dispatch]);

  const updateTermYear = useCallback((termYear) => {
    dispatch({ type: 'UPDATE_TERM_YEAR', payload: termYear });
  }, [dispatch]);

  const updateTimeCommitment = useCallback((timeCommitment) => {
    dispatch({ type: 'UPDATE_TIME_COMMITMENT', payload: timeCommitment });
  }, [dispatch]);

  const updateDescription = useCallback((description) => {
    dispatch({ type: 'UPDATE_DESCRIPTION', payload: description });
  }, [dispatch]);

  const updateSubteam = useCallback((subteam) => {
    dispatch({ type: 'UPDATE_SUBTEAM', payload: subteam });
  }, [dispatch]);

  const updateDeadline = useCallback((deadline) => {
    dispatch({ type: 'UPDATE_APPLICATION_DEADLINE', payload: deadline });
  }, [dispatch]);

  const removeRequirement = useCallback(async (requirementId) => {
    try {
      await api.postings.removePostingRequirement(postingId, requirementId);
      dispatch({ type: 'REMOVE_REQUIREMENT', payload: requirementId });
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(`[REMOVE REQUIREMENT ERROR]: ${err}`);
      }
    }
  }, [dispatch, postingId]);

  const removeTask = useCallback((id) => {
    dispatch({ type: 'REMOVE_TASK', payload: id });
  }, [dispatch]);

  const removeInfo = useCallback((id) => {
    dispatch({ type: 'REMOVE_INFO', payload: id });
  }, [dispatch]);
  // END Form Functions

  /**
   * Dialog Functions
   */
  const addNewRequirement = useCallback(() => {
    dispatch({
      type: 'OPEN_DIALOG',
      payload: {
        title: 'Requirement',
        value: '',
        formField: 'requirements',
        open: true,
      },
    });
  }, [dispatch]);

  const addNewTask = useCallback(() => {
    dispatch({
      type: 'OPEN_DIALOG',
      payload: {
        title: 'Task',
        value: '',
        formField: 'tasks',
        open: true,
      },
    });
  }, [dispatch]);

  const addNewInfo = useCallback(() => {
    dispatch({
      type: 'OPEN_DIALOG',
      payload: {
        title: 'Info',
        value: '',
        formField: 'info',
        open: true,
      },
    });
  }, [dispatch]);

  const updateDialogValue = useCallback((event) => {
    dispatch({ type: 'UPDATE_DIALOG_VALUE', payload: event.target.value });
  }, [dispatch]);

  const saveDialog = useCallback(async () => {
    try {
      let response;
      switch (state.dialog.formField) {
        case 'requirements': {
          // Response holds a list of requirements that includes the new item
          response = await api.postings.addRequirementToPosting(postingId, state.dialog.value);
          break;
        }
        default:
          return null;
      }
      if (response && response.status === 200 && response.data) {
        dispatch({ type: 'SAVE_DIALOG_VALUE_TO_FORM', payload: response.data });
      } else {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log(response);
        }
        throw new Error(response.error);
      }
      return true;
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(err);
      }
      return false;
    }
  }, [dispatch, state.dialog, postingId]);

  const closeDialogWithoutSaving = useCallback(() => {
    dispatch({ type: 'CLOSE_DIALOG_WITHOUT_SAVING' });
  }, [dispatch]);

  const renderAddNewDialog = () => (
    <Dialog
      fieldLabel={state.dialog.title}
      title={`Add new ${state.dialog.title}`}
      value={state.dialog.value}
      onSave={saveDialog}
      onCancel={closeDialogWithoutSaving}
      onChange={updateDialogValue}
      open={state.dialog.open}
    />
  );
  // END Dialog Functions

  /**
   * Save and close Functions
   */
  const saveForm = useCallback(() => {
    api
      .postings
      .patchPosting(state.form, postingId)
      .then(() => {
        history.push('/postings');
      });
  }, [state.form, postingId]);

  const closeForm = useCallback(() => {
    history.push('/postings');
  });
  // END Save and close functions
  return {
    ...state.form,
    terms: [
      { id: 'WINTER', text: 'WINTER' },
      { id: 'SPRING', text: 'SPRING' },
      { id: 'FALL', text: 'FALL' },
    ],
    years: [
      { id: 2020, text: '2020' },
      { id: 2021, text: '2021' },
      { id: 2022, text: '2022' },
      { id: 2023, text: '2023' },
    ],
    subTeams: teams,
    loading: state.loading,
    updateTitle,
    updateTermSeason,
    updateTermYear,
    updateTimeCommitment,
    updateDescription,
    updateSubteam,
    updateDeadline,
    addNewRequirement,
    addNewTask,
    addNewInfo,
    removeRequirement,
    removeTask,
    removeInfo,
    saveForm,
    closeForm,
    renderAddNewDialog,
  };
};

export default usePostingForm;
