const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const cards = require('./router/cards');

// config
require('dotenv').config({ path: '../.env' });
const port = process.env.PORT;

// middleware
app.use(
  cors({
    exposedHeaders: ['X-Total-Count'],
  })
);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/uploads', express.static('uploads')); // use '/uploads' folder as a static file provider
app.use(express.static(path.join(__dirname, '../client/build')));

// Routing
app.use('/api/cards', cards);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
