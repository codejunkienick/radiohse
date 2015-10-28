import React, { Component } from 'react';
import Scroll from 'react-scroll';
import {
  Dialog,
  TextField,
  FlatButton,
  RaisedButton,
  FloatingActionButton
} from 'material-ui/lib/index';

import { Member } from 'components';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    const standardActions = [
      { text: 'Понял', onClick: () => {this.refs.aboutSystem.dismiss();} }
    ];
    // require the logo image both from client and server
    return (
      <div>
        <Dialog
          title="О нашей клевой системе"
          actions={standardActions}
          ref="aboutSystem">
          Adipisicing commodi velit sint fugit dolores quas. Natus dolores cumque ab illo accusantium. At exercitationem architecto sequi atque quam nemo numquam maiores. Voluptas consequuntur natus ea alias officia eveniet, exercitationem.
        </Dialog>
        <Scroll.Element name="header" className={styles.header}>
          <div className="container">
            <div className={styles.topNav}>
              <div className={styles.social}>
                <a href=""><i className="icon-facebook-with-circle" /></a>
                <a href=""><i className="icon-twitter-with-circle" /></a>
                <a href=""><i className="icon-vk-with-circle" /></a>
              </div>
              <div className={styles.nav}>
                <Scroll.Link to="header" spy smooth duration={500}>Главная</Scroll.Link>
                <Scroll.Link to="team" spy smooth offset={50} duration={600}>Команда</Scroll.Link>
                <Scroll.Link to="about" spy smooth offset={50} duration={700}>О радио</Scroll.Link>
                <Scroll.Link to="contact" spy smooth offset={50} duration={800}>Связаться</Scroll.Link>
              </div>
            </div>
            <div className={styles.logo}>
              <img src={require('./logo.svg')} alt="" />
              Радиовышка
            </div>
            <div className={styles.player}>
              <div className={styles.song}>
                Disclosure - F for you
              </div>
              <div className={styles.controls}>
                <FlatButton rippleColor="#ffffff" backgroundColor="transparent" className={styles.like} href="#">Да</FlatButton>
                <a href="#" onClick={() => this.refs.aboutSystem.show()} className={styles.controlLabel}>Нравится песня?</a>
                <FlatButton rippleColor="#ffffff" backgroundColor="transparent" className={styles.dislike} href="#">Нет</FlatButton>
              </div>
              <div className={styles.play}>
                <FloatingActionButton backgroundColor="#0097a7" style={{width: '76px', height: '76px'}}>
                  <span style={{width: '76px', height: '76px', lineHeight: '76px'}}>
                    <svg style={{width: '38px', marginTop: '19px'}} viewBox="0 0 24 24">
                      <path fill="#FFFFFF" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                    </svg>
                  </span>
                </FloatingActionButton>
              </div>
            </div>
          </div>
        </Scroll.Element>

        <Scroll.Element name="team" className={styles.members}>
          <div className="container">
            <h2>Наша команда</h2>
            <ul className="large-block-grid-6 medium-block-grid-3 small-block-grid-1">
              <li>
                <Member />
              </li>
              <li>
                <Member />
              </li>
              <li>
                <Member />
              </li>
              <li>
                <Member />
              </li>
              <li>
                <Member />
              </li>
              <li>
                <Member />
              </li>
            </ul>
          </div>
        </Scroll.Element>

        <Scroll.Element name="about" className={styles.about}>
          <div className="container" style={{textAlign: 'center', width: '600px'}}>
            <h2>О радио</h2>
            <p>Consectetur recusandae ad dignissimos odit omnis rem earum saepe soluta magnam id magnam cumque ipsa ut harum tenetur sequi? Ut iste quaerat neque reprehenderit inventore sed quas dolorum nam animi. Ipsum blanditiis blanditiis nemo nisi repellat dolor distinctio, voluptatum numquam est eveniet. Perferendis ab perspiciatis magnam cumque culpa alias atque veritatis non eius. Nihil ab dolor esse aliquid possimus molestias!</p>
          </div>
        </Scroll.Element>

        <Scroll.Element name="contact" className={styles.contact}>
          <div className="container">
            <h2>Связаться с нами</h2>
            <div className={styles.contactRow}>
              <TextField
                fullWidth
                hintText="Напишите заголовок"
                floatingLabelText="Заголовок" />
            </div>

            <div className={styles.contactRow}>
              <TextField
                fullWidth
                hintText="Email"
                floatingLabelText="e-mail" />
            </div>

            <div className={styles.contactRow} style={{marginBottom: '40px'}}>
              <TextField
                fullWidth
                floatingLabelText="Сообщение"
                hintText="Содержание сообщение"
                rows={4}
                multiLine />
            </div>
            <div className={styles.contactRow}>
              <RaisedButton label="Отправить" backgroundColor="#0097a7" labelColor="#ffffff" className={styles.sendButton}/>
            </div>

          </div>
        </Scroll.Element>

        <div className={styles.footer}>
          <span className={styles.footerText}>
            2015 &copy; РАДИОВЫШКА <br />
            Разработано <a className={styles.ktknLink}href="http://katakana.me">katakana.me</a>
          </span>

        </div>

      </div>
    );
  }
}
