'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  const now = new Date();
      return queryInterface.bulkInsert('Comments', [
      { comment: '太郎',  user_id: 1, tweet_id: 1, created_at: now, updated_at: now},
      { comment: '次郎',  user_id: 2, tweet_id: 1, created_at: now, updated_at: now},
      { comment: '三郎',  user_id: 1, tweet_id: 2, created_at: now, updated_at: now},
      { comment: '四郎',  user_id: 2, tweet_id: 1, created_at: now, updated_at: now},
      { comment: '五郎',  user_id: 3, tweet_id: 1, created_at: now, updated_at: now},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Comments', null, {});
  }
};
