import React, { useState } from 'react';
import classNames from 'classnames';

/* a animation will be applied here. classes will be: navSlideOut & navSlideIn */

function Navigation() {
  // const [activeIndex, setActiveIndex] = useState(0);
  return (
    <nav role="navigation" className="navSlideOut">
      <ul>
        {/* QUOTE */}
        <li className={classNames('')}>
          <a>
            <h3>Quote</h3>
            <span>1</span>
            <p />
          </a>

          <ul>
            <li>
              {/*  nav links */}
              <a>
                <h3>Address</h3>
                <span />
                <p>
                  <strong>101 E KENNEDY BLVD</strong>
                  <br />
                  Tampa, FL 33602 <br />
                  Year Built: 2005
                  <br />
                  Flood Zone: "A"
                </p>
              </a>
            </li>
            <li>
              {/*  nav links */}
              <a className="active">
                <h3>Underwriting</h3>
                <span />
                <p>You have successfully answered the required questions</p>
              </a>
            </li>
            <li>
              {/*  nav links */}
              <a className="disabled">
                <h3>Customize Quote</h3>
                <span />
                <p>
                  Bacon ipsum dolor amet dolor fatback andouille corned beef
                  mollit lorem pork chop anim shankle doner kevin reprehenderit
                  consequat.
                </p>
              </a>
            </li>

            <li>
              {/*  nav links */}
              <a className="disabled">
                <h3>Save/Share Quote</h3>
                <span />
                <p>
                  Jerky id capicola ham hock nisi minim lorem sint sirloin elit
                  ground round ad.
                </p>
              </a>
            </li>
          </ul>
        </li>
        {/* QUOTE */}

        {/* APPLICATION*/}
        <li className={classNames('disabled')}>
          <a className="">
            <h3>Application</h3>
            <span>2</span>
            <p />
          </a>
          <ul>
            <li>
              {/*  nav links */}
              <a className="disabled">
                <h3>Additional Info</h3>
                <span />
                <p>Interesting things are happening</p>
              </a>
            </li>
            <li>
              {/*  nav links */}
              <a className="disabled">
                <h3>Policyholder Info</h3>
                <span />
                <p>Super duper cool</p>
              </a>
            </li>
            <li>
              {/*  nav links */}
              <a className="disabled">
                <h3>Billing Info</h3>
                <span />
                <p>Do some of the best things ever</p>
              </a>
            </li>

            <li>
              {/*  nav links */}
              <a className="disabled">
                <h3>Summary</h3>
                <span />
                <p>Do some of the best things ever</p>
              </a>
            </li>

            <li>
              {/*  nav links */}
              <a className="disabled">
                <h3>You did it!!!</h3>
                <span />
                <p>Do some of the best things ever</p>
              </a>
            </li>
          </ul>
        </li>
        {/* APPLICATION*/}
      </ul>
    </nav>
  );
}

export default Navigation;
