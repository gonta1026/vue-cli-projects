'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    tweet_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    underscored: true,
  }, 
  // {
  //   // freezeTableName: true,
  //   timestamps: false
  // }
  );
  Bookmark.associate = function(models) {
    Bookmark.belongsTo(models.User);
    Bookmark.belongsTo(models.Tweet);
  };
  return Bookmark;
};
