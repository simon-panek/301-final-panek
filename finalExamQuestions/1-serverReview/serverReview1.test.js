'use strict';

const request = require('supertest');

/*
-------------------------------------------------------------------
Complete the createServer function to include routes as follows:
  - a GET request to /hello should respond with status of 200 and the text "Hello"
  - any other route should return status of 404

NOTE: You do not need write the app.listen() code for your server
      The test do this for you
-------------------------------------------------------------------
*/

// Express sever here
const createServer = () => {

  const express = require('express');
  const app = express();

  // Solution Here

  return app;
};


///////////////////////////////////////////////////
// TESTS
///////////////////////////////////////////////////

describe('Testing challenge', () => {

  let server = createServer();

  it('responds to /hello', function testHello() {
    return request(server)
      .get('/hello')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Hello');
      })
  });

  it('404 everything else', function testPath() {
    return request(server)
      .get('/foo/bar')
      .then(response => {
        expect(response.status).toEqual(404);
      })
  });
});
