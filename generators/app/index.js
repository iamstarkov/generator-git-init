'use strict';
var generators = require('yeoman-generator');
var isString = require('lodash.isstring');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.option('commit', { type: String, required: false, alias: 'c',
      desc: 'Commit message, optional',
    });
  },
  initializing: function () {
    this.spawnCommandSync('git', ['init', '--quiet']);
  },
  install: function () {
    if (this.options.commit) {
      this._addCommit();
    }
  },
  _addCommit: function () {
    var commitMessage = isString(this.options.commit) ? this.options.commit : 'init';
    this.spawnCommandSync('git', ['add', '--all']);
    this.spawnCommandSync('git', ['commit', '-m', '"'+ commitMessage +'"']);
  }
});
