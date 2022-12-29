import React from 'react';
import './gradients.css';
import { Link } from 'react-router-dom';

const End = () => {
  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="mask2">
          <div className="lineFinal h-96 w-2"></div>
        </div>
      </div>
      <Link to={'/playground'}>
        <div className="flex justify-center text-3xl font-bold mb-24">
          Go to Playground
        </div>
      </Link>
    </div>
  );
};

export default End;
