const bcrypt = require('bcryptjs')
const users = [
    {
        name:'Bright Senyo',
        email:'brightakakpo40@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name:'John Doe',
        email:'john@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name:'Jane Doe',
        email:'jane@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

module.exports = users