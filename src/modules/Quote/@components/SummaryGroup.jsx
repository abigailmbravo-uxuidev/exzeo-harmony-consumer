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
    <div className={classNames('detailGroup card', detailClass)}>
      <h4 className="cardHeader">
        {header}
        <span
          data-test={detailClass}
          className="edit-btn"
          onClick={handleEditClick}
        >
          <i className={classNames(icon)} />
        </span>
      </h4>
      <div className="cardContent">{children}</div>
      <footer className="cardFooter">
        <label>Confirmed : Confirm</label>
        {/* 
      {switchName && (
        <Field name={switchName} validate={validation.isRequired}>
          {({ input, meta }) => (
            <Switch
              input={input}
              meta={meta}
              styleName="switch"
              customClass={classNames(switchClass)}
              label={switchValue ? "Confirmed" : "Confirm"}
              dataTest={switchName}
            />
          )}
        </Field>
      )}*/}
      </footer>
    </div>
  );
};

SummaryGroup.defaultProps = {
  icon: 'fa fa-pencil',
  switchClass: 'verification'
};

export default SummaryGroup;
