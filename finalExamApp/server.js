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
const DATABASE_URL = process.env.DATABASE_URL;
const client = new pg.Client(DATABASE_URL);
const methodOverride = require('method-override');

app.use(cors());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

// Routes ////////////////////////////////////////////////////////

app.get('/', pokemonApiRender);
app.post('/pokemon', saveFavorite);
app.get('/favorites', showFavorites);

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

//let AllPokemonArray = []; //global variable

function pokemonApiRender (req, res) {
  try {
    let url = 'https://pokeapi.co/api/v2/pokemon/';

    superagent.get(url)
      .then (data => {
        //console.log('data.body', data.body);
        //console.log('pokemonCharacter.name', data.body.results[0].name);
        let testArray = [];
        data.body.results.map(pokemonCharacter => {
          //console.log('pokeChar.name', pokemonCharacter.name);
          testArray.push(new Pokemon (pokemonCharacter));
        })
        //console.log('testArray', testArray);
        return testArray;
      })
      .then(results => {
        //results = ['g', 'c', 'z', 'k', 'a', 'l', 'd', 's'];
        // console.log('results', results);
        let nameArray = results.map (a => a.name);
        //console.log('presort nameArray', nameArray);
        nameArray.sort();
        //results.body.results.sort((a, b) => (a[name] > b[name]) ? 1 : -1);
        // console.log('sorted nameArray', nameArray);
        res.render('pages/searches/show', { apiResults: nameArray});

      })
      .catch(err => {
        console.log('Something went terribly wrong with the data:', err);
      })
  }
  catch(err) {
    console.log('Something went terribly wrong with superagent:', err);
  }

}

function Pokemon(info) {
  this.name = info.name;
  //AllPokemonArray.push(this);
  //console.log('this.name', this.name);
}

function saveFavorite (req, res) {
  try {
    //console.log('req.body.name', req.body.name);
    let SQL = 'INSERT INTO pokemon (name) VALUES ($1);';
    let values = [req.body.name];

    client.query (SQL, values)
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        console.log('Something went terribly wrong with the query:', err);
      })
  }
  catch(err) {
    console.log('Something went wrong with the database:', err);
  }
}

function showFavorites (req, res) {
  try {
    let SQL = 'SELECT DISTINCT name FROM pokemon';
    client.query(SQL)
      .then(result => {
        //console.log('result.rows', result.rows);
        //console.log('result.rows', result.rows[0].name);
        let storedPoke = [];
        result.rows.forEach (row => {
          storedPoke.push(row.name);
        })
        storedPoke.sort();
        // console.log('storedPoke', storedPoke);
        res.render('pages/favorites', { savedPokemon: storedPoke });
      })
      .catch(err => {
        console.log('Something went terribly wrong with the query:', err);
      })
  }
  catch(err) {
    console.log('Something went wrong with the database:', err);
  }
}
