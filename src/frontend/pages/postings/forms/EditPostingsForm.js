import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router-dom';
import usePostingForm from '../hooks/posting-form';
import Grid from '@mui/material/Grid';
import UnstyledDatePicker from 'react-datepicker'; // TODO: switch to mui datepicker.
import Button from 'frontend/components/Button';
import FormContainer from 'frontend/components/FormContainer';
import Selector from 'frontend/components/Selector';
import TextInput from 'frontend/components/TextInput';

import * as R from 'ramda';

const RICH_TEXT_MULTILINE_PROMPT =
  'Please enter each point in a separate line. The app will automatically convert these lines to bullet points. Blank / numbered lines will be ignored.';

const DatePicker = styled(UnstyledDatePicker)`
  width: 100%;
  font: ${({ theme }) => theme.fonts.medium14};
  height: 47px;
  padding-left: 8px;
  border-radius: 9px;
  border: ${({ theme, error }) =>
    error ? theme.borders.solidRed : theme.borders.solidGrey1};
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
  padding-bottom: 2rem;
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
  const {
    params: { postingId },
  } = useRouteMatch();
  const {
    title,
    teamId,
    deadline,
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
    updateRequirements,
    updateInfo,
    updateTasks,
    updateRecommendedSkills,
    updateSkillsToBeLearned,
    saveForm,
    closeForm,
    deleteForm,
  } = usePostingForm(parseInt(postingId));

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

  const reqNotFilled =
    nameError ||
    subTeamError ||
    termSeasonError ||
    termYearError ||
    deadlineError ||
    timeCommitmentError ||
    descriptionError ||
    requirementsError ||
    infoError ||
    tasksError;

  useEffect(() => {
    setNameError(R.isEmpty(title));
    setSubTeamError(R.isNil(teamId));
    setTermSeasonError(R.isEmpty(termSeason));
    setTermYearError(R.isNil(termYear));
    setDeadlineError(R.isEmpty(deadline));
    setTimeCommitmentError(R.isEmpty(timeCommitment));
    setDescriptionError(R.isEmpty(description));
    setRequirementsError(!requirements.getCurrentContent().hasText());
    setInfoError(!info.getCurrentContent().hasText());
    setTasksError(!tasks.getCurrentContent().hasText());
  }, [
    title,
    teamId,
    termYear,
    termSeason,
    deadline,
    timeCommitment,
    description,
    requirements,
    info,
    tasks,
  ]);

  useEffect(() => {
    console.log(deadline);
  }, [deadline]);

  return loading ? (
    <Container>Loading</Container>
  ) : (
    <Container>
      <GridContainer item container>
        <Button cancel onClick={closeForm}>
          &#60; Back
        </Button>
      </GridContainer>
      <GridContainer item container spacing={4}>
        <Grid item xs={12} md={6}>
          <FormContainer title="Opening Name (required)" isError={nameError}>
            <TextInput
              value={title}
              onChange={updateTitle}
              placeholder="Assistant to the Regional Manager"
              isError={nameError}
            />
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer title="Sub Team (required)" isError={subTeamError}>
            <Selector
              value={teamId}
              onSelect={updateSubteam}
              placeholder="Dunder Mifflin Scranton Branch"
              items={subTeams.map((st) => ({ id: st.id, text: st.teamName }))}
              isError={subTeamError}
            />
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer
            title="Term Year, Term Season (required)"
            isError={termSeasonError || termYearError}
          >
            <TermContainer>
              <TermSelector
                value={termYear}
                placeholder={'(Please select a year)'}
                onSelect={updateTermYear}
                items={years}
                isError={termYearError}
              />
              <TermSelector
                value={termSeason}
                placeholder={'(Please select a term)'}
                onSelect={updateTermSeason}
                items={terms}
                isError={termSeasonError}
              />
            </TermContainer>
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer
            title="Application Deadline (required)"
            isError={deadlineError}
          >
            <DatePicker
              error={deadlineError}
              selected={deadline}
              onChange={(newDeadline) => {
                newDeadline.setHours(23, 59, 59, 999);
                updateDeadline(newDeadline);
              }}
            />
          </FormContainer>
        </Grid>
        <Grid item xs={12}>
          <FormContainer
            title="Time Commitment (required)"
            isError={timeCommitmentError}
          >
            <TextInput
              value={timeCommitment}
              onChange={updateTimeCommitment}
              placeholder="8-10 hours per week"
              isError={timeCommitmentError}
            />
          </FormContainer>
        </Grid>
        <Grid item xs={12}>
          <FormContainer
            title="Description (required)"
            isError={descriptionError}
          >
            <TextInput
              value={description}
              onChange={updateDescription}
              placeholder="(Please enter a short description of the role here.)"
              isError={descriptionError}
              multiLine
            />
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer
            title="Requirements (required)"
            isError={requirementsError}
          >
            <TextInput
              value={requirements}
              onChange={updateRequirements}
              toolbar={{ options: ['list'] }}
              placeholder={RICH_TEXT_MULTILINE_PROMPT}
              isError={requirementsError}
              multiLine
              richText
            />
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer title="Additional Info (required)" isError={infoError}>
            <TextInput
              value={info}
              onChange={updateInfo}
              toolbar={{ options: ['list'] }}
              placeholder={RICH_TEXT_MULTILINE_PROMPT}
              isError={infoError}
              multiLine
              richText
            />
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer title="Tasks (required)" isError={tasksError}>
            <TextInput
              value={tasks}
              onChange={updateTasks}
              toolbar={{ options: ['list'] }}
              placeholder={RICH_TEXT_MULTILINE_PROMPT}
              isError={tasksError}
              multiLine
              richText
            />
          </FormContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormContainer title="Recommended Skills">
            <TextInput
              value={recommendedSkills}
              toolbar={{ options: ['list'] }}
              onChange={updateRecommendedSkills}
              placeholder={RICH_TEXT_MULTILINE_PROMPT}
              multiLine
              richText
            />
          </FormContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormContainer title="Skills to be Learned">
            <TextInput
              value={skillsToBeLearned}
              toolbar={{ options: ['list'] }}
              onChange={updateSkillsToBeLearned}
              placeholder={RICH_TEXT_MULTILINE_PROMPT}
              multiLine
              richText
            />
          </FormContainer>
        </Grid>
      </GridContainer>
      <ButtonContainer>
        <div>
          <Button disabled={reqNotFilled} onClick={saveForm}>
            Save
          </Button>
          <Button cancel onClick={closeForm}>
            Cancel
          </Button>
        </div>
        <Button del onClick={deleteForm}>
          Delete
        </Button>
      </ButtonContainer>
      {reqNotFilled && (
        <RequiredText>Please fill out all required fields.</RequiredText>
      )}
    </Container>
  );
};

export default EditPostingsForm;
