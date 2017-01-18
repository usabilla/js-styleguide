#!/bin/node

const fs = require('fs');
const assert = require('assert');
const spawn = require('child_process').spawn;
require('colors');

const TEST_DIR = './_node-project-test-dir';

if (!fs.existsSync(TEST_DIR)) {
  fs.mkdirSync(TEST_DIR);
} else {
  console.error(`${TEST_DIR} already exists. Please delete before testing.`.red);
  process.exit(1);
}

Promise.resolve()
  .then(runCommandWith('node', ['scripts/node-project-init.js', '--projectDir',  TEST_DIR]))
  .then(assertCodeZero)
  .then(runCommandWith('cd', [TEST_DIR]))
  .then(assertCodeZero)
  .then(runCommandWith('yarn', ['install']))
  .then(assertCodeZero)
  .then(() => console.log('Test complete'.green))
  .catch((err) => {
    console.error('Test failed'.red);
    console.error(err);
    process.exit(1)
  });

function assertCodeZero(code) {
  return assert.equal(code, 0, `Expected error code 0 but got ${code}`);
}

function runCommand(cmd, args) {
  return new Promise((resolve) => {
    const command = spawn(cmd, args);
    command.stdout.on('data', data => {
      console.log(`${data}`);
    });
    command.stderr.on('data', data => {
      console.log(`${data}`.red);
    });
    command.on('close', resolve);
  })
}

function runCommandWith(command, args) {
  return () => runCommand(command, args);
}
