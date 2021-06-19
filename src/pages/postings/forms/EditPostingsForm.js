import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router-dom';
import usePostingForm from '../hooks/posting-form';
import Grid from '@material-ui/core/Grid';
import UnstyledDatePicker from 'react-datepicker';
import Button from '../../../components/Button';
import FormContainer from '../../../components/FormContainer';
import Selector from '../../../components/Selector';
import DropDownList from '../../../components/DropDownList';
import TextInput from '../../../components/TextInput';

import * as R from 'ramda';

const DatePicker = styled(UnstyledDatePicker)`
  width: 100%;
  font: ${({ theme }) => theme.fonts.medium14};
  height: 47px;
  padding-left: 8px;
  border-radius: 9px;
  border: ${({ theme }) => theme.borders.solidGrey1};
`;

const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
`;

const TermSelector = styled(Selector)`
  width: 49%;
`;
const TermContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GridContainer = styled(Grid)`
  padding-bottom: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RequiredText = styled.p`
  color: ${({ theme }) => theme.colours.reds.red1};
  font: ${({ theme }) => theme.fonts.medium14};
`;

const EditPostingsForm = () => {
  const { params: { postingId } } = useRouteMatch();
  const {
    title,
    teamId,
    deadline,
    // location,
    termYear,
    termSeason,
    description,
    requirements,
    tasks,
    info,
    skillsToBeLearned,
    recommendedSkills,
    timeCommitment,
    terms,
    years,
    loading,
    subTeams,
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
    deleteForm,
    removeSkillToBeLearned,
    addNewSkillToBeLearned,
    removeRecommendedSkill,
    addNewRecommendedSkill,
  } = usePostingForm(postingId);

  /* Validation states */
  const [nameError, setNameError] = useState(false);
  const [subTeamError, setSubTeamError] = useState(false);
  const [termSeasonError, setTermSeasonError] = useState(false);
  const [termYearError, setTermYearError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);
  const [timeCommitmentError, setTimeCommitmentError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [requirementsError, setRequirementsError] = useState(false);
  const [infoError, setInfoError] = useState(false);
  const [tasksError, setTasksError] = useState(false);

  const reqNotFilled = nameError || subTeamError || termSeasonError || termYearError ||
    deadlineError || timeCommitmentError || descriptionError ||
    requirementsError || infoError || tasksError

    useEffect(() => {
      setNameError(R.isEmpty(title));
      setSubTeamError(R.isEmpty(teamId));
      setTermSeasonError(R.isEmpty(termSeason));
      setTermYearError(R.isEmpty(termYear));
      setDeadlineError(R.isEmpty(deadline));
      setTimeCommitmentError(R.isEmpty(timeCommitment));
      setDescriptionError(R.isEmpty(description));
      setRequirementsError(R.isEmpty(requirements));
      setInfoError(R.isEmpty(info));
      setTasksError(R.isEmpty(tasks));
    // }, [title,subTeam,tierId,description,termSeason,termYear,logoStr]);
    }, [title, teamId, termYear, termSeason, deadline, timeCommitment, description, requirements, info, tasks, ]);

  return loading ? (
      <Container>
        Loading
      </Container>
  ) : (
    <Container>
      <Button cancel onClick={closeForm}>
        &#60; Back
      </Button>
      <GridContainer container spacing={4}>
        <Grid item xs={12} md={6}>
          <FormContainer title="Opening Name (required)" isError={nameError}>
            <TextInput
              value={title}
              onChange={updateTitle}
              placeholder="Opening Name (required)"
              isError={nameError}
            />
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer title="Sub Team(required)" isError={subTeamError}>
            <Selector
              value={teamId}
              onSelect={updateSubteam}
              items={subTeams.map((st) => ({ id: st.id, text: st.teamName }))}
              isError={subTeamError}
            />
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer title="Term Year, Term Season (required)" isError={termSeasonError || termYearError}>
           <TermContainer>
              <TermSelector
                value={termYear}
                onSelect={updateTermYear}
                items={years}
                isError={termYearError}/>
              <TermSelector
                value={termSeason}
                onSelect={updateTermSeason}
                items={terms}
                isError={termSeasonError}/>
            </TermContainer>
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer title="Application Deadline (required)" isError={deadlineError}>
          <DatePicker
            selected={deadline}
            onChange={updateDeadline}
            isError={deadlineError}/>
          </FormContainer>
        </Grid>
        <Grid item xs={12}>
          <FormContainer title="Time Commitment (required)" isError={timeCommitmentError}>
          <TextInput
            value={timeCommitment}
            onChange={updateTimeCommitment}
            placeholder="Time Commitment (required)"
            isError={timeCommitmentError}/>
          </FormContainer>
        </Grid>
        <Grid item xs={12}>
          <FormContainer title="Description (required)" isError={descriptionError}>
          <TextInput
            value={description}
            onChange={updateDescription}
            placeholder="Description (required)"
            isError={descriptionError}
            multiLine
          />
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer title="Requirements (required)" isError={requirementsError}>
            <DropDownList
              items={requirements.map(
                (req) => ({
                  id: req.id,
                  text: req.requirement,
                }),
              )}
              title="Requirements"
              onAdd={addNewRequirement}
              onRemove={removeRequirement}
              isError={requirementsError}
            />
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer title="Additional Info (required)" isError={infoError}>
            <DropDownList
                items={info.map(
                  (i) => ({
                    id: i.id,
                    text: i.info,
                  }),
                )}
                title="Additional Info"
                onAdd={addNewInfo}
                onRemove={removeInfo}
                isError={infoError}
              />
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer title="Tasks (required)" isError={tasksError}>
            <DropDownList
                items={tasks.map(
                  (t) => ({
                    id: t.id,
                    text: t.task,
                  }),
                )}
                title="Tasks"
                onAdd={addNewTask}
                onRemove={removeTask}
                isError={tasksError}
              />
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer title="Recommended Skills">
            <DropDownList
                items={recommendedSkills.map(
                  (t) => ({
                    id: t.id,
                    text: t.recommendedSkill,
                  }),
                )}
                title="Recommended Skills"
                onAdd={addNewRecommendedSkill}
                onRemove={removeRecommendedSkill}
              />
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer title="Skills to be Learned (required)">
            <DropDownList
                items={skillsToBeLearned.map(
                  (t) => ({
                    id: t.id,
                    text: t.skillToBeLearned,
                  }),
                )}
                title="Skills to Be learned"
                onAdd={addNewSkillToBeLearned}
                onRemove={removeSkillToBeLearned}
              />
          </FormContainer>
        </Grid>
      </GridContainer>
      <ButtonContainer>
        <div>
          <Button disabled={reqNotFilled} onClick={saveForm}>Save</Button>
          <Button cancel onClick={closeForm}>Cancel</Button>
        </div>
        <Button del onClick={deleteForm}>Delete</Button>
      </ButtonContainer>
      {reqNotFilled && <RequiredText>Please fill out all required fields.</RequiredText>}
      {renderAddNewDialog()}
    </Container>
  );
};

export default EditPostingsForm;
