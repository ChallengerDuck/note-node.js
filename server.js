const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override');
const createPath = require('./helpers/create-path');
const postRoutes = require('./routes/post-routs');
const postApiRoutes = require('./routes/api-post-routes');
const contactsRoutes = require('./routes/contact-routs');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express();
const PORT = process.env.PORT;

app.set('view engine', 'ejs');

mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => console.log(successMsg('Connected data base')))
    .catch((error) => console.log(errorMsg(error)))

app.listen(PORT, (error) => {
  error ? console.log(errorMsg(error)) : console.log(successMsg(`listening port ${PORT}`));
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.use(postRoutes);
app.use(contactsRoutes);
app.use(postApiRoutes);

app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), { title });
});
