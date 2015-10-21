'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  writing: function () {
    this.spawnCommandSync('git', ['init']);
  }
});
