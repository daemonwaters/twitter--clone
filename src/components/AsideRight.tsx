import React from 'react';
import Search from './Search';
import Trends from './Trends';

const AsideRight = () => {
  return (<aside className='right'>
      <div>
          <Search/>
          <Trends/>
      </div>
  </aside>);
};

export default AsideRight;
