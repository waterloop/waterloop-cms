import { useReducer, useCallback, useEffect, useMemo, useState } from 'react';

import api from 'frontend/api';
import useTeams from 'frontend/hooks/teams';
import { useHistory } from 'react-router-dom';
import { EditorState } from 'draft-js';
import {
  convertArrayToEditorStateBulletedList,
  convertEditorStateBulletListToArray,
} from 'frontend/utils/rich-text/rich-text-utils';

import { dateToLocalTime } from 'frontend/utils/datetime';

const initialState = (inputState) => ({
  loading: true,
  userFriendlyErrorMessage: '',
  form: {
    title: '',
    teamId: undefined,
    deadline: '',
    location: 'On Site', // unused field
    termYear: undefined,
    termSeason: '',
    description: '',
    requirements: EditorState.createEmpty(),
    tasks: EditorState.createEmpty(),
    info: EditorState.createEmpty(),
    timeCommitment: '',
    skillsToBeLearned: EditorState.createEmpty(),
    recommendedSkills: EditorState.createEmpty(),
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
    case 'UPDATE_REQUIREMENTS':
      return {
        ...state,
        form: {
          ...state.form,
          requirements: action.payload,
        },
      };
    case 'UPDATE_INFO':
      return {
        ...state,
        form: {
          ...state.form,
          info: action.payload,
        },
      };
    case 'UPDATE_TASKS':
      return {
        ...state,
        form: {
          ...state.form,
          tasks: action.payload,
        },
      };
    case 'UPDATE_RECOMMENDED_SKILLS':
      return {
        ...state,
        form: {
          ...state.form,
          recommendedSkills: action.payload,
        },
      };
    case 'UPDATE_SKILLS_TO_BE_LEARNED':
      return {
        ...state,
        form: {
          ...state.form,
          skillsToBeLearned: action.payload,
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

  /**
   * Load Posting Data By posting ID
   */
  useEffect(() => {
    if (state.loading) {
      if (postingId === -1) {
        dispatch({
          type: 'LOAD_SUCCESS',
        });
      } else {
        api.postings
          .getPostingById(postingId)
          .then((response) => {
            if (response && response.status === 200) {
              dispatch({
                type: 'LOAD_SUCCESS',
                payload: {
                  ...response.data,
                  deadline: dateToLocalTime(response.data.deadline),
                  requirements: convertArrayToEditorStateBulletedList(
                    response.data.requirements.map((req) => req.requirement),
                  ),
                  info: convertArrayToEditorStateBulletedList(
                    response.data.info.map((info) => info.info),
                  ),
                  tasks: convertArrayToEditorStateBulletedList(
                    response.data.tasks.map((task) => task.task),
                  ),
                  recommendedSkills: convertArrayToEditorStateBulletedList(
                    response.data.recommendedSkills.map(
                      (skill) => skill.recommendedSkill,
                    ),
                  ),
                  skillsToBeLearned: convertArrayToEditorStateBulletedList(
                    response.data.skillsToBeLearned.map(
                      (skill) => skill.skillToBeLearned,
                    ),
                  ),
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

  const updateRequirements = useCallback(
    (requirements) => {
      dispatch({
        type: 'UPDATE_REQUIREMENTS',
        payload: requirements,
      });
    },
    [dispatch],
  );

  const updateInfo = useCallback(
    (info) => {
      dispatch({
        type: 'UPDATE_INFO',
        payload: info,
      });
    },
    [dispatch],
  );

  const updateTasks = useCallback(
    (tasks) => {
      dispatch({
        type: 'UPDATE_TASKS',
        payload: tasks,
      });
    },
    [dispatch],
  );

  const updateRecommendedSkills = useCallback(
    (recommendedSkills) => {
      dispatch({
        type: 'UPDATE_RECOMMENDED_SKILLS',
        payload: recommendedSkills,
      });
    },
    [dispatch],
  );

  const updateSkillsToBeLearned = useCallback(
    (skillsToBeLearned) => {
      dispatch({
        type: 'UPDATE_SKILLS_TO_BE_LEARNED',
        payload: skillsToBeLearned,
      });
    },
    [dispatch],
  );

  /**
   * Save and close Functions
   */

  const closeForm = useCallback(() => {
    history.push('/postings');
  }, [history]);

  const saveForm = useCallback(async () => {
    const form = {
      ...state.form,
      requirements: convertEditorStateBulletListToArray(
        state.form.requirements,
      ),
      info: convertEditorStateBulletListToArray(state.form.info),
      tasks: convertEditorStateBulletListToArray(state.form.tasks),
      recommendedSkills: convertEditorStateBulletListToArray(
        state.form.recommendedSkills,
      ),
      skillsToBeLearned: convertEditorStateBulletListToArray(
        state.form.skillsToBeLearned,
      ),
    };
    if (postingId === -1) {
      await api.postings.createNewPosting(form);
    } else {
      await api.postings.patchPosting(form, postingId);
    }
    closeForm();
  }, [state.form, postingId, closeForm]);

  const deleteForm = useCallback(() => {
    api.postings.deletePosting(postingId).then(() => closeForm());
  }, [postingId, closeForm]);
  // END Save and close functions

  /**
   * Calculate Years for Selector. Add the year that is
   * currently attached to the posting if it is in the past.
   */
  const [currentYear] = useState(new Date().getFullYear());
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
    updateRequirements,
    updateInfo,
    updateTasks,
    updateRecommendedSkills,
    updateSkillsToBeLearned,
    saveForm,
    closeForm,
    deleteForm,
  };
};

export default usePostingForm;
