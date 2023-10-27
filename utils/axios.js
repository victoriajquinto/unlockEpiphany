const axios = require('axios');

/* WHITEBOARD:
FIRST send server req to GET /user/:freq at the corresponding frequency (daily, weekly, monthly)

THEN make a call to chatgpt to generate content (see writeAndSend.js)

THEN email content (see writeAndSend.js)

THEN send server req to POST /content
AND send server req to PATCH /increment_email

*/

//axios request to get /user/:freq. needs freq
const getUsers = async (freq) => {

};

//axios request to post /content. needs topic, advice, user_id
const postContent = async (topic, advice, user_id) => {};

//axios request to patch /increment_email. needs user_id, emails_sent_count
const patchIncrementEmail = async (user_id, emails_sent_count) => {

};