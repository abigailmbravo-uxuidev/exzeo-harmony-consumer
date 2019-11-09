import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, Link } from 'react-router-dom';
import { format } from '@exzeo/core-ui';

import { ROUTES } from 'constants/navigation';
import { useQuote } from 'modules/Quote';
import { hasUnderwritingExceptions } from 'utilities/underwritingExceptions';

const Navigation = ({ location, match }) => {
  const { quote } = useQuote();
  const [navOpen, setNavOpen] = useState(false);
  const locationOrder = match.params.step ? ROUTES[match.params.step].order : 0;
  const workflowPage = match.params.step
    ? ROUTES[match.params.step].workflowPage
    : -1;

  const { hasError, hasException } = useMemo(
    () => hasUnderwritingExceptions(workflowPage, quote.underwritingExceptions),
    [workflowPage, quote.underwritingExceptions]
  );

  const isRouteActive = linkOrder => () => {
    return linkOrder === locationOrder;
  };

  return (
    <React.Fragment>
      <button
        className={classNames('navOpener', {
          hasUnderwritingError: hasError,
          hasUnderwritingException: hasException
        })}
        onClick={() => setNavOpen(state => !state)}
      >
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
          navSlideIn: !navOpen,
          // TODO can we make this "hide" or "disabled" since it now serves more uses than originally intended?
          hasUnderwritingError:
            hasError || locationOrder === ROUTES.complete.order,
          hasUnderwritingException: hasException
        })}
      >
        <div className="propertyAddressWrapper">
          {quote.quoteNumber ? (
            <React.Fragment>
              <p>
                <strong>{quote.property.physicalAddress.address1}</strong>
              </p>
              <p>{format.toCityStateZip(quote.property.physicalAddress)}</p>
              <p>{`FEMA Flood Zone: "${quote.property.FEMAfloodZone}"`}</p>
              <p>{`Year built: ${quote.property.yearBuilt}`}</p>
            </React.Fragment>
          ) : (
            <p />
          )}
        </div>
        <ul className="mainNavigation">
          {/********** RETRIEVE QUOTE **********/}
          <li
            key={ROUTES.retrieveQuote.key}
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
            key={ROUTES.searchAddress.key}
            className={classNames({
              hide: location.pathname !== ROUTES.searchAddress.path,
              complete: location.pathname === '/thankyou'
            })}
          >
            {location.pathname === '/thankyou' ? (
              <Link to={ROUTES.searchAddress.path}>
                <h3>{ROUTES.searchAddress.label}</h3>
                <span />
                <p />
              </Link>
            ) : (
              <React.Fragment>
                <h3>{ROUTES.searchAddress.label}</h3>
                <span />
                <p />
              </React.Fragment>
            )}
          </li>
          {/********** SEARCH ADDRESS **********/}

          {/********** QUOTE **********/}
          <li
            key="quote"
            className={classNames({
              disabled:
                location.pathname === '/searchAddress' ||
                location.pathname === '/retrieveQuote' ||
                location.pathname === '/thankYou',
              complete: locationOrder >= ROUTES.additionalInfo.order
            })}
          >
            <Link
              to={
                locationOrder < ROUTES.additionalInfo.order
                  ? '#'
                  : `/quote/${match.params.quoteNumber}/underwriting`
              }
            >
              <h3>Quote</h3>
              <span>1</span>
              <p />
            </Link>

            <ul>
              <li key={ROUTES.underwriting.key}>
                <NavLink
                  to={
                    locationOrder < ROUTES.underwriting.order
                      ? '#'
                      : `/quote/${match.params.quoteNumber}/underwriting`
                  }
                  isActive={isRouteActive(ROUTES.underwriting.order)}
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
                    <p></p>
                  ) : (
                    <p></p>
                  )}
                </NavLink>
              </li>

              <li key={ROUTES.customize.key}>
                <NavLink
                  exact
                  to={
                    locationOrder < ROUTES.customize.order
                      ? '#'
                      : `/quote/${match.params.quoteNumber}/customize`
                  }
                  isActive={isRouteActive(ROUTES.customize.order)}
                  className={classNames({
                    disabled: locationOrder < ROUTES.customize.order,
                    complete: locationOrder > ROUTES.customize.order
                  })}
                >
                  <h3>{ROUTES.customize.label}</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  {locationOrder <= ROUTES.customize.order ? <p></p> : <p></p>}
                </NavLink>
              </li>

              <li key={ROUTES.save.key}>
                <NavLink
                  to={
                    locationOrder < ROUTES.save.order
                      ? '#'
                      : `/quote/${match.params.quoteNumber}/save`
                  }
                  isActive={isRouteActive(ROUTES.save.order)}
                  className={classNames({
                    disabled: locationOrder < ROUTES.save.order,
                    complete: locationOrder > ROUTES.save.order
                  })}
                >
                  <h3>{ROUTES.save.label}</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  {locationOrder <= ROUTES.save.order ? <p></p> : <p></p>}
                </NavLink>
              </li>

              <li key={ROUTES.share.key}>
                <NavLink
                  to={
                    locationOrder < ROUTES.share.order
                      ? '#'
                      : `/quote/${match.params.quoteNumber}/share`
                  }
                  isActive={isRouteActive(ROUTES.share.order)}
                  className={classNames({
                    disabled: locationOrder < ROUTES.share.order,
                    complete: locationOrder > ROUTES.share.order
                  })}
                >
                  <h3>{ROUTES.share.label}</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  {locationOrder <= ROUTES.share.order ? <p></p> : <p></p>}
                </NavLink>
              </li>
            </ul>
          </li>
          {/********** QUOTE ***********/}

          {/********** APPLICATION **********/}
          <li
            key="application"
            className={classNames({
              disabled: locationOrder < ROUTES.additionalInfo.order,
              complete: false
            })}
          >
            <h3>Application</h3>
            <span>2</span>
            <p className="application" />

            <ul>
              <li key={ROUTES.additionalInfo.key}>
                <NavLink
                  to={
                    locationOrder < ROUTES.additionalInfo.order
                      ? '#'
                      : `/quote/${match.params.quoteNumber}/additionalInfo`
                  }
                  isActive={isRouteActive(ROUTES.additionalInfo.order)}
                  className={classNames({
                    disabled: locationOrder < ROUTES.additionalInfo.order,
                    complete: locationOrder > ROUTES.additionalInfo.order
                  })}
                >
                  <h3>{ROUTES.additionalInfo.label}</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  {locationOrder <= ROUTES.additionalInfo.order ? (
                    <p></p>
                  ) : (
                    <p></p>
                  )}
                </NavLink>
              </li>

              <li key={ROUTES.policyholder.key}>
                <NavLink
                  exact
                  to={
                    locationOrder < ROUTES.policyholder.order
                      ? '#'
                      : `/quote/${match.params.quoteNumber}/policyholder`
                  }
                  isActive={isRouteActive(ROUTES.policyholder.order)}
                  className={classNames({
                    disabled: locationOrder < ROUTES.policyholder.order,
                    complete: locationOrder > ROUTES.policyholder.order
                  })}
                >
                  <h3>{ROUTES.policyholder.label}</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  {locationOrder <= ROUTES.policyholder.order ? (
                    <p></p>
                  ) : (
                    <p></p>
                  )}
                </NavLink>
              </li>

              <li key={ROUTES.billing.key}>
                <NavLink
                  to={
                    locationOrder < ROUTES.billing.order
                      ? '#'
                      : `/quote/${match.params.quoteNumber}/billing`
                  }
                  isActive={isRouteActive(ROUTES.billing.order)}
                  className={classNames({
                    disabled: locationOrder < ROUTES.billing.order,
                    complete: locationOrder > ROUTES.billing.order
                  })}
                >
                  <h3>{ROUTES.billing.label}</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  {locationOrder <= ROUTES.billing.order ? <p></p> : <p></p>}
                </NavLink>
              </li>

              <li key={ROUTES.summary.key}>
                <NavLink
                  to={
                    locationOrder < ROUTES.summary.order
                      ? '#'
                      : `/quote/${match.params.quoteNumber}/summary`
                  }
                  isActive={isRouteActive(ROUTES.summary.order)}
                  className={classNames({
                    disabled: locationOrder < ROUTES.summary.order,
                    complete: locationOrder > ROUTES.summary.order
                  })}
                >
                  <h3>{ROUTES.summary.label}</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  {locationOrder <= ROUTES.summary.order ? <p></p> : <p></p>}
                </NavLink>
              </li>

              <li key={ROUTES.complete.key}>
                <NavLink
                  to={
                    locationOrder < ROUTES.complete.order
                      ? '#'
                      : `/quote/${match.params.quoteNumber}/complete`
                  }
                  isActive={isRouteActive(ROUTES.complete.order)}
                  className={classNames({
                    disabled: locationOrder < ROUTES.complete.order,
                    complete: locationOrder > ROUTES.complete.order
                  })}
                >
                  <h3>You did it!</h3>
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                  {/*{locationOrder <= ROUTES.complete.order ? <p></p> : <p></p>}*/}
                </NavLink>
              </li>
            </ul>
          </li>
          {/********** APPLICATION **********/}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Navigation;
