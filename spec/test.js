const functions = require('./functions');

describe('`similaritems` API calls by ID', () => {

  test('Should fetch `relatedTo` from DB by ID', () => {
    expect.assertions(1);
    return functions.fetchItems()
      .then(data => expect(data.items.length).toBeGreaterThan(0))
  });

  test('Items fetched from DB should number <= to 6', () => {
    expect.assertions(1);
    return functions.fetchItems()
      .then(data => expect(data.items.length).toBeLessThanOrEqual(6))
  });

});
