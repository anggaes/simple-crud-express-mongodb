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
    return this.router;
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

  // update() {
  //   return async (req, res, next) => {
  //     const props = { params: req.body, body: req.body };

  //     let response = {};

  //     try {
  //       const result = await this.controller.update(props);
  //       response = this.setSuccessResponse(result);
  //     } catch (error) {
  //       // logger(err)
  //       next(createError.InternalServerError());
  //     }
  //     res.status(response.status).json(response.dataResult);
  //   };
  // }

  // deleteOne() {
  //   return async (req, res, next) => {
  //     const props = { params: req.body, body: req.body };

  //     let response = {};

  //     try {
  //       const result = await this.controller.deleteOne(props);
  //       response = this.setSuccessResponse(result);
  //     } catch (error) {
  //       // logger(err)
  //       next(createError.InternalServerError());
  //     }
  //     res.status(response.status).json(response.dataResult);
  //   };
  // }

  // get() {
  //   return async (req, res, next) => {
  //     const props = { params: req.body, body: req.body };
  //     let response = {};

  //     try {
  //       const result = await this.controller.get();
  //       response = this.setSuccessResponse(result);
  //     } catch (error) {
  //       // logger(err)
  //       console.log(error);
  //       next(createError.InternalServerError());
  //     }
  //     res.status(response.status).json(response.dataResult);
  //   };
  // }

  // getOne() {
  //   return async (req, res, next) => {
  //     const props = { params: req.body, body: req.body };
  //     let response = {};

  //     try {
  //       const result = await this.controller.get(props);
  //       response = this.setSuccessResponse(result);
  //     } catch (error) {
  //       // logger(err)
  //       console.log(error);
  //       next(createError.InternalServerError());
  //     }
  //     res.status(response.status).json(response.dataResult);
  //   };
  // }

  // setSuccessResponse(dataResult = {}) {
  //   return {
  //     status: 200,
  //     dataResult,
  //   };
  // }

  // static setErrorResponse(error = {}) {
  //   return {
  //     status: 500,
  //     error,
  //   };
  // }
}

module.exports = Routes;
