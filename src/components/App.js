import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@exzeo/core-ui';

import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

import './FontAwesomeInit';
import './App.css';
import Page from './components/Page';

function App() {
  return (
    <React.Fragment>
      <Header />

      <div role="region">
        <button className="navOpener">
          <FontAwesomeIcon icon="chevron-right" size="sm" />
        </button>
        {/* a animation will be applied here. classes will be: navSlideOut & navSlideIn */}

        <Navigation />

        <Page />
      </div>

      <Footer />
    </React.Fragment>
  );
}

export default App;
