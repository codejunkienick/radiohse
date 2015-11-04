import React, {Component, PropTypes} from 'react';
import {
  Paper
} from 'material-ui/lib/index';
import Tappable from 'react-tappable';

export default class Member extends Component {
  static propTypes = {
    windowWidth: PropTypes.string,
    name: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    instagram: PropTypes.string,
    vk: PropTypes.string,
    facebook: PropTypes.string,
    twitter: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      depth: 0,
      tapped: false,
    };
  }

  render() {
    const styles = require('./Member.scss');
    const { depth, tapped } = this.state;
    const { windowWidth, name, rank, avatar, instagram, vk, facebook, twitter} = this.props;
    const paperClasses = styles.member + ' ' + ((tapped && windowWidth < 1024) ? styles.tapped : '');
    return (
      <Tappable
        stopPropagation
        onTap={() => {
          this.setState({tapped: !tapped});
        }}
        onMouseLeave={() => this.setState({depth: 0})}
        onMouseEnter={() => {
          if (windowWidth > 1024) {
            this.setState({depth: 1});
          }
        }}>
        <Paper
          zDepth={depth}
          className={paperClasses}>
          <div className={styles.avatar}>
            { avatar && <img src={avatar} alt={name}/> }
            { !avatar && <div className={styles.avatarDemo} /> }
          </div>
          <div className={styles.credentials}>
            <div className={styles.memberName}>{name}</div>
            <div className={styles.rank}>{rank}</div>
            <div className={styles.socialLinks}>
              { instagram &&
                <Tappable onTap={() => {
                  window.open(instagram);
                }}>
                  <a  target="_blank" className={styles.instagram} href={instagram}><i className="icon-instagram-with-circle" /></a> 
                </Tappable>
              }
              { vk &&
                <Tappable onTap={() => {
                  window.open(vk);
                }}>
                  <a  target="_blank" className={styles.vk} href={vk}><i className="icon-vk-with-circle" /></a> 
                </Tappable>
              }
              { facebook &&
                <Tappable onTap={() => {
                  window.open(facebook);
                }}>
                  <a  target="_blank" className={styles.facebook} href={facebook}><i className="icon-facebook-with-circle" /></a> 
                </Tappable>
              }
              { twitter &&
                <Tappable onTap={() => {
                  window.open(twitter);
                }}>
                  <a  target="_blank" className={styles.twitter} href={twitter}><i className="icon-twitter-with-circle" /></a> 
                </Tappable>
              }
            </div>
          </div>
        </Paper>
      </Tappable>
    );
  }
}
