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
      const currentPath = [namePath, key.name].join('');
      if (key.status === 'unchanged') {
        return '';
      }
      if (key.status === 'deleted') {
        return `Property '${currentPath}' was removed`;
      }
      if (key.status === 'added') {
        return `Property '${currentPath}' was added with value: ${stringify(key.value)}`;
      }
      if (key.status === 'changed') {
        return `Property '${currentPath}' was updated. From ${stringify(key.oldValue)} to ${stringify(key.newValue)}`;
      }
      if (key.status === 'nested') {
        const path = `${namePath}${key.name}.`;
        return iter(key.children, path);
      }
    });
    return mapped.filter((elem) => elem !== '').join('\n');
  };
  return iter(tree, '');
};

export default diffFormatPlain;
