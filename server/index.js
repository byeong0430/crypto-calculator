//PORT for Express Server, Sockets will use the same server and port
const PORT = process.env.PORT || 3001;
const ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const quadApiRoutes = require('./routes/api/quadrigacx-api');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Specify where static files are
app.use(express.static(path.join(__dirname + '/../build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// All api calls to /api/quadrigacx are processed in quadApiRoutes
app.use('/api/quadrigacx', quadApiRoutes);


// Express server is for api routes only. For all other routes, send index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../build/index.html'));
});


app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT} in ${ENV} mode.`);
});