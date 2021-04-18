import React from 'react';
import styled from 'styled-components';
import FeaturesPageSVG from '../../assets/page-icons/features.svg';
import GeesePageSVG from '../../assets/page-icons/geese.svg';
import RecruitmentPageSVG from '../../assets/page-icons/recruitment.svg';
import SponsorsPageSVG from '../../assets/page-icons/sponsors.svg';
import TeamDescriptionsPageSVG from '../../assets/page-icons/team-descriptions.svg';
import UnstyledSection from './components/Section';
import Grid from '@material-ui/core/Grid';

const Section = styled(UnstyledSection)`
  margin-left: 16px;
  margin-right: 16px;
  width: 6em;
  margin-bottom: 16px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;

  padding-top: 96px;
  padding-right: calc(min(256px, 10%));
  padding-left: calc(min(128px, 10%));
`;

const sections = [
  {
    name: 'Goose Descriptions',
    editLink: '/geese',
    previewLink: 'https://teamwaterloop.ca/the-flock',
    icon: GeesePageSVG,
  },
  {
    name: 'Goose Features',
    editLink: '/features',
    previewLink: 'https://teamwaterloop.ca/the-flock',
    icon: FeaturesPageSVG,
  },
  {
    name: 'Current Openings',
    editLink: '/postings',
    previewLink: 'https://teamwaterloop.ca/recruitment',
    icon: RecruitmentPageSVG,
  },
  {
    name: 'Sponsors',
    editLink: '/sponsors',
    previewLink: 'https://teamwaterloop.ca/sponsors',
    icon: SponsorsPageSVG,
  },
  {
    name: 'Team Descriptions',
    editLink: '/team-descriptions',
    previewLink: 'https://teamwaterloop.ca/team',
    icon: TeamDescriptionsPageSVG,
  },
  {
    name: 'Descriptions',
    to: '/descriptions',
  },
];

const LandingPage = () => {
  const sectionItems = sections.map((section) => (
    <Grid key={section.name} item xs={12} sm={6} md={4} lg={3} justify="center" container>
      <Section {...section} />
    </Grid>
  ));

  return (
    <Container>
      <Grid container justify="center">
        {sectionItems}
      </Grid>
    </Container>
  );
};

export default LandingPage;
