import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { send } from 'redux/modules/mail';
import Scroll from 'react-scroll';
import {
  TextField,
  RaisedButton,
} from 'material-ui/lib/index';
@connect(
  state => ({
    sent: state.mail.sent,
    sending: state.mail.sending,
    error: state.mail.error
  }), {send}
)
export default class ContactForm extends Component {
  static propTypes = {
    send: PropTypes.func,
    sent: PropTypes.bool,
    sending: PropTypes.bool,
    error: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      titleInput: '',
      emailInput: '',
      messageInput: '',
    };
  }
  sendEmail() {
    const { send } = this.props;
    const { titleInput, emailInput, messageInput } = this.state;
    // TODO: Validation
    const mail = {
      from: emailInput,
      text: messageInput,
      subject: titleInput
    };
    send(mail);
  }
  render() {
    const styles = require('./ContactForm.scss');
    const { titleInput, emailInput, messageInput } = this.state;
    return (
      <Scroll.Element name="contact" className={styles.contact}>
        <div className="container">
          <h2>Связаться с нами</h2>
          <div className={styles.contactRow}>
            <TextField
              valueLink={{
                value: titleInput,
                requestChange: (val) => {this.setState({titleInput: val});}
              }}
              fullWidth
              hintText="Напишите заголовок"
              floatingLabelText="Заголовок" />
          </div>

          <div className={styles.contactRow}>
            <TextField
              valueLink={{
                value: emailInput,
                requestChange: (val) => {this.setState({emailInput: val});}
              }}
              fullWidth
              hintText="Email"
              floatingLabelText="e-mail" />
          </div>

          <div className={styles.contactRow} style={{marginBottom: '40px'}}>
            <TextField
              valueLink={{
                value: messageInput,
                requestChange: (val) => {this.setState({messageInput: val});}
              }}
              fullWidth
              floatingLabelText="Сообщение"
              hintText="Содержание сообщение"
              rows={4}
              multiLine />
          </div>

          <div className={styles.sendRow}>
            <RaisedButton
              onClick={this.sendEmail.bind(this)}
              label="Отправить"
              backgroundColor="#0097a7"
              labelColor="#ffffff" 
              className={styles.sendButton}/>
          </div>

        </div>
      </Scroll.Element>
    );
  }
}
