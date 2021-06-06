"use strict";

const Joi = require(`joi`);

module.exports = Joi.object({
  title: Joi.string().min(10).max(100).required(),

  picture: Joi.string()
    .pattern(new RegExp({ tlds: { allow: ["png", "jpg"] } }))
    .required(),

  description: Joi.string().min(50).max(1000).required(),

  type: Joi.string().valid(`offer`, `sale`).required(),

  sum: Joi.number().min(100).required(),

  category: Joi.array().items(Joi.string()).min(1).required(),

  comments: Joi.object({
    text: Joi.string().min(20).required(),
  }).required(),
});
