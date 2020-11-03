const mongoose = require('mongoose');

const { Schema } = mongoose;

const scoreSchema = new Schema({
  scoreIdentifier: {
    type: String,
    required: true,
  },
  scoreValue: {
    type: String,
    required: true,
  },
});

const Score = mongoose.model('Score', scoreSchema);
module.exports = { schema: scoreSchema, model: Score };
