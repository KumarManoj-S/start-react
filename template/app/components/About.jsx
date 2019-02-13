import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

// styled components
const Wrapper = styled(Typography)`
  background-color: #efefef;
  font-size: 50px;
  padding: 20px;
  margin: 30px 30px 10px 30px;
  color: #0b68ad;
  text-align: center;
`;

const About = () => {
  return (
    <div>
      <Wrapper>
        About page
      </Wrapper>
    </div>
  );
};

export default About;
