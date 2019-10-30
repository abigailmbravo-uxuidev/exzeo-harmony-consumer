import React from 'react';
import { Link } from 'react-router-dom';
import { noop } from '@exzeo/core-ui/src';
import {
  V2AdditionalInterestCard,
  useAdditionalInterests,
  AI_TYPES
} from '@exzeo/core-ui/src/@Harmony';
import SummaryGroup from './SummaryGroup';

const AdditionalInterestsDetails = ({ initialValues }) => {
  const { groupedAdditionalInterests } = useAdditionalInterests(initialValues);

  return (
    <SummaryGroup
      header="Additional Insured Details"
      detailClass="ai-details"
      name="confirmAdditionalInterest"
      link="additionalInfo"
      handleEditClick={noop}
    >
      <dl className="">
        {groupedAdditionalInterests[AI_TYPES.mortgagee].length ? (
          groupedAdditionalInterests[AI_TYPES.mortgagee].map(ai => (
            <React.Fragment key={ai._id}>
              <dt>{`${AI_TYPES.mortgagee} ${ai.order + 1}`}</dt>
              <dd>
                <V2AdditionalInterestCard ai={ai} />
              </dd>
            </React.Fragment>
          ))
        ) : (
          <React.Fragment>
            <dt>Mortgagee</dt>
            <dd>
              <label>No mortgagees added.</label>
              <Link to="additionalInfo">Add mortgagee now?</Link>
            </dd>
          </React.Fragment>
        )}
      </dl>

      <dl className="">
        <dt>Additional Insured</dt>
        {groupedAdditionalInterests[AI_TYPES.additionalInsured].length ? (
          groupedAdditionalInterests[AI_TYPES.additionalInsured].map(ai => (
            <dd key={ai._id}>
              <V2AdditionalInterestCard ai={ai} />
            </dd>
          ))
        ) : (
          <dd>
            <label>No additional insured added.</label>
            <Link to="additionalInfo">Add additional insured now?</Link>
          </dd>
        )}
      </dl>

      <dl className="">
        <dt>Additional Interest</dt>
        {groupedAdditionalInterests[AI_TYPES.additionalInterest].length ? (
          groupedAdditionalInterests[AI_TYPES.additionalInterest].map(ai => (
            <dd key={ai._id}>
              <V2AdditionalInterestCard ai={ai} />
            </dd>
          ))
        ) : (
          <dd>
            <label>No additional interest added.</label>
            <Link to="additionalInfo">Add additional interest now?</Link>
          </dd>
        )}
      </dl>
    </SummaryGroup>
  );
};

export default AdditionalInterestsDetails;
