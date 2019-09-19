import React, { useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
/* animation will be applied here. classes will be: navSlideOut & navSlideIn */

import { ROUTES } from 'constants/navigation';
import { useQuote } from 'modules/Quote';
import { format } from '@exzeo/core-ui';

const Navigation = ({ location, match, history }) => {
  const { quote } = useQuote();
  const [navOpen, setNavOpen] = useState(false);
  const locationOrder = match.params.step ? ROUTES[match.params.step].order : 0;

  return (
    <>
      <button className="navOpener" onClick={() => setNavOpen(state => !state)}>
        <FontAwesomeIcon icon="chevron-right" size="sm" />
      </button>

      <nav
        role="navigation"
        className={classNames('navSlideOut', {
          open: navOpen,
          closed: !navOpen
        })}
      >
        <ul className="mainNavigation">
          {/********** RETRIEVE **********/}
          <li
            key="retrieve"
            className={classNames({
              hide: location.pathname !== ROUTES.retrieveQuote.path
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
              disabled: location.pathname === '/retrieveQuote',
              complete: locationOrder > ROUTES.additionalInfo.order
            })}
          >
            <h3>Quote</h3>
            {/*hide number span when li gets complete class*/}
            {locationOrder < ROUTES.additionalInfo.order && (
              <>
                <span>1{/*<FontAwesomeIcon icon="check-circle" />*/}</span>
                <p />
              </>
            )}

            <ul>
              <li key="address">
                <NavLink
                  to={
                    locationOrder > ROUTES.searchAddress.order
                      ? '/searchAddress'
                      : '/searchAddress'
                  }
                  activeClassName="active"
                  className={classNames({
                    complete: locationOrder > ROUTES.searchAddress.order
                  })}
                >
                  <h3>Address</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  {quote.quoteNumber ? (
                    <>
                      <p>
                        <strong>
                          {quote.property.physicalAddress.address1}
                        </strong>
                      </p>
                      <p>
                        {format.toCityStateZip(quote.property.physicalAddress)}
                      </p>
                      <p>{`Year built: ${quote.property.yearBuilt}`}</p>
                      <p>{`Flood Zone: "${quote.property.floodZone}"`}</p>
                    </>
                  ) : (
                    <p>Enter your desired flood quote address.</p>
                  )}
                </NavLink>
              </li>

              <li key="underwriting">
                <NavLink
                  to={
                    locationOrder < ROUTES.underwriting.order
                      ? '#'
                      : `/quote/${match.params.quoteNumber}/underwriting`
                  }
                  activeClassName="active"
                  className={classNames({
                    disabled: locationOrder < ROUTES.underwriting.order,
                    complete: locationOrder > ROUTES.underwriting.order
                  })}
                >
                  <h3>Underwriting</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  <p>You have successfully answered the required questions.</p>
                </NavLink>
              </li>

              <li key="customize">
                <NavLink
                  to={
                    locationOrder < ROUTES.customize.order
                      ? '#'
                      : `/quote/${match.params.quoteNumber}/customize`
                  }
                  activeClassName="active"
                  className={classNames({
                    disabled: locationOrder < ROUTES.customize.order,
                    complete: locationOrder > ROUTES.customize.order
                  })}
                >
                  <h3>Customize Quote</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  <p>Building limit</p>
                  <p>Personal property</p>
                  <p>Deductible</p>
                </NavLink>
              </li>

              <li key="save">
                <NavLink
                  to={
                    locationOrder < ROUTES.save.order
                      ? '#'
                      : `/quote/${match.params.quoteNumber}/save`
                  }
                  activeClassName="active"
                  className={classNames({
                    disabled: locationOrder < ROUTES.save.order,
                    complete: locationOrder > ROUTES.save.order
                  })}
                >
                  <h3>Save Quote</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  <p>
                    Jerky id capicola ham hock nisi minim lorem sint sirloin
                    elit ground round ad.
                  </p>
                </NavLink>
              </li>

              <li key="share">
                <NavLink
                  to={
                    locationOrder < ROUTES.share.order
                      ? '#'
                      : `/quote/${match.params.quoteNumber}/share`
                  }
                  activeClassName="active"
                  className={classNames({
                    disabled: locationOrder < ROUTES.share.order,
                    complete: locationOrder > ROUTES.share.order
                  })}
                >
                  <h3>Share Quote</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  <p>
                    Jerky id capicola ham hock nisi minim lorem sint sirloin
                    elit ground round ad.
                  </p>
                </NavLink>
              </li>
            </ul>
          </li>
          {/********** QUOTE ***********/}

          {/********** APPLICATION **********/}
          <li key="application" className={classNames({ disabled: true })}>
            <h3>Application</h3>
            <span>2</span>
            <p className="application" />
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
