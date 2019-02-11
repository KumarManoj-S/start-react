import React from 'react';
import config from './config';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  onHomeClick = () => {
    window.location = config.profileUrl;
  }

  componentDidCatch(error, info) {
    console.log('ERROR BOUNDARY', error, info);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div style={{ padding: 70, marginTop: 100, marginLeft: 50 }}>
          <div />
          <div
            style={{
              position: 'absolute',
              left: '10%',
              top: '25%',
              marginRight: 20
            }}>
            <div
              style={
                {
                  padding: '5px',
                  fontFamily: 'Roboto, Helvetica, sans-serif',
                  fontSize: '100px',
                  color: '#6c6b6d',
                }
              }>
              {':('}
            </div>
            <div
              style={
                {
                  padding: '5px',
                  fontFamily: 'Roboto, Helvetica, sans-serif',
                  fontSize: '50px',
                  color: '#6c6b6d',

                }
              }>
              {'Oops! Something went wrong!'}
            </div>
            <div
              style={
                {
                  padding: '5px',
                  fontFamily: 'Roboto, Helvetica, sans-serif',
                  fontSize: '20px',
                  color: '#6c6b6d',
                }
              }>
              {'Sorry, we can\'t get that information right now. Please try again later. If the problem continues, contact the admin'}
            </div>
            <div
              style={
                {
                  padding: '5px',
                  fontFamily: 'Roboto, Helvetica, sans-serif',
                  fontSize: '15px',
                  color: '#53a2dc',
                  textDecoration: 'underlined',
                  cursor: 'pointer'
                }
              }>
              <a onClick={this.onHomeClick}>
                Go to Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
