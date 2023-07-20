import path from 'path';
import fs from 'fs';
import { compareAndSortedKeys, resultOfDiff } from '../formatters/plain.js';
import parsedFile from '../parsers/parser.js';

const gendiff = (path1, path2) => {
  const file1 = fs.readFileSync(path.resolve(path1), 'utf-8');
  const file2 = fs.readFileSync(path.resolve(path2), 'utf-8');

  const obj1 = parsedFile(file1);
  const obj2 = parsedFile(file2);

  const compareAndSort = compareAndSortedKeys(obj1, obj2);
  const resultDiff = resultOfDiff(compareAndSort);
  return resultDiff;
};

export default gendiff;
