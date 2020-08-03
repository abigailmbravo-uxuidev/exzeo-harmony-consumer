import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landingPage">
      <ul>
        <li>
          <Link to="/ttic/fl/flood">FL Flood Quote</Link>
        </li>

        <li>
          <Link to="/hcpc/sc/flood">SC Flood Quote</Link>
        </li>

        <li>
          <Link to="/hcpc/nj/flood">NJ Flood Quote</Link>
        </li>
      </ul>
    </div>
  );
};

export default Landing;
