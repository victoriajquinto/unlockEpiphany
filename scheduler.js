const schedule = require('node-schedule');

const axiosFunctions = require('./utils/axios.js');
const getUsers = axiosFunctions.getUsers;
const postContent = axiosFunctions.postContent;
const patchIncrementEmail = axiosFunctions.patchIncrementEmail;

const { generateAdvice } = require('./utils/generateAdvice.js');
const { sendFirstEmail } = require('./utils/emailer.js');
const { sendBulkEmails } = require('./utils/emailer.js');

//first email from user signup
const sendFirst = async (user) => {
  try {
    console.log('sendFirst called');
    const name = user.name;
    const email = user.email;
    const mbti = user.mbti;
    const user_id = user.user_id;
    const emails_sent_count = user.emails_sent_count;
    let topic = user.interests[(Math.floor(Math.random() * user.interests.length))];
    //call ./utils/generateAdvice.js/generateAdvice(name, mbti, topic)
    let gptContent = await generateAdvice(name, mbti, topic);
    let advice = gptContent.message.content;

    //call /utils/emailer.js/sendFirstEmail(userEmail, topic, advice)
    await sendFirstEmail(email, topic, advice);
    //call POST /content && PATCH /increment_email
    postContent(topic, advice, user_id);
    patchIncrementEmail(user_id, emails_sent_count);
  } catch (error) {
     console.log("error in scheduler.js/sendFirst(): ", error);
  }

};

const sendBatch = async (freq) => {
  try {
    const users = await getUsers(freq);
    // console.log('users: ', users)
    const arrayOfEpiphanies = await Promise.all(users.map(async (user) => {

      //randomly select topic from interests
      let topic = user.interests[(Math.floor(Math.random() * user.interests.length))];

      //call ./utils/generateAdvice.js/generateAdvice(name, mbti, topic)
      let gptContent = await generateAdvice(user.name, user.mbti, topic);
      let advice = gptContent.message.content;

      return {...user, topic, advice};
    }));
    console.log('arrayOfEpiphanies', arrayOfEpiphanies);
    // call /utils/emailer.js/sendBulkEmails(arrayOfEpiphanies)
    await sendBulkEmails(arrayOfEpiphanies);

  } catch (error) {
    console.log("error in scheduler.js/sendBatch(): ", error);
  }
}

// sendBatch(1);


//daily emails scheduled every day at 6 AM
const sendDaily = schedule.scheduleJob({ hour: 6, minute: 0 }, () => {
  // Your daily task code here
  sendBatch(1);
});

//weekly emails scheduled every Monday at 6 AM
const sendWeekly = schedule.scheduleJob('0 6 * * 1', () => {
  // Your Monday task code here
  sendBatch(7);
});


//monthly emails scheduled on the first Monday of every month at 6 AM
const sendMonthly = schedule.scheduleJob('0 6 * * 1#1', () => {
  // Your task code here
  sendBatch(30);
});

module.exports = {
  sendFirst
}



/* WHITEBOARD:
FIRST send server req to GET /user/:freq at the corresponding frequency (daily, weekly, monthly)

THEN make a call to chatgpt to generate content

THEN email content

THEN send server req to POST /content
AND send server req to PATCH /increment_email

*/




