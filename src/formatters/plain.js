import _ from 'lodash';

const stringify = (currentValue) => {
  if (_.isObject(currentValue)) {
    return '[complex value]';
  }
  if (typeof currentValue === 'string') {
    return `'${currentValue}'`;
  }
  return currentValue;
};

const diffFormatPlain = (tree) => {
  const iter = (array, namePath) => {
    const mapped = array.map((key) => {
      const currentPath = [...namePath, key.name];
      const formattedKey = currentPath.join('.');
      if (key.status === 'unchanged') {
        return '';
      }
      if (key.status === 'deleted') {
        return `Property '${formattedKey}' was removed`;
      }
      if (key.status === 'added') {
        return `Property '${formattedKey}' was added with value: ${stringify(key.value)}`;
      }
      if (key.status === 'changed') {
        return `Property '${formattedKey}' was updated. From ${stringify(key.oldValue)} to ${stringify(key.newValue)}`;
      }
      if (key.status === 'nested') {
        return iter(key.children, currentPath);
      }
      return '';
    });
    return mapped.filter((elem) => elem !== '').join('\n');
  };
  return iter(tree, []);
};

export default diffFormatPlain;
