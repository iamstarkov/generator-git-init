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
  end: function () {
    if (this.options.commit) {
      this._addCommit(this.options.commit);
    }
  },
  _addCommit: function (message) {
    var commitMessage = isString(message) ? message : 'init';
    this.spawnCommandSync('git', ['add', '--all']);
    this.spawnCommandSync('git', ['commit', '-m', commitMessage, '--quiet']);
  }
});
