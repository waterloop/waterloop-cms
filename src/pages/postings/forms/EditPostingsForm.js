import React from 'react';
import styled from 'styled-components';
import { useHistory, useRouteMatch } from 'react-router-dom';
import usePostingForm from '../hooks/posting-form';
import Grid from '@material-ui/core/Grid';
import DatePicker from 'react-datepicker';
import Button from '../../../components/Button';
import FormContainer from '../../../components/FormContainer';
import Selector from '../../../components/Selector';
import DropDownList from '../../../components/DropDownList';

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

const EditPostingsForm = () => {
  const { params: { postingId } } = useRouteMatch();
  const {
    title,
    teamId,
    deadline,
    location,
    termYear,
    termSeason,
    description,
    requirements,
    tasks,
    info,
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
  } = usePostingForm(postingId);

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
          <FormContainer title="Opening Name (required)">
          <input value={title} onChange={(e) => updateTitle(e.target.value)} type="text"/>
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer title="Sub Team(required)">
            <Selector
              value={teamId}
              onSelect={updateSubteam}
              items={subTeams.map((st) => ({ id: st.id, text: st.teamName }))}
            />
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer title="Term Year, Term Season (required)">
           <TermContainer>
              <TermSelector value={termYear} onSelect={updateTermYear} items={years}/>
              <TermSelector value={termSeason} onSelect={updateTermSeason} items={terms}/>
            </TermContainer>
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer title="Application Deadline (required)">
          <DatePicker selected={deadline} onChange={updateDeadline}/>
          </FormContainer>
        </Grid>
        <Grid item xs={12}>
          <FormContainer title="Time Commitment (required)">
          <input value={timeCommitment} onChange={(e) => updateTimeCommitment(e.target.value)} type="text"/>
          </FormContainer>
        </Grid>
        <Grid item xs={12}>
          <FormContainer title="Description (required)">
          <input value={description} onChange={(e) => updateDescription(e.target.value)} type="text"/>
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer title="Requirements (required)">
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
            />
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer title="Additional Info (required)">
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
              />
          </FormContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormContainer title="Tasks (required)">
            <DropDownList
                items={tasks.map(
                  (t) => ({
                    id: t.id,
                    text: t.task,
                  }),
                )}
                title="Additional Info"
                onAdd={addNewTask}
                onRemove={removeTask}
              />
          </FormContainer>
        </Grid>
      </GridContainer>
      <Button onClick={saveForm}>Save</Button>
      <Button cancel onClick={closeForm}>Cancel</Button>
      {renderAddNewDialog()}
    </Container>
  );
};

export default EditPostingsForm;
