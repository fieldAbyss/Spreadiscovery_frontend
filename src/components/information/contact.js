import React, { Component } from 'react';

import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
fontawesome.library.add(brands.faTwitter);

class Contact extends Component {
  render() {
    return (
      <div id="contact" className="container content-page">
        <h1 className="mt-5">Contact</h1>
        <div className="twitter-link mt-3">
          <a href="https://twitter.com/Lara_Bell_com" target="_blank" rel="noreferrer noopener"><i className="fab fa-twitter"></i> Twitter</a>
        </div>
        <p>Please get in touch with me whenever you need a help.</p>
      </div>
    );
  }
}

export default Contact;