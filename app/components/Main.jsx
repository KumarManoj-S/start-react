import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        Hello World!
        <Link to="/about">About</Link>
        <br />
        <Link to="/features">Features</Link>
      </div>
    );
  }
}

export default Main;
