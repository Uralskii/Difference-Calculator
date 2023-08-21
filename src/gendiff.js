import parseFile from './parsers.js';
import buildAstTree from './buildAstTree.js';
import getOutputFormat from './formatters/index.js';
import readFile from './readFile.js';

const genDiff = (pathToFile1, pathToFile2, formatName = 'stylish') => {
  const file1 = readFile(pathToFile1);
  const file2 = readFile(pathToFile2);

  const data1 = parseFile(file1, pathToFile1);
  const data2 = parseFile(file2, pathToFile2);

  const buildTree = buildAstTree(data1, data2);
  return getOutputFormat(buildTree, formatName);
};

export default genDiff;
