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
        <Button
          data-test="home"
          className={Button.constants.classNames.icon}
          onClick={noop}
        >
          <svg className="iconTyptap" viewBox="0 0 24.71844 31.31418">
            <path
              class="cls-1"
              d="M9.41708,8.39444l17.24841,17.2484a.32037.32037,0,0,1,0,.45256l-3.85631,3.85631a.32.32,0,0,1-.45255,0L5.33451,12.92958a.32037.32037,0,0,1,0-.45256L9.41708,8.39444m0-2.26274-5.214,5.21395a1.92,1.92,0,0,0,0,2.71529L21.22527,31.08308a1.92,1.92,0,0,0,2.71529,0l3.85631-3.85631a1.92,1.92,0,0,0,0-2.71529L9.41708,6.1317Z"
              transform="translate(-3.64078 -0.34291)"
            />
            <path
              class="cls-1"
              d="M22.42164,19.44782l5.37523-5.37523a1.92,1.92,0,0,0,0-2.71529l-5.21395-5.214-6.73287,6.73287Z"
              transform="translate(-3.64078 -0.34291)"
            />
            <path
              class="cls-1"
              d="M9.50456,19.22171,4.20314,24.52313a1.92,1.92,0,0,0,0,2.7153l3.85629,3.8563a1.92,1.92,0,0,0,2.7153,0l5.30142-5.30142Z"
              transform="translate(-3.64078 -0.34291)"
            />
            <path
              class="cls-1"
              d="M14.74952.86443,10.40406,5.20989l5.61852,5.61852,5.60451-5.60452L17.26762.86443A1.78055,1.78055,0,0,0,14.74952.86443Z"
              transform="translate(-3.64078 -0.34291)"
            />
          </svg>
          <label>www.TypTap.com</label>
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
