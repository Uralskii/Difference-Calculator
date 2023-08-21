import _ from 'lodash';

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

const diffFormatStylish = (tree) => {
  const iter = (array, depth) => {
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
      return '';
    });
    return mapped.join('\n');
  };
  return `{\n${iter(tree, 1)}\n}`;
};

export default diffFormatStylish;
