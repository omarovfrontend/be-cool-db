const router = require('express').Router();
const { Category, User, Product } = require('../db/models');
const checkAuth = require('../middleware/checkAuth');

router.post('/add', checkAuth, async (req, res) => {
  const { productName, categoryName, img } = req.body; // получили данные из body
  console.log('=====>', req.body);

  try {
    const [categoryAdd] = await Category.findOrCreate({
      where: {
        name: categoryName,
      },
      default: {
        name: categoryName,
      },
    });
    const newProduct = await Product.create({
      name: productName,
      img,
      category_id: categoryAdd.id,
      user_id: req.session.userId,
    });
    // res.json({ category: newProduct.category_id, name: req.session.name, id: newProduct.id });
    const user = await User.findByPk(req.session.userId);
    res.json({ newProduct, user, categoryAdd });
  } catch (error) {
    res.send('Упппссс, не вышло!');
  }
});

// ручка для удаления поста
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await Product.destroy({
    where: {
      id,
    },
  });
  const a = await Product.findByPk(id);
  console.log('=====>', a);
  res.json({ isUpdatedSuccessful: true });
});

// ручка для изменения поста
router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, categoryName, img } = req.body;

    let cat = await Category.findOne({ where: { name: categoryName } });
    if (!cat) {
      cat = await Category.create({ name: categoryName });
    }

    await Product.update({
      name: productName,
      img,
      category_id: cat.id,
      user_id: req.session.userId,
    }, { where: { id } });

    const testPost = await Product.findByPk(id);
    res.json(testPost);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
