'use strict';
const program = require('commander');
const buildAdmin = require('./src/alimama-build');
program
  .version('0.1.0')
  .command('alimama-build')
  .alias('build')
  .description('build admin views')
  .action(buildAdmin);

program.parse(process.argv);