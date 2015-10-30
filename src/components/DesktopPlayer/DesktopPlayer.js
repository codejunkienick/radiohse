import React, {Component, PropTypes} from 'react';
import {
  FlatButton,
  IconMenu,
} from 'material-ui/lib/index';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { PlayButton } from 'components';

export default class Logo extends Component {
  static propTypes = {
    dialog: PropTypes.object
  }
  componentDidMount() {
    const injectTapEventPlugin = require('react-tap-event-plugin');
    injectTapEventPlugin(); // hack for material-ui, until material-ui 1.0
  }
  render() {
    const styles = require('./DesktopPlayer.scss');

    const button = (
      <div className={styles.play}>
        <PlayButton ref="playButton" />
      </div>
    );

    return (
      <div className={styles.player}>
        <div className={styles.song}>
          Disclosure - F for you
        </div>
        <div className={styles.controls}>
          <FlatButton rippleColor="#ffffff" backgroundColor="transparent" className={styles.like} href="#">Да</FlatButton>
          <a href="#" onClick={() => this.props.dialog.show()} className={styles.controlLabel}>Нравится песня?</a>
          <FlatButton rippleColor="#ffffff" backgroundColor="transparent" className={styles.dislike} href="#">Нет</FlatButton>
        </div>
        <div style={{

          width: '76px',
          height: '76px',
          position: 'absolute',
          left: '50%',
          right: '50%',
          bottom: '-38px',
          marginLeft: '-38px',
        }}>
        <IconMenu
          iconButtonElement={button} width="120px" >
          <MenuItem primaryText="128 kb/s" />
          <MenuItem primaryText="192 kb/s" />
          <MenuItem primaryText="Скачать m3u" />
        </IconMenu>
      </div>
    </div>
    );
  }
}
