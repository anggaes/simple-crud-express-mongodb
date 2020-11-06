const router = require('express').Router();
const UserController = require('../controllers/UserController').instance;

router.post('/', UserController.create());
router.put('/:id', UserController.update());
router.get('/', UserController.get());
router.get('/:id', UserController.getOne());
router.delete('/:id', UserController.deleteOne());

router.post('/login', UserController.login());
router.put('/password', UserController.changePassword());
module.exports = router;
