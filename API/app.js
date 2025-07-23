const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');


// Initialize Express app
const app = express();
// const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'production';


// Routers
const usersRouter = require('./routes/users.js');
const campaignRouter = require('./routes/campaign'); 
const shareableProfileRouter = require('./routes/shareable-profile');


// Middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// SwaggerUI for API documentation. Works only in development mode.
if (NODE_ENV === 'development') {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
} 


// Routes with Swagger tags
// app.use('/api/v1/users', usersRouter /* #swagger.tags=['users'] */);
app.use('/api/v1/users', usersRouter
  //  #swagger.tags=['users']
);
app.use('/api/v1/campaigns', campaignRouter
  //  #swagger.tags=['campaigns']
); 
app.use('/api/v1/shareable-profiles', shareableProfileRouter
  //  #swagger.tags=['shareable-profiles']
);


// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: { message: err.message || 'Internal Server Error' },
    });
});


module.exports = app;