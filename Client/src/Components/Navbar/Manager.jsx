import React from 'react';
import Desktop from './Desktop.jsx';
import Mobile from './Mobile.jsx';

const Manager = ({ userSet, user, loaded }) => {
  return (
    <div>
     <div className={'hidden lg:block'}>
       <Desktop userSet={userSet} user={user} loaded={loaded} />
     </div>
      <div className={'block lg:hidden z-[100]'}>
        <Mobile userSet={userSet} user={user} loaded={loaded} />
      </div>
    </div>
  );
};

export default Manager;
