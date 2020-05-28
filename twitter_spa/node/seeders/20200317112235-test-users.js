'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  const now = new Date();
      return queryInterface.bulkInsert('users', [
      { name: '太郎',  email: 'taro@example.com', password: 'taro-password', created_at: now, updated_at: now},
      { name: '次郎',  email: 'jiro@example.com', password: 'jiro-password', created_at: now, updated_at: now},
      { name: '三郎',  email: 'saburo@example.com', password: 'saburo-password', created_at: now, updated_at: now},
      { name: '四郎',  email: 'shiro@example.com', password: 'shiro-password', created_at: now, updated_at: now},
      { name: '五郎',  email: 'goro@example.com', password: 'goro-password', created_at: now, updated_at: now},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
