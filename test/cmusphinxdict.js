var test = require('tape');
var cmudict = require('../cmusphinxdict');

test('dict', function (t) {
  t.plan(8);

  var pronouncing = cmudict.get('hello');
  t.equal(pronouncing, 'HH AH L OW');

  cmudict.get('hello', function(word, pronouncing) {
    t.equal(word, 'HELLO');
    t.equal(pronouncing, 'HH AH L OW');
  });

  var pronouncings = cmudict.getAll('hello');
  t.deepEqual(pronouncings, ['HH AH L OW', 'HH EH L OW']);

  cmudict.getAll('hello', function(word, pronouncings) {
    t.equal(word, 'HELLO');
    t.deepEqual(pronouncings, ['HH AH L OW', 'HH EH L OW']);
  });

  pronouncing = cmudict.get('.');
  t.equal(pronouncing, 'D EH S AH M AH L');

  pronouncings = cmudict.getAll('.');
  t.deepEqual(pronouncings, [ 'D EH S AH M AH L', 'D AA T', 'P IH R IY AH D', 'P OY N T' ]);
});
