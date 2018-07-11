import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import Exchange from './exchange/exchange';
import Donate from './information/donate';
import Contact from './information/contact';
import PrivacyPolicy from './information/privacyPolicy';
import AdSense from './information/AdSense';

import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
fontawesome.library.add(brands.faBtc);
fontawesome.library.add(brands.faEthereum);
fontawesome.library.add(brands.faTwitter);

const dt = new Date();
const year = dt.getFullYear();

class Common extends Component {
  render(){
    return (
      <div id="common">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container">
            <NavLink className="navbar-brand" to="/"><i className="fab fa-btc"></i></NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarHeader">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item mx-3">
                  <NavLink className="nav-link" to="/donate">
                    <i className="fab fa-ethereum"></i>
                    <span className="sr-only">(current)</span>
                  </NavLink>
                </li>
                <li className="nav-item mx-3">
                  <NavLink className="nav-link" to="/contact"><i className="fab fa-twitter"></i></NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="my-5 pt-5 text-muted text-center text-small">
          <AdSense />
        </div>
        <Switch>
            <Route exact path="/" component={Exchange} />
            <Route path="/donate" component={Donate} />
            <Route path="/contact" component={Contact} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
        </Switch>
        <footer className="my-5 pt-5 text-muted text-center text-small">
          <AdSense />
          <ul className="list-inline">
            <li className="list-inline-item mx-3"><NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
            <li className="list-inline-item mx-3"><NavLink to="/donate"><i className="fab fa-ethereum"></i> Donate</NavLink></li>
            <li className="list-inline-item mx-3"><NavLink to="/contact"><i className="fab fa-twitter"></i> Contact</NavLink></li>
          </ul>
          <p className="my-3">© {year} SpreaDiscovery.com</p>
        </footer>
      </div>
    );
  }
}

export default Common;