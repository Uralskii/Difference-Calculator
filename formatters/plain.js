import _ from 'lodash';

const compareAndSortedKeys = (objectOne, objectTwo) => {
  const keysOfObj = Object.keys({ ...objectOne, ...objectTwo });
  const checkKeys = keysOfObj.reduce((acc, key) => {
    if (Object.hasOwn(objectOne, key) && !Object.hasOwn(objectTwo, key)) {
      const obj = { name: key, value: objectOne[key], type: 'deleted' };
      acc.push(obj);
    } else if (!Object.hasOwn(objectOne, key) && Object.hasOwn(objectTwo, key)) {
      const obj2 = { name: key, value: objectTwo[key], type: 'added' };
      acc.push(obj2);
    } else if (objectOne[key] === objectTwo[key]) {
      const obj3 = { name: key, value: objectOne[key], type: 'unchanged' };
      acc.push(obj3);
    } else if (objectOne[key] !== objectTwo[key]) {
      const obj4 = {
        name: key, value1: objectOne[key], value2: objectTwo[key], type: 'changed',
      };
      acc.push(obj4);
    }
    return acc;
  }, []);

  const sorted = _.sortBy(checkKeys, ['name']);
  return sorted;
};

const resultOfDiff = (object) => {
  let resultDiff = object.reduce((str, key) => {
    let result = str;
    if (key.type === 'unchanged') {
      result += `    ${key.name}: ${key.value}\n`;
    } else if (key.type === 'deleted') {
      result += `  - ${key.name}: ${key.value}\n`;
    } else if (key.type === 'added') {
      result += `  + ${key.name}: ${key.value}\n`;
    } else if (key.type === 'changed') {
      result += `  - ${key.name}: ${key.value1}\n  + ${key.name}: ${key.value2}\n`;
    }
    return result;
  }, '{\n');

  resultDiff += '}';
  return resultDiff;
};

export { compareAndSortedKeys, resultOfDiff };
