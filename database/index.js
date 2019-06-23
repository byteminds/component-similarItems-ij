const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Map global promise (to get rid of warning)
mongoose.Promise = global.Promise;

// Connect to Mongo (remote Heroku-mLab) **********
/*
const db = require('../config/mongoKey').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('database/index.js 12 > MongoDB Connected...'))
  .catch(err => console.log('database/index.js 13 > Error: ', err));
*/

// Connect to Mongo (localhost) *******************
mongoose
  .connect('mongodb://localhost/similarItems', { useNewUrlParser: true })
  .then(() => console.log('database/index.js 19 > MongoDB Connected...'))
  .catch(err => console.log('database/index.js 20 > Error: ', err));

// Create Schema
const itemSchema = new Schema({
  product: String,
  imageSrc: String,
  imageAlt: String,
  imageId: String,
  description: String,
  addToCart: String,
  stars: String,
  reviews: Number,
  price: Number,
  shipping: String,
  seller: String,
  cameraDescription: String,
  screenSize: String,
  dimensions: String,
  weight: String,
  operatingSystem: String
});

let Collection = mongoose.model('similarItems', itemSchema);

let save = items => {
  if (items) {
    items.forEach(item => {
      // create a document
      // first, gather the entries for the object
      let product = item.product;
      let imageSrc = item.imageSrc;
      let imageAlt = item.imageAlt;
      let imageId = item.imageId;
      let description = item.description;
      let addToCartLink = item.addToCart;
      let stars = item.stars;
      let reviews = item.reviews;
      let price = item.price;
      let shipping = item.shipping;
      let seller = item.seller;
      let camera = item.cameraDescription;
      let screen = item.screenSize;
      let dimensions = item.dimensions;
      let weight = item.weight;
      let operatingSystem = item.operatingSystem;
      // then put it all together in a new object
      let newItem = new Collection({
        product,
        imageSrc,
        imageAlt,
        imageId,
        description,
        addToCartLink,
        stars,
        reviews,
        price,
        shipping,
        seller,
        camera,
        screen,
        dimensions,
        weight,
        operatingSystem
      });

      newItem.save().catch(err => {
        console.log(
          'database/index.js 87 > Error creating new document: ',
          err
        );
      });
    });
  } else {
    console.log('database/index.js 93 > Error creating new document');
  }
};

module.exports = {
  save,
  Collection
};
