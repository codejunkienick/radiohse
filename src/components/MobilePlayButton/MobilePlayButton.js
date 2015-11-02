import React, {Component, PropTypes} from 'react';
import {
  IconMenu,
  FloatingActionButton,
} from 'material-ui/lib/index';
import MenuItem from 'material-ui/lib/menus/menu-item';

const PlayButton = () => {
  return (
    <FloatingActionButton backgroundColor="#0097a7">
      <svg viewBox="-7 -6 38 38">
        <path fill="#FFFFFF" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
      </svg>
    </FloatingActionButton>
  );
};

const PauseButton = () => {
  return (
    <FloatingActionButton backgroundColor="#0097a7">
      <svg viewBox="-7 -6 38 38">
        <path fill="#FFFFFF" d="M14,19.14H18V5.14H14M6,19.14H10V5.14H6V19.14Z" />
      </svg>
    </FloatingActionButton>
  );
};

export default class Logo extends Component {
  static propTypes = {
    handlePlay: PropTypes.func,
    isPlaying: PropTypes.bool,
  }
  componentDidMount() {
  }
  render() {
    const styles = require('./MobilePlayButton.scss');

    const button2 = (
      <span><PlayButton /></span>
    );

    const { handlePlay, isPlaying } = this.props;

    return (
      <div className={styles.mobilePlay}>
        <div className="container">
          <div className={styles.playButton}>
            {!isPlaying &&
            <IconMenu
              openDirection="bottom-right"
              iconButtonElement={button2}>
              <MenuItem primaryText="128 kb/s" onClick={ () => {handlePlay(128);} }/>
              <MenuItem primaryText="64 kb/s" onClick={ () => {handlePlay(64);} }/>
              <MenuItem primaryText="Скачать m3u" onClick={ () => {window.location = 'live.m3u';} }/>
            </IconMenu>
            }
            {isPlaying &&
              <span onClick={() => {handlePlay();}}>
              <PauseButton />
              </span>
            }
          </div>
          <div className={styles.playLabel}>
            {!isPlaying &&
              <span>Начать воспроизведение</span>
            }
            {isPlaying &&
              <span>Остановить</span>
            }
          </div>
        </div>
      </div>
    );
  }
}
