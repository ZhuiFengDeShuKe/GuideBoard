// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $list = $('.board-list');
var $lastLi = $list.find('li.last');
var defaultList = [{
  logo: 'G',
  url: 'http://google.com'
}, {
  logo: 'G',
  url: 'http://github.com'
}];
var boardListString = localStorage.getItem('BoardList');
var boardListObject = JSON.parse(boardListString);
var boardList = boardListObject || defaultList;
refresh(); // 添加按钮加点击事件

$('.board-add').on('click', function (e) {
  var urlTmp = window.prompt('给个网址吧~');

  if (urlTmp.indexOf('http://') !== 0 && urlTmp.indexOf('https://') !== 0) {
    urlTmp = 'https://' + urlTmp;
  }

  var node = {
    logo: simplifyUrl(urlTmp)[0].toUpperCase(),
    url: urlTmp
  };
  boardList.push(node);
  addBoard(node, boardList.length - 1);
}); // 退出页面时保存页签

window.onbeforeunload = function () {
  var boardListString = JSON.stringify(boardList);
  localStorage.setItem('BoardList', boardListString);
}; // 按下按键打开相应的网站


$(document).on('keypress', function (e) {
  var key = e.key;
  boardList.forEach(function (node) {
    if (node['logo'].toLowerCase() === key) {
      window.open(node['url']);
    }
  });
}); // 添加一个网站方块

function addBoard(node, index) {
  var $newLi = $("<li>\n                        <div class=\"board-common\">\n                            <div class=\"logo\">".concat(node['logo'], "</div>\n                            <div class=\"link\">").concat(simplifyUrl(node['url']), "</div>\n                            <svg class=\"close\" aria-hidden=\"true\">\n                                <use xlink:href=\"#icon-close\"></use>\n                            </svg>\n                        </div>\n                    </li>")).insertBefore($lastLi); // 方块的点击事件

  $newLi.on('click', function (e) {
    window.open(node['url']);
  }); // 方块的删除按钮

  $newLi.on('click', '.close', function (e) {
    e.stopPropagation();
    boardList.splice(index, 1);
    refresh();
  });
}

function refresh() {
  $list.find('li:not(.last)').remove();
  boardList.forEach(function (node, index) {
    addBoard(node, index);
  });
}

function simplifyUrl(url) {
  return url.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\/.*/, ''); // 删除 / 开头的内容
}
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.d8314056.js.map