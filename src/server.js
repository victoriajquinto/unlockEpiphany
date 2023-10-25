const express = require('express');

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT;

const app = express();

const morgan = require('morgan');
const cors = require('cors');
const pool = require('./db.js');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/hithere', async(req,res) => {
  try {
    res.status(200).send('hello world!');
  } catch (error) {
    console.log('error: ', error);
    res.status(400).send(error);
  }
});

app.post('/user', async(req, res) => {
  try {
    console.log(req.body);
    res.status(201).send('received zap!');
  } catch (error) {
    console.log('error: ', error);
    res.status(401).send(error);
  }
});

app.listen(port, function(err) {
  if(err) console.log("error in express server:", err);
  console.log("Express server listening on PORT", port);
});


