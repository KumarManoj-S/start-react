import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import PostCard from './ui/PostCard';

const Wrapper = styled(Typography)`
  background-color: #efefef;
  font-size: 50px;
  padding: 20px;
  margin: 30px 30px 10px 30px;
  color: #0b68ad;
  text-align: center;
`;

class Posts extends Component {
  componentWillMount() {
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
