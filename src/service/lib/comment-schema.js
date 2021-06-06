'use strict';

const Joi = require(`joi`);

module.exports = Joi.object({
  comments: Joi.object({
    text: Joi.string()
      .min(20)
      .required(),
  }).required(),
});
