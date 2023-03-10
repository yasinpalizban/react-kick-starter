
export const environment = {
  production: true,
  baseUrl: 'http://0.0.0.0/api/',
  siteUrl: 'http://0.0.0.0/',
  siteAddress: {
    one: 'http://localhost:4200',
    two: 'http://localhost:4200',
  },
  logger: true,
  pusher: {
    key: '3bf76050d243c21ee0ce',
    cluster: 'ap2',
  },
  captcha: {
    siteKey: '6LdiKdQUAAAAAAbkUBRIhTfxx4Ylpjg-r69sqQ56',
    secretKey: '6LdiKdQUAAAAAHeEgN84MOFHEeScAl0C4dTEOOZJ',
  },

  socialMedia: {
    google: {
      clientId: '',
      clientSecret: ''
    },
    facebook: {
      clientId: '',
      clientSecret: ''
    },
    instagram: {
      clientId: '',
      clientSecret: ''
    }
  }
};

