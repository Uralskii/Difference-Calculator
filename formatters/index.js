import diffJson from './json.js';
import diffPlain from './plain.js';
import diffStylish from './stylish.js';

const getOutputFormat = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return diffStylish(tree);
    case 'plain':
      return diffPlain(tree);
    case 'json':
      return diffJson(tree);
    default:
      throw new Error(`Unknown format '${formatName}'!`);
  }
};

export default getOutputFormat;
