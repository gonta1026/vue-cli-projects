'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {
    underscored: true,
  }
  // , {
  //   // freezeTableName: true,
  //   timestamps: false
  // }
  );
  Category.associate = function(models) {
    models.Category.hasMany(models.Tweet);
  };
  return Category;
};