import React from 'react';
import { Gandalf } from '@exzeo/harmony-core';
import { Button } from '@exzeo/core-ui';

import InfoBar from 'components/InfoBar';
import MOCK_AF3_TEMPLATE from 'mock-data/mockAF3';

const QuoteWorkflow = ({ location }) => {
  return (
    <>
      <InfoBar />
      <Gandalf
        formId="harmony-quote"
        currentPage={0}
        handleSubmit={x => x}
        initialValues={{}}
        template={MOCK_AF3_TEMPLATE}
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
