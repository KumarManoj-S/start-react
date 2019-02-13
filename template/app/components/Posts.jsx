import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import PostCard from './ui/PostCard';

// styled component
const Wrapper = styled(Typography)`
  background-color: #efefef;
  font-size: 50px;
  padding: 20px;
  margin: 30px 30px 10px 30px;
  color: #0b68ad;
  text-align: center;
`;

class Posts extends Component {
  // componentWillMount has been used because the data has to be loaded by server
  // during the initial rendering.
  // componentWillMount will be executed both in the server and the client
  // but componentDidMount will be executed only in the client.
  componentWillMount() {
    // Triggering get all posts action
    const { getAllPosts } = this.props;
    getAllPosts();
  }

  render() {
    const { posts = [], loading } = this.props;
    if (loading) {
      return (
        <div>
          <Wrapper>
            Posts
          </Wrapper>
          <div style={{ textAlign: 'center' }}>
            Posts data are powered by
            <a href="https://jsonplaceholder.typicode.com/">
              {' https://jsonplaceholder.typicode.com/ '}
            </a>
          </div>
          <Grid container justify="center">
            <CircularProgress style={{ margin: 20 }} />
          </Grid>
        </div>
      );
    }
    return (
      <div>
        <Wrapper>
          Posts
        </Wrapper>
        <div style={{ textAlign: 'center' }}>
          Posts data are powered by
          <a href="https://jsonplaceholder.typicode.com/">
            {' https://jsonplaceholder.typicode.com/ '}
          </a>
        </div>
        <Grid container spacing="32" justify="center" alignItems="center" style={{ padding: 32 }}>
          {
            posts && posts.map(post => (
              <Grid item xs={6}>
                <PostCard title={post.title} body={post.body} />
              </Grid>
            ))
          }
        </Grid>
      </div>
    );
  }
}

export default Posts;
