import React, {
  useReducer,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Dialog from '../../../components/Dialog';
import api from '../../../api';
import useTeams from '../../../hooks/teams';
import { useHistory } from 'react-router-dom';

const today = new Date();

const initialState = (inputState) => ({
  loading: true,
  userFriendlyErrorMessage: '',
  form: {
    title: '',
    teamId: 1,
    deadline: today,
    location: '',
    termYear: today.getFullYear(),
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
          requirements: state.form.requirements.filter(
            (data) => data.id !== action.payload,
          ),
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

const usePostingForm = (postingId, input = {}) => {
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
      api.postings
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
            throw new Error(
              'Failed to Load Resources, please refresh the page. If you continue to experience difficulties, please contact the web team',
            );
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
  const updateTitle = useCallback(
    (title) => {
      dispatch({ type: 'UPDATE_POSTING_TITLE', payload: title });
    },
    [dispatch],
  );

  const updateTermSeason = useCallback(
    (termSeason) => {
      dispatch({ type: 'UPDATE_TERM_SEASON', payload: termSeason });
    },
    [dispatch],
  );

  const updateTermYear = useCallback(
    (termYear) => {
      dispatch({ type: 'UPDATE_TERM_YEAR', payload: termYear });
    },
    [dispatch],
  );

  const updateTimeCommitment = useCallback(
    (timeCommitment) => {
      dispatch({ type: 'UPDATE_TIME_COMMITMENT', payload: timeCommitment });
    },
    [dispatch],
  );

  const updateDescription = useCallback(
    (description) => {
      dispatch({ type: 'UPDATE_DESCRIPTION', payload: description });
    },
    [dispatch],
  );

  const updateSubteam = useCallback(
    (subteam) => {
      dispatch({ type: 'UPDATE_SUBTEAM', payload: subteam });
    },
    [dispatch],
  );

  const updateDeadline = useCallback(
    (deadline) => {
      dispatch({ type: 'UPDATE_APPLICATION_DEADLINE', payload: deadline });
    },
    [dispatch],
  );

  const removeRequirement = useCallback(
    async (requirementId) => {
      try {
        await api.postings.removePostingRequirement(postingId, requirementId);
        dispatch({ type: 'REMOVE_REQUIREMENT', payload: requirementId });
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error(`[REMOVE REQUIREMENT ERROR]: ${err}`);
        }
      }
    },
    [dispatch, postingId],
  );

  const removeTask = useCallback(
    async (taskId) => {
      try {
        await api.postings.removePostingTask(postingId, taskId);
        dispatch({ type: 'REMOVE_TASK', payload: taskId });
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error(`[REMOVE TASK ERROR]: ${err}`);
        }
      }
    },
    [dispatch, postingId],
  );

  const removeInfo = useCallback(
    async (infoId) => {
      try {
        await api.postings.removePostingInfo(postingId, infoId);
        dispatch({ type: 'REMOVE_ADDITIONAL_INFORMATION', payload: infoId });
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error(`[REMOVE INFO ERROR]: ${err}`);
        }
      }
    },
    [dispatch, postingId],
  );
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

  const updateDialogValue = useCallback(
    (value) => {
      dispatch({ type: 'UPDATE_DIALOG_VALUE', payload: value });
    },
    [dispatch],
  );

  const saveDialog = useCallback(async () => {
    try {
      let response;
      console.log(state.dialog);
      switch (state.dialog.formField) {
        case 'requirements': {
          // Response holds a list of requirements that includes the new item
          response = await api.postings.addRequirementToPosting(
            postingId,
            state.dialog.value,
          );
          break;
        }
        case 'info': {
          response = await api.postings.addInfoToPosting(
            postingId,
            state.dialog.value,
          );
          break;
        }
        case 'tasks':
          response = await api.postings.addTaskToPosting(
            postingId,
            state.dialog.value,
          );
          break;
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

  const closeForm = useCallback(() => {
    history.push('/postings');
  }, [history]);

  const saveForm = useCallback(() => {
    api.postings.patchPosting(state.form, postingId).then(() => {
      closeForm();
    });
  }, [state.form, postingId, closeForm]);

  const deleteForm = useCallback(() => {
    api.postings
      .deletePosting(postingId)
      .then(() => closeForm());
  }, [postingId, closeForm]);
  // END Save and close functions

  /**
   * Calculate Years for Selector. Add the year that is
   * currently attached to the posting if it is in the past.
   */
  const [currentYear] = useState((new Date()).getFullYear());
  const years = useMemo(() => {
    const tempYears = [
      { id: currentYear, text: `${currentYear}` },
      { id: currentYear + 1, text: `${currentYear + 1}` },
      { id: currentYear + 2, text: `${currentYear + 2}` },
      { id: currentYear + 3, text: `${currentYear + 3}` },
    ];

    if (state.form.termYear < currentYear) {
      return [
        { id: state.form.termYear, text: `${state.form.termYear}` },
        ...tempYears,
      ];
    }
    return tempYears;
  }, [state.form.termYear, currentYear]);
  // END Calculating Term Years

  return {
    ...state.form,
    terms: [
      { id: 'WINTER', text: 'WINTER' },
      { id: 'SPRING', text: 'SPRING' },
      { id: 'FALL', text: 'FALL' },
    ],
    years,
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
    deleteForm,
    renderAddNewDialog,
  };
};

export default usePostingForm;
