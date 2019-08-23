import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Button } from '@exzeo/core-ui/src/Button';

const Page = ({ location }) => {
  return (
    <main role="main">
      <form>
        <h1>{location.pathname}</h1>
      </form>
    </main>
  );
};

export default Page;
