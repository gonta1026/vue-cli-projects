'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
      return queryInterface.bulkInsert('Tweets', [
      { tweet: '太郎',  user_id: 1, category_id: 1, created_at: now, updated_at: now},
      { tweet: '次郎',  user_id: 1, category_id: 2, created_at: now, updated_at: now},
      { tweet: '三郎',  user_id: 1, category_id: 2, created_at: now, updated_at: now},
      { tweet: '四郎',  user_id: 1, category_id: 3, created_at: now, updated_at: now},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Tweets', null, {});
  }
};
