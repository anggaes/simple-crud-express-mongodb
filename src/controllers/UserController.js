/* eslint consistent-return:0 */
const Joi = require('joi');
const Controller = require('./Controller');
const jwt = require('../common/jwt');
const UserModel = require('../models/UserModel').model;

class User extends Controller {
  constructor(model = {}, joiSchema = {}) {
    super(model, joiSchema);
    this.loginSchema = Joi.object().keys(joiSchema.loginSchema) || {};
  }

  login() {
    return async (req, res, next) => {
      const props = {};
      const errors = [];
      let token = '';

      Object.assign(props, req.body);
      Object.assign(props, req.params);

      const normalizedProps = this.loginSchema.validate(props, { abortEarly: false });
      if (normalizedProps.error) errors.push(normalizedProps.error);

      if (errors.length > 0) {
        return next(await this.setBadRequestFromJOI(errors));
      }

      try {
        if (props.username === 'ADMIN' && props.password === 'PASSWORD') {
          token = jwt.encode({ username: 'ADMIN', password: 'PASSWORD' });
          res.status(200).json({ token });
        } else {
          throw new Error({ message: 'Username or password is unauthorized' });
        }
      } catch (error) {
        return (next(this.errorHandler(error)));
      }
    };
  }

  changePassword() {
    return async (req, res, next) => {
      const props = {};
      const errors = [];

      Object.assign(props, req.body);
      Object.assign(props, req.params);

      const normalizedProps = this.loginSchema.validate(props, { abortEarly: false });
      if (normalizedProps.error) errors.push(normalizedProps.error);

      if (errors.length > 0) {
        return next(await this.setBadRequestFromJOI(errors));
      }

      try {
        res.status(200).json({ message: 'success' });
      } catch (error) {
        return (next(this.errorHandler(error)));
      }
    };
  }
}

const schemas = {};

schemas.loginSchema = {
  username: Joi.string().required(),
  password: Joi.string().required(),
};

schemas.createSchema = {
  username: Joi.string().required(),
  password: Joi.string().required(),
};

const user = new User(UserModel, schemas);

module.exports = { class: User, instance: user };
