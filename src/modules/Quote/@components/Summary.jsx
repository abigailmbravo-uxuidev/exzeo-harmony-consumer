import React, { useState } from 'react';
import { noop, Switch } from '@exzeo/core-ui';
import { AgencyCard } from '@exzeo/harmony-core';
import { NavLink } from 'react-router-dom';

const Summary = ({ initialValues }) => {
  const [editAgency, setEditAgency] = useState(false);

  return (
    <div>
      <AgencyCard />
      <section>
        <Switch
          label="Want to switch to an agency of your choice?"
          dataTest="test"
          styleName="switch"
          input={{
            name: '',
            value: editAgency,
            onChange: () => setEditAgency(state => !state),
            onFocus: noop,
            onBlur: noop
          }}
        />
      </section>
      <section>
        <NavLink to="/underwriting">Edit Quote</NavLink>
        <button type="button" onClick={x => x}>
          Email Quote
        </button>
      </section>
      <section>
        <strong>To continue, you will need the following information</strong>
        <p>Mortgage information</p>
        <p>Name and Email address of additional owners</p>
        <p>
          Name and address of any other additional insured to add to your policy
        </p>
      </section>
    </div>
  );
};

export default Summary;
