import React, { useState } from 'react';
import { noop, Switch } from '@exzeo/core-ui';
import { ShareModal } from '@exzeo/core-ui/src/@Harmony';

const Share = ({ formInstance }) => {
  const [shareQuote, setShareQuote] = useState(false);

  return (
    <React.Fragment>
      <Switch
        label="I want to share & email my quote"
        dataTest="share-quote"
        styleName="switch shareSwitch"
        input={{
          name: '',
          value: shareQuote,
          onChange: value => setShareQuote(value),
          onFocus: noop,
          onBlur: noop
        }}
      />

      {shareQuote && (
        <section className="well">
          <ShareModal
            summaryType="consumer"
            parentFormInstance={formInstance}
            closeModal={() => setShareQuote(false)}
            allowCancel={false}
          />
        </section>
      )}

      <hr />

      <h5>To continue, you will need the following information:</h5>
      <ul>
        <li>Mortgage information</li>
        <li>Name and Email address of additional owners</li>
        <li>
          Name and address of any other additional insured to add to your policy
        </li>
      </ul>
    </React.Fragment>
  );
};

export default Share;
