const emailer = require('');
require('dotenv').config();

let apiKey = process.env.GPTAPI;

//make call to chat gpt. need name, mbti, ONE interest
const advice = async() => {

};

//TO DO: stub emailer function. needs topic, name, email, advice. see documentation for nodemailer