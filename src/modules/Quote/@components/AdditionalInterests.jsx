import React, { useState } from 'react';
import { Form, Field, ModalPortal, Radio, validation } from '@exzeo/core-ui';
import {
  getMortgageeOrderOptions,
  initializeAdditionalInterestForm,
  useAdditionalInterests,
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

const INITIAL_STATE = {
  show: false,
  type: '',
  selected: null,
  relatedField: ''
};

const AdditionalInterests = ({
  config,
  initialValues,
  formInstance,
  customHandlers
}) => {
  const [modal, setModal] = useState(INITIAL_STATE);
  const {
    groupedAdditionalInterests,
    update,
    remove,
    options
    // loaded
  } = useAdditionalInterests(initialValues);

  async function submitAdditionalInterest(additionalInterest, aiFormInstance) {
    const data = update(
      additionalInterest,
      initialValues,
      modal.selected, // isEdit
      aiFormInstance
    );

    await customHandlers.handleSubmit(data);

    setModal(INITIAL_STATE);
  }

  function deleteAdditionalInterest(ai) {
    const data = remove(ai, initialValues, initialValues.additionalInterests);

    customHandlers.handleSubmit(data);
  }

  return (
    <div className={config.className}>
      <Form
        onSubmit={x => x}
        initialValues={setInitialValues(groupedAdditionalInterests)}
      >
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

            {values.mortgagee1 === true &&
              (!groupedAdditionalInterests[AI_TYPES.mortgagee][0] ||
                (modal.show && modal.relatedField === 'mortgagee1')) && (
                <ModalPortal>
                  <AdditionalInterestModal
                    label={`Add ${AI_TYPES.mortgagee}`}
                    type={AI_TYPES.mortgagee}
                    options={options}
                    mortgageeOrderOptions={getMortgageeOrderOptions(
                      modal.selected,
                      options,
                      groupedAdditionalInterests
                    )}
                    initialValues={initializeAdditionalInterestForm(
                      AI_TYPES.mortgagee,
                      modal.selected,
                      options,
                      groupedAdditionalInterests
                    )}
                    handleCancel={() =>
                      modal.show
                        ? setModal(INITIAL_STATE)
                        : form.change('mortgagee1', false)
                    }
                    handleFormSubmit={submitAdditionalInterest}
                  />
                </ModalPortal>
              )}

            {values.mortgagee1 === true &&
              !!groupedAdditionalInterests[AI_TYPES.mortgagee][0] && (
                <ul className="mortgagee1List">
                  <AdditionalInterestCard
                    ai={groupedAdditionalInterests[AI_TYPES.mortgagee][0]}
                    handleDelete={() =>
                      deleteAdditionalInterest(
                        groupedAdditionalInterests[AI_TYPES.mortgagee][0]
                      )
                    }
                    handleEdit={() =>
                      setModal({
                        type: AI_TYPES.mortgagee,
                        selected:
                          groupedAdditionalInterests[AI_TYPES.mortgagee][0],
                        show: true,
                        relatedField: 'mortgagee1'
                      })
                    }
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

            {values.mortgagee2 === true &&
              (!groupedAdditionalInterests[AI_TYPES.mortgagee][1] ||
                (modal.show && modal.relatedField === 'mortgagee2')) && (
                <ModalPortal>
                  <AdditionalInterestModal
                    label={`Add ${AI_TYPES.mortgagee}`}
                    type={AI_TYPES.mortgagee}
                    options={options}
                    mortgageeOrderOptions={getMortgageeOrderOptions(
                      modal.selected,
                      options,
                      groupedAdditionalInterests
                    )}
                    initialValues={initializeAdditionalInterestForm(
                      AI_TYPES.mortgagee,
                      modal.selected,
                      options,
                      groupedAdditionalInterests
                    )}
                    handleCancel={() =>
                      modal.show
                        ? setModal(INITIAL_STATE)
                        : form.change('mortgagee2', false)
                    }
                    handleFormSubmit={submitAdditionalInterest}
                  />
                </ModalPortal>
              )}

            {values.mortgagee2 === true &&
              !!groupedAdditionalInterests[AI_TYPES.mortgagee][1] && (
                <ul className="mortgagee1List">
                  <AdditionalInterestCard
                    ai={groupedAdditionalInterests[AI_TYPES.mortgagee][1]}
                    handleDelete={() =>
                      deleteAdditionalInterest(
                        groupedAdditionalInterests[AI_TYPES.mortgagee][1]
                      )
                    }
                    handleEdit={() =>
                      setModal({
                        type: AI_TYPES.mortgagee,
                        selected:
                          groupedAdditionalInterests[AI_TYPES.mortgagee][1],
                        show: true,
                        relatedField: 'mortgagee2'
                      })
                    }
                  />
                </ul>
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
