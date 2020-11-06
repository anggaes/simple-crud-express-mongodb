const router = require('express').Router();
const ScorecardController = require('../controllers/ScorecardController').instance;

router.post('/', ScorecardController.create());
router.put('/:id', ScorecardController.update());
router.get('/', ScorecardController.get());
router.get('/:id', ScorecardController.getOne());
router.delete('/:id', ScorecardController.deleteOne());
module.exports = router;
