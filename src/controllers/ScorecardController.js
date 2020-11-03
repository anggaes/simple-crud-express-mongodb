const Controller = require('./Controller');
const ScorecardModel = require('../models/ScorecardModel').model;

class Scorecard extends Controller {
  constructor(model = {}) {
    super(model);
  }
}

const scorecard = new Scorecard(ScorecardModel);

module.exports = { class: Scorecard, instance: scorecard };
