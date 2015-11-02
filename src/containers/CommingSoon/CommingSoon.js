import React, { Component, PropTypes } from 'react';

import Scroll from 'react-scroll';

import {
  Logo,
} from 'components';

export default class ComingSoon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      windowWidth: '',
      headerOffset: '0px',
      playing: false,
    };
  }

  componentDidMount() {
    this.setState({windowWidth: window.innerWidth});
    window.addEventListener('resize', this.handleResize.bind(this));

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({windowWidth: window.innerWidth});
  }


  render() {
    const { headerOffset, windowWidth } = this.state;
    const styles = require('./CommingSoon.scss');

    return (
      <div>

        <Scroll.Element name="header" className={styles.header}>

            <div className={styles.logo}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
              }}>

              <img src={require('./logo.svg')} alt="" />
              <div style={{textAlign: 'center'}}>Радиовышка</div>
              <div className={styles.commingSoon}>Coming Soon</div>

              </div>
            </div>

        </Scroll.Element>

      </div>
    );
  }
}
