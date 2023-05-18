const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Gardening API',
        description: 'Information on planting edibles in the garden'
    },
    host: 'gardening-app.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
