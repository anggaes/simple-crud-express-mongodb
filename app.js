require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const logger = require('./src/common/logger');

const contextPath = process.env.CONTEXT_PATH || '';
const app = express();

// Configuring App
app.disable('x-powered-by');
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.options('*', cors());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// Request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev', { stream: logger.streamDebug }));
} else if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common', { skip: (req, res) => res.statusCode < 400, stream: logger.streamError }));
  app.use(morgan('common', { skip: (req, res) => res.statusCode < 400, stream: logger.streamError }));
  app.use(morgan('common', { skip: (req, res) => res.statusCode > 400, stream: logger.streamInfo }));
}

// app.use((req, res, next) => {
//   if (res.statusCode < 200) {
//     logger.info(
//       `${req.method
//       } ${
//         req.url
//       } - req = ${
//         JSON.stringify(req.body)
//       }, res = ${
//         JSON.stringify(res.body)}`,
//     );
//   } else {
//     logger.info(
//       `${req.method
//       } ${
//         req.url
//       } - req = ${
//         JSON.stringify(req.body)
//       }, res = ${
//         JSON.stringify(res.body)}`,
//     );
//   }
//   next();
// });

// app.use((req, res, next) => {
//   console.log(req.url);
//   console.log(req.method);
//   return next();
// });

// Routes (START)
app.use(`${contextPath}/scorecard`, require('./src/routes/ScorecardRoutes'));
app.use(`${contextPath}/user`, require('./src/routes/UserRoutes'));
// Routes (END)

// Error Handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // log file
  // logger.debug(`${req.method} ${req.url} - ${err.stack}`);
  // console.log(`${req.method} ${req.url} - ${err.stack}`);

  if (typeof err === 'string') {
    // custom application error
    return res.status(400).json({ status: 400, message: err });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Unauthorized to access',
    });
  }

  if (err.name === 'BadRequestError') {
    // bad request error
    return res.status(400).json({ message: err.message });
  }

  // default to 500 server error
  return res.status(500).json({ status: 500, message: err.message });
});

// SwaggerUI
// if (1 == 1 /*!isProduction*/) {
//   const swaggerUi = require('swagger-ui-express');
//   const yaml = require('js-yaml');
//   const fs = require('fs');
//   const path = require('path');
//   const swaggerDocument = yaml.safeLoad(
//     fs.readFileSync(path.join(__dirname, '/swagger.yaml'))
//   );
//   const options = { docExpansion: 'none', defaultModelsExpandDepth: -1 };
//   const customCss =
//     '.swagger-ui .topbar { display: none } .swagger-ui .info { margin: 20px 0; }';
//   app.use(
//     '/api-docs',
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerDocument, true, options, customCss)
//   );
// }

// Handler for Not Found URL (404)
app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

module.exports = app;
