const router = require('express').Router();
const bcrypt = require('bcrypt'); // хеширует пароли
const { User } = require('../db/models'); // забираем юзера из модели
const checkAuth = require('../middleware/checkAuth');
const checkLogin = require('../middleware/checkLogin');

// SIGN UP
router.get('/signup', checkLogin, (req, res) => {
  res.render('signup');
});

router.post('/signup', checkLogin, async (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 5); // захешировал пароль

  try {
    const [user, created] = await User.findOrCreate({
      where: {
        email: req.body.email,
      },
      defaults: {
        email, name, password: hash, // создает пользователя - если такого не сущ-ет
      },
    });

    if (!created) {
      res.redirect('signup'); // если не created, перенаправить на стр signup
    } else {
      req.session.userId = user.id; // запихиваем в сессию
      req.session.email = user.email; // запихиваем в сессию
      req.session.name = user.name; // запихиваем в сессию
      res.redirect('/');
    }
  } catch (error) {
    res.status(500);
  }
});

// SIGN IN
router.get('/signin', checkLogin, (req, res) => {
  res.render('signin');
});

router.post('/signin', checkLogin, async (req, res) => {
  const { password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (passwordMatch) {
      req.session.userId = user.id; // запихиваем в сессию
      req.session.email = user.email; // запихиваем в сессию
      req.session.name = user.name; // запихиваем в сессию
      res.redirect('/');
    } else {
      res.send('Error, Cannot find User!');
    }
  } catch (error) {
    res.send('Cannot find User!');
  }
});

router.get('/logout', checkAuth, (req, res) => {
  req.session.destroy(); // удаляет сессию
  res.clearCookie('sos');
  res.redirect('signin');
}); // эту строку запомнить, всегда одинакова

module.exports = router;
