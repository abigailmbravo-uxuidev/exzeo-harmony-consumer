import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';
import Page from './Page';

const App = () => {
  return (
    <React.Fragment>
      <Header />

      <div role="region">
        <button className="navOpener">
          <FontAwesomeIcon icon="chevron-right" size="sm" />
        </button>

        <Navigation />

        <Page />
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default App;
