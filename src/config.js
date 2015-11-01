require('babel-core/polyfill');

const environment = {
  development: {
    isProduction: false,
    port: 3000,
    apiPort: 3030,
    app: {
      title: 'РАДИОВЫШКА',
      description: 'Радиостанция Высшей Школы Экономики',
      meta: {
        charSet: 'utf-8',
        property: {
          'og:site_name': 'РАДИОВЫШКА',
          'og:image': 'http://radiohse.com/logo.jpg',
          'og:locale': 'ru_RU',
          'og:title': 'РАДИОВЫШКА',
          'og:description': 'Радиостанция Высшей Школы Экономики',
          'twitter:card': 'summary',
          'twitter:site': '@codejunkienick',
          'twitter:creator': '@codejunkienick',
          'twitter:title': 'РАДИОВЫШКА',
          'twitter:description': 'Радиостанция Высшей Школы Экономики',
          'twitter:image': 'http://radiohse.com/logo.jpg',
          'twitter:image:width': '200',
          'twitter:image:height': '200'
        }
      }
    }
  },
  production: {
    isProduction: true,
    port: 80,
    apiPort: 3030,
    app: {
      title: 'РАДИОВЫШКА',
      description: 'Радиостанция Высшей Школы Экономики',
      meta: {
        charSet: 'utf-8',
        property: {
          'og:site_name': 'РАДИОВЫШКА',
          'og:image': 'http://radiohse.com/logo.jpg',
          'og:locale': 'ru_RU',
          'og:title': 'РАДИОВЫШКА',
          'og:description': 'Радиостанция Высшей Школы Экономики',
          'twitter:card': 'summary',
          'twitter:site': '@codejunkienick',
          'twitter:creator': '@codejunkienick',
          'twitter:title': 'РАДИОВЫШКА',
          'twitter:description': 'Радиостанция Высшей Школы Экономики',
          'twitter:image': 'http://radiohse.com/logo.jpg',
          'twitter:image:width': '200',
          'twitter:image:height': '200'
        }
      }
    }
  }
}[process.env.NODE_ENV || 'development'];

module.exports = environment;
