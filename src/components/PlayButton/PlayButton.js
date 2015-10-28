import React, {Component} from 'react';
import {
  FloatingActionButton,
} from 'material-ui/lib/index';
export default class PlayButton extends Component {
  render() {
    return (
    <FloatingActionButton backgroundColor="#0097a7" style={{width: '76px', height: '76px'}}>
      <span style={{width: '76px', height: '76px', lineHeight: '76px'}}>
        <svg style={{width: '38px', marginTop: '19px'}} viewBox="0 0 24 24">
          <path fill="#FFFFFF" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
        </svg>
      </span>
    </FloatingActionButton>
    );
  }
}
