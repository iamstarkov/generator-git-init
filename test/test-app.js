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
  return execResult.stdout.toString();
}

function addFile(dir, done) {
  var fileName = path.join(dir, 'index.html');
  fs.writeFileSync(fileName, '');
}


describe('git-init:app', function () {
  it('should initialize git repository', function (done) {
    makeGenerator().on('end', function () {
      assert.file('.git');
      done();
    });
  });

  it('should take custom commit message', function (done) {
    makeGenerator()
      .inTmpDir(addFile)
      .withOptions({ commit: 'Great commit for project init' })
      .on('end', function () {
        var execResult = exec('git', 'log --pretty=oneline');
        assert(execResult.match(/Great commit for project init/));
        done();
      });
  });
});
