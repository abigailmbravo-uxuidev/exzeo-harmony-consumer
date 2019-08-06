import React from 'react';

import logo from './img/TypTap.svg';

import './App.css';

function App() {
  return (
    <React.Fragment>
      <header>
        <a id="logo" className="logo" href="/" data-test="logo">
          <img src={logo} alt="TypTap Insurance" />
        </a>
      </header>

      <div role="main">
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <p>this is a paragragh</p>
        <nav>
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

        {/*  gandalf will live here */}
      </div>

      <footer>{/*  footer stuff here maybe */}</footer>
    </React.Fragment>
  );
}

export default App;
