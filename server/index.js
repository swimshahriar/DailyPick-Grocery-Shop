const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

const app = express();

app.use(helmet());
app.use(cors());
app.use(logger('tiny'));
app.use(express.json());

// Routes
app.get('/', (req, res, next) => {
  res.json('Hello from server!');
});

// Error handler
app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }

  if (process.env.NODE_ENV === 'production') {
    res.json({
      message: error.message,
    });
  } else {
    res.json({
      message: error.message,
      stack: error.stack,
    });
  }
});

// MongoDB connection and Server startup
mongoose
  .connect('mongodb://localhost/dailypick', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('db connected!');
    app.listen('8000' || process.env.PORT, () =>
      console.log('server started!')
    );
  })
  .catch((err) => console.error(err.message));
