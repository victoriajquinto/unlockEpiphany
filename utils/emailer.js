const nodemailer = require('nodemailer');
require('dotenv').config();
// console.log(process.env);
const email_password = process.env.EMAIL_PASSWORD;
const axiosFunctions = require('../utils/axios.js');
const postContent = axiosFunctions.postContent;
const patchIncrementEmail = axiosFunctions.patchIncrementEmail;

//for sending one email
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: 'unlockyourepiphany@gmail.com',
    pass: email_password
  }
});

const sendFirstEmail = async (userEmail, topic, advice) => {
  console.log('sendFirstEmail called');
  const htmlContent = `<p>${advice.replace(/\n/g, '<br>')}</p>`;
  const message = {
    from: 'unlockyourepiphany@gmail.com',
    to: userEmail,
    subject: `Unlock Your Epiphany in ${topic}`,
    text: advice,
    html: htmlContent
  }

  await transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log('Error sending email: ', error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
};

//for sending bulk emails:
const bulkTransporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: 'unlockyourepiphany@gmail.com',
    pass: email_password
  },
  pool: true,
  maxConnections: 5
});


const sendBulkEmails = async (arrayOfEpiphanies) => {
  console.log('sendBulkEmails called with epiphanies', arrayOfEpiphanies);

  arrayOfEpiphanies.forEach((epiphany) => {
    const message = {
      from: 'unlockyourepiphany@gmail.com',
      to: epiphany.email,
      subject: `Unlock Your Epiphany in ${epiphany.topic}`,
      text: epiphany.advice,
    }

    bulkTransporter.sendMail(message, (error, info) => {
      if (error) {
        console.error(`Error sending email to ${epiphany.email}:`, error);
      } else {
        console.log(`Email sent to ${epiphany.email}:`, info.response);
      }
    });
    postContent(epiphany.topic, epiphany.advice, epiphany.user_id);
    patchIncrementEmail(epiphany.user_id, epiphany.emails_sent_count);
  });
};

/* VERIFY CONNECTION

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

*/

module.exports = {
  sendFirstEmail,
  sendBulkEmails
};


