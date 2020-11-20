'use strict';

// Dependencies //////////////////////////////////////////////

const express = require('express');
const superagent = require('superagent');
const dotenv = require('dotenv');
const cors = require('cors');
const pg = require('pg');
const {render} = require ('ejs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
const DATABASE_URL = proces.env.DATABASE_URL;
const client = new pg.Client(DATABASE_URL);
const methodOverride = require('method-override');

app.use(cors());
app.use(express.static('.public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

// Routes //////////////////////////////////////////////////////






// Database and Server Link /////////////////////////////////////

client.connect()
  .then (() => {
    console.log('Database Up');
    app.listen(PORT, () => {
      console.log(`Server Up on port ${PORT}`);
    })
  })
  .catch((err) => {
    console.log('Unable to connect.', err);
  });

// Functions ///////////////////////////////////////////////////

