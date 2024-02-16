const express = require('express');

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const port = process.env.PORT;

const app = express();

const morgan = require('morgan');
const cors = require('cors');
const pool = require('./db.js');
const { sendFirst } = require('./scheduler.js')

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//test server connection
app.get('/hithere', async(req,res) => {
  try {
    res.status(200).send('hello world!');
  } catch (error) {
    console.log('error: ', error);
    res.status(400).send(error);
  }
});

//adds a new user to the database. called by zapier webhook
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

    const params = [name, email, mbti, interests, frequency];

    const entry = await pool.query('INSERT INTO users (name, email, mbti, interests, frequency) VALUES ($1, $2, $3, $4, $5) RETURNING user_id', params);

    const user_id = entry[0].user_id;

    const newUser = {
      name,
      email,
      mbti,
      interests,
      user_id,
      emails_sent_count: 0
    };
    //sends user their first email with insights from chatgpt
    sendFirst(newUser);

    res.status(201).send(newUser);
  } catch (error) {
    console.log('error: ', error);
    res.status(401).send(error);
  }
});

//grabs user information for users that selected to receive emails at a given frequency (e.g., daily, weekly, monthly)
app.get('/users', async(req, res) => {

  try {
    let freq = req.query.freq;
    let queryString = "WITH user_data_cte AS (SELECT jsonb_build_object('user_id', user_id, 'name', name, 'email', email, 'mbti', mbti, 'interests', interests, 'frequency', frequency, 'emails_sent_count', emails_sent_count) as user_data FROM users WHERE frequency = $1) SELECT user_data FROM user_data_cte";

    let users = await pool.query(queryString, freq);
    users = users.map((user) => { return user['user_data']});

    res.status(200).send(users);

  } catch (error) {
    console.log('error: ', error);
    res.status(400).send(error);
  }
});

//stores into the db the chatgpt-generated advice content emailed to the user
app.post('/content', async(req, res) => {
  try {
    let [ topic, advice, user_id ] = [ req.body.topic, req.body.advice, req.body.user_id ];

    const date = new Date();

    const params = [topic, advice, date, user_id];

    const article = await pool.query('INSERT INTO content (topic, advice, date_sent, user_id) VALUES ($1, $2, $3, $4)', params)

    res.status(201).send(`An email was sent to User ${user_id} on ${date} regarding ${topic}.`)

  } catch (error) {
    console.log('error: ', error);
    res.status(400).send(error);
  }
});

//increments email count when email is sent to user. should be called alongside POST /content
app.patch('/increment_email', async(req, res) => {
  try {
    let [ user_id, currentCount ] = [req.body.user_id, req.body.emails_sent_count];

    const oldCount = currentCount;
    const newCount = currentCount + 1;

    const params = [newCount, user_id];

    let queryString = 'UPDATE users SET emails_sent_count = $1 WHERE user_id = $2';

    let increaseCount = await pool.query(queryString, params)

    res.status(200).send(`the number of emails sent to User ${user_id} has increased from ${oldCount} to ${newCount}.`)

  } catch (error) {
    console.log('error: ', error);
    res.status(400).send(error);
  }
});

app.listen(port, function(err) {
  if(err) console.log("error in express server:", err);
  console.log("Express server listening on PORT", port);
});


