'use strict';
var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    
    this.option('commit', { type: String, required: false, alias: 'c',
      desc: 'Commit message',
    });
  }

  initializing() {
    this.spawnCommandSync('git', ['init', '--quiet']);
  }

  conflict() {
    if (this.options.commit) {
      this._addCommit(this.options.commit);
    }
  }

  _addCommit(message) {
    this.spawnCommandSync('git', ['add', '--all']);
    this.spawnCommandSync('git', ['commit', '-m', message, '--quiet']);
  }
};
