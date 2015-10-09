const fs = require('fs');
const test = require('tape');
const cmudict = require('../cmusphinxdict');

test('dict', function (t) {
  t.plan(18);

  t.deepEqual(cmudict._unique(['f','o','o']), ['f','o']);

  cmudict.get('hello', function(word, pronouncings) {
    t.equal(word, 'HELLO');
    t.deepEqual(pronouncings, ['HH AH L OW', 'HH EH L OW']);
  });

  cmudict.get('.', function(word, pronouncings) {
    t.equal(word, '.');
    t.deepEqual(pronouncings, [ 'D EH S AH M AH L', 'D AA T', 'P IH R IY AH D', 'P OY N T' ]);
  });

  cmudict.get('idontexist', function(word, pronouncings) {
    t.equal(word, 'IDONTEXIST');
    t.deepEqual(pronouncings, []);
  });

  cmudict.get(['hello', 'world'], function(words, pronouncings) {
    t.deepEqual(words, ['HELLO', 'WORLD']);
    t.deepEqual(pronouncings, [['HH AH L OW', 'HH EH L OW'], ['W ER L D']]);
  });

  // Case insensitivity
  cmudict.get(['HeLlO', 'WoRlD'], function(words, pronouncings) {
    t.deepEqual(words, ['HELLO', 'WORLD']);
    t.deepEqual(pronouncings, [['HH AH L OW', 'HH EH L OW'], ['W ER L D']]);
  });

  cmudict.get(['hello', 'idontexist', 'world'], function(words, pronouncings) {
    t.deepEqual(words, ['HELLO', 'IDONTEXIST', 'WORLD']);
    t.deepEqual(pronouncings, [['HH AH L OW', 'HH EH L OW'], [], ['W ER L D']]);
  });

  cmudict.addPronouncings(fs.createReadStream(__dirname + '/additionalPronouncings.json'), function(error, words, pronouncings) {
    t.equal(error, null);
    t.deepEqual(words, ['AMALTHEA']);
    t.deepEqual(pronouncings, [['AH M AA L TH IY AH']]);

    cmudict.get('amalthea', function(word, pronouncings) {
      t.deepEqual(word, 'AMALTHEA');
      t.deepEqual(pronouncings, ['AH M AA L TH IY AH']);
    });
  });

});
