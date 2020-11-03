/* eslint no-unused-vars:0 */
/* eslint class-methods-use-this:0 */
/* eslint no-underscore-dangle:0 */
const createError = require('http-errors');

class Controller {
  constructor(model = {}) {
    this.model = model;
  }

  create() {
    return async (req, res, next) => {
      const props = {};
      Object.assign(props, req.body);
      Object.assign(props, req.params);

      let result = {};

      try {
        const objModel = await this.model(props);
        result = await objModel.save();
      } catch (error) {
        // logger(error);
        next(createError.InternalServerError());
      }

      const response = this.setSuccessResponse(result);
      res.status(response.status).json(response.dataResult);
    };
  }

  update() {
    return async (req, res, next) => {
      const props = {};
      Object.assign(props, req.body);
      Object.assign(props, req.params);

      let result = {};

      try {
        result = await this.model.findByIdAndUpdate(props.id, props);
      } catch (error) {
        // logger(error);
        next(createError.InternalServerError());
      }

      const response = this.setSuccessResponse(result);
      res.status(response.status).json(response.dataResult);
    };
  }

  getOne() {
    return async (req, res, next) => {
      const props = {};
      Object.assign(props, req.body);
      Object.assign(props, req.params);
      props._id = props.id;

      let result = {};

      try {
        result = await this.model.findByIdAndUpdate(props);
      } catch (error) {
        // logger(error);
        next(createError.InternalServerError());
      }

      const response = this.setSuccessResponse(result);
      res.status(response.status).json(response.dataResult);
    };
  }

  get() {
    return async (req, res, next) => {
      const props = {};
      Object.assign(props, req.body);
      Object.assign(props, req.params);

      let result = {};

      try {
        result = await this.model.find();
      } catch (error) {
        // logger(error);
        next(createError.InternalServerError());
      }

      const response = this.setSuccessResponse(result);
      res.status(response.status).json(response.dataResult);
    };
  }

  deleteOne() {
    return async (req, res, next) => {
      const props = {};
      Object.assign(props, req.body);
      Object.assign(props, req.params);
      props._id = props.id;
      delete props.id;

      let result = {};

      // console.log(props)

      try {
        result = await this.model.deleteOne(props);
      } catch (error) {
        // logger(error);
        next(createError.InternalServerError());
      }

      const response = this.setSuccessResponse(result);
      res.status(response.status).json(response.dataResult);
    };
  }

  setSuccessResponse(dataResult = {}) {
    return {
      status: 200,
      dataResult,
    };
  }
}

module.exports = Controller;
