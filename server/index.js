const express = require('express');
const bodyParser = require('body-parser');
const save = require('../database/index.js');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));

// get similar items >> just loads from db, no search... cant use this
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
        console.log('database/index.js 23 error: ', err);
        res.status(500).send({ error: 'something blew up' });
      }
      res.status(200).send({ items: items }); // now, get it to the app
    }
  );
});

// request for specific product id (using id number: '/getbyid/1' )
// this gets the id the consumer is looking for
// next we need to look at the item 'product'
app.get('/getbyid/:id', function (req, res) {
  let productId = req.params.id;

  save.Item.find(
    { id: productId },
    function (err, items) {
      if (err) {
        res.status(400).send();
      }
      console.log(items);
      res.status(200).send({ items: items });
    }
  )
});

// request for specific product (using keyword(s))
app.get('/getbykeywords/:keywords', function (req, res) {
  let productName = req.params.keywords;
  productName = decodeURI(productName).split(' ');
  save.Item.find(
    { keywords: { $in: productName } },
    null,
    {
      sort: {
        keywords: 1, // does not sort by number of matches 
        stars: -1,
        reviews: -1
      },
      limit: 6
    },
    function (err, items) {
      if (err) {
        console.log('database/index.js 74 error: ', err);
        res.status(500).send({ error: 'something blew up' });
      }
      console.log(items);
      res.status(200).send({ items: items });
    }
  )
});

let port = process.env.PORT || 3002;

app.listen(port, function () {
  console.log(`server/index.js 86 >> listening on port ${port}`);
});