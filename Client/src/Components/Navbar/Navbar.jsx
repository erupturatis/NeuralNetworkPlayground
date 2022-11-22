import React from 'react';
import Button from './Button';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  let githubLink = 'https://github.com/erupturatis/NeuralNetworkPlayground';
  let githubImageLink =
    'https://cdn.discordapp.com/attachments/864542134391275543/1044628392093421598/octocat2.png';

  let location = useLocation();
  return (
    <div className="flex justify-between ">
      <div className="p-4 flex">
        <img src={githubImageLink} className="w-12 absolute top-2 " />
        <a href={githubLink} target="_blank" rel="noreferrer">
          Contribute
        </a>
      </div>
      <div className="flex items-center">
        <Button name="Home" pageLink="/Home" location={location.pathname} />
        <Button name="SignUp" pageLink="/SignUp" location={location.pathname} />
        <Button name="Login" pageLink="/Login" location={location.pathname} />
        <Button
          name="Playground"
          pageLink="/Playground"
          location={location.pathname}
        />
      </div>
    </div>
  );
};

export default Navbar;
