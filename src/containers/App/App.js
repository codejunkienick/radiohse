import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';

const title = 'РАДИОВЫШКА - Провайдер хорошего настроения';
const description = 'Онлайн радиостанция Высшей Школы Экономики';
const image = '/logo.jpg';

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
    property: {
      'og:site_name': title,
      'og:image': image,
      'og:locale': 'en_US',
      'og:title': title,
      'og:description': description,
      'twitter:card': 'summary',
      'twitter:site': '@codejunkienick',
      'twitter:creator': '@codejunkienick',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:image:width': '200',
      'twitter:image:height': '200'
    }
  }
};

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <DocumentMeta {...meta}/>

        <main className={styles.appContent}>
          {this.props.children}
        </main>

      </div>
    );
  }
}
