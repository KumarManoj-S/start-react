import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const Wrapper = styled(Typography)`
  background-color: #efefef;
  font-size: 50px;
  padding: 20px;
  margin: 30px 30px 10px 30px;
  color: #0b68ad;
  text-align: center;
`;

const NavigationWrapper = styled.div`
  text-align: center;
`;

const LinkComponent = styled(Link)`
  text-decoration: none;
`;

class Main extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Wrapper>
          Hello React world!
        </Wrapper>
        <NavigationWrapper>
          <LinkComponent to="/about">
            {' About '}
          </LinkComponent>
          {' | '}
          <LinkComponent to="/features">
            {' Features '}
          </LinkComponent>
          {' | '}
          <LinkComponent to="/posts">
            {' Posts '}
          </LinkComponent>
        </NavigationWrapper>
      </div>
    );
  }
}

export default Main;
