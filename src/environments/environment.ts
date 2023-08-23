export const environment = {
    production: true,
     // baseUrl: 'http://localhost:8000/api/',
     // siteUrl: 'http://localhost:8000/',
    baseUrl: 'https://jobseeker-api.testprototype.ir/public/api/',
    siteUrl: 'https://jobseeker-api.testprototype.ir/',
    siteAddress: {
      //   one: 'http://localhost:4200',
       // two: 'http://localhost:4200',
        one: 'https://jobseeker.testprototype.ir',
        two: 'https://www.jobseeker.testprototype.ir',
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

