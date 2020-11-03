const mongoose = require('mongoose');
const scoreSchema = require('./ScoreModel').schema;
const eventSchema = require('./EventModel').schema;

const { Schema } = mongoose;

const scorecardSchema = new Schema({
  submissionId: {
    type: String,
    required: true,
  },
  events: [eventSchema],
  scores: [scoreSchema],
});

const Scorecard = mongoose.model('Scorecard', scorecardSchema);
module.exports = { schema: scorecardSchema, model: Scorecard };
