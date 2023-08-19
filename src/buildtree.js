import _ from 'lodash';

const buildAstTree = (obj1, obj2) => {
  const uniqKeys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(uniqKeys);
  // eslint-disable-next-line array-callback-return, consistent-return
  return sortedKeys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return { name: key, value: obj2[key], status: 'added' };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { name: key, value: obj1[key], status: 'deleted' };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { name: key, status: 'nested', children: buildAstTree(obj1[key], obj2[key]) };
    }
    if (obj1[key] === obj2[key]) {
      return { name: key, value: obj1[key], status: 'unchanged' };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        name: key,
        status: 'changed',
        oldValue: obj1[key],
        newValue: obj2[key],
      };
    }
  });
};

export default buildAstTree;
