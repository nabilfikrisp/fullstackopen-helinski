require('dotenv').config();
const express = require('express');
const routes = require('./routes/index');
const unknownEndpoint = require('./middlewares/unknownEndpoint');
const morgan = require('./middlewares/customMorgan');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT;

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;
console.log('connecting to', url);
mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));
app.use(morgan);

app.use('/', routes);

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
