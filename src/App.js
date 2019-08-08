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
              <a>
                <h3>Quote</h3>
                <span>1</span>
                <p></p>
              </a>
              <ul>
                <li>
                  {/*  nav links */}
                  <a>
                    <h3>Address</h3>
                    <span></span>
                    <p>
                      <strong>101 E KENNEDY BLVD</strong>
                      <br />
                      Tampa, FL 33602 <br />
                      Year Built: 2005
                      <br />
                      Flood Zone: "A"
                    </p>
                  </a>
                </li>
                <li>
                  {/*  nav links */}
                  <a className="active">
                    <h3>Underwriting</h3>
                    <span></span>
                    <p>You have successfully answered the required questions</p>
                  </a>
                </li>
                <li>
                  {/*  nav links */}
                  <a className="disabled">
                    <h3>Customize Quote</h3>
                    <span></span>
                    <p>
                      Save your quote to retrieve later. You will also be able
                      to share your new quote here.
                    </p>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a className="disabled">
                <h3>Application</h3>
                <span>2</span>
              </a>
            </li>
          </ul>
          {/*  some nav goes here */}
        </nav>
        <main role="main">{/*  gandalf will live here */}</main>
      </div>
      <footer>{/*  footer stuff here maybe */}</footer>
    </React.Fragment>
  );
}

export default App;
