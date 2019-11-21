import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Field,
  OnChangeListener,
  ModalPortal,
  Radio,
  validation,
  Button
} from '@exzeo/core-ui';
import {
  useAdditionalInterests,
  AdditionalInterestModal,
  V2AdditionalInterestCard,
  AI_TYPES
} from '@exzeo/core-ui/src/@Harmony';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BOOL_OPTIONS } from 'constants/input';
import { ROUTES, WORKFLOW_ROUTING } from 'constants/navigation';

function setInitialValues(groupedAI) {
  return {
    mortgagee1: groupedAI[AI_TYPES.mortgagee].length > 0,
    mortgagee2: groupedAI[AI_TYPES.mortgagee].length === 2,
    additionalInsured: groupedAI[AI_TYPES.additionalInsured].length > 0,
    additionalInterest: groupedAI[AI_TYPES.additionalInterest].length > 0
  };
}

const INITIAL_STATE = {
  show: false,
  type: '',
  selected: null,
  relatedField: ''
};

// TODO modify this component to accept a config from the CSP template to determine questions, order, and other behavior
const AdditionalInterests = ({ config, initialValues, customHandlers }) => {
  const [modal, setModal] = useState(INITIAL_STATE);
  const {
    groupedAdditionalInterests: groupedAIs,
    update,
    remove,
    options
  } = useAdditionalInterests(initialValues);

  async function submitAdditionalInterest(additionalInterest, aiFormInstance) {
    const data = update(
      additionalInterest,
      modal.selected, // isEdit
      aiFormInstance
    );

    await customHandlers.handleSubmit(data);

    setModal(INITIAL_STATE);
  }

  function deleteAdditionalInterest(ai) {
    const data = remove(ai);

    customHandlers.handleSubmit(data);
  }

  return (
    <div className={config.className}>
      <Form onSubmit={x => x} initialValues={setInitialValues(groupedAIs)}>
        {({ values, invalid, form }) => (
          <React.Fragment>
            <Field name="mortgagee1" validate={validation.isRequired}>
              {({ input, meta }) => (
                <Radio
                  input={input}
                  meta={meta}
                  answers={BOOL_OPTIONS}
                  styleName="additionalInterest radio"
                  dataTest="mortgagee1"
                  label="Do you have a mortgage for this property?"
                  hint="This is the primary lienholder on your property, and has priority for payment over all other liens."
                  segmented
                />
              )}
            </Field>

            <OnChangeListener name="mortgagee1">
              {value => {
                if (!value && groupedAIs[AI_TYPES.mortgagee][0]) {
                  deleteAdditionalInterest(groupedAIs[AI_TYPES.mortgagee][0]);
                }
              }}
            </OnChangeListener>

            {values.mortgagee1 === true &&
              (!groupedAIs[AI_TYPES.mortgagee][0] ||
                (modal.show && modal.relatedField === 'mortgagee1')) && (
                <ModalPortal>
                  <AdditionalInterestModal
                    label={`Add ${AI_TYPES.mortgagee}`}
                    type={AI_TYPES.mortgagee}
                    options={options}
                    additionalInterest={modal.selected}
                    groupedAdditionalInterests={groupedAIs}
                    handleFormSubmit={submitAdditionalInterest}
                    handleCancel={() =>
                      modal.show
                        ? setModal(INITIAL_STATE)
                        : form.change('mortgagee1', false)
                    }
                  />
                </ModalPortal>
              )}

            {values.mortgagee1 === true && !!groupedAIs[AI_TYPES.mortgagee][0] && (
              <ul className="listItem">
                <li>
                  <V2AdditionalInterestCard
                    ai={groupedAIs[AI_TYPES.mortgagee][0]}
                    deleteIcon={
                      <a
                        className="edit"
                        onClick={() =>
                          setModal({
                            type: AI_TYPES.mortgagee,
                            selected: groupedAIs[AI_TYPES.mortgagee][0],
                            show: true,
                            relatedField: 'mortgagee1'
                          })
                        }
                      >
                        <FontAwesomeIcon icon="edit" />
                      </a>
                    }
                    editIcon={
                      <a
                        className="remove"
                        onClick={() =>
                          deleteAdditionalInterest(
                            groupedAIs[AI_TYPES.mortgagee][0]
                          )
                        }
                      >
                        <FontAwesomeIcon icon="times" />
                      </a>
                    }
                  />
                </li>
              </ul>
            )}

            {values.mortgagee1 === true && (
              <React.Fragment>
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

                <OnChangeListener name="mortgagee2">
                  {value => {
                    if (!value && groupedAIs[AI_TYPES.mortgagee][1]) {
                      deleteAdditionalInterest(
                        groupedAIs[AI_TYPES.mortgagee][1]
                      );
                    }
                  }}
                </OnChangeListener>
              </React.Fragment>
            )}

            {values.mortgagee2 === true &&
              (!groupedAIs[AI_TYPES.mortgagee][1] ||
                (modal.show && modal.relatedField === 'mortgagee2')) && (
                <ModalPortal>
                  <AdditionalInterestModal
                    label={`Add ${AI_TYPES.mortgagee}`}
                    type={AI_TYPES.mortgagee}
                    options={options}
                    additionalInterest={modal.selected}
                    groupedAdditionalInterests={groupedAIs}
                    handleCancel={() =>
                      modal.show
                        ? setModal(INITIAL_STATE)
                        : form.change('mortgagee2', false)
                    }
                    handleFormSubmit={submitAdditionalInterest}
                  />
                </ModalPortal>
              )}

            {values.mortgagee2 === true && !!groupedAIs[AI_TYPES.mortgagee][1] && (
              <ul className="listItem">
                <li>
                  <V2AdditionalInterestCard
                    ai={groupedAIs[AI_TYPES.mortgagee][1]}
                    deleteIcon={
                      <a
                        className="edit"
                        onClick={() =>
                          setModal({
                            type: AI_TYPES.mortgagee,
                            selected: groupedAIs[AI_TYPES.mortgagee][1],
                            show: true,
                            relatedField: 'mortgagee2'
                          })
                        }
                      >
                        <FontAwesomeIcon icon="edit" />
                      </a>
                    }
                    editIcon={
                      <a
                        className="remove"
                        onClick={() =>
                          deleteAdditionalInterest(
                            groupedAIs[AI_TYPES.mortgagee][1]
                          )
                        }
                      >
                        <FontAwesomeIcon icon="times" />
                      </a>
                    }
                  />
                </li>
              </ul>
            )}

            <Field name="additionalInsured" validate={validation.isRequired}>
              {({ input, meta }) => (
                <Radio
                  input={input}
                  meta={meta}
                  answers={BOOL_OPTIONS}
                  styleName="additionalInterest radio"
                  dataTest="additionalInsured"
                  label="Are there any additional insureds on the property?"
                  hint="An additional insured is someone who has a financial interest in the home, but does not reside in the home. For example: a relative that co-owns the home with you, but does not reside in the home, could be listed as an additional insured."
                  segmented
                />
              )}
            </Field>

            <OnChangeListener name="additionalInsured">
              {value => {
                if (!value && groupedAIs[AI_TYPES.additionalInsured][0]) {
                  deleteAdditionalInterest(
                    groupedAIs[AI_TYPES.additionalInsured][0]
                  );
                }
              }}
            </OnChangeListener>

            {values.additionalInsured === true &&
              (!groupedAIs[AI_TYPES.additionalInsured][0] ||
                (modal.show && modal.relatedField === 'additionalInsured')) && (
                <ModalPortal>
                  <AdditionalInterestModal
                    label={`Add ${AI_TYPES.additionalInsured}`}
                    type={AI_TYPES.additionalInsured}
                    options={options}
                    additionalInterest={modal.selected}
                    groupedAdditionalInterests={groupedAIs}
                    handleCancel={() =>
                      modal.show
                        ? setModal(INITIAL_STATE)
                        : form.change('additionalInsured', false)
                    }
                    handleFormSubmit={submitAdditionalInterest}
                  />
                </ModalPortal>
              )}

            {values.additionalInsured === true &&
              !!groupedAIs[AI_TYPES.additionalInsured][0] && (
                <ul className="listItem">
                  <li>
                    <V2AdditionalInterestCard
                      ai={groupedAIs[AI_TYPES.additionalInsured][0]}
                      deleteIcon={
                        <a
                          className="edit"
                          onClick={() =>
                            setModal({
                              type: AI_TYPES.additionalInsured,
                              selected:
                                groupedAIs[AI_TYPES.additionalInsured][0],
                              show: true,
                              relatedField: 'additionalInsured'
                            })
                          }
                        >
                          <FontAwesomeIcon icon="edit" />
                        </a>
                      }
                      editIcon={
                        <a
                          className="remove"
                          onClick={() =>
                            deleteAdditionalInterest(
                              groupedAIs[AI_TYPES.additionalInsured][0]
                            )
                          }
                        >
                          <FontAwesomeIcon icon="times" />
                        </a>
                      }
                    />
                  </li>
                </ul>
              )}

            <Field name="additionalInterest" validate={validation.isRequired}>
              {({ input, meta }) => (
                <Radio
                  input={input}
                  meta={meta}
                  answers={BOOL_OPTIONS}
                  styleName="additionalInterest radio"
                  dataTest="additionalInterest"
                  label="Are there any additional interests on the property?"
                  hint="An additional interest has a vested interest in the property, but has no actual ownership of the property. They will be notified in the event the policy is cancelled, but will not be listed on payment in the event of a claim.  This is rare on a Flood Insurance Policy."
                  segmented
                />
              )}
            </Field>

            <OnChangeListener name="additionalInterest">
              {value => {
                if (!value && groupedAIs[AI_TYPES.additionalInterest][0]) {
                  deleteAdditionalInterest(
                    groupedAIs[AI_TYPES.additionalInterest][0]
                  );
                }
              }}
            </OnChangeListener>

            {values.additionalInterest === true &&
              (!groupedAIs[AI_TYPES.additionalInterest][0] ||
                (modal.show &&
                  modal.relatedField === 'additionalInterest')) && (
                <ModalPortal>
                  <AdditionalInterestModal
                    label={`Add ${AI_TYPES.additionalInterest}`}
                    type={AI_TYPES.additionalInterest}
                    options={options}
                    additionalInterest={modal.selected}
                    groupedAdditionalInterests={groupedAIs}
                    handleCancel={() =>
                      modal.show
                        ? setModal(INITIAL_STATE)
                        : form.change('additionalInterest', false)
                    }
                    handleFormSubmit={submitAdditionalInterest}
                  />
                </ModalPortal>
              )}

            {values.additionalInterest === true &&
              !!groupedAIs[AI_TYPES.additionalInterest][0] && (
                <ul className="listItem">
                  <li>
                    <V2AdditionalInterestCard
                      ai={groupedAIs[AI_TYPES.additionalInterest][0]}
                      deleteIcon={
                        <a
                          className="edit"
                          onClick={() =>
                            setModal({
                              type: AI_TYPES.additionalInterest,
                              selected:
                                groupedAIs[AI_TYPES.additionalInterest][0],
                              show: true,
                              relatedField: 'additionalInterest'
                            })
                          }
                        >
                          <FontAwesomeIcon icon="edit" />
                        </a>
                      }
                      editIcon={
                        <a
                          className="remove"
                          onClick={() =>
                            deleteAdditionalInterest(
                              groupedAIs[AI_TYPES.additionalInterest][0]
                            )
                          }
                        >
                          <FontAwesomeIcon icon="times" />
                        </a>
                      }
                    />
                  </li>
                </ul>
              )}

            <div className="form-footer">
              <Link
                className={Button.constants.classNames.primary}
                to={
                  invalid ? '#' : WORKFLOW_ROUTING[ROUTES.additionalInfo.path]
                }
                disabled={invalid}
              >
                Continue
              </Link>
            </div>
          </React.Fragment>
        )}
      </Form>
    </div>
  );
};

export default AdditionalInterests;
