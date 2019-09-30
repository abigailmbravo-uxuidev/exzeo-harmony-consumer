import React, { useState } from 'react';
import { noop, Switch } from '@exzeo/core-ui';
import { ShareModal } from '@exzeo/harmony-core';

const Summary = ({ formInstance }) => {
  const [shareQuote, setShareQuote] = useState(false);

  return (
    <>
      <Switch
        label="I want to share & email my quote"
        dataTest="share-quote"
        styleName="switch"
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
            summaryType="agency"
            parentFormInstance={formInstance}
            closeModal={() => setShareQuote(false)}
            allowCancel={false}
          />
        </section>
      )}

      <hr />

      <strong>To continue, you will need the following information:</strong>
      <br />
      <ul>
        <li>Mortgage information</li>
        <li>Name and Email address of additional owners</li>
        <li>
          Name and address of any other additional insured to add to your policy
        </li>
      </ul>
    </>
  );
};

export default Summary;
