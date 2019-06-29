const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));

// get similar items (id in 'relatedTo')
app.get('/similaritems/:relatedTo', function (req, res) {
  db.Item.find(
    { relatedTo: req.params.relatedTo },
    null,
    {
      sort: {
        stars: -1,
        reviews: -1
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

// get similar items (term(s) in 'keywords')
app.get('/getbykeywords/:keywords', function (req, res) {
  let productName = req.params.keywords;
  productName = decodeURI(productName).split(' ');
  db.Item.find(
    { keywords: { $in: productName } },
    null,
    {
      sort: {
        stars: -1,
        reviews: -1
      },
      limit: 6
    },
    function (err, items) {
      if (err) {
        console.log('database/index.js 48 error: ', err);
        res.status(500).send({ error: 'something blew up' });
      }
      res.status(200).send({ items: items });
    }
  )
});

let port = process.env.PORT || 3002;

app.listen(port, function () {
  console.log(`server/index.js 60 >> listening on port ${port}`);
});