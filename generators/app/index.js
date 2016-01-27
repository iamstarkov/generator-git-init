'use strict';
var generators = require('yeoman-generator');
var isString = require('lodash.isstring');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.option('commit');
  },

  writing: function () {
    this.spawnCommandSync('git', ['init']);
    if (this.options.commit) {
      this._addCommit();
    }
  },

  _addCommit: function () {
    var commitMessage = isString(this.options.commit)
      ? this.options.commit
      : 'Init commit';
    this.spawnCommandSync('git', ['add', '--all']);
    this.spawnCommandSync('git', ['commit', '-m', '"'+ commitMessage +'"']);
  }
});
