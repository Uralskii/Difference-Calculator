import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { test, expect, beforeAll } from '@jest/globals';
import gendiff from '../src/gendiff.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let fileJson1;
let fileJson2;

let fileYml1;
let fileYml2;

beforeAll(() => {
  fileJson1 = getFixturePath('file1.json');
  fileJson2 = getFixturePath('file2.json');
  fileYml1 = getFixturePath('file1.json');
  fileYml2 = getFixturePath('file2.json');
});

test('genDiffJsonStylish', () => {
  const stylish = readFile('file1_test.txt');
  expect(gendiff(fileJson1, fileJson2, 'stylish')).toEqual(stylish);
  expect(gendiff(fileYml1, fileYml2, 'stylish')).toEqual(stylish);
});

test('genDiffPlain', () => {
  const plain = readFile('file2_test.txt');
  expect(gendiff(fileJson1, fileJson2, 'plain')).toEqual(plain);
  expect(gendiff(fileYml1, fileYml2, 'plain')).toEqual(plain);
});

test('genDiffFormatJson', () => {
  const json = readFile('file3_test.json');
  expect(gendiff(fileJson1, fileJson2, 'json')).toEqual(json);
  expect(gendiff(fileYml1, fileYml2, 'json')).toEqual(json);
});
