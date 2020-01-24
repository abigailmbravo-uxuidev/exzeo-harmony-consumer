import React from 'react';
import Confetti from 'components/Confetti';
import ContactPhoneAnchor from 'components/ContactPhoneAnchor';
import ContactEmailAnchor from 'components/ContactEmailAnchor';
import TypTapLink from 'components/TypTapLink';
import Trophy from 'components/Trophy';

const ThankYou = () => {
  return (
    <div className="card congratsCard" data-test="quote-complete">
      <Confetti />
      <Trophy />
      <label className="congratsTitle">Congratulations!</label>
      <p>You have completed all the steps for your TypTap Flood Policy.</p>
      <p>
        1. You will be receiving an e-mail (to the e-mail address you provided),
        containing your insurance application. Please review the information and
        sign the application.
      </p>

      <p>
        2. Once you have signed the application, it will be routed to any other
        additional policyholders for their signature.
      </p>

      <p>
        3. Upon completion of all required signatures, we will issue your
        policy.
      </p>

      <p>
        4. The above steps need to be completed within 10 days to create your
        policy.
      </p>

      <p>
        5. A copy of the policy, and required documents will then be sent to
        your email.
      </p>
      <p>
        Thank you for your business! If you have any questions or concerns,
        please contact us.
      </p>

      <div className="congratsCardFooter">
        <ContactPhoneAnchor />
        <ContactEmailAnchor />
        <TypTapLink />
      </div>
    </div>
  );
};

export default ThankYou;

/*you did it*/
