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

  padding-top: 128px;

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
    to: '/features',
    previewLink: 'https://teamwaterloop.ca/the-flock',
    icon: FeaturesPageSVG,
  },
  {
    name: 'Current Openings',
    to: '/postings',
    previewLink: 'https://teamwaterloop.ca/recruitment',
    icon: RecruitmentPageSVG,
  },
  {
    name: 'Sponsors',
    to: '/sponsors',
    previewLink: 'https://teamwaterloop.ca/sponsors',
    icon: SponsorsPageSVG,
  },
  {
    name: 'Team Descriptions',
    to: '/team-descriptions',
    previewLink: 'https://teamwaterloop.ca/team',
    icon: TeamDescriptionsPageSVG,
  },
  {
    name: 'Descriptions',
    to: '/descriptions'
  }
];

const LandingPage = () => {
  const sectionItems = sections.map((section) => (
    <Grid key={section.name} item xs={12} sm={6} md={3} justify="center" container>
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
