require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js')
const cors = require('cors');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const healthRouter = require('./routes/health'); 
const checkJwt = require('./middleware/checkJwt');
const { requiredScopes } = require('express-oauth2-jwt-bearer');

// minor change

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
// Middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1/', healthRouter);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


// This route doesn't need authentication
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.',
    // user: req.auth
  });
});

// You can configure individual routes to look for a particular scope. To achieve that, 
// set up another middleware with the requiresScope method. Provide the required scopes 
// and apply the middleware to any routes you want to add authorization to.
const checkScopes = requiredScopes('read:messages');
// Pass the checkJwt and requiredScopes middlewares to the route you want to protect.
app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
