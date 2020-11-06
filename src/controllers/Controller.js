/* eslint no-unused-vars:0 */
/* eslint class-methods-use-this:0 */
/* eslint no-underscore-dangle:0 */
/* eslint consistent-return:0 */
const createError = require('http-errors');
const Joi = require('joi');
const logger = require('../common/logger');

const isProduction = process.env.NODE_ENV === 'production';

class Controller {
  constructor(model = {}, joiSchema = {}) {
    this.model = model;
    this.createSchema = Joi.object().keys(joiSchema.createSchema) || {};
    this.updateSchema = Joi.object().keys(joiSchema.updateSchema) || {};
    this.getOneSchema = Joi.object().keys(joiSchema.getOneSchema) || {};
    this.getSchema = Joi.object().keys(joiSchema.getSchema) || {};
    this.deleteOneSchema = Joi.object().keys(joiSchema.deleteOneSchema) || {};
  }

  create() {
    return async (req, res, next) => {
      const props = {};
      let result = {};
      const errors = [];

      Object.assign(props, req.body);
      Object.assign(props, req.params);

      const normalizedProps = this.createSchema.validate(props, { abortEarly: false });
      if (normalizedProps.error) errors.push(normalizedProps.error);

      if (errors.length > 0) {
        return next(await this.setBadRequestFromJOI(errors));
      }

      try {
        const objModel = await this.model(props);
        result = await objModel.save();
        const response = this.setSuccessResponse(result);
        res.status(response.status).json(response.dataResult);
      } catch (error) {
        return (next(this.errorHandler(error)));
      }
    };
  }

  update() {
    return async (req, res, next) => {
      console.log("HIT UPDATE");
      const props = {};
      let result = {};
      const errors = [];

      Object.assign(props, req.body);
      Object.assign(props, req.params);

      const normalizedProps = this.updateSchema.validate(props, { abortEarly: false });
      if (normalizedProps.error) errors.push(normalizedProps.error);

      if (errors.length > 0) {
        return next(await this.setBadRequestFromJOI(errors));
      }

      try {
        result = await this.model.findByIdAndUpdate(props.id, props);
        const response = this.setSuccessResponse(result);
        res.status(response.status).json(response.dataResult);
      } catch (error) {
        return (next(this.errorHandler(error)));
      }
    };
  }

  getOne() {
    return async (req, res, next) => {
      const props = {};
      let result = {};
      const errors = [];

      Object.assign(props, req.body);
      Object.assign(props, req.params);

      const normalizedProps = this.getOneSchema.validate(props, { abortEarly: false });
      if (normalizedProps.error) errors.push(normalizedProps.error);

      if (errors.length > 0) {
        return next(await this.setBadRequestFromJOI(errors));
      }

      props._id = props.id;

      try {
        result = await this.model.findByIdAndUpdate(props);
        const response = this.setSuccessResponse(result);
        res.status(response.status).json(response.dataResult);
      } catch (error) {
        return (next(this.errorHandler(error)));
      }
    };
  }

  get() {
    return async (req, res, next) => {
      const props = {};
      let result = {};
      const errors = [];
      Object.assign(props, req.body);
      Object.assign(props, req.params);
      Object.assign(props, req.query);

      const normalizedProps = this.getSchema.validate(props, { abortEarly: false });
      if (normalizedProps.error) errors.push(normalizedProps.error);

      if (errors.length > 0) {
        return next(await this.setBadRequestFromJOI(errors));
      }

      try {
        result = await this.model.find();
        const response = this.setSuccessResponse(result);
        res.status(response.status).json(response.dataResult);
      } catch (error) {
        return (next(this.errorHandler(error)));
      }
    };
  }

  deleteOne() {
    return async (req, res, next) => {
      const props = {};
      let result = {};
      const errors = [];

      Object.assign(props, req.body);
      Object.assign(props, req.params);

      const normalizedProps = this.deleteOneSchema.validate(props, { abortEarly: false });
      if (normalizedProps.error) errors.push(normalizedProps.error);

      if (errors.length > 0) {
        return next(await this.setBadRequestFromJOI(errors));
      }

      props._id = props.id;
      delete props.id;

      try {
        result = await this.model.deleteOne(props);
        const response = this.setSuccessResponse(result);
        res.status(response.status).json(response.dataResult);
      } catch (error) {
        return (next(this.errorHandler(error)));
      }
    };
  }

  setSuccessResponse(dataResult = {}) {
    return {
      status: 200,
      dataResult,
    };
  }

  async setBadRequestFromJOI(errors = []) {
    const messages = [];

    if (isProduction) {
      logger.info(JSON.stringify(errors));
    } else {
      logger.debug(JSON.stringify(errors));
    }

    await errors.forEach((error) => {
      error.details.forEach((detail) => {
        messages.push(detail.message.replace(/["']/g, ''));
      });
    });
    return createError.BadRequest(messages);
  }

  errorHandler(error = {}) {
    if (isProduction) {
      logger.error(JSON.stringify(error));
    } else {
      logger.debug(JSON.stringify(error));
    }
    return createError.InternalServerError();
  }

  unauthorizedHandler(messages = {}) {
    if (isProduction) {
      logger.error(JSON.stringify(messages));
    } else {
      logger.debug(JSON.stringify(messages));
    }
    return createError.Unauthorized();
  }
}

module.exports = Controller;
