'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tweet = sequelize.define('Tweet', {
    tweet: DataTypes.STRING,
    user_id: DataTypes.STRING,
    category_id: DataTypes.STRING,
  }, {
    underscored: true,
  });
  Tweet.associate = function(models) {
    Tweet.belongsTo(models.User);
    Tweet.belongsTo(models.Category);
    Tweet.hasMany(models.Comment);
    Tweet.hasMany(models.Bookmark);
  };
  return Tweet;
};