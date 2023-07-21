import React from 'react';
import { Link } from 'react-router-dom';
import './button.css';
const Button = ({ name, pageLink, location }) => {
  return (
    <div
      className={`font-nav font-semibold text-navtextFaded px-4 py-1 m-2 select-none
        flex justify-center align-bottom hover:text-white transitionsSmooth
      ${
        name === location.slice(1) ? 'text-white  rounded-full spawnBorder' : ''
      }`}
    >
      <Link to={pageLink}>{name}</Link>
    </div>
  );
};

export default Button;
