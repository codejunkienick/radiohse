import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import Sticky from 'react-sticky';
import {
  Dialog,
  LeftNav,
} from 'material-ui/lib/index';

import {
  Logo,
  Member,
  MobilePlayer,
  DesktopPlayer,
  ContactForm,
  MobilePlayButton
} from 'components';
import * as voteActions from 'redux/modules/vote';

@connect(
  state => ({
    currentSong: state.vote.currentSong,
    loaded: state.vote.loaded,
    voted: state.vote.voted,
    voting: state.vote.voting,
    streamEnabled: state.vote.streamEnabled,
  }),
  voteActions
)
export default class Home extends Component {
  static propTypes = {
    members: PropTypes.array,
    currentSong: PropTypes.string,
    voted: PropTypes.bool,
    voting: PropTypes.bool,
    load: PropTypes.func,
    voteSong: PropTypes.func,
    stopStream: PropTypes.func,
    loaded: PropTypes.bool,
    streamEnabled: PropTypes.bool,
  }
  static defaultProps = {
    members: [
      {
        name: 'Данил Губайдулин',
        rank: 'Руководитель',
        avatar: '/photos/danil.jpg',
        vk: 'http://vk.com/microsoft_dude'
      },
      {
        name: 'Никита Потеряев',
        rank: 'Разработчик',
        avatar: '/photos/nick.jpg',
        vk: 'http://vk.com/codejunkienick',
      },
      {
        name: 'Игорь Старостюк',
        rank: 'DJ',
        avatar: '/photos/igor.jpg',
        vk: 'http://vk.com/hartss',
        twitter: 'https://twitter.com/starostyuk_igor'
      },
      {
        name: 'Дарья Сапко',
        rank: 'DJ',
        avatar: '/photos/dasha.jpg',
        instagram: 'https://instagram.com/daryadari/',
        vk: 'http://vk.com/daryadari'
      },
      {
        name: 'Вадим Кропотин',
        rank: 'Редактор',
        avatar: '/photos/vadim.jpg',
        vk: 'http://vk.com/v.kropotin',
        instagram: 'https://instagram.com/vadim_kropotin/',
        facebook: 'https://www.facebook.com/vadim.kropotin'
      },
      {
        name: 'Екатерина Дегтерева',
        rank: 'Редактор',
        avatar: '/photos/kate.jpg',
        vk: 'http://vk.com/lady_gerber'
      },
    ]
  }

  constructor(props) {
    super(props);
    this.state = {
      windowWidth: '',
      headerOffset: '0px',
      playing: false,
    };
  }

  componentDidMount() {
    this.setState({windowWidth: window.innerWidth});
    window.addEventListener('resize', this.handleResize.bind(this));

    socket.on('playermeta', (data) => {
      if (Object.keys(data).length > 0 && (!this.props.loaded || this.props.currentSong !== data.StreamTitle)) {
        if (data.StreamTitle !== '') {
          this.props.load(data.StreamTitle);
        } else {
          this.props.load('ON AIR');
        }
      } else if (Object.keys(data).length < 0) {
        this.props.stopStream();
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({windowWidth: window.innerWidth});
  }

  handlePlay(bitrate) {

    const stream128 = this.refs.stream128;
    const stream64 = this.refs.stream64;

    stream128.volume = 0.6;
    stream64.volume = 0.6;


    if (this.state.playing) {
      stream128.pause();
      stream64.pause();
      this.setState({playing: !this.state.playing});
      return;
    }

    switch (bitrate) {
      case 128:
        stream128.play();
        break;
      case 64:
        stream64.play();
        break;
      default:
        stream128.play();
        break;
    }

    this.setState({playing: !this.state.playing});
  }
  updateVolume(volume) {
    const stream = this.refs.stream128;
    const stream64 = this.refs.stream64;
    stream64.volume = volume;
    stream.volume = volume;
  }

  render() {
    const { members, currentSong, voteSong, voted, voting, streamEnabled } = this.props;
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

    return (
      <div>
        <audio ref="stream128">
          <source src="http://40.127.181.21/live" />
        </audio>

        <audio ref="stream64">
          <source src="http://40.127.181.21/live64" />
        </audio>

        <Dialog
          title="О нашей клевой системе"
          actions={standardActions}
          ref="aboutSystem">
Понравился трек? Жми «ДА» и у него появится шанс попасть в наш специальный чарт, в котором мы прокрутим самые популярные треки прошедшего месяца. Кроме того, песни, набравшие большее количество голосов будут обсуждаться в нашей специальной программе нашими любимыми DJs!
Может быть трек, выбранный именно тобой, попадет в список лучших уже сейчас!
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
                  <a target="_blank" href="https://instagram.com/hseradio/"><i className="icon-instagram-with-circle" /></a>
                  <a target="_blank" href="http://vk.com/hse_fm"><i className="icon-vk-with-circle" /></a>
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

            <DesktopPlayer
              updateVolume={this.updateVolume.bind(this)}
              streamEnabled={streamEnabled}
              dialog={this.refs.aboutSystem}
              currentSong={currentSong}
              isPlaying={this.state.playing}
              vote={voteSong}
              voting={voting}
              voted={voted}
              handlePlay={this.handlePlay.bind(this)} />

          </div>
        </Scroll.Element>

        <MobilePlayButton
          streamEnabled={streamEnabled}
          isPlaying={this.state.playing}
          handlePlay={this.handlePlay.bind(this)} />


        <div className={styles.socialMobile}>
          <div className="container">
            <h2>Мы в соцсетях</h2>
            <a target="_blank" className={styles.instagram} href="https://instagram.com/hseradio/"><i className="icon-instagram-with-circle" /></a>
            <a target="_blank" className={styles.vk} href="http://vk.com/hse_fm"><i className="icon-vk-with-circle" /></a>
          </div>
        </div>

        <MobilePlayer
          vote={voteSong}
          voting={voting}
          voted={voted}
          streamEnabled={streamEnabled}
          dialog={this.refs.aboutSystem}
          currentSong={currentSong} />


        <Scroll.Element name="team" className={styles.members}>
          <div className="container">
            <h2>Наша команда</h2>
            <ul className={styles.memberGrid + ' large-block-grid-6 medium-block-grid-3 small-block-grid-1'}>
              {members.map((member) => {
                return <li><Member key={member.id} windowWidth={windowWidth} {...member} /></li>;
              })
              }
            </ul>
          </div>
        </Scroll.Element>

        <Scroll.Element name="about" className={styles.about}>
          <div className="container" style={{textAlign: 'center', maxWidth: '600px'}}>
            <h2>О радио</h2>
            <p>
Радиовышка – первый независимый студенческий информационно-развлекательный радио проект на базе Пермского кампуса Высшей школы экономики.
Над проектом работает молодая команда, члены которой имеют общие интересы и различные музыкальные предпочтения. Основополагающая идея радио – дарить слушателям хорошее настроение. Эфир Радиовышки наполняется качественным музыкальным контентом, который поддерживается голосами активных и всегда интересных DJs.
Трансляция радио была запущена 21 октября 2015 года и с этого времени работает в режиме non-stop в формате 24/7.
            </p>
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
