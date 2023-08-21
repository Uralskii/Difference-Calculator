import diffFormatJson from './json.js';
import diffFormatPlain from './plain.js';
import diffFormatStylish from './stylish.js';

const getOutputFormat = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return diffFormatStylish(tree);
    case 'plain':
      return diffFormatPlain(tree);
    case 'json':
      return diffFormatJson(tree);
    default:
      throw new Error(`Unknown format '${formatName}'!`);
  }
};

export default getOutputFormat;
