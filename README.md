# CMUSphinxDict

Wrapper for [CMU Sphinx Pronouncing Dictionary](http://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict/sphinxdict/)

# Install

```bash
npm install cmusphinxdict
```

# Usage

```javascript
var CMUSphinxDict = require('../cmusphinxdict');

var pronouncing = CMUSphinxDict.get('hello');
console.log(pronouncing); // 'HH AH L OW'

// callback style
CMUSphinxDict.get('hello', function(word, pronouncing) {
  console.log(word); // 'HELLO'
  console.log(pronouncing); // 'HH AH L OW'
});

var pronouncings = CMUSphinxDict.getAll('hello');
console.log(pronouncings); // ['HH AH L OW', 'HH EH L OW']

CMUSphinxDict.getAll('hello', function(word, pronouncings) {
  console.log(word); // 'HELLO'
  console.log(pronouncings); // ['HH AH L OW', 'HH EH L OW']
});

var dotPronouncings = CMUSphinxDict.getAll('.');
console.log(dotPronouncings); // [ 'D EH S AH M AH L', 'D AA T', 'P IH R IY AH D', 'P OY N T' ]
```

# License

[CMU Sphinx Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict) is release under the [Public Domain](http://en.wikipedia.org/wiki/CMU_Pronouncing_Dictionary).

Everything else is released under the MIT License.
