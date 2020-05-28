'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
const now = new Date();
    return queryInterface.bulkInsert('categories', [
      {id: 1, name: 'works', created_at: now, updated_at: now},
      {id: 2,  name: 'hobby', created_at: now, updated_at: now},
      {id: 3,  name: 'programing', created_at: now, updated_at: now},
      {id: 4,  name: 'other', created_at: now, updated_at: now},
    ], {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('categories', null, {})
};
