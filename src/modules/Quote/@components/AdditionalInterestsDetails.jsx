import React from 'react';
import SummaryGroup from './SummaryGroup';
import { noop } from '@exzeo/core-ui/src';
import { Link } from 'react-router-dom';

const AdditionalInterestsDetails = ({ initialValues, renderChildren }) => {
  return (
    <React.Fragment>
      <SummaryGroup
        header="Additional Insured Details"
        detailClass="ai-details"
        name="confirmAdditionalInterest"
        link="additionalInfo"
        handleEditClick={noop}
      >
        {renderChildren && renderChildren()}
        {initialValues.additionalInterests.filter(a => a.type === 'Mortgagee')
          .length === 0 && (
          <dl className="ai">
            <div>
              <dt>No mortgages added.</dt>
              <dd>
                <Link to="additionalInfo">Add mortgagee now?</Link>
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
                <Link to="additionalInfo">Add additional insured now?</Link>
              </dd>
            </div>
          </dl>
        )}
      </SummaryGroup>
    </React.Fragment>
  );
};

export default AdditionalInterestsDetails;
