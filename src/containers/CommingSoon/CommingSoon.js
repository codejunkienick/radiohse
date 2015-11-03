import React, { Component, PropTypes } from 'react';

import Scroll from 'react-scroll';

import {
  Logo,
} from 'components';

const endtime = 'November 3 2015 19:00:00 GMT+05:00';

export default class ComingSoon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      windowWidth: '',
      headerOffset: '0px',
      playing: false,
      clock: '',
    };
  }

  componentDidMount() {
    this.initializeClock(this);
    this.setState({windowWidth: window.innerWidth});
    window.addEventListener('resize', this.handleResize.bind(this));

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({windowWidth: window.innerWidth});
  }




  initializeClock(context){
    const getTimeRemaining = () => {
      const t = Date.parse(endtime) - Date.parse(new Date());
      let seconds = Math.floor( (t/1000) % 60 );
      let minutes = Math.floor( (t/1000/60) % 60 );
      let hours = Math.floor( (t/(1000*60*60)) % 24 );
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return {
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }

    const timeinterval = setInterval(function(){
    const t = getTimeRemaining();
      context.setState({clock: t.hours + ':' + t.minutes + ':' + t.seconds});

      if(t.total<=0){
        clearInterval(timeinterval);
      }
    },1000);
  }


  render() {
    const { headerOffset, windowWidth, clock } = this.state;
    const styles = require('./CommingSoon.scss');
    return (
      <div>

        <Scroll.Element name="header" className={styles.header}>

          <div style={{display: 'flex', flexDirection: 'column'}}>

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
            <div className={styles.timer}>
              {clock}
            </div>

          </div>

        </Scroll.Element>

      </div>
    );
  }
}
