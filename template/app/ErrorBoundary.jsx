import React from 'react';
import config from './config';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
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
        <div>
          something went wrong
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
