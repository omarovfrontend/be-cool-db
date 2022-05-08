const router = require('express').Router();
const { Category, Product } = require('../db/models');

router.post('/add', async (req, res) => {
  const { productName, categoryName, img } = req.body; // получили данные из body
  console.log('=====>', req.body);

  try {
    const categoryAdd = await Category.create({ name: categoryName });
    const newProduct = await Product.create(
      {
        name: productName,
        user_id: req.session.userId,
        category_id: categoryAdd.id,
        img,
      },
    );
    res.json({ category: newProduct.category_id, name: req.session.name });
  } catch (error) {
    res.send('Упппссс, не вышло!');
  }
});

// ручка для удаления поста
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Product.destroy({
    where: {
      id,
    },
  });
  res.json({ isUpdatedSuccessful: true });
});

module.exports = router;
