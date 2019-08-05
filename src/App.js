import React from 'react';

import './App.css';

function App() {
  return (
    <React.Fragment>
      <header>{/*  header stuff here */}</header>

      <div role="main">
        <nav>
          <ul>
            {/* accordion */}
            <li>
              <ul>
                <li>{/*  nav links */}</li>
              </ul>
            </li>
          </ul>
          {/*  some nav goes here */}
        </nav>

        {/*  gandalf will live here */}
      </div>

      <footer>{/*  footer stuff here maybe */}</footer>
    </React.Fragment>
  );
}

export default App;
