import React from 'react';
import Confetti from 'components/Confetti';
import TypTapLink from 'components/TypTapLink';

const ThankYou = ({ location }) => {
  return (
    <div className="card thankYouCard">
      <Confetti />
      <section className="thankYouCircle">
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 879.10003 270.79999"
        >
          <title>circ</title>
          <path
            d="M33.8,0c81,160.6,247.4,270.8,439.5,270.8S831.9,160.6,912.9,0Z"
            transform="translate(-33.8)"
          />
        </svg>
      </section>
      <section className="thankYouIcon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 675 600">
          <defs>
            <linearGradient id="fill-gradient" x1="0%" x2="100%" y1="50%">
              <stop offset="0%" stopColor="gold">
                <animate
                  attributeName="offset"
                  values=".1; .2; .3; .4; .3; .2; .1;"
                  dur="5s"
                  repeatCount="1"
                />
              </stop>

              <stop offset="50%" stopColor="gold">
                <animate
                  attributeName="stopColor"
                  values="gold; white; gold"
                  dur="5.5s"
                  repeatCount="1"
                />
              </stop>

              <stop offset="100%" stopColor="gold">
                <animate
                  attributeName="offset"
                  values=".9; .8; .7; .6; .7; .8; .9;"
                  dur="5s"
                  repeatCount="1"
                />
              </stop>
            </linearGradient>
          </defs>
          <title>troph</title>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <path
                fill="url('#fill-gradient')"
                className="cls-1"
                d="M646.88,75A28,28,0,0,1,675,103.12v65.63q0,65.64-72.66,118.36Q546.09,327,473.44,335.16q-36.35,60.94-79.69,86.72v84.37H450q31.63,0,53.32,17.58t21.68,48v14.06Q525,600,510.94,600H164.06Q150,600,150,585.94V571.88q0-30.5,21.68-48T225,506.25h56.25V421.88a102.87,102.87,0,0,1-12.89-8.21q-8.22-5.85-29.3-28.12a272.27,272.27,0,0,1-37.5-50.39Q128.89,327,72.66,287.11,0,234.37,0,168.75V103.12A27.15,27.15,0,0,1,8.2,83.2,27.18,27.18,0,0,1,28.12,75H150V28.12A27.15,27.15,0,0,1,158.2,8.2,27.18,27.18,0,0,1,178.12,0H496.88A27.23,27.23,0,0,1,516.8,8.2,27.23,27.23,0,0,1,525,28.12V75ZM116,226.17a206.19,206.19,0,0,0,49.21,24.61A467.34,467.34,0,0,1,150,150H75v18.75Q75,195.72,116,226.17Zm484-57.42V150H525a469.2,469.2,0,0,1-15.23,100.78A206.75,206.75,0,0,0,559,226.17Q600,195.72,600,168.75Z"
              />
            </g>
          </g>
        </svg>
      </section>
      <label className="thankYouTitle">Quote Saved!</label>
      {location.state && (
        <h4 className="quoteNumber">
          Quote Number:&nbsp;{location.state.quoteNumber}
        </h4>
      )}

      <p>
        Thank you for choosing TypTap to provide a Flood Quote for your
        property. We can't wait for you to come back and finish the quote. If
        you need our help, call us, email us, send a carrier pigeon, whatever!
        We're here and love to talk all things insurance!
      </p>
      <TypTapLink />
    </div>
  );
};

export default ThankYou;
