'use strict';

var path = require('path');
var fs = require('fs');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var spawnSync = require('child_process').spawnSync;


function makeGenerator() {
  return helpers.run(path.join(__dirname, '../generators/app'))
    .withOptions({ skipInstall: true });
}

function addFile(dir, done) {
  var fileName = path.join(dir, 'index.html');
  fs.writeFile(fileName, '', done);
}

function exec(command, args) {
  args = args.split(' ');
  var execResult = spawnSync(command, args);
  return execResult.stdout.toString();
}

describe('git-init:app', function () {
  it('should initialize git repository', function (done) {
    makeGenerator().on('end', function () {
      assert.file('.git');
      done();
    });
  });

  it('should do initial commit if option  --commit was set', function (done) {
    makeGenerator()
    .inTmpDir(addFile)
    .withOptions({commit: true})
    .on('end', function () {
      var execResult = exec('git', 'log --pretty=oneline');
      assert(execResult.match(/Init commit/));
      done();
    });
  });

  it('should take custom commit message', function (done) {
    makeGenerator()
    .inTmpDir(addFile)
    .withOptions({commit: 'Great commit for project init'})
    .on('end', function () {
      var execResult = exec('git', 'log --pretty=oneline');
      assert(execResult.match(/Great commit for project init/));
      done();
    });
  });
});
