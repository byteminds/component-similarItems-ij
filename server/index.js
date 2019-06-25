const express = require('express');
const bodyParser = require('body-parser');
const save = require('../database/index.js');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get similar items
app.get('/similaritems', function (req, res) {
  save.Item.find(
    {},
    null,
    {
      sort: {
        product: 1,
        stars: -1
      },
      limit: 6
    },
    function (err, items) {
      if (err) {
        console.log('database/index.js 25 error: ', err);
        res.status(500).send({ error: 'something blew up' });
      }
      res.status(200).send({ items: items }); // now, get it to the app
    }
  );
});

// request for specific product
app.get('/api', function (req, res) {
  let productName = req._parsedOriginalUrl.query;
  // need to clean the query:
  //  -remove punctuation
  //  -change all to lowercase
  //  -split words into an array

  // search the list for any of the items:
  //  -sort by number of matches
  //  -sort by highest star count first (after 'this item')

  //  for us to HAVE a THIS ITEM: we need to coordinate to 
  //  ensure we all have the same item in our stores

  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> search query: ', productName);
  save.Item.find(
    {
      product: { $regex: '^(?i)' + productName + '(?i)' }
    },
    null,
    {
      sort: {
        product: 1,
        stars: -1
      },
      limit: 6
    },
    function (err, items) {
      if (err) {
        console.log('database/index.js 63 error: ', err);
        res.status(500).send({ error: 'something blew up' });
      }
      res.status(200).send({ items: items });
    }
  )

});

let port = process.env.PORT || 3002;

app.listen(port, function () {
  console.log(`server/index.js 75 >> listening on port ${port}`);
});
