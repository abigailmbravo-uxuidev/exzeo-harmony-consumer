import React from 'react';
import { Gandalf } from '@exzeo/core-ui/src/@Harmony';
import template from '../mock-data/mockAF3';
import { Button } from '@exzeo/core-ui';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Button } from '@exzeo/core-ui/src/Button';

const Page = ({ location }) => {
  return (
    <main role="main">
      <Gandalf
        formId={'harmony-quote'}
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
            reset
          </Button>
        )}
      />
    </main>
  );
};

export default Page;
