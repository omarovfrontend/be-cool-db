const session = require('express-session');

module.exports = function (req, res, next) {
  if (req.method === 'options') {
    next();
  }
  try {
    const sessionAuth = req.session.userId;
    if (!sessionAuth) {
      return res.status(401).json({ message: 'Вы не авторизованы!' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Вы не авторизованы!' });
  }
};
