const nodemailer = require('nodemailer');
require('dotenv').config();
// console.log(process.env);
const email_password = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "yahoo",
  secure: false,
  auth: {
    user: 'unlockepiphany',
    pass: email_password
  }
})

const sendEmail = async (userEmail, topic, advice) => {
  const message = {
    from: 'unlockepiphany@yahoo.com',
    to: userEmail,
    subject: `Unlock Your Epiphany in ${topic}`,
    text: advice,
    html: `<p>${advice}<p>`
  }

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log('Error sending email: ', error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
};

// sendEmail('victoriajquinto@gmail.com', 'testing nodemailer', 'you\'re on your own, goodluck');

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

module.exports = {sendEmail};


