import React, {Component, PropTypes} from 'react';
import {
  RaisedButton,
} from 'material-ui/lib/index';

export default class MobilePlayer extends Component {
  static propTypes = {
    vote: PropTypes.func,
    voting: PropTypes.bool,
    voted: PropTypes.bool,
    dialog: PropTypes.object,
    currentSong: PropTypes.string,
    streamEnabled: PropTypes.bool,
  }
  render() {
    const styles = require('./MobilePlayer.scss');
    const { vote, voted, currentSong } = this.props;
    return (
      <div className={styles.playerMobile}>
        <div className="container">
          <h2>Сейчас играет</h2>
          <div className={styles.song}>
            {currentSong}
          </div>
          {this.props.streamEnabled && !voted &&
          <div>
            <div className={styles.controls}>
              <div className={styles.like}>
                <RaisedButton
                  label="Да"
                  backgroundColor="#4caf50"
                  labelColor="#ffffff"
                  onClick={() => {vote(currentSong, 'like');}}
                  fullWidth/>
              </div>
              <div className={styles.dislike}>
                <RaisedButton
                  label="Нет"
                  backgroundColor="#FF5252"
                  labelColor="#ffffff"
                  onClick={() => {vote(currentSong, 'like');}}
                  fullWidth/>
              </div>
            </div>
            <div className={styles.disclamer}>
                <a href="#" onClick={() => this.props.dialog.show()} className={styles.controlLabel}>Нравится песня?</a>
            </div>
          </div>
          }
          {voted && <span> Спасибо за ваш голос!</span>}
        </div>
      </div>
    );
  }
}
