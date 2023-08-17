import _ from 'lodash';

const stringify = (currentValue) => {
  if (!_.isObject(currentValue)) {
    return `'${currentValue}'`;
  }
  return '[complex value]';
};

const diffPlain = (tree) => {
  const iter = (array, namePath) => {
    // eslint-disable-next-line array-callback-return, consistent-return
    const mapped = array.map((key) => {
      if (key.status === 'unchanged') {
        return '';
      }
      if (key.status === 'deleted') {
        return `Property '${namePath}${key.name}' was removed`;
      }
      if (key.status === 'added') {
        return `Property '${namePath}${key.name}' was added with value: ${stringify(key.value)}`;
      }
      if (key.status === 'changed') {
        return `Property '${namePath}${key.name}' was updated. From ${stringify(key.oldValue)} to ${stringify(key.newValue)}`;
      }
      if (key.status === 'nested') {
        const path = `${namePath}${key.name}.`;
        return iter(key.children, path);
      }
    });
    return mapped.filter((el) => el !== '').join('\n');
  };
  return iter(tree, '');
};

export default diffPlain;
