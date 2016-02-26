#!/usr/bin/env node

var path = require('path');
var CMUDict = require('../cmusphinxdict');
var argv = require('minimist')(process.argv.slice(2));
var Formats = {
  TEXT: 'TEXT',
  JSON: 'JSON'
};

var words = argv._;
var format = (argv.f || argv.format || '').toUpperCase();

if (argv.json) {
  format = Formats.JSON;
}

CMUDict.get(words, function(words, pronouncings) {
  var output = null;

  if (format === Formats.JSON) {
    output = words.reduce(function(acc, word, i) {
      acc[word] = pronouncings[i];
      return acc;
    }, {});

    output = JSON.stringify(output, null, 2);
  } else {
    output = words.reduce(function(acc, word, i) {
      var lines = [];

      pronouncings[i].forEach(function(pronouncing, j) {
        var number = (j > 0 ? '(' + (j + 1) + ')' : '');
        lines.push(word + number + ' ' + pronouncing);
      });

      return acc.concat(lines.join('\n'), '\n');
    }, '');
  }

  process.stdout.write(output + '\n');
});
