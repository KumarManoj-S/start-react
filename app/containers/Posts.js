import { connect } from 'react-redux';
import { getAllPosts } from '../actions/posts';
import Posts from '../components/Posts';
import { isGetPostsAPIRunning, getAllPosts as getPosts } from '../selectors';

const mapDispatchToProps = dispatch => ({
  getAllPosts: () => dispatch(getAllPosts())
});

const mapStateToProps = state => ({
  loading: isGetPostsAPIRunning(state),
  posts: getPosts(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
