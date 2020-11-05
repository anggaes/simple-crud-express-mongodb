const Joi = require('joi');
const Controller = require('./Controller');
const ScorecardModel = require('../models/ScorecardModel').model;

class Scorecard extends Controller {
  constructor(model = {}, joiSchema = {}) {
    super(model, joiSchema);
  }
}

const schemas = {};

schemas.createSchema = {
  submissionId: Joi.string().required(),
  scores: Joi.array().items(
    Joi.object().keys({
      scoreIdentifier: Joi.string().required(),
      scoreValue: Joi.number().required(),
    }),
  ),
  events: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required(),
      time: Joi.number().required(),
      content: Joi.string().required(),
    }),
  ),
};

schemas.updateSchema = {
  id: Joi.string().required(),
  ...schemas.createSchema,
};

schemas.getOneSchema = {
  id: Joi.string().required(),
};

schemas.deleteOneSchema = {
  id: Joi.string().required(),
};

const scorecard = new Scorecard(ScorecardModel, schemas);

module.exports = { class: Scorecard, instance: scorecard };
