import React from 'react';
import styled from 'styled-components';

import UnstyledSection from './components/Section';

const Section = styled(UnstyledSection)`
  margin-left: 16px;
  margin-right: 16px;
  width: 6em;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 64px;
`;

const sections = [
  {
    name: 'Geese',
    to: '/geese',
  },
  {
    name: 'Features',
    to: '/features',
  },
  {
    name: 'Postings',
    to: '/postings',
  },
];

const LandingPage = () => {
  const sectionItems = sections.map(section => <Section key={section.name} {...section} />);
  return (
    <Container>
      {sectionItems}
    </Container>
  );
};

export default LandingPage;
