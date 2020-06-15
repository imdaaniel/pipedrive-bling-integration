const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://api:373IWafgejGJE5Ao@cluster0-fdu3s.mongodb.net/pb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('conectado');
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);