import React, { useState } from 'react';
import SummaryGroup from './SummaryGroup';
import { noop } from '@exzeo/core-ui/src';

const PolicyholderDetails = ({ initialValues, renderChildren }) => {
  const [confirmPolicyHolder, setConfirmPolicyHolder] = useState(false);

  return (
    <React.Fragment>
      <SummaryGroup
        header="Policyholder Details"
        detailClass="policyholder-details"
        switchName="confirmPolicyHolder"
        switchValue={confirmPolicyHolder}
        switchOnChange={value => setConfirmPolicyHolder(value)}
        handleEditClick={noop}
      >
        {renderChildren && renderChildren()}
        {initialValues.policyHolders.length < 2 && (
          <dl className="secondary-policyholder">
            <div>
              <dt>No second policyholder on policy. </dt>
              <dd>
                <a href="#">Add one now?</a>
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
      </SummaryGroup>
    </React.Fragment>
  );
};

export default PolicyholderDetails;
