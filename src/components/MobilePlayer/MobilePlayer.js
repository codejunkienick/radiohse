import React, {Component, PropTypes} from 'react';
import {
  RaisedButton,
} from 'material-ui/lib/index';
export default class Logo extends Component {
  static propTypes = {
    dialog: PropTypes.object,
    currentTrack: PropTypes.string
  }
  render() {
    const styles = require('./MobilePlayer.scss');
    return (
      <div className={styles.playerMobile}>
        <div className="container">
          <h2>Сейчас играет</h2>
          <div className={styles.song}>
            {this.props.currentTrack}
          </div>
          <div className={styles.controls}>
            <div className={styles.like}>
              <RaisedButton label="Like" backgroundColor="#4caf50" labelColor="#ffffff" fullWidth/>
            </div>
            <div className={styles.dislike}>
              <RaisedButton label="Disike" backgroundColor="#FF5252" labelColor="#ffffff" fullWidth/>
            </div>
          </div>
          <div className={styles.disclamer}>
              <a href="#" onClick={() => this.props.dialog.show()} className={styles.controlLabel}>Нравится песня?</a>
          </div>
        </div>
      </div>
    );
  }
}
