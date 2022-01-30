import React from 'react';
import { FaCog } from 'react-icons/fa';
import Trend from './Trend';

const Trends = () => {
  return (<section className='trends'>
      <header>
          <h3>
              Trends for you
          </h3>
          <FaCog/>
      </header>
      <Trend trendName='MCU' num='20'/>
      <Trend trendName='Messi' num='25'/>
      <Trend trendName='Cristiano' num='50'/>
      <Trend trendName='Elon' num='12'/>
      <Trend trendName='Doge' num='23'/>

  </section>);
};

export default Trends;
