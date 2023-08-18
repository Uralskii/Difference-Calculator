import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { test, expect } from '@jest/globals';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('gendiff', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

  const stylish = readFile('file1_test.txt');
  const plain = readFile('file2_test.txt');
  const json = readFile('file3_test.json');
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  expect(gendiff(file1, file2, 'stylish')).toEqual(stylish);
  expect(gendiff(file1, file2, 'plain')).toEqual(plain);
  expect(gendiff(file1, file2, 'json')).toEqual(json);
});
