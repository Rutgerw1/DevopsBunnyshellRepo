const express = require('express');
const router = express.Router();

router.use('/', require('./chat/chat'));

module.exports = router;