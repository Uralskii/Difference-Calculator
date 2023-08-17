import _ from 'lodash';

const buildAstTree = (obj1, obj2) => {
  const uniqKeys = Object.keys({ ...obj1, ...obj2 });
  const sorted = _.sortBy(uniqKeys);
  // eslint-disable-next-line array-callback-return, consistent-return
  return sorted.map((key) => {
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

const makeIndent = (depth, marker = null, spacer = '    ') => (marker ? `${spacer.repeat(depth).slice(0, -2)}${marker}` : spacer.repeat(depth));

const markers = {
  added: '+ ',
  deleted: '- ',
};

const stringify = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }

  const lines = Object.entries(currentValue).map(
    ([key, val]) => `${makeIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`,
  );
  return ['{', ...lines, `${makeIndent(depth)}}`].join('\n');
};

const diff = (tree) => {
  const iter = (array, depth) => {
    // eslint-disable-next-line array-callback-return, consistent-return
    const mapped = array.map((key) => {
      if (key.status === 'deleted') {
        return `${makeIndent(depth, markers.deleted)}${key.name}: ${stringify(key.value, depth)}`;
      }
      if (key.status === 'added') {
        return `${makeIndent(depth, markers.added)}${key.name}: ${stringify(key.value, depth)}`;
      }
      if (key.status === 'changed') {
        return `${makeIndent(depth, markers.deleted)}${key.name}: ${stringify(key.oldValue, depth)}\n${makeIndent(
          depth,
          markers.added,
        )}${key.name}: ${stringify(key.newValue, depth)}`;
      }
      if (key.status === 'unchanged') {
        return `${makeIndent(depth)}${key.name}: ${stringify(key.value, depth)}`;
      }
      if (key.status === 'nested') {
        return `${makeIndent(depth)}${key.name}: {\n${iter(key.children, depth + 1)}\n${makeIndent(depth)}}`;
      }
    });
    return mapped.join('\n');
  };
  return `{\n${iter(tree, 1)}\n}`;
};

export { buildAstTree, diff };
