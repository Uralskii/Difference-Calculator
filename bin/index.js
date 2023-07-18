#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/gendiff.js';

const program = new Command();

program
  .name('gendiff')
  .description(' Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'path to file1')
  .argument('<filepath2>', 'path to file2')
  .option('-f, --format <type>', 'output format')
  .action((path1, path2) => {
    const result = gendiff(path1, path2);
    console.log(result);
  });

program.parse();

console.log(program);
