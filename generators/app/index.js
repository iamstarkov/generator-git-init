'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },
  end: function () {
    this.spawnCommandSync('git', ['init']);
  }
});
