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
      className={classNames('card', detailClass)}
      onClick={() => confirmField.input.onChange(!confirmField.input.value)}
    >
      <h5>{header}</h5>
      <Link to={link} className={classNames('link', detailClass)}>
        Edit
      </Link>
      {children}
      <label>{confirmField.input.value ? 'Selected' : 'Select'}</label>
    </div>
  );
};

SummaryGroup.defaultProps = {
  icon: 'fa fa-pencil',
  switchClass: 'verification',
  detailClass: ''
};

export default SummaryGroup;
