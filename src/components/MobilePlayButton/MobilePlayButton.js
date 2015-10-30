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

export default class Logo extends Component {
  static propTypes = {
    dialog: PropTypes.object
  }
  componentDidMount() {
  }
  render() {
    const styles = require('./MobilePlayButton.scss');


    const button2 = (
      <span><PlayButton /></span>
    );

    return (
      <div className={styles.mobilePlay}>
        <div className="container">
          <div className={styles.playButton}>
            <IconMenu
              openDirection="bottom-right"
              iconButtonElement={button2}>
              <MenuItem primaryText="128 kb/s" />
              <MenuItem primaryText="192 kb/s" />
              <MenuItem primaryText="Скачать m3u" />
            </IconMenu>
          </div>
          <div className={styles.playLabel}>
            Начать воспроизведение
          </div>
        </div>
      </div>
    );
  }
}
