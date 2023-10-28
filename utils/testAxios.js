const axiosFunctions = require('./axios.js');
const getUsers = axiosFunctions.getUsers;
const postContent = axiosFunctions.postContent;
const patchIncrementEmail = axiosFunctions.patchIncrementEmail;

// getUsers(1);

// postContent('Dating', 'just put yourself out there man', 1);

patchIncrementEmail(1, 0);