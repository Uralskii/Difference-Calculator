import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { test, expect } from '@jest/globals';
import gendiff from '../src/gendiff.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileJson1 = getFixturePath('file1.json');
const fileJson2 = getFixturePath('file2.json');
const fileYml1 = getFixturePath('file1.yml');
const fileYml2 = getFixturePath('file2.yml');

test('gendiffDefaultFormat', () => {
  const stylish = readFile('file1_test.txt');
  expect(gendiff(fileJson1, fileJson2)).toEqual(stylish);
  expect(gendiff(fileYml1, fileYml2)).toEqual(stylish);
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
