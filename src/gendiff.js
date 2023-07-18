import path from 'path';
import _ from 'lodash';
import fs from 'fs';

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

const gendiff = (path1, path2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(path1), 'utf-8'));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(path2), 'utf-8'));
  const compareAndSort = compareAndSortedKeys(obj1, obj2);
  const resultDiff = resultOfDiff(compareAndSort);
  return resultDiff;
};

export { compareAndSortedKeys, resultOfDiff, gendiff };
