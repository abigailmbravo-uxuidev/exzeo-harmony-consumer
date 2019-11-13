import React, { Component } from 'react';

import Error from 'components/Error';

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
      return <Error type="crash" />;
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
