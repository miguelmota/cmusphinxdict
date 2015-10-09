var cmusphinxdict = require('./lib/cmusphinxdict.json');

function CMUDict() {

}

CMUDict._findMatch = function _findMatch(word) {
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

CMUDict._unique = function _unique(array) {
  var unique = [];

  if (!Array.isArray(array)) {
    return unique;
  }

  array.forEach(function(value) {
    if (unique.indexOf(value) === -1) {
      unique.push(value);
    }
  });

  return unique;
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

CMUDict.addPronouncings = function addPronouncings(stream, callback) {
  var data = '';

  stream.on('data', function(chunk) {
    data += chunk;
  }).on('error', function(error) {
    callback(error);
  }).on('end', function() {
    var json;

    try {
      json = JSON.parse(data);
    } catch(error) {
      callback(error);
    }

    if (json) {
      if (Array.isArray(json)) {
        var words = [];

        json.forEach(function(obj) {
          for (var word in obj) {
            if (obj.hasOwnProperty(word)) {
              if (typeof word !== 'string') {
                return false;
              }

              word = word.toUpperCase();

              var newPronouncings = obj[word];
              var currentPronouncings = cmusphinxdict[word];

              if ((typeof newPronouncings === 'string' || Array.isArray(newPronouncings))) {
                if (Array.isArray(currentPronouncings)) {
                  currentPronouncings = currentPronouncings.concat(newPronouncings);
                } else {
                  currentPronouncings = newPronouncings;
                }
              }

              cmusphinxdict[word] = CMUDict._unique(currentPronouncings);

              words.push(word);
            }
          }
        });

        this.get(words, function(words, pronouncings) {
          callback(null, words, pronouncings);
        });
      }
    }
  }.bind(this));
};

var args = process.argv;

if (args.length > 29) {
  var word = args[2];
  var results = CMUDict.get(word);
  process.stdout.write(JSON.stringify(results, null, 2) + '\n');
}

module.exports = CMUDict;
