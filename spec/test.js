const functions = require('./functions');

test('Should fetch `relatedItems` from DB by ID', () => {
  expect.assertions(1);
  return functions.fetchItems()
    .then(data => {
      expect(data.length).toBeGreaterThan(0);
    })
});

test('Items fetched from DB should number <= to 6', () => {
  expect.assertions(1);
  return functions.fetchItems()
    .then(data => {
      let count = 0;
      count = data.length;
      expect(count).toBeLessThanOrEqual(6);
    })
});
