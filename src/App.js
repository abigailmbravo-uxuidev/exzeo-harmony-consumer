import React from 'react';

import logo from './img/TypTap.svg';

import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronRight,
  faSearch,
  faEdit,
  faPaperPlane,
  faHome,
  faKey
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faChevronRight, faSearch, faEdit, faPaperPlane, faHome, faKey);

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
        <button className="navOpener">
          <FontAwesomeIcon icon="chevron-right" size="sm" />
        </button>
        {/* a animation will be applied here. classes will be: navSlideOut & navSlideIn */}
        <nav role="navigation" className="navSlideOut">
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
        <main role="main">
          {/*  gandalf will live here */}
          <form>
            <h1>Address</h1>
            <div className="infoBar">
              <h2>
                <label>Annual Premium:</label>
                $275
              </h2>
              <span>
                <label>Quote Number:</label>
                #77742
              </span>
            </div>
            <div className="searchInputWrapper">
              <div className="form-group property-search valid">
                <label className="">Property Address</label>
                <input
                  type="text"
                  placeholder="Search for Property Address"
                ></input>
              </div>
              <button className="btn btn-primary multi-input" type="submit">
                <FontAwesomeIcon icon="search" size="sm" />
              </button>
            </div>
            <p>Enter the street address only (e.g., 123 Main Street).</p>
            <section className="results">
              <div className="card">
                <div className="cardContent">
                  <h4>471 Palm Island SE</h4>
                  <p>Clearwater, FL 33602</p>
                </div>
                <footer>></footer>
              </div>
              <div className="card">
                <div className="cardContent">
                  <h4>471 Palm Island SE</h4>
                  <p>Clearwater, FL 33602</p>
                </div>
                <footer>></footer>
              </div>
            </section>
            <p>
              If you don’t see your address in the list provided, try entering
              less address information to see if it comes up. Please note, at
              this time we are only writing single family dwellings in the state
              of Florida.
              <br />
              <br />
              If you still have problems, please{' '}
              <a href="555-555-5555">call us</a> and one of our representative
              will be glad to help you.
            </p>
            <section className="iconMain">
              <div className="iconContainer">
                <FontAwesomeIcon icon="edit" />
                <label>Edit Quote</label>
              </div>
              <div className="iconContainer">
                <FontAwesomeIcon icon="paper-plane" />
                <label>Email Quote</label>
              </div>
              <div className="iconContainer">
                <FontAwesomeIcon icon="home" />
                <label>Start Over</label>
              </div>
            </section>
            <hr />
            <div class="form-group radio segmented">
              <label
                class="group-label label-segmented"
                for="underwritingAnswers.previousClaims.answer"
              >
                When was the last claim filed?
              </label>
              <div
                id="underwritingAnswers.previousClaims.answer"
                class="segmented-answer-wrapper"
              >
                <div class="">
                  <label class="label-segmented selected">
                    <span>No claims ever filed</span>
                  </label>
                </div>
                <div class="">
                  <label class="label-segmented">
                    <span>Less than 3 Years</span>
                  </label>
                </div>
                <div class="">
                  <label class="label-segmented">
                    <span>3-5 Years</span>
                  </label>
                </div>
                <div class="">
                  <label class="label-segmented">
                    <span>Over 5 Years</span>
                  </label>
                </div>
                <div class="">
                  <label class="label-segmented">
                    <span>Unknown</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group view-col-12 switch valid">
              <label class="">
                Do you want Personal Property Replacement Cost Coverage?
                <span>
                  <i
                    class="fa fa-info-circle"
                    data-tip="data-tip"
                    currentitem="false"
                  ></i>
                  <div
                    class="__react_component_tooltip place-top type-dark "
                    id="coverageOptions.personalPropertyReplacementCost.answer"
                    data-id="tooltip"
                  ></div>
                </span>
              </label>
              <div class="switch-div" tabindex="0" data-value="false"></div>
            </div>
            <button class="btn btn-primary" type="button" tabindex="0">
              reset
            </button>
            <button class="btn btn-secondary" type="button" tabindex="0">
              reset
            </button>
            <div className="well">
              <button class="btn btn-secondary" type="button" tabindex="0">
                well
              </button>
              <p>this is a test paragraph</p>
            </div>
            <div className="card">
              <header>
                <h4>Annually</h4>
              </header>
              <div className="cardContent">
                <p>Clearwater, FL 33602</p>
              </div>
              <footer>
                <button class="btn btn-primary" type="button" tabindex="0">
                  reset
                </button>
              </footer>
            </div>
            <div className="card selected">
              <header>
                <h4>Annually</h4>
              </header>
              <div className="cardContent">
                <p>Clearwater, FL 33602</p>
              </div>
              <footer>
                <button class="btn btn-primary" type="button" tabindex="0">
                  reset
                </button>
              </footer>
            </div>
          </form>
        </main>
      </div>
      <footer>{/*  footer stuff here maybe */}</footer>
    </React.Fragment>
  );
}

export default App;
