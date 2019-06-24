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

let port = process.env.PORT || 3002;

app.listen(port, function () {
  console.log(`server/index.js 42 >> listening on port ${port}`);
});
