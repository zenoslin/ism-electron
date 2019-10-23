import datastore from '../src/renderer/datastore/index';

test('adds 1 + 2 to equal 3', () => {
  expect(datastore.test(1, 2)).toBe(3);
});
