require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js')
const cors = require('cors');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
// const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 5000;

// Routers
const healthRouter = require('./routes/health');
const publicRouter = require('./routes/public');
const privateRouter = require('./routes/private');
const authRouter = require('./routes/auth');  //For development
const feedbacksRouter = require('./routes/feedback');
const usersRouter = require('./routes/users.js');
const registerStubRouter = require('./routes/userStub'); // FOR DEVELOPMENT ONLY
const campaignRouter = require('./routes/campaign'); 
const shareableProfileRouter = require('./routes/shareable-profile');

// Connect to MongoDB
connectDB();
// Middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Routes
app.use('/api/v1/feedbacks', feedbacksRouter
  //  #swagger.tags=['feedbacks(dev)']
);
app.use('/api/v1/auth', authRouter
  //  #swagger.tags=['auth(dev)']
); // FOR DEVELOPMENT ONLY
app.use('/api/v1/', healthRouter
  //  #swagger.tags=['health(dev)']
);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/api/v1/', publicRouter
  //  #swagger.tags=['public(dev)']
);
app.use('/api/v1/', privateRouter
  //  #swagger.tags=['private(dev)']
);
app.use('/api/v1/users', usersRouter
  //  #swagger.tags=['users']
);
app.use('/api/v1/userStub', registerStubRouter
  //  #swagger.tags=['register-stub(dev)']
); // FOR DEVELOPMENT ONLY
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
