import path from 'path';
import fs from 'fs';
import { buildAstTree, diff } from '../formatters/plain.js';
import parsedFile from '../parsers/parser.js';

const gendiff = (path1, path2, formatName = 'stylish') => {
  const data1 = path.resolve(process.cwd(), path1);
  const data2 = path.resolve(process.cwd(), path2);

  const file1 = fs.readFileSync(data1, 'utf-8');
  const file2 = fs.readFileSync(data2, 'utf-8');

  const extFile1 = path.extname(path1);
  const extFile2 = path.extname(path2);

  const obj1 = parsedFile(file1, extFile1);
  const obj2 = parsedFile(file2, extFile2);

  const compareAndSort = buildAstTree(obj1, obj2);
  if (formatName) {
    const resultDiff = diff(compareAndSort);
    return resultDiff;
  }
  return compareAndSort;
};

export default gendiff;
