const axios = require('axios');

/* WHITEBOARD:
FIRST send server req to GET /user/:freq at the corresponding frequency (daily, weekly, monthly)

THEN make a call to chatgpt to generate content (see writeAndSend.js)

THEN email content (see writeAndSend.js)

THEN send server req to POST /content
AND send server req to PATCH /increment_email

*/

const baseURL = 'https://9c96-107-138-175-211.ngrok-free.app';


//axios request to get /user/:freq. needs freq
const getUsers = async (freq) => {
  const endpoint = `/user`; //may not accept template literal =/

  return axios.get(baseURL + endpoint, {
    params: {
      freq
    }
  })
  .then(res => {
    console.log(res.data);
    return res.data;
  })
  .catch(error => {
    console.log("Error in getUsers axios call: ", error);
  });

};

//axios request to post /content. needs topic, advice, user_id
const postContent = async (topic, advice, user_id) => {
  const endpoint = `/content`;

  return axios.post(baseURL + endpoint, {
    topic,
    advice,
    user_id
  })
  .then(res => {
    console.log(res.data);
  })
  .catch(error => {
    console.log(error);
  });
};

//axios request to patch /increment_email. needs user_id, emails_sent_count
const patchIncrementEmail = async (user_id, emails_sent_count) => {
  const endpoint = `/increment_email`;

  return axios.patch(baseURL + endpoint, {
    user_id,
    emails_sent_count,
  })
  .then(res => {
    console.log(res.data);
  })
  .catch(error => {
    console.log(error);
  });
};

module.exports = {
  getUsers,
  postContent,
  patchIncrementEmail
}
