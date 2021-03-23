import React, {
  useReducer,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Dialog from '../../../components/Dialog';
import api from '../../../api';
import { useHistory } from 'react-router-dom';

import tierMapMock from "../mocks/tierMap.mock.json";
import { List } from '@material-ui/core';

const TODAY = new Date();

// Used for setting sponsor join date boundaries:
// Feel free to change these bounds, I don't know when Waterloop had its first sponsor lol.
const MIN_YEAR = 2000;  
const MAX_YEAR = TODAY.getFullYear() + 10;

const initialState = (inputState) => ({
  loading: true,
  userFriendlyErrorMessage: '',
  sponsorTiers: [],
  form: {
    sponsorId: 0,
    name: '',
    website: '',
    tierId: '', // !NOTE: initial value is string to allow selector to display placeholder value.
    termYear: 2019,
    // termYear: TODAY.getFullYear(),
    termSeason: '',
    description: '',
    logoStr: '',
    videoLink: '',
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
    // After call to GET sponsor by ID & GET sponsor tiers:
    case 'LOAD_SUCCESS':
      return {
        ...state,
        sponsorTiers: action.payload.sponsorTiers,
        loading: false,
        form: {
          ...state.form,
          sponsorId: action.payload.sponsorId,
        },
      };
    case 'LOAD_FAILURE':
      return {
        ...state,
        loading: false,
        userFriendlyErrorMessage: action.payload,
      };

    // Redux stores acting as react states:
    case 'UPDATE_SPONSOR_NAME':
      return {
        ...state,
        form: {
          ...state.form,
          name: action.payload,
        },
      };
    case 'UPDATE_SPONSOR_WEBSITE':
      return {
        ...state,
        form: {
          ...state.form,
          website: action.payload,
        },
      };
    case 'UPDATE_SPONSOR_TIER_ID':
      return {
        ...state,
        form: {
          ...state.form,
          tierId: action.payload,
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
    case 'UPDATE_DESCRIPTION':
      return {
        ...state,
        form: {
          ...state.form,
          description: action.payload,
        },
      };
    case 'UPDATE_VIDEO_LINK':
      return {
        ...state,
        form: {
          ...state.form,
          videoLink: action.payload,
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


// Middleware:
const useSponsorForm = (sponsorId, input = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState(input));
  // const { teams } = useTeams();
  const history = useHistory();
  // useEffect(() => {
  //   console.log('teams', teams);
  // }, [teams]);
  /**
   * Load Posting Data By posting ID
   */
  useEffect(() => {
    if (state.loading) {
    //   api.postings
    //     .getPostingById(sponsorId)
    //     .then((response) => {
    //       if (response && response.status === 200) {
    //         dispatch({
    //           type: 'LOAD_SUCCESS',
    //           payload: {
    //             ...response.data,
    //             deadline: new Date(response.data.deadline),
    //           },
    //         });
    //       } else {
    //         throw new Error(
    //           'Failed to Load Resources, please refresh the page. If you continue to experience difficulties, please contact the web team',
    //         );
    //       }
    //     })
    //     .catch((err) => {
    //       dispatch({ type: 'LOAD_FAILURE', payload: err });
    //     });
    // !Debug: Mock dispatch
      dispatch({
        type: 'LOAD_SUCCESS',
        payload: {sponsorId, sponsorTiers: tierMapMock},
      });
    }  
  }, [state.loading, dispatch, sponsorId]);

  /**
   * FORM Functions
   */
  const updateName = useCallback(
    (name) => {
      dispatch({ type: 'UPDATE_SPONSOR_NAME', payload: name });
    },
    [dispatch],
  );

  const updateWebsite = useCallback(
    (website) => {
      dispatch({ type: 'UPDATE_SPONSOR_WEBSITE', payload: website });
    },
    [dispatch],
  );

  const updateTierId = useCallback(
    (tierId) => {
      dispatch({ type: 'UPDATE_SPONSOR_TIER_ID', payload: tierId });
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

  const updateDescription = useCallback(
    (description) => {
      dispatch({ type: 'UPDATE_DESCRIPTION', payload: description });
    },
    [dispatch],
  );

  const updateVideoLink = useCallback(
    (link) => {
      dispatch({ type: 'UPDATE_VIDEO_LINK', payload: link });
    },
    [dispatch],
  );

  // const removeRequirement = useCallback(
  //   async (requirementId) => {
  //     try {
  //       await api.postings.removePostingRequirement(sponsorId, requirementId);
  //       dispatch({ type: 'REMOVE_REQUIREMENT', payload: requirementId });
  //     } catch (err) {
  //       if (process.env.NODE_ENV === 'development') {
  //         // eslint-disable-next-line no-console
  //         console.error(`[REMOVE REQUIREMENT ERROR]: ${err}`);
  //       }
  //     }
  //   },
  //   [dispatch, sponsorId],
  // );

  // const removeTask = useCallback(
  //   (id) => {
  //     dispatch({ type: 'REMOVE_TASK', payload: id });
  //   },
  //   [dispatch],
  // );

  // const removeInfo = useCallback(
  //   (id) => {
  //     dispatch({ type: 'REMOVE_INFO', payload: id });
  //   },
  //   [dispatch],
  // );
  // END Form Functions

  /**
   * Dialog Functions
   */
  // const addNewRequirement = useCallback(() => {
  //   dispatch({
  //     type: 'OPEN_DIALOG',
  //     payload: {
  //       title: 'Requirement',
  //       value: '',
  //       formField: 'requirements',
  //       open: true,
  //     },
  //   });
  // }, [dispatch]);

  // const addNewTask = useCallback(() => {
  //   dispatch({
  //     type: 'OPEN_DIALOG',
  //     payload: {
  //       title: 'Task',
  //       value: '',
  //       formField: 'tasks',
  //       open: true,
  //     },
  //   });
  // }, [dispatch]);

  // const addNewInfo = useCallback(() => {
  //   dispatch({
  //     type: 'OPEN_DIALOG',
  //     payload: {
  //       title: 'Info',
  //       value: '',
  //       formField: 'info',
  //       open: true,
  //     },
  //   });
  // }, [dispatch]);

  // const updateDialogValue = useCallback(
  //   (value) => {
  //     dispatch({ type: 'UPDATE_DIALOG_VALUE', payload: value });
  //   },
  //   [dispatch],
  // );

  // const saveDialog = useCallback(async () => {
  //   try {
  //     let response;
  //     switch (state.dialog.formField) {
  //       case 'requirements': {
  //         // Response holds a list of requirements that includes the new item
  //         response = await api.postings.addRequirementToPosting(
  //           sponsorId,
  //           state.dialog.value,
  //         );
  //         break;
  //       }
  //       default:
  //         return null;
  //     }
  //     if (response && response.status === 200 && response.data) {
  //       dispatch({ type: 'SAVE_DIALOG_VALUE_TO_FORM', payload: response.data });
  //     } else {
  //       if (process.env.NODE_ENV === 'development') {
  //         // eslint-disable-next-line no-console
  //         console.log(response);
  //       }
  //       throw new Error(response.error);
  //     }
  //     return true;
  //   } catch (err) {
  //     if (process.env.NODE_ENV === 'development') {
  //       // eslint-disable-next-line no-console
  //       console.error(err);
  //     }
  //     return false;
  //   }
  // }, [dispatch, state.dialog, sponsorId]);

  // const closeDialogWithoutSaving = useCallback(() => {
  //   dispatch({ type: 'CLOSE_DIALOG_WITHOUT_SAVING' });
  // }, [dispatch]);

  // const renderAddNewDialog = () => (
  //   <Dialog
  //     fieldLabel={state.dialog.title}
  //     title={`Add new ${state.dialog.title}`}
  //     value={state.dialog.value}
  //     onSave={saveDialog}
  //     onCancel={closeDialogWithoutSaving}
  //     onChange={updateDialogValue}
  //     open={state.dialog.open}
  //   />
  // );
  // END Dialog Functions

  /**
   * Save and close Functions
   */

  const closeForm = useCallback(() => {
    history.push('/postings');
  }, [history]);

  const saveForm = useCallback(() => {
    console.log(state);
    // api.postings.patchPosting(state.form, sponsorId).then(() => {
    //   closeForm();
    // });
  }, [state.form, sponsorId, closeForm]);

  const deleteForm = useCallback(() => {
    api.postings
      .deletePosting(sponsorId)
      .then(() => closeForm());
  }, [sponsorId, closeForm]);
  // END Save and close functions

  /**
   * Calculate Years for Selector. Add the year that is
   * currently attached to the posting if it is in the past.
   */
  // TODO: Abstract this to a utility component.
  const years = useMemo(() => {
    let tempYears = [];

    for (let y = MIN_YEAR; y <= MAX_YEAR; y++) {
      tempYears.push({ id: y, text: `${y}` });
    }

    return tempYears;
  }, [state.form.termYear]);
  // END Calculating Term Years

  return {
    ...state.form,
    terms: [
      { id: 'WINTER', text: 'WINTER' },
      { id: 'SPRING', text: 'SPRING' },
      { id: 'FALL', text: 'FALL' },
    ],
    sponsorTiers: tierMapMock,
    years,
    loading: state.loading,
    updateName,
    updateWebsite,
    updateTierId,
    updateTermSeason,
    updateTermYear,
    updateDescription,
    updateVideoLink,
    // addNewRequirement,
    // addNewTask,
    // addNewInfo,
    // removeRequirement,
    // removeTask,
    // removeInfo,
    saveForm,
    closeForm,
    deleteForm,
    // renderAddNewDialog,
  };
};

export default useSponsorForm;
