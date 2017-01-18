#!/bin/node
/* eslint no-console: 0 */
const _ = require('lodash');
const assert = require('assert');
const path = require('path');
const argv = require('yargs').argv;
const fs = require('fs');
const ncp = require('ncp').ncp;
require('colors');

const projectDir = argv.projectDir;
const nvmrcVersion = _.trim(fs.readFileSync('./.nvmrc', 'utf-8'));

if (nvmrcVersion !== _.trim(process.version, 'v')) {
  return exitError(`Node version ${nvmrcVersion} required. Currently using ${process.version}`.red);
}

if (!projectDir) {
  return exitError('Argument `projectDir` is required');
}

if (!fs.existsSync(projectDir)) {
  return exitError(`Project directory ${projectDir} does not exist`);
}


if (fs.existsSync(path.join(projectDir, '/package.json'))) {
  return exitError('Project package.json already exists');
}

console.log(`Copying files to ${projectDir}:`.cyan);
const templateDir = path.resolve('./node-project-template');
ncp(templateDir, projectDir, {cobbler: true, stopOnErr: true, filter: filterNodeModules}, (err) => {
  assert.ifError(err);
  console.log('Done.'.green);
  console.log('Next:');
  console.log(`- cd to ${projectDir}`);
  console.log('- nvm use (or your preferred nvm alternative)');
  console.log('- yarn install');
  console.log('- update package.json and README.md with your project details');
  console.log('- uncomment .eslint.json config');
  console.log('- enjoy!');
});

function exitError(msg) {
  console.log((msg || '').red);
  process.exit(1);
}

function filterNodeModules(fileName) {
  return !_.includes(fileName, 'node_modules');
}
