// db connect, schema, model + save (a save 2 Db) function <- busy page!
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Map global promise (to get rid of warning)
//mongoose.Promise = global.Promise;

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
  .connect('mongodb://localhost/similaritems', { useNewUrlParser: true })
  .then(() => console.log('database/index.js 20 > MongoDB Connected...'))
  .catch(err => console.log('database/index.js 21 > Error: ', err));

// Create Schema
const itemSchema = new Schema({
  id: Number,
  relatedTo: Number, // 'foreign key' number for now... should become array of id's
  product: String,
  keywords: Array,
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

const Item = mongoose.model('items', itemSchema);

let save = items => {
  if (items) {
    items.forEach(item => {
      // create a document
      // first, gather the entries for the object
      let id = item.id;
      let relatedTo = item.relatedTo;
      let product = item.product;
      let keywords = item.keywords;
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
      let cameraDescription = item.cameraDescription;
      let screenSize = item.screenSize;
      let dimensions = item.dimensions;
      let weight = item.weight;
      let operatingSystem = item.operatingSystem;
      // then put it all together in a new object
      let newItem = new Item({
        id,
        relatedTo,
        product,
        keywords,
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
        cameraDescription,
        screenSize,
        dimensions,
        weight,
        operatingSystem
      });

      console.log(newItem.relatedTo);

      newItem.save().catch(err => {
        console.log(
          'database/index.js 99 > Error creating new document: ',
          err
        );
      });
    });
  } else {
    console.log('database/index.js 105 > Error creating new document');
  }
};

module.exports = {
  save,
  Item
};
