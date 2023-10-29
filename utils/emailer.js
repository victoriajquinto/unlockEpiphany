const nodemailer = require('nodemailer');
require('dotenv').config();
// console.log(process.env);
const email_password = process.env.EMAIL_PASSWORD;

//for sending one email
const transporter = nodemailer.createTransport({
  service: "iCloud",
  secure: false,
  auth: {
    user: 'unlockepiphany@icloud.com',
    pass: email_password
  }
});

const sendFirstEmail = async (userEmail, topic, advice) => {
  const message = {
    from: 'unlockepiphany@icloud.com',
    to: userEmail,
    subject: `Unlock Your Epiphany in ${topic}`,
    text: advice,
    html: `<p>${advice}<p>`
  }

  await transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log('Error sending email: ', error);
    } else {
      console.log('Email sent: ', info.response);

      //call post /content
      //call patch /increment_email
    }
  });


};

//for sending bulk emails:
const bulkTransporter = nodemailer.createTransport({
  service: "iCloud",
  secure: false,
  auth: {
    user: 'unlockepiphany@icloud.com',
    pass: email_password
  }
  pool: true,
  maxConnections: 5
});


const sendBulkEmails = async (arrayOfEpiphanies) => {
  arrayOfEpiphanies.forEach((epiphany) => {
    const message = {
      from: 'unlockepiphany@icloud.com',
      to: epiphany.email,
      subject: `Unlock Your Epiphany in ${epiphany.topic}`,
      text: epiphany.advice,
    }

    await bulkTransporter.sendMail(message, (error, info) => {
      if (error) {
        console.error(`Error sending email to ${epiphany.email}:`, error);
      } else {
        console.log(`Email sent to ${epiphany.email}:`, info.response);

        //call post /content
        //call patch /increment_email
      }
    });
  });
};

sendEmail('victoriajquinto@gmail.com', 'testing nodemailer 2', 'you\'re on your own, goodluck');

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


