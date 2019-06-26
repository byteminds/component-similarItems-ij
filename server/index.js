const express = require('express');
const bodyParser = require('body-parser');
const save = require('../database/index.js');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
        console.log('database/index.js 25 error: ', err);
        res.status(500).send({ error: 'something blew up' });
      }
      res.status(200).send({ items: items }); // now, get it to the app
    }
  );
});

// request for specific product
app.get('/api', function (req, res) {
  // create an array out of a cleansed query
  let productName = req._parsedOriginalUrl.query.toLowerCase().replace(/[, ]+/g, "");
  productName = decodeURI(productName).split(' ');
  // search keyword matches:
  //   -would be better if it sorted highest keyword
  //    matches first??
  //   -sort by highest star and reviews counts
  console.log('>>>>>>>>>>>> server/index.js 41 > search query: ', productName);
  save.Item.find(
    { keywords: { $in: productName } },
    null,
    {
      sort: {
        keywords: 1,
        stars: -1,
        reviews: -1
      },
      limit: 6
    },
    function (err, items) {
      if (err) {
        console.log('database/index.js 55 error: ', err);
        res.status(500).send({ error: 'something blew up' });
      }
      console.log(items);
      res.status(200).send({ items: items });
    }
  )
});

let port = process.env.PORT || 3002;

app.listen(port, function () {
  console.log(`server/index.js 67 >> listening on port ${port}`);
});
