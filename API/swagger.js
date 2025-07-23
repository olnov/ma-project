require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0', debug:true, autoHeader: true, autoQuery: true, autoResponse: true, autoPath: true });

const doc = {
  info: {
    title: 'MA Project API',
    description: 'Backend API documentation for MA Project',
  },
  host: process.env.SWAGGER_BE,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};


const outputFile = './swagger-output.json';
const routes = ['./app.js'];

swaggerAutogen(outputFile, routes, doc);
