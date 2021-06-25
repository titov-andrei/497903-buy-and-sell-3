"use strict";

const { HttpCode } = require(`../constants`);
const Joi = require(`joi`);

const schema = Joi.object({
  text: Joi.string().min(20).required()
});

module.exports = (req, res, next) => {
  const comment = req.body;
  const { error } = schema.validate(comment);

  if (error) {
    return res.status(HttpCode.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  next();
};
