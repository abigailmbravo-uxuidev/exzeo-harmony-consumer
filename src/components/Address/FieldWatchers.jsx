import React from 'react';
import { Field, OnChangeListener } from '@exzeo/core-ui';
import _get from 'lodash.get';

const FieldWatchers = ({ watchField, fieldPrefix, matchPrefix, values }) => {
  return (
    <React.Fragment>
      <Field name={`${fieldPrefix}.address1`} subscription={{}}>
        {({ input: { onChange } }) => (
          <OnChangeListener name={watchField}>
            {value => {
              if (value) {
                onChange(_get(values, `${matchPrefix}.address1`, ''));
              } else {
                onChange('');
              }
            }}
          </OnChangeListener>
        )}
      </Field>

      <Field name={`${fieldPrefix}.address2`} subscription={{}}>
        {({ input: { onChange } }) => (
          <OnChangeListener name={watchField}>
            {value => {
              if (value) {
                onChange(_get(values, `${matchPrefix}.address2`, ''));
              } else {
                onChange('');
              }
            }}
          </OnChangeListener>
        )}
      </Field>

      <Field name={`${fieldPrefix}.city`} subscription={{}}>
        {({ input: { onChange } }) => (
          <OnChangeListener name={watchField}>
            {value => {
              if (value) {
                onChange(_get(values, `${matchPrefix}.city`, ''));
              } else {
                onChange('');
              }
            }}
          </OnChangeListener>
        )}
      </Field>

      <Field name={`${fieldPrefix}.state`} subscription={{}}>
        {({ input: { onChange } }) => (
          <OnChangeListener name={watchField}>
            {value => {
              if (value) {
                onChange(_get(values, `${matchPrefix}.state`, ''));
              } else {
                onChange('');
              }
            }}
          </OnChangeListener>
        )}
      </Field>

      <Field name={`${fieldPrefix}.zip`} subscription={{}}>
        {({ input: { onChange } }) => (
          <OnChangeListener name={watchField}>
            {value => {
              if (value) {
                onChange(_get(values, `${matchPrefix}.zip`, ''));
              } else {
                onChange('');
              }
            }}
          </OnChangeListener>
        )}
      </Field>
    </React.Fragment>
  );
};

export default FieldWatchers;
