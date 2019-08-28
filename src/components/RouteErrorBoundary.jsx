import React, { Component } from 'react';

class RouteErrorBoundary extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // componentDidCatch(error, errorInfo) {
  //   // log error to somewhere
  // }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
