import { useReducer, useCallback, useEffect, useMemo } from 'react';
import api from '../../../api';
import { useHistory } from 'react-router-dom';
import FormData from 'form-data';

import useSponsors from '../../../hooks/sponsors';
import { toServerSponsor } from '../../../utils/sponsors/sponsor-utils';

const TODAY = new Date();

// Used for setting sponsor join date boundaries:
// Feel free to change these bounds, I don't know when Waterloop had its first sponsor lol.
const MIN_YEAR = 2008;
const MAX_YEAR = TODAY.getFullYear() + 5;

const initialState = (inputState) => ({
  loading: true,
  userFriendlyErrorMessage: '',
  sponsorTiers: [],
  exists: false,
  form: {
    sponsorId: 0,
    name: '',
    website: '',
    tierId: '', // !NOTE: initial value is string to allow selector to display placeholder value.
    termYear: '',
    termSeason: '',
    description: '',
    logoStr: '',
    logoFile: null,
    videoLink: '',
    lastUpdated: '',
    ...inputState, // May overwrite any of the above defaults
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
        exists: action.payload.exists,
        userFriendlyErrorMessage: '',
        form: {
          ...state.form,
          ...action.payload.sponsorData, // This injects existing data for the chosen sponsor.
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
        userFriendlyErrorMessage: '',
        form: {
          ...state.form,
          name: action.payload,
        },
      };
    case 'UPDATE_SPONSOR_WEBSITE':
      return {
        ...state,
        userFriendlyErrorMessage: '',
        form: {
          ...state.form,
          website: action.payload,
        },
      };
    case 'UPDATE_SPONSOR_TIER_ID':
      return {
        ...state,
        userFriendlyErrorMessage: '',
        form: {
          ...state.form,
          tierId: action.payload,
        },
      };
    case 'UPDATE_TERM_SEASON':
      return {
        ...state,
        userFriendlyErrorMessage: '',
        form: {
          ...state.form,
          termSeason: action.payload,
        },
      };
    case 'UPDATE_TERM_YEAR':
      return {
        ...state,
        userFriendlyErrorMessage: '',
        form: {
          ...state.form,
          termYear: action.payload,
        },
      };
    case 'UPDATE_DESCRIPTION':
      return {
        ...state,
        userFriendlyErrorMessage: '',
        form: {
          ...state.form,
          description: action.payload,
        },
      };
    case 'UPDATE_LOGO':
      return {
        ...state,
        userFriendlyErrorMessage: '',
        form: {
          ...state.form,
          logoStr: action.payload.logoStr,
          logoFile: action.payload.logoFile,
        },
      };
    case 'UPDATE_VIDEO_LINK':
      return {
        ...state,
        userFriendlyErrorMessage: '',
        form: {
          ...state.form,
          videoLink: action.payload,
        },
      };
    case 'UPDATE_FAILURE':
      return {
        ...state,
        userFriendlyErrorMessage: action.payload,
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
  const { sponsorTiers, sponsors } = useSponsors();

  /**
   * Load Sponsor Data by ID:
   */
  useEffect(() => {
    if (state.loading && sponsorTiers.length !== 0) {
      try {
        // Filter for matching sponsor value:
        const sponsor = sponsors.filter((s) => s.sponsorId === sponsorId);
        if (sponsor.length <= 1) {
          dispatch({
            type: 'LOAD_SUCCESS',
            payload: {
              sponsorId,
              sponsorTiers,
              sponsorData: sponsor[0],
              exists: sponsor.length === 1,
            },
          });
        } else {
          throw new Error(
            'Failed to Load Resources, please refresh the page. If you continue to experience difficulties, please contact the web team (ERR_MULTIPLE_SPONSORS_CONFLICT)',
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
      dispatch({ type: 'UPDATE_LOGO', payload: { logoStr, logoFile } });
    },
    [dispatch],
  );

  const updateVideoLink = useCallback(
    (link) => {
      dispatch({ type: 'UPDATE_VIDEO_LINK', payload: link });
    },
    [dispatch],
  );

  const updateFailure = useCallback(
    (err) => {
      dispatch({ type: 'UPDATE_FAILURE', payload: err });
    },
    [dispatch],
  );

  /**
   * Save and close Functions
   */
  const closeForm = useCallback(() => {
    history.push('/sponsors');
  }, [history]);

  // TODO: Handle authentication errors (preferably from the backend.)
  const saveForm = useCallback(async () => {
    // eslint-disable-next-line no-console
    console.log(state.form);
    // Send data to server:
    try {
      const file = state.form.logoFile;
      let imageString = state.form.logoStr;

      if (file) {
        const data = new FormData();

        data.append('files', file, file.name);
        const res = await api.formUpload(data);

        // eslint-disable-next-line no-console
        console.log('Done image upload!');

        const imageUrl = res.data.data[0];
        if (!imageUrl) {
          throw new Error('Failed to upload image.');
        } else {
          imageString = imageUrl;
        }
      } else if (!state.form.logoStr) {
        throw new Error('Requirement not satisfied: Sponsor logo'); // TODO: Uncomment this.
      }

      const data = toServerSponsor({
        ...state.form,
        logoStr: imageString,
      });

      if (state.exists) {
        await api.sponsors.updateSponsor(data, sponsorId);
      } else {
        await api.sponsors.addSponsor(data);
      }

      // onSuccess:
      closeForm();
    } catch (e) {
      updateFailure(`Could not ${state.exists ? "update" : "add"} sponsor: ${e.message}`);
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }, [state.form, state.exists, sponsorId, closeForm]);

  const deleteForm = useCallback(async () => {
    try {
      await api.sponsors.deleteSponsor(sponsorId);
      closeForm();
    } catch (e) {
      updateFailure(`Could not delete sponsor: ${e.message}`);
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }, [sponsorId, closeForm]);
  // END Save and close functions

  /** UTILITY FUNCTIONS: */
  /**
   * Calculate Years for Selector.
   */
  // TODO: Abstract this to a utility component.
  const years = useMemo(() => {
    let tempYears = [];

    for (let y = MIN_YEAR; y <= MAX_YEAR; y++) {
      tempYears.push({ id: y, text: `${y}` });
    }

    return tempYears;
  }, []);
  // END UTILITY FUNCTIONS

  return {
    ...state.form,
    terms: [
      { id: 'WINTER', text: 'WINTER' },
      { id: 'SPRING', text: 'SPRING' },
      { id: 'FALL', text: 'FALL' },
    ],
    years,
    loading: state.loading,
    errMsg: state.userFriendlyErrorMessage,
    sponsorExists: state.exists,
    sponsorTiers,
    updateName,
    updateWebsite,
    updateTierId,
    updateTermSeason,
    updateTermYear,
    updateDescription,
    updateLogo,
    updateVideoLink,
    updateFailure,
    saveForm,
    closeForm,
    deleteForm,
  };
};

export default useSponsorForm;
