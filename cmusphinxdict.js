var cmusphinxdict = require('./lib/cmusphinxdict.json');

function CMUDict() {

}

CMUDict.prototype._findMatch = function(word) {
  var specialSymbols = {
    '!': ['EXCLAMATION-POINT'],
    '"': ['CLOSE-QUOTE','DOUBLE-QUOTE','END-OF-QUOTE','END-QUOTE','IN-QUOTES','QUOTE','UNQUOTE'],
    '#': ['SHARP-SIGN'],
    '%': ['PERCENT'],
    '&': ['AMPERSAND'],
    "'": ['APOSTROPHE','END-INNER-QUOTE','END-QUOTE','INNER-QUOTE','QUOTE','SINGLE-QUOTE'],
    '(': ['BEGIN-PARENS','IN-PARENTHESES','LEFT-PAREN','OPEN-PARENTHESES','PAREN','PARENS','PARENTHESES'],
    ')': ['CLOSE-PAREN','CLOSE-PARENTHESES','END-PAREN','END-PARENS','END-PARENTHESES','END-THE-PAREN','PAREN','PARENS','RIGHT-PAREN','UN-PARENTHESES'],
    ',': ['COMMA'],
    '-': ['DASH','HYPHEN'],
    '...': ['ELLIPSIS'],
    '.': ['DECIMAL','DOT','FULL-STOP','PERIOD','POINT'],
    '/': ['SLASH'],
    ':': ['COLON'],
    ';': ['SEMI-COLON'],
    '?': ['QUESTION-MARK']
  };

  var match = cmusphinxdict[word];
  var specialSymbolsWord = specialSymbols[word[0]];

  if (!match && Array.isArray(specialSymbolsWord)) {
    specialSymbolsWord.forEach(function(w) {
      match = match || [];
      var m = cmusphinxdict[w];
      if (m) {
        match = match.concat(m);
      }
    });
  }

  return match;
};

CMUDict.prototype.get = function(word, callback) {
  word = (word || '').toUpperCase();
  var results = this._findMatch(word) || [];
  if (typeof callback === 'function') {
    callback(word, results);
  }
  return results;
};

var cmudict = new CMUDict();

var args = process.argv;

if (args.length > 2) {
  var word = args[2];
  var results = cmudict.get(word);
  process.stdout.write(JSON.stringify(results, null, 2) + '\n');
}

module.exports = cmudict;
