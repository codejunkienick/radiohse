import React, { Component, PropTypes } from 'react';
import Scroll from 'react-scroll';
import {
  Dialog,
  LeftNav,
} from 'material-ui/lib/index';

import Sticky from 'react-sticky';

import {
  Logo,
  Member,
  MobilePlayer,
  DesktopPlayer,
  ContactForm,
  MobilePlayButton
} from 'components';

export default class Home extends Component {
  static propTypes = {
    members: PropTypes.array
  }
  static defaultProps = {
    members: [
      {
        name: 'Данил Губайдулин',
        rank: 'Руководитель',
        avatar: '',
        vk: 'http://vk.com/microsoft_dude'
      },
      {
        name: 'Никита Потеряев',
        rank: 'Разработчик',
        avatar: '',
        vk: 'http://vk.com/codejunkienick',
        twitter: 'http://twitter.com/codejunkienick'
      },
      {
        name: 'Игорь Старостюк',
        rank: 'DJ',
        avatar: '',
        vk: 'http://vk.com/hartss'
      },
      {
        name: 'Дарья Сапко',
        rank: 'DJ',
        avatar: '',
      },
      {
        name: 'Вадим Кропотин',
        rank: 'Редактор',
        avatar: '',
        vk: 'http://vk.com/v.kropotin'
      },
      {
        name: 'Екатерина Дегтярёва',
        rank: 'Редактор',
        avatar: '',
      },
    ]
  }

  constructor(props) {
    super(props);
    this.state = {
      windowWidth: '',
      headerOffset: '0px',
    };
  }

  componentDidMount() {
    this.setState({windowWidth: window.innerWidth});
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({windowWidth: window.innerWidth});
  }

  render() {
    const { members } = this.props;
    const { headerOffset, windowWidth } = this.state;
    const styles = require('./Home.scss');

    const standardActions = [
      { text: 'Понял', onClick: () => {this.refs.aboutSystem.dismiss();} }
    ];

    const menuItems = [
      { route: 'get-started', text: 'Главная' },
      { route: 'customization', text: 'Команда' },
      { route: 'components', text: 'О радио' },
      { route: 'components', text: 'Связаться' },
    ];
    console.log(windowWidth);

    return (
      <div>
        <Dialog
          title="О нашей клевой системе"
          actions={standardActions}
          ref="aboutSystem">
          Adipisicing commodi velit sint fugit dolores quas. Natus dolores cumque ab illo accusantium. At exercitationem architecto sequi atque quam nemo numquam maiores. Voluptas consequuntur natus ea alias officia eveniet, exercitationem.
        </Dialog>

        <LeftNav ref="leftNav" docked={false} menuItems={menuItems} />

        <Scroll.Element name="header" className={styles.header}>
          <div style={{paddingTop: headerOffset}} className="container">
            <div className={styles.burger}>
              <a onClick={() => {this.refs.leftNav.toggle();}}>
                <svg style={{width: '28px', height: '28px', marginTop: '8px'}} viewBox="0 0 24 24">
                  <path fill="#fff" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                </svg>
              </a>
            </div>
            { windowWidth > 1024 &&
            <Sticky
              className={styles.topNav}
              stickyClass={styles.stickyTopNav}
              topOffset={60}
              onStickyStateChange={(isSticky) => {
                if (isSticky && windowWidth > 1024) this.setState({headerOffset: '110px'}); // TODO: remove hardcoded value
                else this.setState({headerOffset: '0px'});
              }}>
                <div className={styles.social}>
                  <a href=""><i className="icon-facebook-with-circle" /></a>
                  <a href=""><i className="icon-twitter-with-circle" /></a>
                  <a href=""><i className="icon-vk-with-circle" /></a>
                </div>
                <div className={styles.nav}>
                  <Scroll.Link to="header" spy smooth duration={500}>Главная</Scroll.Link>
                  <Scroll.Link to="team" spy smooth offset={10} duration={600}>Команда</Scroll.Link>
                  <Scroll.Link to="about" spy smooth offset={10} duration={700}>О радио</Scroll.Link>
                  <Scroll.Link to="contact" spy smooth offset={10} duration={800}>Связаться</Scroll.Link>
                </div>
            </Sticky>
            }

            <Logo />

            <DesktopPlayer />

          </div>
        </Scroll.Element>

        <MobilePlayButton />

        <div className={styles.socialMobile}>
          <div className="container">
            <h2>Мы в соцсетях</h2>
            <a className={styles.facebook} href=""><i className="icon-facebook-with-circle" /></a>
            <a className={styles.twitter} href=""><i className="icon-twitter-with-circle" /></a>
            <a className={styles.vk} href=""><i className="icon-vk-with-circle" /></a>
          </div>
        </div>

        <MobilePlayer dialog={this.refs.aboutSystem}/>

        <Scroll.Element name="team" className={styles.members}>
          <div className="container">
            <h2>Наша команда</h2>
            <ul className={styles.memberGrid + ' large-block-grid-6 medium-block-grid-3 small-block-grid-1'}>
              {members.map((member) => {
                return <li><Member windowWidth={windowWidth} {...member} /></li>;
              })
              }
            </ul>
          </div>
        </Scroll.Element>

        <Scroll.Element name="about" className={styles.about}>
          <div className="container" style={{textAlign: 'center', maxWidth: '600px'}}>
            <h2>О радио</h2>
            <p>Consectetur recusandae ad dignissimos odit omnis rem earum saepe soluta magnam id magnam cumque ipsa ut harum tenetur sequi? Ut iste quaerat neque reprehenderit inventore sed quas dolorum nam animi. Ipsum blanditiis blanditiis nemo nisi repellat dolor distinctio, voluptatum numquam est eveniet. Perferendis ab perspiciatis magnam cumque culpa alias atque veritatis non eius. Nihil ab dolor esse aliquid possimus molestias!</p>
          </div>
        </Scroll.Element>

        <ContactForm />


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
