const express = require('express');
const router = express.Router();

const userRepository = require('../../repositories/user');

router.get('/', async function (req, res) {
    const users = await userRepository.getAllUsers();
    res.json(users);
});

router.post('/', function (req, res) {
    const user = req.body;
    userRepository.insertUser(user)
        .then((insertedUser) => {
            res.status(201).json({user: insertedUser});
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

module.exports = router;