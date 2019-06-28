const functions = require('./functions');

describe('`similaritems` API calls by ID', () => {
  test('Should fetch `relatedTo` from DB by ID', () => {
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
});

// after trying to create another test... i think the only thing i learned was that my first two tests are garbage.  lol