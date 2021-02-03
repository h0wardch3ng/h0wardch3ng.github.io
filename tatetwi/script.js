// Generated by CoffeeScript 1.4.0
/*
#
# 縦つい。Ver. 0.1,  by yubais, 2013/03/14
#
*/

var execute, invert, punctuation, render, shiftPunctuation, spacing, str2map, substrate, tategaki, translate, tweet,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

punctuation = ["、", "。", "，", "．"];

translate = {
  "ー": "｜",
  "「": "¬",
  "」": "∟",
  "→": "↓",
  "↑": "→",
  "←": "↑",
  "↓": "←",
  "＝": "॥",
  "…": "："
};

str2map = function(input) {
  var falses, i, line, lines, map, maxlen, _i, _len;
  input = input.replace(/\ /g, "　");
  input = input.replace(/[A-Za-z0-9!?,\."']/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
  });
  lines = input.split("\n");
  maxlen = Math.max.apply(null, (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = lines.length; _i < _len; _i++) {
      line = lines[_i];
      _results.push(line.length);
    }
    return _results;
  })());
  map = [];
  falses = (function() {
    var _i, _results;
    _results = [];
    for (i = _i = 1; 1 <= maxlen ? _i <= maxlen : _i >= maxlen; i = 1 <= maxlen ? ++_i : --_i) {
      _results.push(false);
    }
    return _results;
  })();
  for (_i = 0, _len = lines.length; _i < _len; _i++) {
    line = lines[_i];
    map.push(line.split("").concat(falses).slice(0, +(maxlen - 1) + 1 || 9e9));
  }
  return map;
};

invert = function(map) {
  var i, j, remap, _i, _j, _k, _ref, _ref1, _ref2;
  remap = [];
  for (j = _i = 0, _ref = map[0].length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; j = 0 <= _ref ? ++_i : --_i) {
    remap.push([]);
    for (i = _j = 0, _ref1 = map.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      remap[j][i] = map[i][j];
    }
  }
  for (j = _k = 0, _ref2 = remap.length - 1; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; j = 0 <= _ref2 ? ++_k : --_k) {
    remap[j] = remap[j].reverse();
  }
  return remap;
};

spacing = function(map) {
  var i, line, reline, remap, _i, _j, _len, _ref;
  remap = [];
  for (_i = 0, _len = map.length; _i < _len; _i++) {
    line = map[_i];
    reline = [];
    for (i = _j = 0, _ref = line.length - 1; 0 <= _ref ? _j <= _ref : _j >= _ref; i = 0 <= _ref ? ++_j : --_j) {
      reline.push(line[i]);
      reline.push(false);
    }
    remap.push(reline);
  }
  return remap;
};

shiftPunctuation = function(map) {
  var x, y, _i, _j, _ref, _ref1, _ref2;
  for (y = _i = 1, _ref = map.length - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; y = 1 <= _ref ? ++_i : --_i) {
    for (x = _j = 0, _ref1 = map[0].length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
      if (_ref2 = map[y][x], __indexOf.call(punctuation, _ref2) >= 0) {
        map[y - 1][x + 1] = map[y][x];
        map[y][x] = false;
      }
    }
  }
  return map;
};

render = function(map) {
  var char, line, output, _i, _j, _len, _len1;
  output = "";
  for (_i = 0, _len = map.length; _i < _len; _i++) {
    line = map[_i];
    for (_j = 0, _len1 = line.length; _j < _len1; _j++) {
      char = line[_j];
      output += substrate(char);
    }
    if (char === false) {
      output = output.slice(0, +(output.length - 2) + 1 || 9e9);
    }
    output += "\n";
  }
  return output;
};

substrate = function(char) {
  if (char in translate) {
    return translate[char];
  }
  if (char === false) {
    return "　";
  }
  if (char.match(/[0-9a-z.,]i/)) {
    return " " + char;
  }
  return char;
};

tategaki = function(input) {
  return render(shiftPunctuation(spacing(invert(str2map(input)))));
};

execute = function() {
  var input, output;
  input = $("#inputarea").val();
  output = tategaki(input);
  $("#outputarea").val(output);
  $("#lettercount").text(140 - output.length);
  if (output.length > 140) {
    $("#lettercount").css("color", "#f00");
    $("#tweetButton").addClass("btn-disable");
    return $("#tweetButton").removeClass("btn-able");
  } else {
    $("#lettercount").css("color", "#000");
    return $("#tweetButton").button("enable");
  }
};

tweet = function() {
  var content, encoded, url;
  content = $("#outputarea").val();
  if (content !== "" && content.length <= 140) {
    encoded = encodeURIComponent(content);
    url = "https://twitter.com/intent/tweet?text=" + encoded;
    if ($("#addURL").attr('checked')) {
      url += "&url=http://yubais.net/tatetwi/";
    }
    return window.open(url);
  }
};

$(document).ready(function() {
  $("#convertButton").click(function(e) {
    e.preventDefault();
    return execute();
  });
  $("#tweetButton").click(function(e) {
    e.preventDefault();
    return tweet();
  });
  return $("#deleteButton").click(function(e) {
    return $("#inputarea").val("");
  });
});