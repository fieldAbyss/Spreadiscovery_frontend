import React, { Component } from 'react';

class PrivacyPolicy extends Component {
  render() {
    return (
      <div id="privacy-policy" className="container">
        <h1 className="mt-5">Privacy Policy</h1>

        <h2 className="mt-5">What personal information do we collect from the people that visit our blog, website or app?</h2>
        <p>We do not collect information from visitors of our site.</p>

        <h2 className="mt-5">Third-party disclosure</h2>
        <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information.</p>

        <h2 className="mt-5">Third-party links</h2>
        <p>We do not include or offer third-party products or services on our website.</p>

        <h2 className="mt-5">Google</h2>
        <p>Google's advertising requirements can be summed up by Google's Advertising Principles. They are put in place to provide a positive experience for users.</p>
        <p>We use Google AdSense on our website.</p>

        <p className="mt-5">This software is a beta version. Please use it at your own risk.</p>
      </div>
    );
  }
}

export default PrivacyPolicy;