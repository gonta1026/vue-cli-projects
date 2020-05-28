'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    tweet_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  Comment.associate = function (models) {
    // associations can be defined here
    models.Comment.belongsTo(models.User);
    models.Comment.belongsTo(models.Tweet);
  };
  
  return Comment;
};