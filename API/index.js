require('dotenv').config();
const app = require("./app");

const connectDB = require('./config/db.js')

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  })
  
// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db.js')
// const cors = require('cors');
// const logger = require('morgan');
// const swaggerUi = require('swagger-ui-express');
// const swaggerFile = require('./swagger-output.json');

// // Initialize Express app
// const app = express();
// const PORT = process.env.PORT || 5000;
// const NODE_ENV = process.env.NODE_ENV || 'production';

// // Routers
// const usersRouter = require('./routes/users.js');
// const campaignRouter = require('./routes/campaign'); 
// const shareableProfileRouter = require('./routes/shareable-profile');

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(logger('dev'));
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // SwaggerUI for API documentation. Works only in development mode.
// if (NODE_ENV === 'development') {
//   app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
// } 


// // Routes with Swagger tags
// app.use('/api/v1/users', usersRouter
//   //  #swagger.tags=['users']
// );
// app.use('/api/v1/campaigns', campaignRouter
//   //  #swagger.tags=['campaigns']
// ); 
// app.use('/api/v1/shareable-profiles', shareableProfileRouter
//   //  #swagger.tags=['shareable-profiles']
// );


// // 404 handler
// app.use((req, res, next) => {
//   res.status(404).json({ error: 'Not found' });
// });

// // Error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     error: { message: err.message || 'Internal Server Error' },
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
