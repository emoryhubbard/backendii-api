const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API by Emory Hubbard',
        description: 'Contacts API and more'
    },
    host: 'localhost:3000',
    schemes: ['http'],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
/*
swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
    await import('./server.js');
});
*/
