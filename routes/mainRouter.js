const router = require('express').Router();
const { Category, Product, User } = require('../db/models');

router.get('/', (req, res) => {
  res.redirect('/main');
});

router.get('/main', async (reg, res) => {
  const products = await Product.findAll({ include: [{ model: Category }, { model: User }] });
  // console.log(products[0].name);
  res.render('main', { products }); // отрисовывает hbs main
});

module.exports = router;
