"use strict";

const OfferType = {
  offer: `offer`,
  sale: `sale`
};

const SumRestrict = {
  min: 1000,
  max: 100000
};

const PictureRestrict = {
  min: 0,
  max: 16
};

module.exports = {
  OfferType,
  SumRestrict,
  PictureRestrict
};
