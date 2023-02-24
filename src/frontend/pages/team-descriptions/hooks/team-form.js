import { useReducer, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../../../api";
import useTeams from "../../../hooks/teams";

const initialState = (inputState) => ({
  loading: true,
  userFriendlyErrorMessage: "",
  exists: false,
  form: {
    teamId: 0,
    teamName: "",
    description: "",
    lastUpdated: "",
    ...inputState, // May overwrite any of the above defaults
  },
});

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
        exists: action.payload.exists,
        form: {
          ...state.form,
          ...action.payload.teamData, // This injects existing data for the chosen team.
          teamId: action.payload.teamId,
        },
      };
    case "LOAD_FAILURE":
      return {
        ...state,
        loading: false,
        userFriendlyErrorMessage: action.payload,
      };

    // Redux stores acting as react states:
    case "UPDATE_TEAM_NAME":
      return {
        ...state,
        form: {
          ...state.form,
          teamName: action.payload,
        },
      };
    case "UPDATE_DESCRIPTION":
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
  const { teams } = useTeams();

  /**
   * Load Team Data by ID:
   */
  useEffect(() => {
    if (state.loading) {
      try {
        // Filter for matching team
        const team = teams.filter((team) => team.id === teamId);
        if (team.length <= 1) {
          dispatch({
            type: "LOAD_SUCCESS",
            payload: {
              teamId,
              teamData: team[0],
              exists: team.length === 1,
            },
          });
        } else {
          throw new Error(
            "Failed to Load Resources, please refresh the page. If you continue to experience difficulties, please contact the web team (ERR_MULTIPLE_TEAMS_CONFLICT)"
          );
        }
      } catch (err) {
        dispatch({ type: "LOAD_FAILURE", payload: err });
      }
    }
  }, [state.loading, dispatch, teamId, teams]);

  /**
   * FORM Functions
   */
  const updateName = useCallback(
    (teamName) => {
      dispatch({ type: "UPDATE_TEAM_NAME", payload: teamName });
    },
    [dispatch]
  );

  const updateDescription = useCallback(
    (description) => {
      dispatch({ type: "UPDATE_DESCRIPTION", payload: description });
    },
    [dispatch]
  );

  /**
   * Save and close Functions
   */
  const closeForm = useCallback(() => {
    history.push("/team-descriptions");
  }, [history]);

  const saveForm = useCallback(async () => {
    // Send data to server:
    try {
      // Handle error on empty team name
      if (!state.form.teamName){
        throw new Error('Please enter teamname')
      }

      if (state.exists) {
        await api.teams.updateTeam(state.form, teamId);
      } else {
        await api.teams.addTeam(state.form);
      }

      // onSuccess:
      closeForm();
    } catch (e) {
      // TODO: Display "could not add/update" error to user as dialogue.
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }, [state.form, state.exists, teamId, closeForm]);

  const deleteForm = useCallback(async () => {
    try {
      await api.teams.deleteTeam(teamId);
      closeForm();
    } catch (e) {
      // TODO: Display "could not delete" to user as dialogue.
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }, [teamId, closeForm]);

  return {
    ...state.form,
    loading: state.loading,
    updateName,
    updateDescription,
    saveForm,
    closeForm,
    deleteForm,
  };
};

export default useTeamForm;
