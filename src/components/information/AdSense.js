import React from 'react';

export default class AdSense extends React.Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

render () {
    return (
      <div className='ad'>
        <ins className='adsbygoogle'
          style={{ display: 'block' }}
          data-ad-client={process.env.REACT_APP_DATA_AD_CLIENT}
          data-ad-slot={process.env.REACT_APP_DATA_AD_SLOT}
          data-ad-format='auto' />
      </div>
    );
  }
}