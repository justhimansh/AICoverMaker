import React from 'react';
import { Link } from 'react-router-dom'; // import Link

function Landing() {
  return (
    <div>
      <h1>Welcome to AiCoverMaker</h1>
      <h2>What would you like to generate?</h2>
      <div>
        <Link to="/CoverNote">
          <button>Cover Note</button>
        </Link>
        <button>Cover Letter</button>
      </div>
    </div>
  );
}

export default Landing;
