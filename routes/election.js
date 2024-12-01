const express = require('express');
const { getActiveElection, getVotingPage, castVote, thankYou } = require('../controllers/electionController');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router.get('/activeelection', getActiveElection);
router.get('/voting/:departmentId', isLoggedIn, getVotingPage);
router.post('/vote', isLoggedIn, castVote);
router.get('/thankyou', thankYou);

module.exports = router;
