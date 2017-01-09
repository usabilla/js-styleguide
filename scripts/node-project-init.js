#!/bin/node
const _ = require('lodash');
const assert = require('assert');
const path = require('path');
const argv = require('yargs').argv;
const fs = require('fs');
const ncp = require('ncp').ncp;
const execSync = require('child_process').execSync;
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
  execSync(`cd ${projectDir}`);
  console.log('Yarn Installing');
  yarnInstall((err) => {
    if (err) { process.exit(1); }
    console.log('Done');
  });
});

function yarnInstall(cb) {
  const spawn = require('child_process').spawn;
  const yarn = spawn('yarn install');
  let err = null;

  yarn.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  yarn.stderr.on('data', (data) => {
    err = true;
    console.log(`stderr: ${data}`.red);
  });

  yarn.on('close', () => {
    cb(err);
  });
}
