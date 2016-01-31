'use strict';

var path = require('path');
var fs = require('fs');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var spawnSync = require('spawn-sync');


function makeGenerator() {
  return helpers.run(path.join(__dirname, '../generators/app'))
    .withOptions({ skipInstall: true });
}

function exec(command, args) {
  args = args.split(' ');
  var execResult = spawnSync(command, args);
  console.log(execResult.stdout.toString());
  return execResult.stdout.toString();
}

function setupGit(dir, done) {
  var fileName = path.join(dir, 'index.html');
  fs.writeFile(fileName, '', done);
  exec('git', 'config user.email "you@example.com"');
  exec('git', 'config user.name "Your Name"');
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
    .inTmpDir(setupGit)
    .withOptions({commit: true})
    .on('end', function () {
      var execResult = exec('git', 'log --pretty=oneline');
      assert(execResult.match(/init/));
      done();
    });
  });

  it('should take custom commit message', function (done) {
    makeGenerator()
    .inTmpDir(setupGit)
    .withOptions({commit: 'Great commit for project init'})
    .on('end', function () {
      var execResult = exec('git', 'log --pretty=oneline');
      assert(execResult.match(/Great commit for project init/));
      done();
    });
  });
});
