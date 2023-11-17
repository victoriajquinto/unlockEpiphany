const axios = require('axios');
const sendFirst = require('../scheduler.js')

const baseURL = 'http://18.219.121.28:3000';

//axios request to get /user/:freq. needs freq
const getUsers = async (freq) => {
  const endpoint = '/users';

  return axios.get(baseURL + endpoint, {
    params: {
      freq
    }
  })
  .then(res => {

    return res.data;
  })
  .catch(error => {
    console.log("Error in getUsers axios call: ", error);
  });

};

//axios request to post /content. needs topic, advice, user_id
const postContent = async (topic, advice, user_id) => {
  console.log('postContent called');
  const endpoint = `/content`;

  axios.post(baseURL + endpoint, {
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
  console.log('patchIncrementEmail called');
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
