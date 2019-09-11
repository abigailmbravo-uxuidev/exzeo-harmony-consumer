import React from 'react';
import { Gandalf } from '@exzeo/harmony-core';
import { Button } from '@exzeo/core-ui';

import template from '../mock-data/mockAF3';

import InfoBar from './InfoBar';

const QuoteWorkflow = ({ location }) => {
  return (
    <>
      <InfoBar />
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
