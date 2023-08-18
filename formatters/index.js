import diffJson from './json.js';
import diffPlain from './plain.js';
import diffStylish from './stylish.js';

const getFormat = (tree, format) => {
  if (format === 'plain') {
    return diffPlain(tree);
  }
  if (format === 'json') {
    return diffJson(tree);
  }
  return diffStylish(tree);
};

export default getFormat;
