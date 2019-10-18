import React from 'react';
import classNames from 'classnames';
import { useField, validation } from '@exzeo/core-ui';

export const SummaryGroup = ({
  children,
  header,
  detailClass,
  name,
  handleEditClick,
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
      <span
        data-test={detailClass}
        className="edit-btn"
        onClick={handleEditClick}
      >
        <i className={classNames(icon)} /> Edit
      </span>
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
