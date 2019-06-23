const faker = require('faker');
const save = require('./database/index.js');

const seedDb = () => {
  let documentLimit = 100;
  let seeds = [];

  while (documentLimit > 0) { // generate a document object (seed).
    // add image attributes data:
    let seed = {};
    let lorem5 = faker.lorem.words(5);

    seed.product = 'iPhone 6s, ' + lorem5; // <<- randomize some of the title/product info
    seed.imageSrc = 'https://service-similar-products-ij.s3-us-west-1.amazonaws.com/' + faker.random.number(100) + '.jpg';
    seed.imageAlt = 'iPhone 6s, ' + lorem5;
    seed.imageId = 'comparison-image';
    seed.description = 'iPhone 6s, ' + lorem5 + '. ' + faker.lorem.sentence;
    seed.addToCart = '#';
    seed.stars = faker.random.number(5); // random number 0 - 5
    seed.reviews = faker.random.number(5000);
    seed.price = faker.random.number(500);
    seed.shipping = faker.lorem.words(3);
    seed.seller = faker.company.companyName;
    seed.cameraDescription = faker.random.number(21) + 'MP';
    seed.screenSize = '4.7 in';
    seed.dimensions = '5.44 x 0.28 x 2.64 in';
    seed.weight = '5.04 ounces';
    seed.operatingSystem = 'ios';
    // push completed seed to array of objects (seeds).
    seeds.push(seed);
    // decrement our documentLimit by 1
    documentLimit -= 1;
  }
  console.log('>>>>>>>>>>>>>>> seeds: ', seeds);
  // once documentLimit is === 0, call our 'save' function to add seeds to db
  save.save(seeds);
};

seedDb();
