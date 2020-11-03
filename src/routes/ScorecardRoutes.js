const Routes = require('./Routes');
const ScorecardController = require('../controllers/ScorecardController').instance;

class ScorecardRoutes extends Routes {
  constructor(options = {}) {
    super(options);
  }
}

const options = {
  controller: ScorecardController,
};

const scorecardRoutes = new ScorecardRoutes(options);

module.exports = { class: ScorecardRoutes, instance: scorecardRoutes };
