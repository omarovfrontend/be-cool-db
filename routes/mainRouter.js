const router = require('express').Router();
const { Category, Product, User } = require('../db/models');

router.get('/', async (req, res) => {
  let products = await Product.findAll({
    include: [{
      model: Category,
    },
    {
      model: User,
    }],
    raw: true,
  });

  products = products.map((el) => ({
    ...el, owner: (el.user_id === req.session.userId),
  }));
  console.log(products, '====');
  res.render('main', { products }); // отрисовывает hbs main
});

module.exports = router;
