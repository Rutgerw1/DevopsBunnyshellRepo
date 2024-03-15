const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

router.use('/api/users', require('./api/users'));

module.exports = router;