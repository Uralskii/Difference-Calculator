import fs from 'fs';
import path from 'path';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('gendiff', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

  const plain = readFile('file1_test.txt');
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  expect(gendiff(file1, file2)).toEqual(plain);
});
