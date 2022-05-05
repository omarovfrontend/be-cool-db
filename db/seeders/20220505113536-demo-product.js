module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Oranges',
        user_id: '1',
        category_id: '1',
        img: 'https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Broccoli',
        user_id: '2',
        category_id: '2',
        img: 'https://img3.goodfon.ru/wallpaper/big/8/68/broccoli-vegetable-kapusta.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
  },
};
