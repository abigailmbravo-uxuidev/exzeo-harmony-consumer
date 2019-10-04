import React from 'react';
import {
  Form,
  Field,
  useField,
  ModalPortal,
  Radio,
  validation
} from '@exzeo/core-ui';
import {
  getGroupedAdditionalInterests,
  getMortgageeOrderOptions,
  initializeAdditionalInterestForm,
  useFetchAdditionalInterestEnums,
  AI_TYPES,
  AdditionalInterestModal,
  AdditionalInterestCard
} from '@exzeo/harmony-core';

function setInitialValues(groupedAI) {
  return {
    mortgagee1: groupedAI[AI_TYPES.mortgagee].length > 0,
    mortgagee2: groupedAI[AI_TYPES.mortgagee].length === 2,
    additionalInsured: groupedAI[AI_TYPES.additionalInsured].length > 0,
    additionalInterest: groupedAI[AI_TYPES.additionalInterest].length > 0
  };
}

const BOOL_OPTIONS = [
  { answer: true, label: 'YES' },
  { answer: false, label: 'NO' }
];

const AdditionalInterests = ({ config, initialValues }) => {
  const groupedAI = getGroupedAdditionalInterests(
    initialValues.additionalInterests
  );
  const { options, loaded } = useFetchAdditionalInterestEnums();

  // const [answers, setAnswers] = useState(setInitialState(initialValues));

  return (
    <div className={config.className}>
      <Form onSubmit={x => x} initialValues={setInitialValues(groupedAI)}>
        {({ handleSubmit, values, form }) => (
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
                  hint="This is the primary lienholder on your property, and has priority for payment over all other leins."
                  segmented
                />
              )}
            </Field>

            {values.mortgagee1 === true && !groupedAI[AI_TYPES.mortgagee][0] && (
              <ModalPortal>
                <AdditionalInterestModal
                  label={`Add ${AI_TYPES.mortgagee}`}
                  type={AI_TYPES.mortgagee}
                  options={options}
                  mortgageeOrderOptions={getMortgageeOrderOptions(
                    null,
                    options,
                    groupedAI
                  )}
                  initialValues={initializeAdditionalInterestForm(
                    AI_TYPES.mortgagee,
                    {},
                    options,
                    groupedAI
                  )}
                  handleCancel={() => form.change('mortgagee1', false)}
                  handleFormSubmit={x => x}
                />
              </ModalPortal>
            )}

            {values.mortgagee1 === true && !!groupedAI[AI_TYPES.mortgagee][0] && (
              <ul className="mortgagee1List">
                <AdditionalInterestCard
                  ai={groupedAI[AI_TYPES.mortgagee][0]}
                  handleDelete={x => x}
                  handleEdit={x => x}
                />
              </ul>
            )}

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
                    hint="A secondary lienholder on your property while a primary is still in effect. In the event of default, this mortgage only receives money after the primary is paid off."
                    segmented
                  />
                )}
              </Field>
            )}

            <Field name="additionalInsured" validate={validation.isRequired}>
              {({ input, meta }) => (
                <Radio
                  input={input}
                  meta={meta}
                  answers={BOOL_OPTIONS}
                  styleName="additionalInterest radio"
                  dataTest="additionalInsured1"
                  label="Are there any additional insureds on the property?"
                  hint="An additional insured is someone who has a financial interest in the home, but does not reside in the home. For example: a relative that co-owns the home with you, but does not reside in the home, could be listed as an additional insured."
                  segmented
                />
              )}
            </Field>

            <Field name="additionalInterest" validate={validation.isRequired}>
              {({ input, meta }) => (
                <Radio
                  input={input}
                  meta={meta}
                  answers={BOOL_OPTIONS}
                  styleName="additionalInterest radio"
                  dataTest="additionalInterest1"
                  label="Are there any additional interests on the property?"
                  hint="This is for additional interest"
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
