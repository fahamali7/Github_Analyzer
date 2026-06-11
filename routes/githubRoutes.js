const express = require('express');

const router = express.Router();
const {analyzeProfile, fetchAllProfiles, fetchProfileByUsername} = require('../controllers/githubController');

router.post('/analyze/:username', analyzeProfile);
router.get('/profiles', fetchAllProfiles);
router.get('/profiles/:username', fetchProfileByUsername);

module.exports = router;