import datastore from '../src/renderer/datastore/person/index';

test('定义数据', async () => {
  const now = Date.now();
  // 定义数据
  const defineRes = await datastore.defineData({ id: now, name: 'test', value: 1 });
  expect(defineRes.errMsg).toBeFalsy();
  expect(defineRes.data).toBeTruthy();
  // 验证定义结果
  const findOneRes = await datastore.findOne({ id: now });
  expect(findOneRes.errMsg).toBeFalsy();
  expect(findOneRes.data).toBeTruthy();
  // 重复定义
  const reDefineRes = await datastore.defineData({ id: now, name: 'test2', value: 1 });
  expect(reDefineRes.errMsg).toBeTruthy();
  // 错误修改数据
  const errDefineRes = await datastore.defineData({ id: now + 1, name: 'test2', value: 1, $des: "des" });
  expect(errDefineRes.errMsg).toBeTruthy();
});

test('删除数据', async () => {
  const now = Date.now();
  // 定义数据
  const defineRes = await datastore.defineData({ id: now, name: 'test', value: 1 });
  // 唯一id未定义
  const removeRes1 = await datastore.removeData({ _id: defineRes.data._id + 1 });
  expect(removeRes1.errMsg).toBeTruthy();
  // 删除流程
  const removeRes2 = await datastore.removeData({ _id: defineRes.data._id });
  expect(removeRes2.errMsg).toBeFalsy();
  expect(removeRes2.data).toBeTruthy();
  // 验证数据删除
  const findOneRes = await datastore.findOne({ _id: defineRes.data._id });
  expect(findOneRes.data).toBeFalsy();
})
