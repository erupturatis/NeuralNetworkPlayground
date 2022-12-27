import React from 'react';
import Button from './Button';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ userSet, user, loaded }) => {
  let githubLink = 'https://github.com/erupturatis/NeuralNetworkPlayground';
  let githubImageLink =
    'https://cdn.discordapp.com/attachments/864542134391275543/1044628392093421598/octocat2.png';

  let location = useLocation();

  return (
    <div className="flex justify-between m-4 ">
      <div className="p-4 flex">
        <img src={githubImageLink} className="w-10 absolute top-4 " />
        <div className="ml-12">
          <a
            href={githubLink}
            target="_blank"
            rel="noreferrer"
            className=" text-navtextFaded"
          >
            Contribute
          </a>
        </div>
      </div>
      {loaded && (
        <>
          <div className="flex items-center">
            <Button name="Home" pageLink="/Home" location={location.pathname} />

            <Button
              name="Playground"
              pageLink="/Playground"
              location={location.pathname}
            />
            {userSet && <div className=" text-white m-2 ">{user.username}</div>}

            {!userSet && (
              <Button
                name="Login"
                pageLink="/Login"
                location={location.pathname}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
