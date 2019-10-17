import React, { useState } from 'react';
import SummaryGroup from './SummaryGroup';
import { noop } from '@exzeo/core-ui/src';

const AdditionalInterestsDetails = ({ initialValues, renderChildren }) => {
  const [confirmAdditionalInterests, setConfirmAdditionalInterests] = useState(
    false
  );

  return (
    <React.Fragment>
      <SummaryGroup
        header="Additional Insured Details"
        detailClass="ai-details"
        switchName="confirmAdditionalInterests"
        switchValue={confirmAdditionalInterests}
        switchOnChange={value => setConfirmAdditionalInterests(value)}
        handleEditClick={noop}
      >
        {renderChildren && renderChildren()}
        {initialValues.additionalInterests.filter(a => a.type === 'Mortgagee')
          .length === 0 && (
          <dl className="ai">
            <div>
              <dt>No mortgages added.</dt>
              <dd>
                <a href="#">Add one now?</a>
              </dd>
            </div>
          </dl>
        )}
        {initialValues.additionalInterests.filter(
          a => a.type === 'Additional Insured'
        ).length === 0 && (
          <dl className="ai">
            <div>
              <dt>No additional insured added.</dt>
              <dd>
                <a href="#">Add one now?</a>
              </dd>
            </div>
          </dl>
        )}
      </SummaryGroup>
    </React.Fragment>
  );
};

export default AdditionalInterestsDetails;
