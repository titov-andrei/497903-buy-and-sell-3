"use strict";

const { Model } = require(`sequelize`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineOffer = require(`./offer`);
const defineUser = require(`./user`);

// импортируем перечисление
const Aliase = require(`./aliase`);

class OfferCategory extends Model {}

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Offer = defineOffer(sequelize);
  const User = defineUser(sequelize);

  Offer.hasMany(Comment, { as: Aliase.COMMENTS, foreignKey: `offerId` });
  Comment.belongsTo(Offer, { foreignKey: `offerId` });

  User.hasMany(Offer, {as: Aliase.OFFERS, foreignKey: `userId`});
  Offer.belongsTo(User, {as: Aliase.USER, foreignKey: `userId`});

  User.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `userId`});
  Comment.belongsTo(User, {as: Aliase.USER, foreignKey: `userId`});

  OfferCategory.init({}, { sequelize });

  Offer.belongsToMany(Category, {
    through: `offerCategories`,
    as: Aliase.CATEGORIES,
  });
  Category.belongsToMany(Offer, {
    through: `offerCategories`,
    as: Aliase.OFFERS,
  });
  Category.hasMany(OfferCategory, { as: Aliase.OFFER_CATEGORIES });

  return { Category, Comment, Offer, OfferCategory };
};

module.exports = define;
