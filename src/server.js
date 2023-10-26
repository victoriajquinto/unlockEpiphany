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

    let [ name, email, mbti, interests, frequency ] = [ req.body.name, req.body.email, req.body.mbti, req.body.interests, req.body.frequency ];

    interests = interests.split(',').map(topic => topic.trimStart());

    const freqOptions = [1, 7, 30];
    let randomFrequency = freqOptions[Math.floor(Math.random() * freqOptions.length)];

    const freqTransformer = {
      Daily: 1,
      Weekly: 7,
      Monthly: 30,
      "Surprise me!": randomFrequency
    }

    frequency = freqTransformer[frequency];


    let params = [name, email, mbti, interests, frequency];

    let entry = await pool.query('INSERT INTO users (name, email, mbti, interests, frequency) VALUES ($1, $2, $3, $4, $5)', params);

    res.status(201).send(`an new form entry from ${name} has been added to our records`);

  } catch (error) {
    console.log('error: ', error);
    res.status(401).send(error);
  }
});

app.get('/user', async(req, res) => {
  try {
    //for weekly and monthly emails - start date will be set by me


  } catch (error) {
    console.log('error: ', error);
    res.status(400).send(error);
  }
});

app.post('/content', async(req, res) => {
  try {
    let [ topic, advice, user_id ] = [ req.body.topic, req.body.advice, req.body.user_id ];

    const date = new Date();

    const params = [topic, advice, date, user_id];

    const article = await pool.query('INSERT INTO content (topic, advice, date, user_id) VALUES ($1, $2, $3, $4)', params)

    res.status(201).send(`An email was sent to User # ${user_id} on ${date} regarding ${topic}`)


  } catch (error) {
    console.log('error: ', error);
    res.status(400).send(error);
  }


});

app.listen(port, function(err) {
  if(err) console.log("error in express server:", err);
  console.log("Express server listening on PORT", port);
});


