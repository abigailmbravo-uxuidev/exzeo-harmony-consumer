import React, { useEffect } from 'react';
import { sendQuoteSummary as sendSummary } from '@exzeo/core-ui/src/@Harmony';
import Confetti from 'components/Confetti';
import TypTapLink from 'components/TypTapLink';
import Trophy from 'components/Trophy';

const ThankYou = ({ location }) => {
  useEffect(() => {
    if ((location.state || {}).sendQuoteSummary) {
      const { sendQuoteSummary, ...payload } = location.state;
      sendSummary(payload);
    }
  }, [location.state]);

  return (
    <div className="card thankYouCard">
      <Confetti />
      <Trophy />
      <label className="thankYouTitle">Quote Saved!</label>
      {(location.state || {}).quoteNumber && (
        <h4 className="quoteNumber">
          Quote Number:&nbsp;{location.state.quoteNumber}
        </h4>
      )}

      <p>
        Thank you for choosing TypTap to provide a Flood Quote for your
        property. We can't wait for you to come back and finish the quote. If
        you need our help, call us, email us, send a carrier pigeon, whatever!
        We're here and love to talk all things insurance!
      </p>
      <TypTapLink />
    </div>
  );
};

export default ThankYou;
