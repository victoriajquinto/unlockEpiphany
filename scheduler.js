const schedule = require('node-schedule');

const axiosFunctions = require('./utils/axios.js');
const getUsers = axiosFunctions.getUser;
const postContent = axiosFunctions.postContent;
const patchIncrementEmail = axiosFunctions.patchIncrementEmail;

const generateAdvice = require('./utils/generateAdvice.js');
const emailer = require('./utils/emailer.js');

//daily emails scheduled every day at 6 AM
const dailyTask = schedule.scheduleJob({ hour: 6, minute: 0 }, () => {
  // Your daily task code here
});

//weekly emails scheduled every Monday at 6 AM
const mondayTask = schedule.scheduleJob('0 6 * * 1', () => {
  // Your Monday task code here
});


//monthly emails scheduled on the first Monday of every month at 6 AM
const monthlyTask = schedule.scheduleJob('0 6 * * 1#1', () => {
  // Your task code here
});



/* WHITEBOARD:
FIRST send server req to GET /user/:freq at the corresponding frequency (daily, weekly, monthly)

THEN make a call to chatgpt to generate content

THEN email content

THEN send server req to POST /content
AND send server req to PATCH /increment_email

*/





