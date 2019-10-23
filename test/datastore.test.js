import datastore from '../src/renderer/datastore/index';

test('定义数据', async () => {
  const now = Date.now();
  const defineRes = await datastore.defineData({ id: now, name: 'test', value: 1 });
  expect(defineRes.errMsg).toBeFalsy();
  expect(defineRes.data).toBeTruthy();
  const findOneRes = await datastore.findOne({ id: now });
  expect(findOneRes.errMsg).toBeFalsy();
  expect(findOneRes.data).toBeTruthy();
  const reDefineRes = await datastore.defineData({ id: now, name: 'test2', value: 1 });
  expect(reDefineRes.errMsg).toBeTruthy();
  const errDefineRes = await datastore.defineData({ id: now + 1, name: 'test2', value: 1, $des: "des" });
  expect(errDefineRes.errMsg).toBeTruthy();
});
