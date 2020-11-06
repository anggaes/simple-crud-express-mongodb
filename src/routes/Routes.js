/* eslint no-unused-vars:0 */
/* eslint class-methods-use-this:0 */
const router = require('express').Router();

class Routes {
  constructor(options = {}) {
    this.router = router;
    this.controller = options.controller;

    this.create();
    this.get();
    this.getOne();
    this.update();
    this.deleteOne();
  }

  create() {
    this.router.post('/', this.controller.create());
  }

  update() {
    this.router.put('/:id', this.controller.update());
  }

  getOne() {
    this.router.get('/:id', this.controller.getOne());
  }

  get() {
    this.router.get('/', this.controller.get());
  }

  deleteOne() {
    this.router.delete('/:id', this.controller.deleteOne());
  }
}

module.exports = Routes;
