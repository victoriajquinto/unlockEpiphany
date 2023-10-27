const schedule = require('node-schedule');

//daily emails. Schedule a task to run every day at a specific time, for example, at 6 AM
const dailyTask = schedule.scheduleJob({ hour: 6, minute: 0 }, () => {
  // Your daily task code here
});

//weekly emails. Schedule a task to run every Monday at a specific time, for example, at 6 AM
const mondayTask = schedule.scheduleJob('0 6 * * 1', () => {
  // Your Monday task code here
});


//monthly emails. Schedule a task to run on the first Monday of every month at a specific time, for example, at 8 AM
const monthlyTask = schedule.scheduleJob('0 8 * * 1#1', () => {
  // Your task code here
});



/* WHITEBOARD:
FIRST send server req to GET /user/:freq at the corresponding frequency (daily, weekly, monthly)

THEN make a call to chatgpt to generate content

THEN email content

THEN send server req to POST /content
AND send server req to PATCH /increment_email

*/





