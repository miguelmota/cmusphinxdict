# CMUSphinxDict

Wrapper for [CMU Sphinx Pronouncing Dictionary](http://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict/sphinxdict/). It's a hashtable that maps words to phonemes.

# Install

```bash
npm install cmusphinxdict
```

# Usage

Single word

```javascript
CMUSphinxDict.get('hello', function(word, pronouncings) {
  console.log(word); // 'HELLO'
  console.log(pronouncings); // ['HH AH L OW', 'HH EH L OW']
});
```

Multiple words

```javascript
CMUSphinxDict.get(['hello', 'world'], function(words, pronouncings) {
  console.log(words); // ['HELLO', 'WORLD']
  console.log(pronouncings); // [['HH AH L OW', 'HH EH L OW'], ['W ER L D']]
});
```

Special character lookup

```javascript
CMUSphinxDict.get('.', function(word, pronouncings) {
  console.log(word); // '.'
  console.log(pronouncings); // [ 'D EH S AH M AH L', 'D AA T', 'P IH R IY AH D', 'P OY N T' ]
});
```

Add additional pronouncings

`additionalPronouncings.json`

```json
[
  {
    "AMALTHEA": [
      "AH M AA L TH IY AH"
    ]
  }
]
```

```javascript
var file = fs.createReadStream(__dirname + '/additionalPronouncings.json');

CMUSphinxDict.addPronouncings(file, function(error, words, pronouncings) {
  console.log(words); // ['AMALTHEA']
  console.log(pronouncings); // [['AH M AA L TH IY AH']]
});
```

## Command line

```javascript
$ cmusphinxdict hello world

HELLO HH AH L OW
HELLO(2) HH EH L OW
WORLD W ER L D
```

JSON format:

```javascript
$ cmusphinxdict hello world --format=json

{
  "HELLO": [
    "HH AH L OW",
    "HH EH L OW"
  ],
  "WORLD": [
    "W ER L D"
  ]
}
```

Aliases for format: `-f=[type]`, `--format=[type]`, `--json`

Format types: `json`, `text` (default)

# License

[CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict) is release under the [Public Domain](http://en.wikipedia.org/wiki/CMU_Pronouncing_Dictionary).

Everything else is released under the MIT License.
