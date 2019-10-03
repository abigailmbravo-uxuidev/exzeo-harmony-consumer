import React from 'react';
import { Form, Field, Radio, validation } from '@exzeo/core-ui';
// import {} from '@exzeo/harmony-core';

// function setInitialState(initialValues) {
//   const answers = {};
//   initialValues.additionalInterests.forEach(ai => {
//     return;
//   });
// }

const BOOL_OPTIONS = [
  { answer: true, label: 'YES' },
  { answer: false, label: 'NO' }
];

const AdditionalInterests = ({ config, initialValues }) => {
  // const [answers, setAnswers] = useState(setInitialState(initialValues));

  return (
    <div className={config.className}>
      <Form onSubmit={x => x}>
        {({ handleSubmit, values }) => (
          <>
            <Field name="mortgagee1" validate={validation.isRequired}>
              {({ input, meta }) => (
                <Radio
                  input={input}
                  meta={meta}
                  answers={BOOL_OPTIONS}
                  styleName="additionalInterest radio"
                  dataTest="mortgagee1"
                  label="Do you have a mortgage for this property?"
                  segmented
                />
              )}
            </Field>

            {values.mortgagee1 === true && (
              <Field name="mortgagee2" validate={validation.isRequired}>
                {({ input, meta }) => (
                  <Radio
                    input={input}
                    meta={meta}
                    answers={BOOL_OPTIONS}
                    styleName="additionalInterest radio"
                    dataTest="mortgagee2"
                    label="Do you have a second mortgage for this property?"
                    segmented
                  />
                )}
              </Field>
            )}

            <Field name="additionalInsured1" validate={validation.isRequired}>
              {({ input, meta }) => (
                <Radio
                  input={input}
                  meta={meta}
                  answers={BOOL_OPTIONS}
                  styleName="additionalInterest radio"
                  dataTest="additionalInsured1"
                  label="Are there any additional insureds on the property (other than the mortgage company or secondary homeowner)?"
                  segmented
                />
              )}
            </Field>

            <Field name="additionalInterest1" validate={validation.isRequired}>
              {({ input, meta }) => (
                <Radio
                  input={input}
                  meta={meta}
                  answers={BOOL_OPTIONS}
                  styleName="additionalInterest radio"
                  dataTest="additionalInterest1"
                  label="Are there any additional interests (someone interested in your home being insured that isn't an owner - such as a homeowners association)?"
                  segmented
                />
              )}
            </Field>
          </>
        )}
      </Form>
    </div>
  );
};

export default AdditionalInterests;
