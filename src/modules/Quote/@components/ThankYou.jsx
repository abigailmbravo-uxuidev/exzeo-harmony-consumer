import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ThankYou = () => {
  return (
    <div className="card thankYouCard">
      <section className="thankYouCircle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 879.11 270.75">
          <title>Asset 2</title>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <path
                class="cls-1"
                d="M0,0C81,160.6,247.41,270.75,439.55,270.75S798.11,160.6,879.11,0Z"
              />
            </g>
          </g>
        </svg>
      </section>
      <section className="thankYouIcon">
        <FontAwesomeIcon icon="trophy" />
      </section>
      <label className="thankYouTitle">Congratulations!</label>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>
    </div>
  );
};

export default ThankYou;
