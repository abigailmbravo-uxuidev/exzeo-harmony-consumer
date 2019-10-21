import React from 'react';
import SummaryGroup from './SummaryGroup';
import { noop } from '@exzeo/core-ui/src';
import { Link } from 'react-router-dom';

const PolicyholderDetails = ({ initialValues, renderChildren, config }) => {
  return (
    <React.Fragment>
      <SummaryGroup
        header="Policyholder Details"
        detailClass="policyholder-details"
        name="confirmPolicyHolder"
        link="policyholder"
        handleEditClick={noop}
      >
        {renderChildren && renderChildren()}
        {initialValues.policyHolders.length < 2 && (
          <dl className="secondary-policyholder">
            <div>
              <dt>No second policyholder on policy. </dt>
              <dd>
                <Link to="policyholder">Add second policyholder now?</Link>
              </dd>
            </div>
          </dl>
        )}
        <dl className="mailing-address">
          <div>
            <dt>Mailing Address</dt>
            <dd>{initialValues.policyHolderMailingAddress.address1}</dd>
            {initialValues.policyHolderMailingAddress.address2 && (
              <dd>{initialValues.policyHolderMailingAddress.address2}</dd>
            )}
            <dd>
              {initialValues.policyHolderMailingAddress.city},{' '}
              {initialValues.policyHolderMailingAddress.state}{' '}
              {initialValues.policyHolderMailingAddress.zip}
            </dd>
          </div>
        </dl>
        {config.extendedProperties.subtitle && (
          <div className="subtitle">
            <p>{config.extendedProperties.subtitle}</p>
          </div>
        )}
      </SummaryGroup>
    </React.Fragment>
  );
};

export default PolicyholderDetails;
