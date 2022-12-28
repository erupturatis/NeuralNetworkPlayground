import React from 'react';

import Hero from './Hero';
import Middle from './Middle';
import End from './End';

const Home = () => {
  return (
    <div className="text-white">
      <Hero />
      <Middle />
      <End />
    </div>
  );
};

export default Home;
