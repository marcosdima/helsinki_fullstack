const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
  wrote: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    default: 0
  }]
})

module.exports = mongoose.model('Author', schema)