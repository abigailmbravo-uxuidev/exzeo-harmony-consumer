import React from 'react';

import logo from './img/TypTap.svg';

import './App.css';

function App() {
  return (
    <React.Fragment>
      <header>
        <div role="banner">
          <a id="logo" className="logo" href="/" data-test="logo">
            <img src={logo} alt="TypTap Insurance" />
          </a>
          <div role="contentinfo">
            <a id="phone" title="call us" href="tel:{/*PHONE NUMBER*/}">
              {/*PHONE NUMBER*/}XXX-XXX-XXXX
            </a>
          </div>
        </div>
      </header>
      <div role="region">
        <nav role="navigation">
          <ul>
            {/* accordion */}
            <li>
              <ul>
                <li>{/*  nav links */}</li>
              </ul>
            </li>
          </ul>
          {/*  some nav goes here */}
        </nav>
        <main role="main">
          {/*  gandalf will live here */}
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <p>this is a paragragh</p>
        </main>
      </div>
      <footer>{/*  footer stuff here maybe */}</footer>
    </React.Fragment>
  );
}

export default App;
