import React, {Component, PropTypes} from 'react';
import {
  FlatButton,
  IconMenu,
  FloatingActionButton,
  Slider
} from 'material-ui/lib/index';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { PlayButton } from 'components';

export default class DesktopPlayer extends Component {
  static propTypes = {
    dialog: PropTypes.object,
    handlePlay: PropTypes.func,
    isPlaying: PropTypes.bool,
    vote: PropTypes.func,
    voting: PropTypes.bool,
    voted: PropTypes.bool,
    updateVolume: PropTypes.func,
    streamEnabled: PropTypes.bool,
    currentSong: PropTypes.string
  }

  componentDidMount() {
    // TODO: Do i even need this anymore?
    const injectTapEventPlugin = require('react-tap-event-plugin');
    injectTapEventPlugin(); // hack for material-ui, until material-ui 1.0
  }

  constuctor(props) {
    super(props);
  }

  render() {
    const styles = require('./DesktopPlayer.scss');

    const button = (
      <div className={styles.play}>
        <PlayButton ref="playButton" />
      </div>
    );

    const { isPlaying, handlePlay, currentSong, dialog, vote, voted, streamEnabled, updateVolume } = this.props;

    return (
      <div className={styles.player}>
        <div className={styles.song}>
          {currentSong}
        </div>
        {true &&
          <div className={styles.controls}>
            {!false &&
              <div>
                <FlatButton
                  rippleColor="#ffffff"
                  backgroundColor="transparent"
                  className={styles.like}
                  onClick={() => {vote(currentSong, 'like');}}>
                    Да
                </FlatButton>
                <a onClick={() => dialog.show()} className={styles.controlLabel}>Нравится песня?</a>
                <FlatButton
                  rippleColor="#ffffff"
                  backgroundColor="transparent"
                  className={styles.dislike}
                  onClick={() => vote(currentSong, 'dislike')}>
                    Нет
                </FlatButton>
              </div>
            }
            {voted &&
              <div style={{color: 'rgba(255,255,255,0.8)', textAlign: 'center', fontSize: '20px'}}>Cпасибо за ваш голос!</div>
            }
          </div>
        }
        <div style={{

          width: '76px',
          height: '76px',
          position: 'absolute',
          left: '50%',
          right: '50%',
          bottom: '-38px',
          marginLeft: '-38px',
        }}>
        { !isPlaying &&
        <IconMenu
          iconButtonElement={button} width="120px" >
          <MenuItem primaryText="128 kb/s" onClick={() => {handlePlay(128);}}/>
          <MenuItem primaryText="64 kb/s" onClick={() => {handlePlay(64);}}/>
          <MenuItem primaryText="Скачать m3u" onClick={() => {window.location = 'live.m3u';}}/>
        </IconMenu>
        }
        { isPlaying &&
          <div
            onClick={() => handlePlay()}
            className={styles.play}>
            <FloatingActionButton backgroundColor="#0097a7" style={{width: '76px', height: '76px'}}>
              <span style={{width: '76px', height: '76px', lineHeight: '76px'}}>
                <svg style={{width: '38px', marginTop: '19px'}} viewBox="0 0 24 24">
                  <path fill="#FFFFFF" d="M14,19.14H18V5.14H14M6,19.14H10V5.14H6V19.14Z" />
                </svg>
              </span>
            </FloatingActionButton>
          </div>
        }
        { isPlaying && 
          <div className={styles.volumeControl}>
            <div>
              <svg className={styles.volumeIcon} viewBox="0 0 24 24">
                  <path fill="#AAA" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
              </svg>
              <Slider
                className={styles.volumeSlide}
                name="volume"
                defaultValue={0.6}
                onChange={(event, value) => updateVolume(value)}
                step={0.05} />
            </div>
          </div>
        }

      </div>
    </div>
    );
  }
}
