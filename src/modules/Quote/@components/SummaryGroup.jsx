import React from 'react';
import classNames from 'classnames';
import { Switch, noop } from '@exzeo/core-ui';

export const SummaryGroup = ({
  children,
  header,
  detailClass,
  switchClass,
  switchName,
  switchValue,
  switchOnChange,
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
        <Switch
          input={{
            name: switchName,
            value: switchValue,
            onChange: switchOnChange,
            onFocus: noop,
            onBlur: noop
          }}
          styleName="switch"
          customClass={classNames(switchClass)}
          label="Verified"
          dataTest={switchName}
        />
      )}
    </div>
  );
};

SummaryGroup.defaultProps = {
  icon: 'fa fa-pencil',
  switchClass: 'verification'
};

export default SummaryGroup;
