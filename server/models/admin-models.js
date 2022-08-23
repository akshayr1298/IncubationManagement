


const mongoose = require('mongoose')

const admin = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
    },
    {collection: 'adminData'}
)

const model = mongoose.model('admindata', admin)

module.exports = model