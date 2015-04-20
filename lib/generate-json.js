var fs = require('fs');
var readline = require('readline');

var readable = fs.createReadStream(__dirname + '/cmudict_SPHINX_40.txt');
var writable = fs.createWriteStream(__dirname + '/pronouncing-dictionary.json', {encoding: 'utf8'});

var rl = readline.createInterface({
  input: readable,
  output: process.stdout,
  terminal: false
});

var dict = {};

rl.on('line', function(line) {
  var columns = line.split('\t');
  var word = columns[0].replace(/\(\d\)/, '');
  var phonemes = columns[1];

  dict[word] = dict[word] || [];
  dict[word].push(phonemes);
}).on('close', function() {
  console.log(dict);
  writable.write(JSON.stringify(dict));
  writable.end();
});
