# CMUSphinxDict

Wrapper for [CMU Sphinx Pronouncing Dictionary](http://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict/sphinxdict/). It's a hashtable that maps words to phonemes.

# Install

```bash
npm install cmusphinxdict
```

# Usage

```javascript
CMUSphinxDict.get('hello', function(word, pronouncings) {
  console.log(word); // 'HELLO'
  console.log(pronouncings); // ['HH AH L OW', 'HH EH L OW']
});
```

Special character lookup

```javascript
CMUSphinxDict.get('.', function(word, pronouncings) {
  console.log(word); // '.'
  console.log(pronouncings); // [ 'D EH S AH M AH L', 'D AA T', 'P IH R IY AH D', 'P OY N T' ]
});
```

Command line

```javascript
$ cmusphinxdict hello
[
  "HH AH L OW",
  "HH EH L OW"
]
```

# License

[CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict) is release under the [Public Domain](http://en.wikipedia.org/wiki/CMU_Pronouncing_Dictionary).

Everything else is released under the MIT License.
