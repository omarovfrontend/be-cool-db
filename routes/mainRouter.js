const router = require('express').Router();
const { Category, Product, User } = require('../db/models');

router.get('/', async (reg, res) => {
  const products = await Product.findAll({ include: [{ model: Category }, { model: User }] });
  res.render('main', { products }); // отрисовывает hbs main
});

module.exports = router;
