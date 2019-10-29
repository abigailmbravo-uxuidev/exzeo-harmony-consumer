import React from 'react';
import classNames from 'classnames';
import { useField, validation } from '@exzeo/core-ui';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SummaryGroup = ({ children, header, detailClass, name, link }) => {
  const confirmField = useField(name, {
    validate: validation.isRequired
  });

  return (
    <div
      className={classNames('card', 'summaryCard', header, {
        selected: confirmField.input.value,
        error: confirmField.meta.touched && confirmField.meta.error
      })}
    >
      {confirmField.meta.touched && confirmField.meta.error && (
        <span>You did something wrong!!!</span>
      )}

      {confirmField.input.value && (
        <div
          className="confirmedIndicator"
          onClick={() => confirmField.input.onChange(!confirmField.input.value)}
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
      <div
        className="card-footer"
        onClick={() => confirmField.input.onChange(!confirmField.input.value)}
      >
        <label>{confirmField.input.value ? 'Confirmed' : 'Confirm'}</label>
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
