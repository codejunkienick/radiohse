import React, { Component, PropTypes } from 'react';
import * as validation from 'utils/validation';
import { connect } from 'react-redux';
import { send } from 'redux/modules/mail';
import Scroll from 'react-scroll';
import {
  LinearProgress,
  Snackbar,
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

      titleError: '',
      emailError: '',
      messageError: '',
    };
  }
  sendEmail() {
    const { titleInput, emailInput, messageInput } = this.state;
    let emailError;
    let messageError;
    let titleError;
    // TODO: Validation
    titleError = validation.required(titleInput);
    messageError = validation.required(messageInput);
    emailError = validation.required(emailInput) || validation.email(emailInput);
    if (emailError || messageError || titleError) {
      this.setState({
        emailError,
        messageError,
        titleError
      });
      return;
    }
    const mail = {
      from: emailInput,
      text: messageInput,
      subject: titleInput
    };
    console.log(mail);
    this.props.send(mail);
  }

  clearError() {
    this.setState({
      titleError: '',
      emailError: '',
      messageError: '',
    });
  }

  render() {
    const styles = require('./ContactForm.scss');
    const { sent, sending, error } = this.props;
    const { titleError, emailError, messageError, titleInput, emailInput, messageInput } = this.state;
    if (sent) {
      this.refs.snack.show();
    }
    return (
      <Scroll.Element name="contact" className={styles.contact}>
        <div className="container">
          <h2>Связаться с нами</h2>
          {sent &&
            <span>Спасибо за ваше сообщение! Мы вскоре свяжемся с вами</span>
          }
          {sending &&
            <LinearProgress mode="indeterminate" />
          }
          { error &&
            <span>Извините, кажется произошла ошибка, попробуйте повторить позднее или обратиться к нам в Вконтакте</span>
          }
          <div className={styles.contactRow}>
            <TextField
              onFocus={this.clearError.bind(this)}
              valueLink={{
                value: titleInput,
                requestChange: (val) => {
                  this.setState({titleInput: val});
                }
              }}
              fullWidth
              hintText="Напишите заголовок"
              errorText={titleError}
              floatingLabelText="Заголовок" />
          </div>

          <div className={styles.contactRow}>
            <TextField
              onFocus={this.clearError.bind(this)}
              valueLink={{
                value: emailInput,
                requestChange: (val) => {
                  this.setState({emailInput: val});
                }
              }}
              fullWidth
              hintText="Email"
              errorText={emailError}
              floatingLabelText="e-mail" />
          </div>

          <div className={styles.contactRow} style={{marginBottom: '40px'}}>
            <TextField
              onFocus={() => this.clearError.bind(this)}
              valueLink={{
                value: messageInput,
                requestChange: (val) => {
                  this.setState({messageInput: val});
                }
              }}
              fullWidth
              floatingLabelText="Сообщение"
              hintText="Содержание сообщение"
              rows={4}
              errorText={messageError}
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
        <Snackbar
          ref="snack"
          message="Сообщение отправлено"
          action="ok"
          autoHideDuration={2500}
          onActionTouchTap={() => this.refs.snack.dismiss()}/>
      </Scroll.Element>
    );
  }
}
