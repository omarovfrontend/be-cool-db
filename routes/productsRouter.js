const router = require('express').Router();
const { Category, Product } = require('../db/models');

router.post('/add', async (req, res) => {
  const { productName, categoryName, img } = req.body; // получили данные из body
  console.log(req.body);

  try {
    const categoryAdd = await Category.create({ name: categoryName });
    console.log(categoryAdd.dataValues.id);
    await Product.create(
      {
        name: productName,
        user_id: req.session.user_id,
        category_id: categoryAdd.id,
        img,
      },
    );
    res.render('main');
  } catch (error) {
    res.send('Упппссс не вышло!');
  }
});

module.exports = router;
