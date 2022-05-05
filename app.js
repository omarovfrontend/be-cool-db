const express = require('express');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

require('dotenv').config(); // импортируем dotenv

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.resolve(process.env.PWD, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // эти 2 строчки нужны всегда
app.use(express.static(path.resolve(process.env.PWD, 'public')));

const mainRouter = require('./routes/mainRouter'); // импортировал (принял) роутер
const productsRouter = require('./routes/productsRouter');
const regRouter = require('./routes/regRouter');

app.use(session({
  secret: 'COOL',
  store: new FileStore(),
  resave: false,
  saveUninitialized: false,
  name: 'sss',
  cookie: { httpOnly: true },
})); // эта строчка для сессии везде идентична - просто вставить

app.use((req, res, next) => {
  res.locals.userId = req.session?.userId;
  next();
}); // создает локальную переменную, которая сущ-ет если польз-ль залогинин

app.use('/', mainRouter); // подключил роутер
app.use('/', productsRouter); // подключил роутер
app.use('/', regRouter); // подключил роутер

app.listen(PORT, () => {
  console.log('Server start on PORT', process.env.PORT);
});
