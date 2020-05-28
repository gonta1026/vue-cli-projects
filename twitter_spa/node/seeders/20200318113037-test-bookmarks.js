'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('BooKmarks', [
    { tweet_id: 1, user_id: 1, created_at: now, updated_at: now },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('BooKmarks', null, {});
  }
};


