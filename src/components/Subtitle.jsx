import React from 'react';

const Subtitle = ({ config }) => {
  return (
    <div className={config.className}>
      {config.strong && <strong>{config.strong}</strong>}
      {config.text && <p>{config.text}</p>}
    </div>
  );
};

export default Subtitle;
