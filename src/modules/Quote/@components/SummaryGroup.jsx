import React from 'react';
import classNames from 'classnames';
import { useField, validation } from '@exzeo/core-ui';
import { Link } from 'react-router-dom';

export const SummaryGroup = ({
  children,
  header,
  detailClass,
  name,
  link,
  icon
}) => {
  const confirmField = useField(name, {
    validate: validation.isRequired
  });

  return (
    <div
      className={classNames('card', 'summaryCard', {
        selected: confirmField === confirmField.input.value
      })}
      onClick={() => confirmField.input.onChange(!confirmField.input.value)}
    >
      <dv className="card-header">
        <h3>{header}</h3>
        <Link to={link} className={classNames('link', detailClass)}>
          Edit
        </Link>
      </dv>
      <div className="cardContent">{children}</div>
      <div className="card-footer">
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
