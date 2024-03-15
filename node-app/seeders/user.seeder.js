const User = require('../models/user');
const userRepository = require('../repositories/user');

const seedUsers = async function () {
    if (await userRepository.getAllUsers().then(u => u.length > 0)) {
        console.log('Users already seeded');
        return;
    }

    console.log('Seeding users');
    const users = [
        new User({name: 'John Doe'}),
        new User({name: 'Jane Doe'}),
    ];

    for (const user of users) {
        await userRepository.insertUser(user);
    }
};

seedUsers();

module.exports = {
    seedUsers,
}