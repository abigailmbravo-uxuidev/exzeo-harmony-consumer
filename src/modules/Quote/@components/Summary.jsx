import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, noop, Switch } from '@exzeo/core-ui';
import { AgencyCard } from '@exzeo/harmony-core';

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
      <section className="iconContainer">
        <NavLink
          className={Button.constants.classNames.icon}
          to="/underwriting"
        >
          <FontAwesomeIcon icon="edit" />
          <label>Edit Quote</label>
        </NavLink>
        <Button
          data-test="share"
          className={Button.constants.classNames.icon}
          onClick={noop}
        >
          <FontAwesomeIcon icon="paper-plane" />
          <label>Email Quote</label>
        </Button>
      </section>
      <section>
        <strong>To continue, you will need the following information</strong>
        <br />
        <ul>
          <li>Mortgage information</li>
          <li>Name and Email address of additional owners</li>
          <li>
            Name and address of any other additional insured to add to your
            policy
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Summary;
