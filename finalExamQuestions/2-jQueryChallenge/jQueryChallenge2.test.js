'use strict';

const cheerio = require('cheerio');


/*
--------------------------------------------------------------------------

Oh no! You forgot to add a legend to your form.

Write a function named generateLegend that adds a legend to your form using jQuery.
 - Your legend should say, "About You".

Once you are finished, don't foget to append it to the form.

Remember, in this test, $ is jQuery, just as it is in a normal web app
--------------------------------------------------------------------------
*/

let $ = createSnippetWithJQuery(`
<section>
  <form>
    <label> Frist Name:
      <input type="text" name="first" />
    </label>

    <label> Last Name:
      <input type="text" name="last" />
    </label>
  </form>
</section>
`);

const generateLegend = () => {
  // Solution code here ...
}

///////////////////////////////////////////////////
// TESTS
///////////////////////////////////////////////////

describe('Testing challenge', () => {
  test('It should add an input element to the DOM', () => {
    generateLegend();
    expect($('legend').text()).toStrictEqual("About You");
  })
})


function createSnippetWithJQuery(html) {
  return cheerio.load(html);
};
