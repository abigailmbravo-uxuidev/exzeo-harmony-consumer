import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@exzeo/core-ui';

const Test = ({ location }) => {
  return (
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
          <input type="text" placeholder="Search for Property Address" />
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
          <footer>
            <FontAwesomeIcon icon="chevron-right" />
          </footer>
        </div>
        <div className="card">
          <div className="cardContent">
            <h4>471 Palm Island SE</h4>
            <p>Clearwater, FL 33602</p>
          </div>
          <footer>
            <FontAwesomeIcon icon="chevron-right" />
          </footer>
        </div>
      </section>
      <p>
        If you don’t see your address in the list provided, try entering less
        address information to see if it comes up. Please note, at this time we
        are only writing single family dwellings in the state of Florida.
        <br />
        <br />
        If you still have problems, please <a href="555-555-5555">
          call us
        </a>{' '}
        and one of our representative will be glad to help you.
      </p>
      <ul>
        <li>this is some junkkkkk</li>
        <li>this is some junkkkkk</li>
        <li>this is some junkkkkk</li>
      </ul>
      <section className="iconContainer">
        <Button className={Button.constants.classNames.icon}>
          <FontAwesomeIcon icon="edit" />
          <label>Edit Quote</label>
        </Button>
        <Button className={Button.constants.classNames.icon}>
          <FontAwesomeIcon icon="paper-plane" />
          <label>Email Quote</label>
        </Button>
        <Button className={Button.constants.classNames.icon}>
          <FontAwesomeIcon icon="home" />
          <label>Start Over</label>
        </Button>
      </section>
      <hr />
      <div className="form-group radio segmented">
        <label
          className="group-label label-segmented"
          htmlFor="underwritingAnswers.previousClaims.answer"
        >
          When was the last claim filed?
        </label>
        <div
          id="underwritingAnswers.previousClaims.answer"
          className="segmented-answer-wrapper"
        >
          <div className="">
            <label className="label-segmented selected">
              <span>No claims ever filed</span>
            </label>
          </div>
          <div className="">
            <label className="label-segmented">
              <span>Less than 3 Years</span>
            </label>
          </div>
          <div className="">
            <label className="label-segmented">
              <span>3-5 Years</span>
            </label>
          </div>
          <div className="">
            <label className="label-segmented">
              <span>Over 5 Years</span>
            </label>
          </div>
          <div className="">
            <label className="label-segmented">
              <span>Unknown</span>
            </label>
          </div>
        </div>
      </div>
      <div className="form-group view-col-12 switch valid">
        <label className="">
          I want Personal Property Replacement Cost Coverage
          <span>
            <i
              className="fa fa-info-circle"
              data-tip="data-tip"
              currentitem="false"
            />
            <div
              className="__react_component_tooltip place-top type-dark "
              id="coverageOptions.personalPropertyReplacementCost.answer"
              data-id="tooltip"
            />
          </span>
        </label>
        <div className="switch-div" tabIndex="0" data-value="false" />
      </div>
      <div className="btnContainer">
        <button className="btn btn-primary" type="button" tabIndex="0">
          reset
        </button>
        <button className="btn btn-secondary" type="button" tabIndex="0">
          reset
        </button>
      </div>
      <div className="well">
        <p>this is a test paragraph</p>
        <button className="btn btn-primary" type="button" tabIndex="0">
          well
        </button>
      </div>
      <div className="card">
        <header>
          <h4>Annually</h4>
        </header>
        <div className="cardContent">
          <p>Clearwater, FL 33602</p>
        </div>
        <footer>
          <button className="btn btn-primary" type="button" tabIndex="0">
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
          <button className="btn btn-primary" type="button" tabIndex="0">
            reset
          </button>
        </footer>
      </div>
    </form>
  );
};

export default Test;
