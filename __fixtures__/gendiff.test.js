import { test, expect } from '@jest/globals';
import { compareAndSortedKeys, resultOfDiff, gendiff } from '../src/gendiff.js';

test ('compareAndSorted', () => {
  expect(compareAndSortedKeys({
    test: 'test',
    vans: 'let',
  }, {
    test:'test',
    vans: 'let',
  })).toStrictEqual([{
    name: 'test',
    value: 'test',
    type: 'unchanged',
  }, {
    name: 'vans',
    value: 'let',
    type: 'unchanged',
  }])
});
