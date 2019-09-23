import React, { useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
/* animation will be applied here. classes will be: navSlideOut & navSlideIn */

import { ROUTES } from 'constants/navigation';
import { useQuote } from 'modules/Quote';
import { format } from '@exzeo/core-ui';

const Navigation = ({ location, match }) => {
  const { quote } = useQuote();
  const [navOpen, setNavOpen] = useState(false);
  const locationOrder = match.params.step ? ROUTES[match.params.step].order : 0;

  return (
    <>
      <button className="navOpener" onClick={() => setNavOpen(state => !state)}>
        <FontAwesomeIcon icon="chevron-right" size="sm" />
      </button>

      <div
        className={classNames('navBackground', {
          show: navOpen,
          hide: !navOpen
        })}
        onClick={() => setNavOpen(state => !state)}
      >
        <FontAwesomeIcon icon="times" size="lg" />
      </div>

      <nav
        role="navigation"
        className={classNames('navWrapper', {
          navSlideOut: navOpen,
          navSlideIn: !navOpen
        })}
      >
        <div className="propertyAddressWrapper">
          {quote.quoteNumber ? (
            <>
              <p>
                <strong>{quote.property.physicalAddress.address1}</strong>
              </p>
              <p>{format.toCityStateZip(quote.property.physicalAddress)}</p>
              <p>{`Year built: ${quote.property.yearBuilt}`}</p>
              <p>{`Flood Zone: "${quote.property.floodZone}"`}</p>
            </>
          ) : (
            <p />
          )}
        </div>
        <ul className="mainNavigation">
          {/********** RETRIEVE QUOTE **********/}
          <li
            key={ROUTES.retrieveQuote.label}
            className={classNames({
              hide: location.pathname !== ROUTES.retrieveQuote.path
            })}
          >
            <h3>{ROUTES.retrieveQuote.label}</h3>
            <span />
            <p />
          </li>
          {/********** RETRIEVE QUOTE **********/}

          {/********** SEARCH ADDRESS **********/}
          <li
            key={ROUTES.searchAddress.label}
            className={classNames({
              hide: location.pathname !== ROUTES.searchAddress.path
            })}
          >
            <h3>{ROUTES.searchAddress.label}</h3>
            <span />
            <p />
          </li>
          {/********** SEARCH ADDRESS **********/}

          {/********** QUOTE **********/}
          <li
            key="quote"
            className={classNames({
              disabled:
                location.pathname === '/searchAddress' ||
                location.pathname === '/retrieveQuote',
              complete: locationOrder > ROUTES.additionalInfo.order
            })}
          >
            <h3>Quote</h3>
            <span>1</span>
            <p />

            <ul>
              <li key={ROUTES.underwriting.label}>
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
                  <h3>{ROUTES.underwriting.label}</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  {locationOrder <= ROUTES.underwriting.order ? (
                    <p>text BEFORE</p>
                  ) : (
                    <p>text AFTER </p>
                  )}
                </NavLink>
              </li>

              <li key={ROUTES.customize.label}>
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
                  <h3>{ROUTES.customize.label}</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  {locationOrder <= ROUTES.customize.order ? (
                    <p>text BEFORE</p>
                  ) : (
                    <p>text AFTER </p>
                  )}
                </NavLink>
              </li>

              <li key={ROUTES.save.label}>
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
                  <h3>{ROUTES.save.label}</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  {locationOrder <= ROUTES.save.order ? (
                    <p>text BEFORE</p>
                  ) : (
                    <p>text AFTER </p>
                  )}
                </NavLink>
              </li>

              <li key={ROUTES.share.label}>
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
                  <h3>{ROUTES.share.label}</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  {locationOrder <= ROUTES.share.order ? (
                    <p>text BEFORE</p>
                  ) : (
                    <p>text AFTER </p>
                  )}
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
                  {locationOrder <= ROUTES.underwriting.order ? (
                    <p>text BEFORE</p>
                  ) : (
                    <p>text AFTER </p>
                  )}
                </a>
              </li>

              <li key="policyholder">
                <a className={classNames('disabled')}>
                  <h3>Policyholder Info</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  {locationOrder <= ROUTES.underwriting.order ? (
                    <p>text BEFORE</p>
                  ) : (
                    <p>text AFTER </p>
                  )}
                </a>
              </li>

              <li key="billing">
                <a className={classNames('disabled')}>
                  <h3>Billing Info</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  {locationOrder <= ROUTES.underwriting.order ? (
                    <p>text BEFORE</p>
                  ) : (
                    <p>text AFTER </p>
                  )}
                </a>
              </li>

              <li key="summary">
                <a className={classNames('disabled')}>
                  <h3>Summary</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  {locationOrder <= ROUTES.underwriting.order ? (
                    <p>text BEFORE</p>
                  ) : (
                    <p>text AFTER </p>
                  )}
                </a>
              </li>

              <li key="complete">
                <a className={classNames('disabled')}>
                  <h3>You did it!!!</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  {locationOrder <= ROUTES.underwriting.order ? (
                    <p>text BEFORE</p>
                  ) : (
                    <p>text AFTER </p>
                  )}
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
