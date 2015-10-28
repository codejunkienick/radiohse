import React, {Component, PropTypes} from 'react';
import {
  Paper
} from 'material-ui/lib/index';

export default class Member extends Component {
  static propTypes = {
    name: PropTypes.string,
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
    return (
      <Paper zDepth={depth} className={styles.member} onMouseLeave={()=> this.setState({depth: 0})} onMouseEnter={()=> this.setState({depth: 1})}>
        <div className={styles.avatar}>
          <div className={styles.avatarDemo}>
          </div>
        </div>
        <div className={styles.credentials}>
          <div className={styles.memberName}>Данил Губайдулин</div>
          <div className={styles.rank}>CEO</div>
        </div>
        <div className={styles.socialLinks}>
          <a href=""><i className="icon-facebook-with-circle" /></a>
          <a href=""><i className="icon-twitter-with-circle" /></a>
          <a href=""><i className="icon-vk-with-circle" /></a>
        </div>
      </Paper>
    );
  }
}
