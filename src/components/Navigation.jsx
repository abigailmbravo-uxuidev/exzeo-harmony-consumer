import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
/* animation will be applied here. classes will be: navSlideOut & navSlideIn */

const Navigation = ({ location }) => {
  return (
    <>
      <button className="navOpener">
        <FontAwesomeIcon icon="chevron-right" size="sm" />
      </button>
      <nav role="navigation" className="navSlideOut">
        <ul className="mainNavigation">
          {/********** RETRIEVE **********/}
          <li
            key="retrieve"
            className={classNames({
              hide: location.pathname !== '/retrieveQuote'
            })}
          >
            <h3>Retrieve</h3>
            <span />
            <p />
          </li>
          {/********** RETRIEVE **********/}

          {/********** QUOTE **********/}
          <li
            key="quote"
            className={classNames({
              disabled: false,
              complete: false
            })}
          >
            <h3>Quote</h3>
            {/*hide number span when li gets complete class*/}
            <span>1{/*<FontAwesomeIcon icon="check-circle" />*/}</span>
            <p />

            <ul>
              <li key="address">
                <NavLink
                  to="/searchAddress"
                  className={classNames({
                    disabled: location.pathname !== '/searchAddress'
                  })}
                  activeClassName="active"
                >
                  <h3>Address</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  <p>
                    <strong>101 Test Address</strong>
                    <br />
                    Tampa, FL 33111 <br />
                    Year Built: 2005
                    <br />
                    Flood Zone: "A"
                  </p>
                </NavLink>
              </li>

              <li key="underwriting">
                <NavLink
                  to="/quote"
                  className={classNames({ disabled: true, complete: false })}
                >
                  <h3>Underwriting</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  <p>You have successfully answered the required questions</p>
                </NavLink>
              </li>

              <li key="customize">
                <a className={classNames('disabled')}>
                  <h3>Customize Quote</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  <p>
                    Bacon ipsum dolor amet dolor fatback andouille corned beef
                    mollit lorem pork chop anim shankle doner kevin
                    reprehenderit consequat.
                  </p>
                </a>
              </li>

              <li key="share">
                <a className="disabled">
                  <h3>Save/Share Quote</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  <p>
                    Jerky id capicola ham hock nisi minim lorem sint sirloin
                    elit ground round ad.
                  </p>
                </a>
              </li>
            </ul>
          </li>
          {/********** QUOTE ***********/}

          {/********** APPLICATION **********/}
          <li key="application" className={classNames({ disabled: true })}>
            <h3>Application</h3>
            <span>2</span>
            <p />
            <ul>
              <li key="additionalInfo">
                <a className={classNames('disabled')}>
                  <h3>Additional Info</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  <p>Interesting things are happening</p>
                </a>
              </li>

              <li key="policyholder">
                <a className={classNames('disabled')}>
                  <h3>Policyholder Info</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  <p>Super duper cool</p>
                </a>
              </li>

              <li key="billing">
                <a className={classNames('disabled')}>
                  <h3>Billing Info</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  <p>Do some of the best things ever</p>
                </a>
              </li>

              <li key="summary">
                <a className={classNames('disabled')}>
                  <h3>Summary</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  <p>Do some of the best things ever</p>
                </a>
              </li>

              <li key="complete">
                <a className={classNames('disabled')}>
                  <h3>You did it!!!</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  <p>Do some of the best things ever</p>
                </a>
              </li>
            </ul>
          </li>

          {/********** APPLICATION **********/}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
