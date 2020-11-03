const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Event = mongoose.model('Event', eventSchema);
module.exports = { schema: eventSchema, model: Event };
