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
      <h4>Mortgage</h4>
      {groupedAdditionalInterests[AI_TYPES.mortgagee].length ? (
        <ul className="listItem">
          {groupedAdditionalInterests[AI_TYPES.mortgagee].map(ai => (
            <>
              <label>{`${AI_TYPES.mortgagee} ${ai.order + 1}`}</label>
              <V2AdditionalInterestCard key={ai._id} ai={ai} />
            </>
          ))}
        </ul>
      ) : (
        <>
          <label>No mortgages added.</label>
          <Link to="additionalInfo">Add mortgagee now?</Link>
        </>
      )}
      <h4>Additional Insured</h4>
      {groupedAdditionalInterests[AI_TYPES.additionalInsured].length ? (
        <ul className="listItem">
          {groupedAdditionalInterests[AI_TYPES.additionalInsured].map(ai => (
            <V2AdditionalInterestCard key={ai._id} ai={ai} />
          ))}
        </ul>
      ) : (
        <>
          <label>No additional insured added.</label>
          <Link to="additionalInfo">Add additional insured now?</Link>
        </>
      )}
      <h4>Additional Interest</h4>
      {groupedAdditionalInterests[AI_TYPES.additionalInterest].length ? (
        <ul className="listItem">
          {groupedAdditionalInterests[AI_TYPES.additionalInterest].map(ai => (
            <V2AdditionalInterestCard key={ai._id} ai={ai} />
          ))}
        </ul>
      ) : (
        <>
          <label>No additional interest added.</label>
          <Link to="additionalInfo">Add additional interest now?</Link>
        </>
      )}
    </SummaryGroup>
  );
};

export default AdditionalInterestsDetails;
