var test = require('tape');
var cmudict = require('../cmusphinxdict');

test('dict', function (t) {
  t.plan(6);

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

});
