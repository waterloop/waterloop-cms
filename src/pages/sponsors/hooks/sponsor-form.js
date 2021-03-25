import {
  useReducer,
  useCallback,
  useEffect,
  useMemo,
  useSelector,
  useState,
} from 'react';
import Dialog from '../../../components/Dialog';
import api from '../../../api';
import { useHistory } from 'react-router-dom';

import useSponsors from "../../../hooks/sponsors";
// import * as sponsorSelectors from '../../../state/sponsors/selectors';

// import tierMapMock from "../mocks/tierMap.mock.json";

const TODAY = new Date();

// TODO: If a new sponsor is being created, make sure a separate state is set for this to occur!
// Reason is backend needs to know whether to add or update the entry.

// Used for setting sponsor join date boundaries:
// Feel free to change these bounds, I don't know when Waterloop had its first sponsor lol.
const MIN_YEAR = 2000;  
const MAX_YEAR = TODAY.getFullYear() + 10;

const initialState = (inputState) => ({
  loading: true,
  userFriendlyErrorMessage: '',
  sponsorTiers: [],
  isNew: true,
  form: {
    sponsorId: 0,
    name: '',
    website: '',
    tierId: '', // !NOTE: initial value is string to allow selector to display placeholder value.
    termYear: TODAY.getFullYear(),
    termSeason: '',
    description: '',
    logoStr: '',
    logoFile: null, 
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
          ...action.payload.sponsorData,  // This injects existing data for the chosen sponsor.
          sponsorId: action.payload.sponsorId,
        },
      };
    case 'LOAD_FAILURE':
      return {
        ...state,
        loading: false,
        userFriendlyErrorMessage: action.payload,
      };

    case 'SET_SPONSOR_EXISTS':
      return {
        ...state,
        isNew: false
      }

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
    case 'UPDATE_LOGO':
      return {
        ...state,
        form: {
          ...state.form,
          logoStr: action.payload.logoStr,
          logoFile: action.payload.logoFile,
        }
      }
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
  const history = useHistory();
  // const sponsors = useSelector(sponsorSelectors.sponsors);
  // const sponsorTiers = useSelector(sponsorSelectors.sponsorTiers);

  const {sponsorTiers, sponsors} = useSponsors();

  /**
   * Load Sponsor Data by ID:
   */
  useEffect(() => {
    if (state.loading && sponsors.length !== 0 && sponsorTiers.length !== 0) {
      try {
        console.log(sponsors)
        // Filter for matching sponsor value:
        const sponsor = sponsors.filter(s => s.sponsorId === sponsorId);
        if (sponsor.length === 1) {
          dispatch({
            type: 'LOAD_SUCCESS',
            payload: {
              sponsorId,
              sponsorTiers,
              sponsorData: sponsor[0],
            }
          });
        } else {
          throw new Error(
            'Failed to Load Resources, please refresh the page. If you continue to experience difficulties, please contact the web team',
          );
        }
      } catch (err) {
          dispatch({ type: 'LOAD_FAILURE', payload: err });
      }
    }  
  }, [state.loading, dispatch, sponsorId, sponsors, sponsorTiers]);

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

  const updateLogo = useCallback(
    (logoStr, logoFile) => {
      dispatch({ type: 'UPDATE_LOGO', payload: {logoStr, logoFile} });
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

  return {
    ...state.form,
    terms: [
      { id: 'WINTER', text: 'WINTER' },
      { id: 'SPRING', text: 'SPRING' },
      { id: 'FALL', text: 'FALL' },
    ],
    years,
    loading: state.loading,
    sponsorTiers,
    updateName,
    updateWebsite,
    updateTierId,
    updateTermSeason,
    updateTermYear,
    updateDescription,
    updateLogo,
    updateVideoLink,
    saveForm,
    closeForm,
    deleteForm,
    // renderAddNewDialog,
  };
};

export default useSponsorForm;
