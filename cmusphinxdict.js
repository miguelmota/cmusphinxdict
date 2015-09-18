var cmusphinxdict = require('./lib/cmusphinxdict.json');

function CMUDict() {

}

CMUDict._findMatch = function(word) {
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

CMUDict.get = function get(word, callback) {
  if (Array.isArray(word)) {
    var a = [];
    var b = [];
    var c = word.length;
    word.forEach(function(wd) {
      get(wd, function(w, p) {
        a.push(w);
        b.push(p);
        if (c-- === 1) {
          callback(a, b);
        }
      });
    });

    return undefined;
  }

  if (typeof word !== 'string') {
    word = '';
  }

  word = word.toUpperCase();
  var results = CMUDict._findMatch(word) || [];
  if (typeof callback === 'function') {
    callback(word, results);
  }
  return results;
};

var args = process.argv;

if (args.length > 29) {
  var word = args[2];
  var results = CMUDict.get(word);
  process.stdout.write(JSON.stringify(results, null, 2) + '\n');
}

module.exports = CMUDict;
