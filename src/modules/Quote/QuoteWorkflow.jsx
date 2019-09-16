import React from 'react';
import { Gandalf } from '@exzeo/harmony-core';
import { Button } from '@exzeo/core-ui';

import { useQuote } from 'modules/Quote';
import InfoBar from 'components/InfoBar';

import MOCK_AF3_TEMPLATE from 'mock-data/mockAF3';

const QuoteWorkflow = ({ location }) => {
  const { quote } = useQuote();

  if (!quote) {
    return <div>You shouldn't be here :(</div>;
  }

  return (
    <>
      <Gandalf
        formId="harmony-quote"
        formClassName="workFlow"
        currentPage={0}
        handleSubmit={x => x}
        initialValues={quote}
        template={MOCK_AF3_TEMPLATE}
        transformConfig={{}}
        options={{}}
        renderFooter={() => (
          <Button
            data-test="submit"
            className={Button.constants.classNames.primary}
            disabled
          >
            <marquee>
              don't touch - does not work - don't qa this button
            </marquee>
          </Button>
        )}
      />
    </>
  );
};

export default QuoteWorkflow;
