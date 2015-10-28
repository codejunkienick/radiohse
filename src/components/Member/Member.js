import React, {Component, PropTypes} from 'react';
import {
  Paper
} from 'material-ui/lib/index';

export default class Member extends Component {
  static propTypes = {
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
      depth: 0
    };
  }

  render() {
    const styles = require('./Member.scss');
    const { depth } = this.state;
    const { name, rank, avatar, instagram, vk, facebook, twitter} = this.props;
    return (
      <Paper zDepth={depth} className={styles.member} onMouseLeave={()=> this.setState({depth: 0})} onMouseEnter={()=> this.setState({depth: 1})}>
        <div className={styles.avatar}>
          { avatar && <img href={avatar} alt={name}/> }
          { !avatar && <div className={styles.avatarDemo} /> }
        </div>
        <div className={styles.credentials}>
          <div className={styles.memberName}>{name}</div>
          <div className={styles.rank}>{rank}</div>
        </div>
        <div className={styles.socialLinks}>
          { instagram && <a href={instagram}><i className="icon-instagram-with-circle" /></a> }
          { facebook && <a href={facebook}><i className="icon-facebook-with-circle" /></a> }
          { vk && <a href={vk}><i className="icon-vk-with-circle" /></a> }
          { twitter && <a href={twitter}><i className="icon-twitter-with-circle" /></a> }
        </div>
      </Paper>
    );
  }
}
