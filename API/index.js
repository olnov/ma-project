require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js')
const cors = require('cors');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const app = express();
const PORT = process.env.PORT || 5000;

// Routers
const healthRouter = require('./routes/health');
const publicRouter = require('./routes/public');
const privateRouter = require('./routes/private');

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
app.use('/api/v1/', publicRouter);
app.use('/api/v1/', privateRouter);

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
  console.log(`Server is running on http://localhost:${PORT}`);
});
