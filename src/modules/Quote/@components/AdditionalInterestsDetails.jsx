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
      {groupedAdditionalInterests[AI_TYPES.mortgagee].length ? (
        <ul className="listItem">
          {groupedAdditionalInterests[AI_TYPES.mortgagee].map(ai => (
            <V2AdditionalInterestCard key={ai._id} ai={ai} />
          ))}
        </ul>
      ) : (
        <dl className="ai">
          <div>
            <dt>No mortgages added.</dt>
            <dd>
              <Link to="additionalInfo">Add mortgagee now?</Link>
            </dd>
          </div>
        </dl>
      )}

      {groupedAdditionalInterests[AI_TYPES.additionalInsured].length ? (
        <ul className="listItem">
          {groupedAdditionalInterests[AI_TYPES.additionalInsured].map(ai => (
            <V2AdditionalInterestCard key={ai._id} ai={ai} />
          ))}
        </ul>
      ) : (
        <dl className="ai">
          <div>
            <dt>No additional insured added.</dt>
            <dd>
              <Link to="additionalInfo">Add additional insured now?</Link>
            </dd>
          </div>
        </dl>
      )}

      {groupedAdditionalInterests[AI_TYPES.additionalInterest].length ? (
        <ul className="listItem">
          {groupedAdditionalInterests[AI_TYPES.additionalInterest].map(ai => (
            <V2AdditionalInterestCard key={ai._id} ai={ai} />
          ))}
        </ul>
      ) : (
        <dl className="ai">
          <div>
            <dt>No additional interest added.</dt>
            <dd>
              <Link to="additionalInfo">Add additional interest now?</Link>
            </dd>
          </div>
        </dl>
      )}
    </SummaryGroup>
  );
};

export default AdditionalInterestsDetails;
