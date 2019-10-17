import React from 'react';
import classNames from 'classnames';
import { Switch, Field, validation } from '@exzeo/core-ui';

export const SummaryGroup = ({
  children,
  header,
  detailClass,
  switchClass,
  switchName,
  switchValue,
  handleEditClick,
  icon
}) => {
  return (
    <div className={classNames('detail-group', detailClass)}>
      <h3 className="section-group-header">
        {header}
        <span
          data-test={detailClass}
          className="edit-btn"
          onClick={handleEditClick}
        >
          <i className={classNames(icon)} />
        </span>
      </h3>
      {children}
      {switchName && (
        <Field name={switchName} validate={validation.isRequired}>
          {({ input, meta }) => (
            <Switch
              input={input}
              meta={meta}
              styleName="switch"
              customClass={classNames(switchClass)}
              label={switchValue ? 'Confirmed' : 'Confirm'}
              dataTest={switchName}
            />
          )}
        </Field>
      )}
    </div>
  );
};

SummaryGroup.defaultProps = {
  icon: 'fa fa-pencil',
  switchClass: 'verification'
};

export default SummaryGroup;
