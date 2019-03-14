const mongoose = require('mongoose')

const CustomerSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
	age: { type: Number, min: 18, max: 65, required: false }
})

module.exports = mongoose.model('Customer', CustomerSchema)