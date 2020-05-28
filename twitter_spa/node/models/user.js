'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    underscored: true,
  });
  User.associate = function(models) {
    models.User.hasMany(models.Comment);
    models.User.hasMany(models.Tweet);
    models.User.hasMany(models.Bookmark);
  };
  return User;
};