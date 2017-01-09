#!/bin/node
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
  console.log(`Node version ${nvmrcVersion} required. Currently using ${process.version}`.red);
  process.exit(1);
}

if (!projectDir) {
  console.log('Argument `projectDir` is required');
  process.exit(1);
}

if (!fs.existsSync(projectDir)) {
  console.log(`Project directory ${projectDir} does not exist`);
  process.exit(1);
}

console.log('Bootstrapping project');
ncp('./node-project-template', projectDir, {cobbler: true, stopOnErr: true}, (err) => {
  assert.ifError(err);
  console.log('Yarn Installing');
  yarnInstall(projectDir, () => console.log('Done.'.cyan));
});


function yarnInstall(dir, cb) {
  const exec = require('child_process').exec;
  const cmd = `cd ${dir} && yarn install`;

  exec(cmd, function(error, stdout, stderr) {
    if (error) {
      console.log(`Yarn Error: ${stderr}`.red);
      process.exit(1);
    }
    console.log(stdout);
    cb();
  });
}
