import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes, history } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.grow}
            style={{ cursor: 'pointer' }}
            onClick={() => history.push('/')}>
            Start React
          </Typography>
          <Button
            color="inherit"
            onClick={() => history.push('/about')}>
            About
          </Button>
          <Button
            color="inherit"
            onClick={() => history.push('/features')}>
            Features
          </Button>
          <Button
            color="inherit"
            onClick={() => history.push('/posts')}>
            Posts
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(ButtonAppBar));
