const mongoose = require('mongoose')

const mongoSchema = new mongoose.Schema({
    record: {type: String , required: true},
    date: {type: Number , default: Date.now}
})

const model = mongoose.model('mongoModel' , mongoSchema)
module.exports = model