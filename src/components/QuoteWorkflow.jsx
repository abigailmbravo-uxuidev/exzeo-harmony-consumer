import React from 'react';
import { Gandalf } from '@exzeo/core-ui/src/@Harmony';
import template from '../mock-data/mockAF3';
import { Button } from '@exzeo/core-ui';

const QuoteWorkflow = ({ location }) => {
  return (
    <>
      <div className="infoBar">
        <h2>
          <label>TEST PAGE: </label>
        </h2>
        <p>Not for consideration while testing</p>
      </div>
      <Gandalf
        formId="harmony-quote"
        currentPage={0}
        handleSubmit={x => x}
        initialValues={{}}
        template={template}
        transformConfig={{}}
        options={{}}
        renderFooter={() => (
          <Button
            data-test="submit"
            className={Button.constants.classNames.primary}
          >
            test
          </Button>
        )}
      />
    </>
  );
};

export default QuoteWorkflow;
