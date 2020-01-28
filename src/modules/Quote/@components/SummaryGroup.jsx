import React from 'react';
import classNames from 'classnames';
import { useField } from '@exzeo/core-ui';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const requireConfirmation = value =>
  value === true || value === 'true' ? undefined : 'Field Required';

export const SummaryGroup = ({ children, header, detailClass, name, link }) => {
  const confirmField = useField(name, {
    validate: requireConfirmation
  });

  const confirmFieldError =
    confirmField.meta.touched && confirmField.meta.error;

  return (
    <div
      onClick={() => confirmField.input.onChange(!confirmField.input.value)}
      className={classNames('card', 'summaryCard', header, {
        selected: confirmField.input.value,
        error: confirmFieldError
      })}
    >
      {confirmField.input.value && (
        <div
          className="confirmedIndicator"
          data-test="confirmed"
          /*onClick={() => confirmField.input.onChange(!confirmField.input.value)}*/
        >
          <div className="confirmedMessage">
            <FontAwesomeIcon icon="times" />
            <FontAwesomeIcon icon="check" />
            <h5>Confirmed</h5>
          </div>
        </div>
      )}
      <div className="card-header">
        <h3>{header}</h3>
        <Link to={link} className={classNames('link', detailClass)}>
          <FontAwesomeIcon icon="edit" />
        </Link>
      </div>
      <div className="cardContent">{children}</div>
      {confirmFieldError && <span>Please confirm details to continue</span>}
      <div
        className="card-footer"
        data-test="confirm"
        onClick={() => confirmField.input.onChange(!confirmField.input.value)}
      >
        <label>
          {confirmField.input.value ? 'Confirmed' : 'Click to Confirm'}
        </label>
      </div>
    </div>
  );
};

SummaryGroup.defaultProps = {
  icon: 'fa fa-pencil',
  switchClass: 'verification',
  detailClass: ''
};

export default SummaryGroup;
