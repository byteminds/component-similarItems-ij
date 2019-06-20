/*
const itemSchema = new Schema({
  product: String,
  image: {
    attribute_src: String,
    attribute_alt: String,
    attribute_id: String
  },
  description: String,
  add_to_cart: String,
  stars: String,
  reviews: Number,
  price: Number,
  shipping: String,
  seller: String,
  camera_description: String,
  screen_size: String,
  dimensions: String,
  weight: String,
  operating_system: String
});
*/
const faker = require('faker');
const save = require('./database/index.js');
/*
console.log(faker.fake("{{name.firstName}} {{name.lastName}}"));
*/
let recordCount = 100;
// seeding the database
// not sure there's a lot Faker can do for me here that resembles anything like real data.
// but maybe it will do for MVP.  
// The image attribute_src can't be from Faker though.  They have to be linked to at the AWS S3 bucket.
// the easiest way to get that working is to number the image names sequentially and just 
// increment the number for each document, 1 - 100. but!!! idk how the AWS bucket works yet...

