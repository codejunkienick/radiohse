import React, {Component} from 'react';
export default class Logo extends Component {
  render() {
    const styles = require('./Logo.scss');
    return (
      <div className={styles.logo}>
        <img src={require('./logo.svg')} alt="" />
        <div style={{textAlign: 'center'}}>Радиовышка</div>
      </div>
    );
  }
}
