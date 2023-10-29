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
})({"hRTX":[function(require,module,exports) {
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],"Feqj":[function(require,module,exports) {
'use strict';

var bind = require('./helpers/bind');

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

},{"./helpers/bind":"hRTX"}],"phSU":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":"Feqj"}],"xpeW":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":"Feqj"}],"njyv":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":"Feqj"}],"Lpyz":[function(require,module,exports) {
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],"NZT3":[function(require,module,exports) {
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":"Lpyz"}],"Ztkp":[function(require,module,exports) {
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":"NZT3"}],"MLCl":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":"Feqj"}],"R56a":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],"uRyQ":[function(require,module,exports) {
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],"dm4E":[function(require,module,exports) {
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/isAbsoluteURL":"R56a","../helpers/combineURLs":"uRyQ"}],"Zn5P":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":"Feqj"}],"Rpqp":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":"Feqj"}],"akUF":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var cookies = require('./../helpers/cookies');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"./../utils":"Feqj","./../core/settle":"Ztkp","./../helpers/cookies":"MLCl","./../helpers/buildURL":"phSU","../core/buildFullPath":"dm4E","./../helpers/parseHeaders":"Zn5P","./../helpers/isURLSameOrigin":"Rpqp","../core/createError":"NZT3"}],"g5IB":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};
},{}],"A14q":[function(require,module,exports) {
var process = require("process");
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');
var enhanceError = require('./core/enhanceError');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

},{"./utils":"Feqj","./helpers/normalizeHeaderName":"njyv","./core/enhanceError":"Lpyz","./adapters/xhr":"akUF","./adapters/http":"akUF","process":"g5IB"}],"IAOH":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var defaults = require('./../defaults');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};

},{"./../utils":"Feqj","./../defaults":"A14q"}],"mXc0":[function(require,module,exports) {
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],"HALK":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"./../utils":"Feqj","./transformData":"IAOH","../cancel/isCancel":"mXc0","../defaults":"A14q"}],"fBI1":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};

},{"../utils":"Feqj"}],"b3VU":[function(require,module,exports) {
module.exports = {
  "name": "axios",
  "version": "0.21.4",
  "description": "Promise based HTTP client for the browser and node.js",
  "main": "index.js",
  "scripts": {
    "test": "grunt test",
    "start": "node ./sandbox/server.js",
    "build": "NODE_ENV=production grunt build",
    "preversion": "npm test",
    "version": "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
    "postversion": "git push && git push --tags",
    "examples": "node ./examples/server.js",
    "coveralls": "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
    "fix": "eslint --fix lib/**/*.js"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/axios/axios.git"
  },
  "keywords": [
    "xhr",
    "http",
    "ajax",
    "promise",
    "node"
  ],
  "author": "Matt Zabriskie",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/axios/axios/issues"
  },
  "homepage": "https://axios-http.com",
  "devDependencies": {
    "coveralls": "^3.0.0",
    "es6-promise": "^4.2.4",
    "grunt": "^1.3.0",
    "grunt-banner": "^0.6.0",
    "grunt-cli": "^1.2.0",
    "grunt-contrib-clean": "^1.1.0",
    "grunt-contrib-watch": "^1.0.0",
    "grunt-eslint": "^23.0.0",
    "grunt-karma": "^4.0.0",
    "grunt-mocha-test": "^0.13.3",
    "grunt-ts": "^6.0.0-beta.19",
    "grunt-webpack": "^4.0.2",
    "istanbul-instrumenter-loader": "^1.0.0",
    "jasmine-core": "^2.4.1",
    "karma": "^6.3.2",
    "karma-chrome-launcher": "^3.1.0",
    "karma-firefox-launcher": "^2.1.0",
    "karma-jasmine": "^1.1.1",
    "karma-jasmine-ajax": "^0.1.13",
    "karma-safari-launcher": "^1.0.0",
    "karma-sauce-launcher": "^4.3.6",
    "karma-sinon": "^1.0.5",
    "karma-sourcemap-loader": "^0.3.8",
    "karma-webpack": "^4.0.2",
    "load-grunt-tasks": "^3.5.2",
    "minimist": "^1.2.0",
    "mocha": "^8.2.1",
    "sinon": "^4.5.0",
    "terser-webpack-plugin": "^4.2.3",
    "typescript": "^4.0.5",
    "url-search-params": "^0.10.0",
    "webpack": "^4.44.2",
    "webpack-dev-server": "^3.11.0"
  },
  "browser": {
    "./lib/adapters/http.js": "./lib/adapters/xhr.js"
  },
  "jsdelivr": "dist/axios.min.js",
  "unpkg": "dist/axios.min.js",
  "typings": "./index.d.ts",
  "dependencies": {
    "follow-redirects": "^1.14.0"
  },
  "bundlesize": [
    {
      "path": "./dist/axios.min.js",
      "threshold": "5kB"
    }
  ]
}
;
},{}],"bSmC":[function(require,module,exports) {
'use strict';

var pkg = require('./../../package.json');

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};
var currentVerArr = pkg.version.split('.');

/**
 * Compare package versions
 * @param {string} version
 * @param {string?} thanVersion
 * @returns {boolean}
 */
function isOlderVersion(version, thanVersion) {
  var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
  var destVer = version.split('.');
  for (var i = 0; i < 3; i++) {
    if (pkgVersionArr[i] > destVer[i]) {
      return true;
    } else if (pkgVersionArr[i] < destVer[i]) {
      return false;
    }
  }
  return false;
}

/**
 * Transitional option validator
 * @param {function|boolean?} validator
 * @param {string?} version
 * @param {string} message
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  var isDeprecated = version && isOlderVersion(version);

  function formatMessage(opt, desc) {
    return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed in ' + version));
    }

    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  isOlderVersion: isOlderVersion,
  assertOptions: assertOptions,
  validators: validators
};

},{"./../../package.json":"b3VU"}],"trUU":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');
var validator = require('../helpers/validator');

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"./../utils":"Feqj","../helpers/buildURL":"phSU","./InterceptorManager":"xpeW","./dispatchRequest":"HALK","./mergeConfig":"fBI1","../helpers/validator":"bSmC"}],"qFUg":[function(require,module,exports) {
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],"VgQU":[function(require,module,exports) {
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":"qFUg"}],"yisB":[function(require,module,exports) {
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],"FbOI":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};

},{}],"Wzmt":[function(require,module,exports) {
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// Expose isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./utils":"Feqj","./helpers/bind":"hRTX","./core/Axios":"trUU","./core/mergeConfig":"fBI1","./defaults":"A14q","./cancel/Cancel":"qFUg","./cancel/CancelToken":"VgQU","./cancel/isCancel":"mXc0","./helpers/spread":"yisB","./helpers/isAxiosError":"FbOI"}],"O4Aa":[function(require,module,exports) {
module.exports = require('./lib/axios');
},{"./lib/axios":"Wzmt"}],"MVO0":[function(require,module,exports) {
const axios = require("axios");
const corsProxy = 'https://corsproxy.io/?';
const youtubeEndpoint = 'https://www.youtube.com';

const GetYoutubeInitData = async (url) => {
  var initdata = await {};
  var apiToken = await null;
  var context = await null;
  try {
    const page = await axios.get(encodeURI(url));
    const ytInitData = await page.data.split("var ytInitialData =");
    if (ytInitData && ytInitData.length > 1) {
      const data = await ytInitData[1].split("</script>")[0].slice(0, -1);

      if (page.data.split("innertubeApiKey").length > 0) {
        apiToken = await page.data
          .split("innertubeApiKey")[1]
          .trim()
          .split(",")[0]
          .split('"')[2];
      }

      if (page.data.split("INNERTUBE_CONTEXT").length > 0) {
        context = await JSON.parse(
          page.data.split("INNERTUBE_CONTEXT")[1].trim().slice(2, -2)
        );
      }

      initdata = await JSON.parse(data);
      return await Promise.resolve({ initdata, apiToken, context });
    } else {
      console.error("cannot_get_init_data");
      return await Promise.reject("cannot_get_init_data");
    }
  } catch (ex) {
    await console.error(ex);
    return await Promise.reject(ex);
  }
};

const GetData = async (
  keyword,
  withPlaylist = false,
  limit = 0,
  options = []
) => {
  let endpoint = await `${youtubeEndpoint}/results?search_query=${keyword}`;
  endpoint = corsProxy + endpoint;
  try {
    if (Array.isArray(options) && options.length > 0) {
      const type = options.find((z) => z.type);
      if (typeof type == "object") {
        if (typeof type.type == "string") {
          switch (type.type.toLowerCase()) {
            case "video":
              endpoint = `${endpoint}&sp=EgIQAQ%3D%3D`;
              break;
            case "channel":
              endpoint = `${endpoint}&sp=EgIQAg%3D%3D`;
              break;
            case "playlist":
              endpoint = `${endpoint}&sp=EgIQAw%3D%3D`;
              break;
            case "movie":
              endpoint = `${endpoint}&sp=EgIQBA%3D%3D`;
              break;
          }
        }
      }
    }
    const page = await GetYoutubeInitData(endpoint);

    const sectionListRenderer = await page.initdata.contents
      .twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer;

    let contToken = await {};

    let items = await [];

    await sectionListRenderer.contents.forEach((content) => {
      if (content.continuationItemRenderer) {
        contToken =
          content.continuationItemRenderer.continuationEndpoint
            .continuationCommand.token;
      } else if (content.itemSectionRenderer) {
        content.itemSectionRenderer.contents.forEach((item) => {
          if (item.channelRenderer) {
            let channelRenderer = item.channelRenderer;
            items.push({
              id: channelRenderer.channelId,
              type: "channel",
              thumbnail: channelRenderer.thumbnail,
              title: channelRenderer.title.simpleText
            });
          } else {
            let videoRender = item.videoRenderer;
            let playListRender = item.playlistRenderer;

            if (videoRender && videoRender.videoId) {
              items.push(VideoRender(item));
            }
            if (withPlaylist) {
              if (playListRender && playListRender.playlistId) {
                items.push({
                  id: playListRender.playlistId,
                  type: "playlist",
                  thumbnail: playListRender.thumbnails,
                  title: playListRender.title.simpleText,
                  length: playListRender.videoCount,
                  videos: playListRender.videos,
                  videoCount: playListRender.videoCount,
                  isLive: false
                });
              }
            }
          }
        });
      }
    });
    const apiToken = await page.apiToken;
    const context = await page.context;
    const nextPageContext = await { context: context, continuation: contToken };
    const itemsResult = limit != 0 ? items.slice(0, limit) : items;
    return await Promise.resolve({
      items: itemsResult,
      nextPage: { nextPageToken: apiToken, nextPageContext: nextPageContext }
    });
  } catch (ex) {
    await console.error(ex);
    return await Promise.reject(ex);
  }
};

const nextPage = async (nextPage, withPlaylist = false, limit = 0) => {
  const endpoint =
    await `${youtubeEndpoint}/youtubei/v1/search?key=${nextPage.nextPageToken}`;
  try {
    const page = await axios.post(
      encodeURI(endpoint),
      nextPage.nextPageContext
    );
    const item1 =
      page.data.onResponseReceivedCommands[0].appendContinuationItemsAction;
    let items = [];
    item1.continuationItems.forEach((conitem) => {
      if (conitem.itemSectionRenderer) {
        conitem.itemSectionRenderer.contents.forEach((item, index) => {
          let videoRender = item.videoRenderer;
          let playListRender = item.playlistRenderer;
          if (videoRender && videoRender.videoId) {
            items.push(VideoRender(item));
          }
          if (withPlaylist) {
            if (playListRender && playListRender.playlistId) {
              items.push({
                id: playListRender.playlistId,
                type: "playlist",
                thumbnail: playListRender.thumbnails,
                title: playListRender.title.simpleText,
                length: playListRender.videoCount,
                videos: GetPlaylistData(playListRender.playlistId)
              });
            }
          }
        });
      } else if (conitem.continuationItemRenderer) {
        nextPage.nextPageContext.continuation =
          conitem.continuationItemRenderer.continuationEndpoint.continuationCommand.token;
      }
    });
    const itemsResult = limit != 0 ? items.slice(0, limit) : items;
    return await Promise.resolve({ items: itemsResult, nextPage: nextPage });
  } catch (ex) {
    await console.error(ex);
    return await Promise.reject(ex);
  }
};

const GetPlaylistData = async (playlistId, limit = 0) => {
  const endpoint = await `${youtubeEndpoint}/playlist?list=${playlistId}`;
  try {
    const initData = await GetYoutubeInitData(endpoint);
    const sectionListRenderer = await initData.initdata;
    const metadata = await sectionListRenderer.metadata;
    if (sectionListRenderer && sectionListRenderer.contents) {
      const videoItems = await sectionListRenderer.contents
        .twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
        .sectionListRenderer.contents[0].itemSectionRenderer.contents[0]
        .playlistVideoListRenderer.contents;
      let items = await [];
      await videoItems.forEach((item) => {
        let videoRender = item.playlistVideoRenderer;
        if (videoRender && videoRender.videoId) {
          items.push(VideoRender(item));
        }
      });
      const itemsResult = limit != 0 ? items.slice(0, limit) : items;
      return await Promise.resolve({ items: itemsResult, metadata: metadata });
    } else {
      return await Promise.reject("invalid_playlist");
    }
  } catch (ex) {
    await console.error(ex);
    return await Promise.reject(ex);
  }
};

const GetSuggestData = async (limit = 0) => {
  const endpoint = await `${youtubeEndpoint}`;
  try {
    const page = await GetYoutubeInitData(endpoint);
    const sectionListRenderer = await page.initdata.contents
      .twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
      .richGridRenderer.contents;
    let items = await [];
    let otherItems = await [];
    await sectionListRenderer.forEach((item) => {
      if (item.richItemRenderer && item.richItemRenderer.content) {
        let videoRender = item.richItemRenderer.content.videoRenderer;
        if (videoRender && videoRender.videoId) {
          items.push(VideoRender(item.richItemRenderer.content));
        } else {
          otherItems.push(videoRender);
        }
      }
    });
    const itemsResult = limit != 0 ? items.slice(0, limit) : items;
    return await Promise.resolve({ items: itemsResult });
  } catch (ex) {
    await console.error(ex);
    return await Promise.reject(ex);
  }
};

const GetChannelById = async (channelId) => {
  const endpoint = await `${youtubeEndpoint}/channel/${channelId}`;
  try {
    const page = await GetYoutubeInitData(endpoint);
    const tabs = page.initdata.contents.twoColumnBrowseResultsRenderer.tabs;
    const items = tabs
      .map((json) => {
        if (json && json.tabRenderer) {
          const tabRenderer = json.tabRenderer;
          const title = tabRenderer.title;
          const content = tabRenderer.content;
          return { title, content };
        }
      })
      .filter((y) => typeof y != "undefined");
    return await Promise.resolve(items);
  } catch (ex) {
    return await Promise.reject(ex);
  }
};

const GetVideoDetails = async (videoId) => {
  const endpoint = await `${youtubeEndpoint}/watch?v=${videoId}`;
  try {
    const page = await GetYoutubeInitData(endpoint);
    const result = await page.initdata.contents.twoColumnWatchNextResults;
    const firstContent = await result.results.results.contents[0]
      .videoPrimaryInfoRenderer;
    const secondContent = await result.results.results.contents[1]
      .videoSecondaryInfoRenderer;
    const res = await {
      title: firstContent.title.runs[0].text,
      isLive: firstContent.viewCount.videoViewCountRenderer.hasOwnProperty(
        "isLive"
      )
        ? firstContent.viewCount.videoViewCountRenderer.isLive
        : false,
      channel: secondContent.owner.videoOwnerRenderer.title.runs[0].text,
      description: secondContent.attributedDescription.content,
      suggestion: result.secondaryResults.secondaryResults.results
        .filter((y) => y.hasOwnProperty("compactVideoRenderer"))
        .map((x) => compactVideoRenderer(x))
    };

    return await Promise.resolve(res);
  } catch (ex) {
    return await Promise.reject(ex);
  }
};

const VideoRender = (json) => {
  try {
    if (json && (json.videoRenderer || json.playlistVideoRenderer)) {
      let videoRenderer = null;
      if (json.videoRenderer) {
        videoRenderer = json.videoRenderer;
      } else if (json.playlistVideoRenderer) {
        videoRenderer = json.playlistVideoRenderer;
      }
      var isLive = false;
      if (
        videoRenderer.badges &&
        videoRenderer.badges.length > 0 &&
        videoRenderer.badges[0].metadataBadgeRenderer &&
        videoRenderer.badges[0].metadataBadgeRenderer.style ==
          "BADGE_STYLE_TYPE_LIVE_NOW"
      ) {
        isLive = true;
      }
      if (videoRenderer.thumbnailOverlays) {
        videoRenderer.thumbnailOverlays.forEach((item) => {
          if (
            item.thumbnailOverlayTimeStatusRenderer &&
            item.thumbnailOverlayTimeStatusRenderer.style &&
            item.thumbnailOverlayTimeStatusRenderer.style == "LIVE"
          ) {
            isLive = true;
          }
        });
      }
      const id = videoRenderer.videoId;
      const thumbnail = videoRenderer.thumbnail;
      const title = videoRenderer.title.runs[0].text;
      const shortBylineText = videoRenderer.shortBylineText
        ? videoRenderer.shortBylineText
        : "";
      const lengthText = videoRenderer.lengthText
        ? videoRenderer.lengthText
        : "";
      const channelTitle =
        videoRenderer.ownerText && videoRenderer.ownerText.runs
          ? videoRenderer.ownerText.runs[0].text
          : "";
      return {
        id,
        type: "video",
        thumbnail,
        title,
        channelTitle,
        shortBylineText,
        length: lengthText,
        isLive
      };
    } else {
      return {};
    }
  } catch (ex) {
    throw ex;
  }
};

const compactVideoRenderer = (json) => {
  const compactVideoRendererJson = json.compactVideoRenderer;

  var isLive = false;
  if (
    compactVideoRendererJson.badges &&
    compactVideoRendererJson.badges.length > 0 &&
    compactVideoRendererJson.badges[0].metadataBadgeRenderer &&
    compactVideoRendererJson.badges[0].metadataBadgeRenderer.style ==
      "BADGE_STYLE_TYPE_LIVE_NOW"
  ) {
    isLive = true;
  }
  const result = {
    id: compactVideoRendererJson.videoId,
    type: "video",
    thumbnail: compactVideoRendererJson.thumbnail.thumbnails,
    title: compactVideoRendererJson.title.simpleText,
    channelTitle: compactVideoRendererJson.shortBylineText.runs[0].text,
    shortBylineText: compactVideoRendererJson.shortBylineText.runs[0].text,
    length: compactVideoRendererJson.lengthText,
    isLive
  };
  return result;
};

const GetShortVideo = async () => {
  const page = await GetYoutubeInitData(youtubeEndpoint);
  const shortResult =
    await page.initdata.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.richGridRenderer.contents
      .filter((x) => {
        return x.richSectionRenderer;
      })
      .map((z) => z.richSectionRenderer.content)
      .filter((y) => y.richShelfRenderer)
      .map((u) => u.richShelfRenderer)
      .find((i) => i.title.runs[0].text == "Shorts");
  const res = await shortResult.contents
    .map((z) => z.richItemRenderer)
    .map((y) => y.content.reelItemRenderer);
  return await res.map((json) => ({
    id: json.videoId,
    type: "reel",
    thumbnail: json.thumbnail.thumbnails[0],
    title: json.headline.simpleText,
    inlinePlaybackEndpoint: json.inlinePlaybackEndpoint || {}
  }));
};

exports.GetListByKeyword = GetData;
exports.NextPage = nextPage;
exports.GetPlaylistData = GetPlaylistData;
exports.GetSuggestData = GetSuggestData;
exports.GetChannelById = GetChannelById;
exports.GetVideoDetails = GetVideoDetails;
exports.GetShortVideo = GetShortVideo;

},{"axios":"O4Aa"}],"YPq9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.e = exports.d = exports.c = exports.b = exports.a = void 0;
var a = exports.a = function (r) {
    return r.HTTPS = "https://www.youtube.com/iframe_api", r.HTTP = "http://www.youtube.com/iframe_api", r;
  }(a || {}),
  n = exports.b = function (o) {
    return o[o.UNSTARTED = -1] = "UNSTARTED", o[o.ENDED = 0] = "ENDED", o[o.PLAYING = 1] = "PLAYING", o[o.PAUSED = 2] = "PAUSED", o[o.BUFFERING = 3] = "BUFFERING", o[o.CUED = 5] = "CUED", o;
  }(n || {}),
  d = exports.c = function (e) {
    return e[e.INVALID_PARAM = 2] = "INVALID_PARAM", e[e.HTML5_ERROR = 5] = "HTML5_ERROR", e[e.NOT_FOUND = 100] = "NOT_FOUND", e[e.UNPLAYABLE_1 = 101] = "UNPLAYABLE_1", e[e.UNPLAYABLE_2 = 150] = "UNPLAYABLE_2", e;
  }(d || {}),
  u = exports.d = function (e) {
    return e.INVALID_PARAM = "The request contains an invalid parameter value.", e.HTML5_ERROR = "The request content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.", e.NOT_FOUND = "The video requested was not found.", e.UNPLAYABLE_1 = "The owner of the requested video does not allow it to be played in embedded players.", e.UNPLAYABLE_2 = "This error is the same as 101. The owner of the requested video does not allow it to be played in embedded players.", e;
  }(u || {}),
  i = exports.e = function (t) {
    return t.ELEMENT_NOT_FOUND = "No element was found.", t.UNRECOGNIZED_STATE_CHANGE = "Unrecognized state change event", t.UNKNOWN_ERROR_CODE = "Unknown error code", t.FAILED_TO_LOAD = "YouTube Iframe API failed to load.", t;
  }(i || {});
},{}],"PezD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.a = i;
exports.b = l;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function i() {
  return Math.random().toString(36).substr(2, 9);
}
function l(n, t, r) {
  return new Promise(function (o, a) {
    var e = document.createElement("script");
    e.async = !0, e.src = n, Object.entries(t || {}).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        d = _ref2[0],
        c = _ref2[1];
      e.setAttribute(d, c);
    }), e.onload = function () {
      e.onerror = e.onload = null, o(e);
    }, e.onerror = function () {
      e.onerror = e.onload = null, a(new Error("Failed to load ".concat(n)));
    }, (r || document.head || document.getElementsByTagName("head")[0]).appendChild(e);
  });
}
},{}],"LqgX":[function(require,module,exports) {
'use strict';

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if ('undefined' !== typeof module) {
  module.exports = EventEmitter;
}

},{}],"Tf56":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _chunkREK3HHK = require("./chunk-REK3HHK7.js");
var _chunkYB27CSNR = require("./chunk-YB27CSNR.js");
var _eventemitter = require("eventemitter3");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var s = [],
  o = exports.default = /*#__PURE__*/function (_EventEmitter) {
    _inherits(o, _EventEmitter);
    var _super = _createSuper(o);
    function o(e, t) {
      var _this;
      _classCallCheck(this, o);
      _this = _super.call(this);
      _defineProperty(_assertThisInitialized(_this), "_element", void 0);
      _defineProperty(_assertThisInitialized(_this), "_options", void 0);
      _defineProperty(_assertThisInitialized(_this), "_api", void 0);
      _defineProperty(_assertThisInitialized(_this), "_player", void 0);
      _defineProperty(_assertThisInitialized(_this), "_ready", !1);
      _defineProperty(_assertThisInitialized(_this), "_autoplay", !1);
      _defineProperty(_assertThisInitialized(_this), "_queue", []);
      _defineProperty(_assertThisInitialized(_this), "_interval", void 0);
      _defineProperty(_assertThisInitialized(_this), "_start", void 0);
      _defineProperty(_assertThisInitialized(_this), "videoId", void 0);
      _defineProperty(_assertThisInitialized(_this), "destroyed", !1);
      var a = typeof e == "string" ? document.querySelector(e) : e;
      if (!a) throw new Error("No element was found.");
      _this._element = a, _this._options = Object.assign({
        width: 640,
        height: 360,
        autoplay: !1,
        captions: void 0,
        controls: !0,
        keyboard: !0,
        fullscreen: !0,
        annotations: !0,
        modestBranding: !1,
        relatedVideos: !0,
        timeUpdateFrequency: 0,
        playsInline: !0,
        start: 0,
        debug: !1,
        host: "https://www.youtube-nocookie.com"
      }, t || {}), _this._startInterval = _this._startInterval.bind(_assertThisInitialized(_this)), _this._stopInterval = _this._stopInterval.bind(_assertThisInitialized(_this)), _this.on("playing", _this._startInterval), _this.on("unstarted", _this._stopInterval), _this.on("ended", _this._stopInterval), _this.on("paused", _this._stopInterval), _this.on("buffering", _this._stopInterval), _this._loadIframeApi(function (i, n) {
        if (n) return _this._destroy(new Error("YouTube Iframe API failed to load."));
        i && (_this._api = i), _this.videoId && _this.load(_this.videoId, _this._autoplay, _this._start);
      });
      return _this;
    }
    _createClass(o, [{
      key: "_debug",
      value: function _debug() {
        if (this._options.debug) {
          var _console;
          var t = new Date().toLocaleString("en", {
            timeStyle: "medium"
          });
          for (var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++) {
            e[_key] = arguments[_key];
          }
          (_console = console).log.apply(_console, ["".concat(t, ": ")].concat(e));
        }
      }
    }, {
      key: "_loadIframeApi",
      value: function _loadIframeApi(e) {
        if (window.YT && typeof window.YT.Player == "function") return e(window.YT);
        if (s.push(e), !document.querySelector("script[src=\"".concat(_chunkREK3HHK.a, "\"]"))) {
          var i = window.location.protocol === "http" ? "HTTP" : "HTTPS";
          (0, _chunkYB27CSNR.b)(_chunkREK3HHK.a[i]).catch(function (n) {
            for (; s.length;) {
              var u = s.shift();
              u && u(void 0, n);
            }
          });
        }
        var a$1 = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function () {
          for (typeof a$1 == "function" && a$1(); s.length;) {
            var _i = s.shift();
            _i && _i(window.YT, void 0);
          }
        };
      }
    }, {
      key: "_createPlayer",
      value: function _createPlayer(e) {
        var _this2 = this;
        if (this.destroyed || !this._element || !this._api?.Player || !this._options) return;
        var t = this._options,
          a = this._api?.Player;
        this._player = new a(this._element, {
          width: t.width || 640,
          height: t.height || 360,
          videoId: e,
          host: t.host || "https://www.youtube-nocookie.com",
          playerVars: {
            autoplay: t.autoplay ? 1 : 0,
            cc_load_policy: t.captions !== void 0 ? t.captions ? 1 : 0 : void 0,
            hl: t.captions !== void 0 && t.captions !== "" ? t.captions : void 0,
            cc_lang_pref: t.captions !== null && t.captions !== "" ? t.captions : void 0,
            controls: t.controls ? 2 : 0,
            disablekb: t.keyboard ? 0 : 1,
            enablejsapi: 1,
            fs: t.fullscreen ? 1 : 0,
            iv_load_policy: t.annotations ? 1 : 3,
            modestbranding: t.modestBranding ? 1 : 0,
            origin: window.location.origin,
            playsinline: t.playsInline ? 1 : 0,
            rel: t.relatedVideos ? 1 : 0,
            wmode: "opaque",
            start: t.start,
            loop: 0,
            showinfo: 1
          },
          events: {
            onReady: function onReady() {
              return _this2._onReady();
            },
            onStateChange: function onStateChange(i) {
              return _this2._onStateChange(i);
            },
            onPlaybackQualityChange: function onPlaybackQualityChange(i) {
              return _this2._onPlaybackQualityChange(i);
            },
            onPlaybackRateChange: function onPlaybackRateChange(i) {
              return _this2._onPlaybackRateChange(i);
            },
            onError: function onError(i) {
              return _this2._onError(i);
            }
          }
        });
      }
    }, {
      key: "load",
      value: function load(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        var a = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        if (!this.destroyed && (this.videoId = e, this._autoplay = t, this._start = a, !!this._api)) {
          if (!this._player) {
            this._createPlayer(e);
            return;
          }
          this._ready && (t ? this._player.loadVideoById({
            videoId: e,
            startSeconds: a
          }) : this._player.cueVideoById({
            videoId: e,
            startSeconds: a
          }));
        }
      }
    }, {
      key: "play",
      value: function play() {
        this._ready ? this._player?.playVideo() : this._queueCommand("play");
      }
    }, {
      key: "pause",
      value: function pause() {
        this._ready ? this._player?.pauseVideo() : this._queueCommand("pause");
      }
    }, {
      key: "stop",
      value: function stop() {
        this._ready ? this._player?.stopVideo() : this._queueCommand("stop");
      }
    }, {
      key: "currentTime",
      get: function get() {
        return this._ready && this._player?.getCurrentTime() || 0;
      },
      set: function set(e) {
        this._ready ? this._player?.seekTo(e, !0) : this._queueCommand("seek", e);
      }
    }, {
      key: "seek",
      value: function seek(e) {
        this._ready ? this._player?.seekTo(e, !0) : this._queueCommand("seek", e);
      }
    }, {
      key: "volume",
      get: function get() {
        return this._ready && this._player?.getVolume() || 0;
      },
      set: function set(e) {
        this._ready ? this._player?.setVolume(e) : this._queueCommand("setVolume", e);
      }
    }, {
      key: "setVolume",
      value: function setVolume(e) {
        this._ready ? this._player?.setVolume(e) : this._queueCommand("setVolume", e);
      }
    }, {
      key: "getVolume",
      value: function getVolume() {
        return this._ready && this._player?.getVolume() || 0;
      }
    }, {
      key: "muted",
      get: function get() {
        return this._ready && this._player?.isMuted() || !1;
      },
      set: function set(e) {
        this._ready ? e ? this._player?.mute() : this._player?.unMute() : this._queueCommand(e ? "mute" : "unMute");
      }
    }, {
      key: "mute",
      value: function mute() {
        this._ready ? this._player?.mute() : this._queueCommand("mute");
      }
    }, {
      key: "unMute",
      value: function unMute() {
        this._ready ? this._player?.unMute() : this._queueCommand("unMute");
      }
    }, {
      key: "isMuted",
      value: function isMuted() {
        return this._ready && this._player?.isMuted() || !1;
      }
    }, {
      key: "size",
      get: function get() {
        return {
          width: parseInt(this._ready && this._player?.getIframe().width || "0") || 0,
          height: parseInt(this._ready && this._player?.getIframe().height || "0") || 0
        };
      },
      set: function set(_ref) {
        var e = _ref.width,
          t = _ref.height;
        this._ready ? this._player?.setSize(e, t) : this._queueCommand("setSize", e, t);
      }
    }, {
      key: "setSize",
      value: function setSize(e, t) {
        this._ready ? this._player?.setSize(e, t) : this._queueCommand("setSize", e, t);
      }
    }, {
      key: "getSize",
      value: function getSize() {
        return {
          width: parseInt(this._ready && this._player?.getIframe().width || "0") || 0,
          height: parseInt(this._ready && this._player?.getIframe().height || "0") || 0
        };
      }
    }, {
      key: "playbackRate",
      get: function get() {
        return this._ready && this._player?.getPlaybackRate() || 1;
      },
      set: function set(e) {
        [.25, .5, 1, 1.5, 2].includes(e) && (this._ready ? this._player?.setPlaybackRate(e) : this._queueCommand("setPlaybackRate", e));
      }
    }, {
      key: "setPlaybackRate",
      value: function setPlaybackRate(e) {
        this._ready ? this._player?.setPlaybackRate(e) : this._queueCommand("setPlaybackRate", e);
      }
    }, {
      key: "playbackQuality",
      get: function get() {
        return this._ready && this._player?.getPlaybackQuality() || "default";
      },
      set: function set(e) {
        this._ready ? this._player?.setPlaybackQuality(e) : this._queueCommand("setPlaybackQuality", e);
      }
    }, {
      key: "setPlaybackQuality",
      value: function setPlaybackQuality(e) {
        this._ready ? this._player?.setPlaybackQuality(e) : this._queueCommand("setPlaybackQuality", e);
      }
    }, {
      key: "getPlaybackQuality",
      value: function getPlaybackQuality() {
        return this._ready && this._player?.getPlaybackQuality() || "default";
      }
    }, {
      key: "availablePlaybackQualities",
      get: function get() {
        return this._ready && this._player?.getAvailableQualityLevels() || [];
      }
    }, {
      key: "getAvailablePlaybackQualities",
      value: function getAvailablePlaybackQualities() {
        return this._ready && this._player?.getAvailableQualityLevels() || [];
      }
    }, {
      key: "getPlaybackRate",
      value: function getPlaybackRate() {
        return this._ready && this._player?.getPlaybackRate() || 1;
      }
    }, {
      key: "availablePlaybackRates",
      get: function get() {
        return this._ready && this._player?.getAvailablePlaybackRates() || [1];
      }
    }, {
      key: "getAvailablePlaybackRates",
      value: function getAvailablePlaybackRates() {
        return this._ready && this._player?.getAvailablePlaybackRates() || [1];
      }
    }, {
      key: "duration",
      get: function get() {
        return this._ready && this._player?.getDuration() || 0;
      }
    }, {
      key: "getDuration",
      value: function getDuration() {
        return this._ready && this._player?.getDuration() || 0;
      }
    }, {
      key: "progress",
      get: function get() {
        return this._ready && this._player?.getVideoLoadedFraction() || 0;
      }
    }, {
      key: "getProgress",
      value: function getProgress() {
        return this._ready && this._player?.getVideoLoadedFraction() || 0;
      }
    }, {
      key: "state",
      get: function get() {
        return this._ready && _chunkREK3HHK.b[this._player?.getPlayerState()] || "unstarted";
      }
    }, {
      key: "getState",
      value: function getState() {
        return this._ready && _chunkREK3HHK.b[this._player?.getPlayerState()] || "unstarted";
      }
    }, {
      key: "getCurrentTime",
      value: function getCurrentTime() {
        return this._ready && this._player?.getCurrentTime() || 0;
      }
    }, {
      key: "youTubeInstance",
      get: function get() {
        return this._ready && this._player;
      }
    }, {
      key: "getYouTubeInstance",
      value: function getYouTubeInstance() {
        return this._ready && this._player;
      }
    }, {
      key: "percentageWatched",
      get: function get() {
        return this._ready && this.getCurrentTime() / this.getDuration() || 0;
      }
    }, {
      key: "getPercentageWatched",
      value: function getPercentageWatched() {
        return this._ready && this.getCurrentTime() / this.getDuration() || 0;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this._destroy();
      }
    }, {
      key: "_destroy",
      value: function _destroy(e) {
        this.destroyed || (this.destroyed = !0, this._options.debug && e && console.error(e.message), this._player && (this._player.stopVideo && this._player.stopVideo(), this._player.destroy()), this.videoId = void 0, this._element = void 0, this._options = {}, this._api = void 0, this._player = void 0, this._ready = !1, this._queue = [], this._stopInterval(), this.removeListener("playing", this._startInterval), this.removeListener("paused", this._stopInterval), this.removeListener("buffering", this._stopInterval), this.removeListener("unstarted", this._stopInterval), this.removeListener("ended", this._stopInterval), e && this.emit("error", e));
      }
    }, {
      key: "_queueCommand",
      value: function _queueCommand(e) {
        for (var _len2 = arguments.length, t = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          t[_key2 - 1] = arguments[_key2];
        }
        this.destroyed || this._queue.push([e, t]);
      }
    }, {
      key: "_flushQueue",
      value: function _flushQueue() {
        for (; this._queue.length;) {
          var e = this._queue.shift();
          if (!e) return;
          this[e[0]].apply(this, e[1]);
        }
      }
    }, {
      key: "_onReady",
      value: function _onReady() {
        this.destroyed || (this.emit("ready"), this._ready = !0, this.load(this.videoId, this._autoplay, this._start), this._flushQueue());
      }
    }, {
      key: "_onStateChange",
      value: function _onStateChange(e) {
        if (this.destroyed) return;
        var t = _chunkREK3HHK.b[e.data].toLowerCase();
        if (this._debug("STATE CHANGED:", t), t) ["paused", "buffering", "ended"].includes(t) && this._onTimeUpdate(), this.emit(t), this.emit("stateChange", t), ["unstarted", "playing", "cued"].includes(t) && this._onTimeUpdate();else throw new Error("Unrecognized state change event".concat(": ", e));
      }
    }, {
      key: "_onPlaybackQualityChange",
      value: function _onPlaybackQualityChange(e) {
        this.destroyed || this.emit("playbackQualityChange", e.data);
      }
    }, {
      key: "_onPlaybackRateChange",
      value: function _onPlaybackRateChange(e) {
        this.destroyed || this.emit("playbackRateChange", e.data);
      }
    }, {
      key: "_onError",
      value: function _onError(e) {
        if (this.destroyed) return;
        var t = e.data;
        if (t === 5 && console.error("The request content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred."), t === 101 || t === 150 || t === 100 || t === 2) return this.emit("unplayable", this.videoId);
        this._destroy(new Error("Unknown error code".concat(": ", t)));
      }
    }, {
      key: "_onTimeUpdate",
      value: function _onTimeUpdate() {
        this.destroyed || this.emit("timeupdate", this.getCurrentTime());
      }
    }, {
      key: "_startInterval",
      value: function _startInterval() {
        var _this3 = this;
        this._interval = setInterval(function () {
          return _this3._onTimeUpdate();
        }, this._options.timeUpdateFrequency);
      }
    }, {
      key: "_stopInterval",
      value: function _stopInterval() {
        this._interval && (clearInterval(this._interval), this._interval = void 0);
      }
    }]);
    return o;
  }(_eventemitter.EventEmitter);
},{"./chunk-REK3HHK7.js":"YPq9","./chunk-YB27CSNR.js":"PezD","eventemitter3":"LqgX"}],"qbJK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getID = getID;
exports.playID = playID;
var _youtubePlayerPlus = _interopRequireDefault(require("youtube-player-plus"));
var _musicFetch = require("./musicFetch.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var youtubesearchapi = require("youtube-search-api");
var PlayPause = document.querySelector(".PlayPause");
var CurrentTime = document.querySelector(".current-time");
var TotalTime = document.querySelector(".total-time");
var playerSlider = document.querySelector(".player-slider");
var volumeSlider = document.querySelector(".volume-slider");
var volumeIcon = document.querySelector(".volume-icon-wrapper");
var player = new _youtubePlayerPlus.default('#player', {
  width: 1,
  height: 1,
  autoplay: true
});
function playButton() {
  player.getState() == "PLAYING" ? player.pause() : player.play();
}
function muteAudio() {
  if (volumeSlider.value == 0) {
    volumeSlider.value = 50;
    changeVolume();
  } else {
    volumeSlider.value = 0;
    changeVolume();
  }
}
function changeVolume() {
  volumeSlider.value == 0 ? volumeIcon.innerHTML = '<ion-icon name="volume-mute" class="player-icon volume-icon"></ion-icon>' : volumeIcon.innerHTML = '<ion-icon name="volume-medium" class="player-icon volume-icon"></ion-icon>';
  player.setVolume(volumeSlider.value);
}
volumeSlider.addEventListener('input', changeVolume);
volumeIcon.addEventListener('click', muteAudio);
PlayPause.addEventListener('click', playButton);
player.on('stateChange', function () {
  var state = player.getState();
  if (state == "PLAYING") {
    PlayPause.innerHTML = "<ion-icon name=\"pause\" class=\"player-play-icon\"></ion-icon>";
    updateTimeStamps();
    playerSlider.max = player.getDuration();
    playerSlider.value = player.getCurrentTime();
    startTimeStampUpdate();
    setTimeout(function () {
      (0, _musicFetch.updateLyricsReadout)(_musicFetch.lyricsObject, player.getCurrentTime());
    }, 1000);
  }
  if (state == "PAUSED") {
    console.log('dasdas');
    PlayPause.innerHTML = "<ion-icon name=\"play\" class=\"player-play-icon\"></ion-icon>";
    updateTimeStamps();
    stopTimeStampUpdate();
    clearInterval(_musicFetch.lyricsInterval);
  }
  if (state == "BUFFERING") {
    PlayPause.innerHTML = "<ion-icon name=\"hourglass\" class=\"player-play-icon\"></ion-icon>";
    clearInterval(_musicFetch.lyricsInterval);
  }
  if (state == "ENDED") {
    (0, _musicFetch.nextTrack)();
    document.title = "Benjo";
    PlayPause.innerHTML = "<ion-icon name=\"play\" class=\"player-play-icon\"></ion-icon>";
    console.log('ended');
    clearInterval(_musicFetch.lyricsInterval);
  }
});
function secToStamp(sec) {
  var date = new Date(null);
  date.setSeconds(sec);
  return date.toISOString().substr(14, 5);
}
function updateTimeStamps() {
  CurrentTime.innerText = secToStamp(playerSlider.value);
  TotalTime.innerText = secToStamp(playerSlider.max);
}
var stampTimeout;
function startTimeStampUpdate() {
  stampTimeout = setInterval(function () {
    playerSlider.value = player.getCurrentTime();
    updateTimeStamps();
  }, 1000);
}
function stopTimeStampUpdate() {
  clearInterval(stampTimeout);
}
playerSlider.addEventListener('mousedown', function () {
  return player.pause();
});
playerSlider.addEventListener('input', function (e) {
  return player.seek(e.target.value);
});
playerSlider.addEventListener('mouseup', function (e) {
  return player.play();
});
function playID(_x) {
  return _playID.apply(this, arguments);
}
function _playID() {
  _playID = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
    var id;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return getID(e + " official audio");
        case 3:
          id = _context.sent;
          // console.log(e + " audio");
          console.log(id);
          player.load(id, true);
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          offline();
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _playID.apply(this, arguments);
}
function getID(_x2) {
  return _getID.apply(this, arguments);
}
function _getID() {
  _getID = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(track) {
    var video;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return youtubesearchapi.GetListByKeyword(track, false, 1);
        case 2:
          video = _context2.sent;
          return _context2.abrupt("return", video.items[0].id);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getID.apply(this, arguments);
}
var playerUI = document.querySelector('.player-ui');
var playerSel = document.querySelector('.player');
var playerTrackInfo = document.querySelector('.player-track-info');
var playerImage = document.querySelector('.player-image');
var playerTrackTitle = document.querySelector('.player-track-title');
var playerControls = document.querySelector('.controls');
var playerSeeker = document.querySelector('.player-seeker');
var expandIcon = document.querySelector('.size-button');
var volumeContainer = document.querySelector('.volume');
var renderArea = document.querySelector('.render-area');
var playerExpanded = true;
var changePlayerSize = function changePlayerSize() {
  console.log(playerExpanded);
  // playerSel.classList.toggle('expanded')
  // playerTrackInfo.classList.toggle('expanded')
  // playerImage.classList.toggle('expanded')
  // playerTrackTitle.classList.toggle('expanded')
  // playerControls.classList.toggle('expanded')
  if (playerExpanded) {
    minimizePlayer();
    playerExpanded = false;
  } else {
    expandPlayer();
    playerExpanded = true;
  }
};
var expandPlayer = function expandPlayer() {
  playerSel.classList.add('expanded');
  playerTrackInfo.classList.add('expanded');
  playerImage.classList.add('expanded');
  playerTrackTitle.classList.add('expanded');
  playerControls.classList.add('expanded');
  playerSeeker.classList.add('expanded');
  playerSlider.classList.add('expanded');
  volumeContainer.classList.add('expanded');
  playerUI.classList.add('expanded');
  renderArea.style.paddingBottom = '0';
  expandIcon.style.rotate = '0deg';
  playerUI.style.width = '40rem';
  playerUI.style.height = '60rem';
};
var minimizePlayer = function minimizePlayer() {
  playerSel.classList.remove('expanded');
  playerTrackInfo.classList.remove('expanded');
  playerImage.classList.remove('expanded');
  playerTrackTitle.classList.remove('expanded');
  playerControls.classList.remove('expanded');
  playerSeeker.classList.remove('expanded');
  playerSlider.classList.remove('expanded');
  volumeContainer.classList.remove('expanded');
  playerUI.classList.remove('expanded');
  renderArea.style.paddingBottom = '11rem';
  expandIcon.style.rotate = '180deg';
  playerUI.style.width = '100%';
  playerUI.style.height = '12rem';
};
expandIcon.addEventListener('click', changePlayerSize);
},{"youtube-search-api":"MVO0","youtube-player-plus":"Tf56","./musicFetch.js":"fxcF"}],"MF2j":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showSearchAllPage = exports.showLikedTracksPage = exports.showLikedAlbumsPage = exports.showDiscoverPage = exports.showArtistPage = exports.showAlbumPage = exports.renderErrorPopup = exports.currentPage = void 0;
var _musicFetch = require("./musicFetch.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// PAGES

var currentPage = exports.currentPage = "";
var discoverPage = document.querySelector('.discover-page');
var artistPage = document.querySelector('.artist-page');
var albumPage = document.querySelector('.album-page');
var SearchAllPage = document.querySelector('.searchAll-page');
var likedAlbumsPage = document.querySelector('.liked-albums-page');
var likedTracksPage = document.querySelector('.liked-tracks-page');
var recentlyPlayedPage = document.querySelector('.recently-played-page');
var lyricsPage = document.querySelector('.lyrics-page');
var settingsPage = document.querySelector('.settings-page');
var discoverNav = document.querySelector('.discover');
var searchNav = document.querySelector('.search');
var albumsNav = document.querySelector('.albums');
var artistsNav = document.querySelector('.artists');
var likedalbumsNav = document.querySelector('.liked-albums');
var likedtracksNav = document.querySelector('.liked-tracks');
var recentlyplayedNav = document.querySelector('.recently-played');
var settingsNav = document.querySelector('.settings-nav');
var lyricsNav = document.querySelector('.lyrics-nav');
var lyricsToggle = document.querySelector('.lyrics-toggler');
var settings = document.querySelector('.settings');
var navs = ['lyrics-nav', 'settings-nav', 'discover', 'search', 'albums', 'artists', 'liked-albums', 'liked-tracks', 'recently-played'];
var showArtistPage = exports.showArtistPage = function showArtistPage() {
  if (window.innerWidth <= 900) closeNav();
  navs.forEach(function (el) {
    return document.querySelector(".".concat(el)).classList.remove('active');
  });
  artistsNav.classList.add('active');
  if (discoverPage) discoverPage.style.display = 'none';
  if (albumPage) albumPage.style.display = 'none';
  if (SearchAllPage) SearchAllPage.style.display = 'none';
  if (lyricsPage) lyricsPage.style.display = 'none';
  if (likedAlbumsPage) likedAlbumsPage.style.display = 'none';
  if (recentlyPlayedPage) recentlyPlayedPage.style.display = 'none';
  if (likedTracksPage) likedTracksPage.style.display = 'none';
  artistPage.style.display = 'block';
  exports.currentPage = currentPage = "artistpage";
  var tracks = document.querySelectorAll('.top-track');
  _toConsumableArray(tracks).forEach(function (track) {
    if (track.dataset.id == document.querySelector('.player-title').dataset.trackid) {
      (0, _musicFetch.highlightTrack)(document.querySelector("[data-toptrackid=\"".concat(track.dataset.id, "\"]")));
    }
  });
};
artistsNav.addEventListener('click', showArtistPage);
var showAlbumPage = exports.showAlbumPage = function showAlbumPage() {
  if (window.innerWidth <= 900) closeNav();
  navs.forEach(function (el) {
    return document.querySelector(".".concat(el)).classList.remove('active');
  });
  albumsNav.classList.add('active');
  if (discoverPage) discoverPage.style.display = 'none';
  if (artistPage) artistPage.style.display = 'none';
  if (SearchAllPage) SearchAllPage.style.display = 'none';
  if (lyricsPage) lyricsPage.style.display = 'none';
  if (settingsPage) settingsPage.style.display = 'none';
  if (likedAlbumsPage) likedAlbumsPage.style.display = 'none';
  if (recentlyPlayedPage) recentlyPlayedPage.style.display = 'none';
  if (likedTracksPage) likedTracksPage.style.display = 'none';
  albumPage.style.display = 'block';
  var tracks = document.querySelectorAll('.album-track');
  _toConsumableArray(tracks).forEach(function (track) {
    if (track.dataset.id == document.querySelector('.player-title').dataset.trackid) {
      (0, _musicFetch.highlightTrack)(document.querySelector("[data-id=\"".concat(track.dataset.id, "\"]")));
    }
  });
  exports.currentPage = currentPage = "albumpage";
};
albumsNav.addEventListener('click', showAlbumPage);
var showDiscoverPage = exports.showDiscoverPage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var likedAlbumsPrompt, i, html;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (window.innerWidth <= 900) closeNav();

          // console.log(savedAlbums);
          if (!(currentPage == "discoverpage")) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return");
        case 3:
          exports.currentPage = currentPage = "discoverpage";
          discoverPage.innerHTML = "\n    <p class=\"mobile-note\">On mobile/tablet devices you need to request the desktop site, otherwise music won't play.</p>\n    <h2 class=\"section-title\">New releases</h2>\n    <div style=\"height:auto;\" class=\"new-releases-container row-container\">\n    </div>\n\n\n    <h2 class=\"section-title\">Liked albums</h2>\n    <div class=\"liked-albums-container-discover row-container\">\n        <p class=\"discover-prompt liked-albums-prompt\">You haven't liked any albums yet.</p>\n    </div>\n    ";
          likedAlbumsPrompt = document.querySelector('.liked-albums-prompt');
          if (_musicFetch.savedAlbums.length > 0) {
            likedAlbumsPrompt.style.display = 'none';
            for (i = 0; i < _musicFetch.savedAlbums.length; i++) {
              html = "\n            <div class=\"item-card\">\n            <img class=\"item-image-placeholder\">\n            <div class=\"item-desc-placeholder\">\n                <div class=\"item-title-placeholder\"></div>\n                <p class=\"item-artist-placeholder\"></p>\n                <div class=\"item-info\">\n                    <div class=\"item-type-placeholder\"></div>\n                    <div class=\"item-trackcount-placeholder\"></div>\n                </div>\n            </div>\n            </div>\n            ";
              document.querySelector('.liked-albums-container-discover').insertAdjacentHTML('beforeend', html);
            }
          }
          navs.forEach(function (el) {
            return document.querySelector(".".concat(el)).classList.remove('active');
          });
          discoverNav.classList.add('active');
          if (artistPage) artistPage.style.display = 'none';
          if (albumPage) albumPage.style.display = 'none';
          if (SearchAllPage) SearchAllPage.style.display = 'none';
          if (lyricsPage) lyricsPage.style.display = 'none';
          if (settingsPage) settingsPage.style.display = 'none';
          if (likedAlbumsPage) likedAlbumsPage.style.display = 'none';
          if (recentlyPlayedPage) recentlyPlayedPage.style.display = 'none';
          if (likedTracksPage) likedTracksPage.style.display = 'none';
          discoverPage.style.display = 'block';
          _context.next = 20;
          return (0, _musicFetch.getNewReleases)();
        case 20:
          _context.next = 22;
          return (0, _musicFetch.getLikedAlbums)();
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function showDiscoverPage() {
    return _ref.apply(this, arguments);
  };
}();
discoverNav.addEventListener('click', showDiscoverPage);
var showSearchAllPage = exports.showSearchAllPage = function showSearchAllPage() {
  if (window.innerWidth <= 900) closeNav();
  navs.forEach(function (el) {
    return document.querySelector(".".concat(el)).classList.remove('active');
  });
  searchNav.classList.add('active');
  if (artistPage) artistPage.style.display = 'none';
  if (albumPage) albumPage.style.display = 'none';
  if (discoverPage) discoverPage.style.display = 'none';
  if (lyricsPage) lyricsPage.style.display = 'none';
  if (settingsPage) settingsPage.style.display = 'none';
  if (likedAlbumsPage) likedAlbumsPage.style.display = 'none';
  if (recentlyPlayedPage) recentlyPlayedPage.style.display = 'none';
  if (likedTracksPage) likedTracksPage.style.display = 'none';
  SearchAllPage.style.display = 'block';
  exports.currentPage = currentPage = "searchallpage";
};
searchNav.addEventListener('click', showSearchAllPage);
var showLikedAlbumsPage = exports.showLikedAlbumsPage = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var i, html;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (window.innerWidth <= 900) closeNav();
          if (!(currentPage == "likedalbumspage")) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return");
        case 3:
          likedAlbumsPage.innerHTML = "\n    <h2 class=\"section-title\">Liked albums</h2>\n    <p class=\"discover-prompt liked-tracks-prompt\">You haven't liked any albums yet.</p>\n    <div style=\"height: auto;\" class=\"liked-albums-container row-container\">\n    ";
          if (_musicFetch.savedAlbums.length > 0) {
            likedAlbumsPage.innerHTML = "\n        <h2 class=\"section-title\">Liked albums</h2>\n        <div style=\"height: auto;\" class=\"liked-albums-container row-container\">\n        ";
            for (i = 0; i < _musicFetch.savedAlbums.length; i++) {
              html = "\n            <div class=\"item-card\">\n            <img class=\"item-image-placeholder\">\n            <div class=\"item-desc-placeholder\">\n                <div class=\"item-title-placeholder\"></div>\n                <p class=\"item-artist-placeholder\"></p>\n                <div class=\"item-info\">\n                    <div class=\"item-type-placeholder\"></div>\n                    <div class=\"item-trackcount-placeholder\"></div>\n                </div>\n            </div>\n            </div>\n            ";
              document.querySelector('.liked-albums-container').insertAdjacentHTML('beforeend', html);
            }
          }
          navs.forEach(function (el) {
            return document.querySelector(".".concat(el)).classList.remove('active');
          });
          likedalbumsNav.classList.add('active');
          if (artistPage) artistPage.style.display = 'none';
          if (albumPage) albumPage.style.display = 'none';
          if (discoverPage) discoverPage.style.display = 'none';
          if (lyricsPage) lyricsPage.style.display = 'none';
          if (settingsPage) settingsPage.style.display = 'none';
          if (SearchAllPage) SearchAllPage.style.display = 'none';
          if (recentlyPlayedPage) recentlyPlayedPage.style.display = 'none';
          if (likedTracksPage) likedTracksPage.style.display = 'none';
          (0, _musicFetch.getLikedAlbums)();
          likedAlbumsPage.style.display = 'block';
          exports.currentPage = currentPage = "likedalbumspage";
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function showLikedAlbumsPage() {
    return _ref2.apply(this, arguments);
  };
}();
likedalbumsNav.addEventListener('click', showLikedAlbumsPage);
var showLikedTracksPage = exports.showLikedTracksPage = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var i, html, tracks;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (window.innerWidth <= 900) closeNav();
          if (!(currentPage == "likedtrackspage")) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return");
        case 3:
          likedTracksPage.innerHTML = "\n    <h2 class=\"section-title\">Liked tracks</h2>\n    <p class=\"discover-prompt liked-tracks-prompt\">You haven't liked any tracks yet.</p>\n    <div style=\"height: auto;\" class=\"liked-tracks-container album-track-list\">\n    ";
          if (_musicFetch.savedTracks.length > 0) {
            likedTracksPage.innerHTML = "\n        <h2 class=\"section-title\">Liked tracks</h2>\n        <div style=\"height: auto;\" class=\"liked-tracks-container album-track-list\">\n        ";
            for (i = 0; i < _musicFetch.savedTracks.length; i++) {
              html = "\n            <div class=\"album-track\">\n            <div class=\"album-track-no top-track-no-placeholder\"></div>\n            <div style=\"display: flex; flex-direction: column; gap: .5rem;\">\n                <div class=\"album-track-title-placeholder\"></div>\n                <div class=\"album-artist-placeholder\"></div>\n            </div>\n            <div class=\"album-track-duration top-track-duration-placeholder\"></div>\n            </div>\n            ";
              document.querySelector('.liked-tracks-container').insertAdjacentHTML('beforeend', html);
            }
          }
          navs.forEach(function (el) {
            return document.querySelector(".".concat(el)).classList.remove('active');
          });
          likedtracksNav.classList.add('active');
          if (artistPage) artistPage.style.display = 'none';
          if (albumPage) albumPage.style.display = 'none';
          if (discoverPage) discoverPage.style.display = 'none';
          if (lyricsPage) lyricsPage.style.display = 'none';
          if (settingsPage) settingsPage.style.display = 'none';
          if (SearchAllPage) SearchAllPage.style.display = 'none';
          if (recentlyPlayedPage) recentlyPlayedPage.style.display = 'none';
          if (likedAlbumsPage) likedAlbumsPage.style.display = 'none';
          likedTracksPage.style.display = 'block';
          _context3.next = 18;
          return (0, _musicFetch.getLikedTracks)();
        case 18:
          tracks = document.querySelectorAll('.liked-track');
          _toConsumableArray(tracks).forEach(function (track) {
            if (track.dataset.id == document.querySelector('.player-title').dataset.trackid) {
              var index = _toConsumableArray(tracks).findIndex(function (track) {
                return track.dataset.id === document.querySelector('.player-title').dataset.trackid;
              }) + 1;
              (0, _musicFetch.highlightTrack)(document.querySelector("[data-likedtrackno=\"".concat(index, "\"]")));
            }
          });
          exports.currentPage = currentPage = "likedtrackspage";
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function showLikedTracksPage() {
    return _ref3.apply(this, arguments);
  };
}();
likedtracksNav.addEventListener('click', showLikedTracksPage);
var showRecentlyPlayedPage = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var i, html, tracks;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (window.innerWidth <= 900) closeNav();
          if (!(currentPage == "recentlyplayedpage")) {
            _context4.next = 3;
            break;
          }
          return _context4.abrupt("return");
        case 3:
          recentlyPlayedPage.innerHTML = "\n    <h2 class=\"section-title\">Recently Played</h2>\n    <p class=\"discover-prompt liked-tracks-prompt\">You haven't played any tracks yet.</p>\n    <div style=\"height: auto;\" class=\"recently-played-container asdada album-track-list\">\n    ";
          if (_musicFetch.recentlyPlayed.buffer.length > 0) {
            recentlyPlayedPage.innerHTML = "\n        <h2 class=\"section-title\">Recently Played</h2>\n        <div style=\"height: auto;\" class=\"recently-played-container asdada album-track-list\">\n        ";
            for (i = 0; i < _musicFetch.recentlyPlayed.buffer.length; i++) {
              html = "\n            <div class=\"album-track\">\n            <div class=\"album-track-no top-track-no-placeholder\"></div>\n            <div style=\"display: flex; flex-direction: column; gap: .5rem;\">\n                <div class=\"album-track-title-placeholder\"></div>\n                <div class=\"album-artist-placeholder\"></div>\n            </div>\n            <div class=\"album-track-duration top-track-duration-placeholder\"></div>\n            </div>\n            ";
              document.querySelector('.recently-played-container').insertAdjacentHTML('afterbegin', html);
            }
          }
          navs.forEach(function (el) {
            return document.querySelector(".".concat(el)).classList.remove('active');
          });
          recentlyplayedNav.classList.add('active');
          if (artistPage) artistPage.style.display = 'none';
          if (albumPage) albumPage.style.display = 'none';
          if (discoverPage) discoverPage.style.display = 'none';
          if (lyricsPage) lyricsPage.style.display = 'none';
          if (settingsPage) settingsPage.style.display = 'none';
          if (SearchAllPage) SearchAllPage.style.display = 'none';
          if (likedAlbumsPage) likedAlbumsPage.style.display = 'none';
          if (likedTracksPage) likedTracksPage.style.display = 'none';
          recentlyPlayedPage.style.display = 'block';
          _context4.next = 18;
          return (0, _musicFetch.getRecentlyPlayed)();
        case 18:
          tracks = document.querySelectorAll('.recently-played-track');
          _toConsumableArray(tracks).forEach(function (track) {
            if (track.dataset.id == document.querySelector('.player-title').dataset.trackid) {
              var index = _toConsumableArray(tracks).findIndex(function (track) {
                return track.dataset.id === document.querySelector('.player-title').dataset.trackid;
              }) + 1;
              // console.log(index);
              // console.log(document.querySelector(`[data-recentlyplayedno="${index}"]`));
              document.querySelectorAll("[data-recentlyplayedno=\"".concat(index, "\"]")).forEach(function (track) {
                return (0, _musicFetch.highlightTrack)(track);
              });
            }
          });
          exports.currentPage = currentPage = "recentlyplayedpage";
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function showRecentlyPlayedPage() {
    return _ref4.apply(this, arguments);
  };
}();
recentlyplayedNav.addEventListener('click', showRecentlyPlayedPage);
var showLyricsPage = function showLyricsPage() {
  if (window.innerWidth <= 900) closeNav();
  navs.forEach(function (el) {
    return document.querySelector(".".concat(el)).classList.remove('active');
  });
  lyricsNav.classList.add('active');
  if (artistPage) artistPage.style.display = 'none';
  if (albumPage) albumPage.style.display = 'none';
  if (discoverPage) discoverPage.style.display = 'none';
  if (SearchAllPage) SearchAllPage.style.display = 'none';
  if (settingsPage) settingsPage.style.display = 'none';
  if (likedAlbumsPage) likedAlbumsPage.style.display = 'none';
  if (recentlyPlayedPage) recentlyPlayedPage.style.display = 'none';
  if (likedTracksPage) likedTracksPage.style.display = 'none';
  lyricsPage.style.display = 'block';
  exports.currentPage = currentPage = "lyricspage";
};
lyricsToggle.addEventListener('click', showLyricsPage);
lyricsNav.addEventListener('click', showLyricsPage);
var showSettingsPage = function showSettingsPage() {
  if (window.innerWidth <= 900) closeNav();
  navs.forEach(function (el) {
    return document.querySelector(".".concat(el)).classList.remove('active');
  });
  settingsNav.classList.add('active');
  if (artistPage) artistPage.style.display = 'none';
  if (albumPage) albumPage.style.display = 'none';
  if (discoverPage) discoverPage.style.display = 'none';
  if (SearchAllPage) SearchAllPage.style.display = 'none';
  if (lyricsPage) lyricsPage.style.display = 'none';
  if (likedAlbumsPage) likedAlbumsPage.style.display = 'none';
  if (recentlyPlayedPage) recentlyPlayedPage.style.display = 'none';
  if (likedTracksPage) likedTracksPage.style.display = 'none';
  settingsPage.style.display = 'block';
  exports.currentPage = currentPage = "settingspage";
};
settings.addEventListener('click', showSettingsPage);
settingsNav.addEventListener('click', showSettingsPage);

// search tabs

var searchTypes = document.querySelector('.search-types');
var tabIndicators = document.querySelectorAll('.searchtype-tab');
var allIndicator = document.querySelector('[data-tab="all"]');
var albumsIndicator = document.querySelector('[data-tab="albums"]');
var tracksIndicator = document.querySelector('[data-tab="tracks"]');
var artistsIndicator = document.querySelector('[data-tab="artists"]');
var searchAll = document.querySelector('.search-all-tab');
var searchAlbums = document.querySelector('.search-albums-tab');
var searchTracks = document.querySelector('.search-tracks-tab');
var searchArtists = document.querySelector('.search-artists-tab');
searchTypes.addEventListener('click', function (e) {
  var clickedTab = e.target.closest('.searchtype-tab');
  if (!clickedTab) return;
  console.log(searchAll);
  switch (clickedTab.dataset.tab) {
    case "albums":
      if (searchAll) searchAll.style.display = 'none';
      if (searchTracks) searchTracks.style.display = 'none';
      if (searchArtists) searchArtists.style.display = 'none';
      searchAlbums.style.display = 'block';
      tabIndicators.forEach(function (tab) {
        return tab.classList.remove('searchtype-selected');
      });
      albumsIndicator.classList.add('searchtype-selected');
      break;
    case "tracks":
      if (searchAll) searchAll.style.display = 'none';
      if (searchAlbums) searchAlbums.style.display = 'none';
      if (searchArtists) searchArtists.style.display = 'none';
      searchTracks.style.display = 'block';
      tabIndicators.forEach(function (tab) {
        return tab.classList.remove('searchtype-selected');
      });
      tracksIndicator.classList.add('searchtype-selected');
      break;
    case "artists":
      if (searchAll) searchAll.style.display = 'none';
      if (searchTracks) searchTracks.style.display = 'none';
      if (searchAlbums) searchAlbums.style.display = 'none';
      searchArtists.style.display = 'block';
      tabIndicators.forEach(function (tab) {
        return tab.classList.remove('searchtype-selected');
      });
      artistsIndicator.classList.add('searchtype-selected');
      break;
    case "all":
      if (searchArtists) searchArtists.style.display = 'none';
      if (searchTracks) searchTracks.style.display = 'none';
      if (searchAlbums) searchAlbums.style.display = 'none';
      searchAll.style.display = 'block';
      tabIndicators.forEach(function (tab) {
        return tab.classList.remove('searchtype-selected');
      });
      allIndicator.classList.add('searchtype-selected');
      break;
    default:
      break;
  }
});

// color picker

var rootColors = document.querySelector(":root");
var themePicker = document.querySelector('.theme-picker-select');
var changeColor = function changeColor(main, mainSub, secondary, secondarySub) {
  rootColors.style.setProperty('--main', "#".concat(main));
  rootColors.style.setProperty('--main-sub', "#".concat(mainSub));
  rootColors.style.setProperty('--secondary', "#".concat(secondary));
  rootColors.style.setProperty('--secondary-sub', "#".concat(secondarySub));
};
themePicker.addEventListener('change', function (e) {
  switch (e.target.value) {
    case "Black":
      changeColor('ececec', 'b9b9b9', '474747', '101010');
      break;
    case "Red":
      changeColor('edd4d4', 'd6c2c2', 'b06868', '7f3939');
      break;
    case "Purple":
      changeColor('e3d4ed', 'cfc2d6', '9e68b0', '6c397f');
      break;
    case "Pink":
      changeColor('edd4e3', 'd6c2ce', 'b0688a', '7f3962');
      break;
    case "Blue":
      changeColor('e0e8ee', 'c2d4d6', '689db0', '39697f');
      break;
    case "Brown":
      changeColor('ede0d4', 'd6ccc2', 'b08968', '7f5539');
      break;
    case "Green":
      changeColor('d4edd7', 'c2d6c6', '68b078', '397f52');
    default:
      break;
  }
  localStorage.setItem('color', e.target.value);
});
var colorInit = function colorInit() {
  switch (localStorage.getItem('color')) {
    case "Black":
      changeColor('ececec', 'b9b9b9', '474747', '101010');
      break;
    case "Red":
      changeColor('edd4d4', 'd6c2c2', 'b06868', '7f3939');
      break;
    case "Purple":
      changeColor('e3d4ed', 'cfc2d6', '9e68b0', '6c397f');
      break;
    case "Pink":
      changeColor('edd4e3', 'd6c2ce', 'b0688a', '7f3962');
      break;
    case "Blue":
      changeColor('e0e8ee', 'c2d4d6', '689db0', '39697f');
      break;
    case "Brown":
      changeColor('ede0d4', 'd6ccc2', 'b08968', '7f5539');
      break;
    case "Green":
      changeColor('d4edd7', 'c2d6c6', '68b078', '397f52');
    default:
      break;
  }
};
colorInit();

// mobile nav

var navOpener = document.querySelector('.nav-opener');
var navBar = document.querySelector('.nav-bar');
var navOverlay = document.querySelector('.nav-overlay');
var mobileSearchbar = document.querySelector('.mobile-searchbar');
var navOpened = false;
var openNav = function openNav() {
  navBar.style.left = 0;
  navOverlay.style.opacity = 1;
  navOverlay.style.pointerEvents = 'auto';
  mobileSearchbar.style.opacity = 0;
  navOpener.setAttribute('name', 'close');
  navOpened = true;
};
var closeNav = function closeNav() {
  navBar.style.left = "-100%";
  navOverlay.style.opacity = 0;
  navOverlay.style.pointerEvents = 'none';
  mobileSearchbar.style.opacity = 1;
  navOpener.setAttribute('name', 'menu');
  navOpened = false;
};
navOverlay.addEventListener('click', closeNav);
navOpener.addEventListener('click', function () {
  navOpened ? closeNav() : openNav();
});

// error popup renderer

var errorPopupContainer = document.querySelector('.error-popups');
var renderErrorPopup = exports.renderErrorPopup = function renderErrorPopup(err) {
  var html = "\n    <div class=\"error-popup\">\n    <div class=\"error-alert\">\n        <p class=\"error-alert-text\">".concat(err, "</p>\n    </div>\n    <div class=\"error-timer\"></div>    \n    </div>\n    ");
  errorPopupContainer.insertAdjacentHTML('beforeend', html);
  var errorPopup = errorPopupContainer.lastElementChild;
  setTimeout(function () {
    if (errorPopup && errorPopup.parentElement) {
      errorPopup.remove();
    }
  }, 5000);
};
setTimeout(function () {
  showDiscoverPage();
}, 150);
},{"./musicFetch.js":"fxcF"}],"fxcF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLyricsReadout = exports.storageSave = exports.savedTracks = exports.savedAlbums = exports.recentlyPlayed = exports.previousTrack = exports.nextTrack = exports.lyricsObject = exports.lyricsInterval = exports.highlightTrack = exports.getRecentlyPlayed = exports.getNewReleases = exports.getLikedTracks = exports.getLikedAlbums = void 0;
var _player = require("./player.js");
var _pageResets = require("./pageResets.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var playerUI = document.querySelector('.player-ui');
function CircularBuffer(maxSize) {
  this.maxSize = maxSize;
  this.buffer = [];
}
CircularBuffer.prototype.push = function (item) {
  if (this.buffer.includes(item)) return;
  this.buffer.unshift(item);
  if (this.buffer.length > this.maxSize) {
    this.buffer.pop();
  }
};

// local storage

document.querySelector('.reset-settings').addEventListener('click', function () {
  exports.savedAlbums = savedAlbums = [];
  exports.savedTracks = savedTracks = [];
  localStorage.clear();
  location.reload();
});
var storageSave = exports.storageSave = window.addEventListener('beforeunload', function () {
  localStorage.setItem('savedAlbums', JSON.stringify(savedAlbums));
  localStorage.setItem('savedTracks', JSON.stringify(savedTracks));
});
var savedAlbums = exports.savedAlbums = [];
var savedTracks = exports.savedTracks = [];
var recentlyPlayed = exports.recentlyPlayed = new CircularBuffer(25);
var retrievedSavedAlbums = JSON.parse(localStorage.getItem('savedAlbums')) || [];
var retrievedSavedTracks = JSON.parse(localStorage.getItem('savedTracks')) || [];
exports.savedAlbums = savedAlbums = retrievedSavedAlbums;
exports.savedTracks = savedTracks = retrievedSavedTracks;

// fetching

var getToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var res, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: new URLSearchParams({
              'grant_type': 'client_credentials',
              'client_id': '6dbd832bba9648c8b27858be075c90a4',
              'client_secret': '71bebeb3e82a4988b7a0f83ebef59e1b'
            })
          });
        case 2:
          res = _context.sent;
          _context.next = 5;
          return res.json();
        case 5:
          data = _context.sent;
          return _context.abrupt("return", data.access_token);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getToken() {
    return _ref.apply(this, arguments);
  };
}();
var getNewReleases = exports.getNewReleases = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var newReleaseseContainer, placeholder, i, accessToken, res, data, _i, html;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          newReleaseseContainer = document.querySelector('.new-releases-container');
          placeholder = "\n        <div class=\"item-card\">\n        <img class=\"item-image-placeholder\">\n        <div class=\"item-desc-placeholder\">\n            <div class=\"item-title-placeholder\"></div>\n            <p class=\"item-artist-placeholder\"></p>\n            <div class=\"item-info\">\n                <div class=\"item-type-placeholder\"></div>\n                <div class=\"item-trackcount-placeholder\"></div>\n            </div>\n        </div>\n    </div>";
          for (i = 0; i < 10; i++) {
            newReleaseseContainer.insertAdjacentHTML('beforeend', placeholder);
          }
          _context2.prev = 3;
          _context2.next = 6;
          return getToken();
        case 6:
          accessToken = _context2.sent;
          _context2.next = 9;
          return fetch('https://api.spotify.com/v1/browse/new-releases', {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 9:
          res = _context2.sent;
          if (res.ok) {
            _context2.next = 12;
            break;
          }
          throw new Error('Something went wrong with getting the new releases.Try again');
        case 12:
          _context2.next = 14;
          return res.json();
        case 14:
          data = _context2.sent;
          newReleaseseContainer.innerHTML = "";
          for (_i = 0; _i < 10; _i++) {
            html = "\n                <div class=\"item-card new-release-card\" data-id=\"".concat(data.albums.items[_i].id, "\">\n                    <img class=\"item-image\" src=\"").concat(data.albums.items[_i].images[1].url, "\" alt=\"\" srcset=\"\">\n                    <div class=\"item-desc\">\n                        <p class=\"item-title\">").concat(data.albums.items[_i].name.length > 13 ? data.albums.items[_i].name.substring(0, 13) + "..." : data.albums.items[_i].name, "</p>\n                        <p class=\"item-title item-title-full\">").concat(data.albums.items[_i].name, "</p>\n                        <p class=\"item-artist\">").concat(data.albums.items[_i].artists[0].name, "</p>\n                        <div class=\"item-info\">\n                            <div class=\"item-type\">").concat(data.albums.items[_i].album_type, "</div>\n                            <div class=\"item-trackcount\">").concat(data.albums.items[_i].total_tracks + " tracks", "</div>\n                        </div>\n                    </div>\n                </div>\n            ");
            newReleaseseContainer.insertAdjacentHTML('beforeend', html);
          }
          document.querySelectorAll('.new-release-card').forEach(function (card) {
            return card.addEventListener('click', function (e) {
              renderAlbumPage(e.target.closest('.new-release-card').dataset.id);
            });
          });
          _context2.next = 23;
          break;
        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](3);
          (0, _pageResets.renderErrorPopup)(_context2.t0);
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 20]]);
  }));
  return function getNewReleases() {
    return _ref2.apply(this, arguments);
  };
}();
getNewReleases();
var artistPage = document.querySelector('.artist-page');
var artistContainer = document.querySelector('.artist-container');
var artistPrompt = document.querySelector('.artist-prompt');
var renderArtistPage = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(artistID) {
    var accessToken;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          // document.querySelector('.artist-page').innerHTML = ""
          // albumPage.innerHTML = `
          // <div class="album-header">
          // </div>
          // <div class="album-tracks">
          //     <h2 class="section-title">Tracklist</h2>
          //     <div class="album-tracks-list">
          //     </div>
          // </div>
          // `
          artistContainer.style.display = "block";
          artistPrompt.style.display = 'none';
          (0, _pageResets.showArtistPage)();
          renderArtistPagePlaceHolder();
          _context3.next = 6;
          return getToken();
        case 6:
          accessToken = _context3.sent;
          getArtistHeader(accessToken, artistID);
          getTopTracks(accessToken, artistID);
          getArtistAlbums(accessToken, artistID);
          getSimiliarArtists(accessToken, artistID);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function renderArtistPage(_x) {
    return _ref3.apply(this, arguments);
  };
}();
var placeholder;
var renderArtistPagePlaceHolder = function renderArtistPagePlaceHolder() {
  document.querySelector('.render-area').scrollTo(0, 0);
  artistHeaderContainer.innerHTML = "";
  topTrackList.innerHTML = "";
  artistAlbumsList.innerHTML = "";
  similiarArtistsList.innerHTML = "";
  placeholder = "\n    <div class=\"artist-image-wrapper\">\n    <img class=\"artist-image artist-image-placeholder\">\n    </div>\n    <div class=\"artist-header-bio\">\n        <div class=\"artist-name-placeholder\"></div>\n        <div class=\"artist-badges\">\n            <div class=\"artist-badge-placeholder\"></div>\n        </div>\n    </div>";
  artistHeaderContainer.insertAdjacentHTML('afterbegin', placeholder);
  for (var i = 0; i < 5; i++) {
    placeholder = "\n        <div class=\"top-track\">\n        <div class=\"top-track-no top-track-no-placeholder\"></div>\n        <div class=\"top-track-image top-track-image-placeholder\"></div>\n        <div class=\"top-track-title-placeholder\"></div>\n        <div class=\"top-track-duration top-track-duration-placeholder\"></div>\n        </div>";
    topTrackList.insertAdjacentHTML('afterbegin', placeholder);
    placeholder = "\n        <div class=\"item-card\">\n        <img class=\"item-image item-image-placeholder\">\n        <div class=\"item-desc-placeholder\">\n            <div class=\"item-title-placeholder\"></div>\n            <p class=\"item-artist-placeholder\"></p>\n            <div class=\"item-info\">\n                <div class=\"item-type-placeholder\"></div>\n                <div class=\"item-trackcount-placeholder\"></div>\n            </div>\n        </div>\n    </div>";
    artistAlbumsList.insertAdjacentHTML('afterbegin', placeholder);
    placeholder = "\n        <div class=\"item-card\">\n        <img class=\"item-image-placeholder user-image\">\n        <div class=\"item-desc-placeholder\">\n            <div class=\"item-title-placeholder\"></div>\n            <p class=\"item-artist-placeholder\"></p>\n        </div>\n        </div>";
    similiarArtistsList.insertAdjacentHTML('afterbegin', placeholder);
  }
};
var artistHeaderContainer = document.querySelector('.artist-header');
var getArtistHeader = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(accessToken, artistID) {
    var res, data, tags, html, artistBadges;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return fetch("https://api.spotify.com/v1/artists/".concat(artistID), {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 3:
          res = _context4.sent;
          _context4.next = 6;
          return res.json();
        case 6:
          data = _context4.sent;
          tags = data.genres;
          if (res.ok) {
            _context4.next = 10;
            break;
          }
          throw new Error("Something went wrong while loading the artist's header.Try again.");
        case 10:
          artistHeaderContainer.innerHTML = "";
          html = "\n            <div class=\"artist-image-wrapper\">\n                <img src=\"".concat(data.images[1].url, "\" class=\"artist-image\">\n            </div>\n            <div class=\"artist-header-bio\">\n                <div class=\"artist-name\">").concat(data.name, "</div>\n                <div class=\"artist-badges\">\n                </div>\n        ");
          artistHeaderContainer.insertAdjacentHTML('beforeend', html);
          artistBadges = document.querySelector('.artist-badges');
          if (tags) {
            tags.forEach(function (tag) {
              var tagHTML = "<p class=\"artist-badge\">".concat(tag, "</p>");
              artistBadges.insertAdjacentHTML('beforeend', tagHTML);
            });
          }
          _context4.next = 20;
          break;
        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](0);
          (0, _pageResets.renderErrorPopup)(_context4.t0);
        case 20:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 17]]);
  }));
  return function getArtistHeader(_x2, _x3) {
    return _ref4.apply(this, arguments);
  };
}();
var topTrackList = document.querySelector('.top-tracks-list');
var getTopTracks = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(accessToken, artistID) {
    var res, data, images, i, trackFetch, trackData, _i2, html, tracks;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return fetch("https://api.spotify.com/v1/artists/".concat(artistID, "/top-tracks?market=US"), {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 3:
          res = _context6.sent;
          _context6.next = 6;
          return res.json();
        case 6:
          data = _context6.sent;
          if (res.ok) {
            _context6.next = 9;
            break;
          }
          throw new Error("Something went wrong while loading the artist's top tracks.Try again.");
        case 9:
          images = [];
          i = 0;
        case 11:
          if (!(i < (data.tracks.length < 5 ? data.tracks.length : 5))) {
            _context6.next = 22;
            break;
          }
          _context6.next = 14;
          return fetch("https://api.spotify.com/v1/tracks/".concat(data.tracks[i].id), {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 14:
          trackFetch = _context6.sent;
          _context6.next = 17;
          return trackFetch.json();
        case 17:
          trackData = _context6.sent;
          images.push(trackData.album.images[0].url);
        case 19:
          i++;
          _context6.next = 11;
          break;
        case 22:
          topTrackList.innerHTML = "";
          for (_i2 = 0; _i2 < (data.tracks.length > 5 ? 5 : data.tracks.length); _i2++) {
            html = "\n            <div class=\"top-track\" data-artist=\"".concat(data.tracks[_i2].artists[0].name, "\" data-title=\"").concat(data.tracks[_i2].name, "\" data-id=\"").concat(data.tracks[_i2].id, "\" data-toptrackid=\"").concat(data.tracks[_i2].id, "\" data-duration=\"").concat(convertMillisecondsToMinutesAndSeconds(data.tracks[_i2].duration_ms), "\">\n            <p class=\"top-track-no\">").concat(_i2 + 1, ".</p>\n            <img src=\"").concat(images[_i2], "\" class=\"top-track-image\"/>\n            <p class=\"top-track-title\">").concat(data.tracks[_i2].name, "</p>\n            <p class=\"top-track-duration\">").concat(convertMillisecondsToMinutesAndSeconds(data.tracks[_i2].duration_ms), "</p>\n            </div>\n            ");
            topTrackList.insertAdjacentHTML('beforeend', html);
          }
          document.querySelectorAll('.top-track').forEach(function (track) {
            return track.addEventListener('click', /*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(e) {
                return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                  while (1) switch (_context5.prev = _context5.next) {
                    case 0:
                      currentlyPlayingAlbumObject = {};
                      recentlyPlayed.push(e.target.closest('.top-track').dataset.id);
                      document.title = "Benjo | ".concat(e.target.closest('.top-track').dataset.artist, " - ").concat(e.target.closest('.top-track').dataset.title);
                      playerUI.style.display = 'block';
                      clearInterval(lyricsInterval);
                      _context5.next = 7;
                      return playTrack(e.target.closest('.top-track').dataset.id);
                    case 7:
                      (0, _player.playID)("".concat(e.target.closest('.top-track').dataset.artist, " ").concat(e.target.closest('.top-track').dataset.title.replace(symbolsRegex, '')));
                      highlightTrack(e.target.closest('.top-track'));
                      fetchLyrics(e.target.closest('.top-track').dataset.title, e.target.closest('.top-track').dataset.artist, e.target.closest('.top-track').dataset.duration);
                    case 10:
                    case "end":
                      return _context5.stop();
                  }
                }, _callee5);
              }));
              return function (_x6) {
                return _ref6.apply(this, arguments);
              };
            }());
          });
          tracks = document.querySelectorAll('.top-track');
          _toConsumableArray(tracks).forEach(function (track) {
            // console.log(track);
            if (track.dataset.id == document.querySelector('.player-title').dataset.trackid) {
              highlightTrack(document.querySelector("[data-id=\"".concat(track.dataset.id, "\"]")));
            }
          });
          _context6.next = 32;
          break;
        case 29:
          _context6.prev = 29;
          _context6.t0 = _context6["catch"](0);
          (0, _pageResets.renderErrorPopup)(_context6.t0);
        case 32:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 29]]);
  }));
  return function getTopTracks(_x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}();
var artistAlbumsList = document.querySelector('.artist-albums-list');
artistAlbumsList.addEventListener('click', function (e) {
  var clickedAlbum = e.target.closest('.artist-album');
  renderAlbumPage(clickedAlbum.dataset.id);
});
var getArtistAlbums = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(accessToken, artist) {
    var res, data, i, html;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return fetch("https://api.spotify.com/v1/artists/".concat(artist, "/albums?limit=50"), {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 3:
          res = _context7.sent;
          _context7.next = 6;
          return res.json();
        case 6:
          data = _context7.sent;
          if (res.ok) {
            _context7.next = 9;
            break;
          }
          throw new Error("Something went wrong while loading the artist's albums.Try again.");
        case 9:
          artistAlbumsList.innerHTML = "";
          for (i = 0; i < data.items.length; i++) {
            html = "\n                <div class=\"item-card artist-album\" data-id=\"".concat(data.items[i].id, "\">\n                    <img class=\"item-image\" src=\"").concat(data.items[i].images[1].url, "\" alt=\"\" srcset=\"\">\n                    <div class=\"item-desc\">\n                        <p class=\"item-title\">").concat(data.items[i].name.length > 15 ? data.items[i].name.substring(0, 15) + "..." : data.items[i].name, "</p>\n                        <p class=\"item-title item-title-full\">").concat(data.items[i].name, "</p>\n                        <p class=\"item-artist\">").concat(data.items[i].artists[0].name, "</p>\n                        <div class=\"item-info\">\n                            <div class=\"item-type\">").concat(data.items[i].type, "</div>\n                            <div class=\"item-trackcount\">").concat(data.items[i].total_tracks + " tracks", "</div>\n                        </div>\n                    </div>\n                </div>\n            ");
            artistAlbumsList.insertAdjacentHTML('beforeend', html);
          }
          _context7.next = 16;
          break;
        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7["catch"](0);
          renderAlbumPage(_context7.t0);
        case 16:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 13]]);
  }));
  return function getArtistAlbums(_x7, _x8) {
    return _ref7.apply(this, arguments);
  };
}();
var similiarArtistsList = document.querySelector('.similiar-artists-list');
similiarArtistsList.addEventListener('click', function (e) {
  var clickedArtist = e.target.closest('.similiar-artist');
  renderArtistPage(clickedArtist.dataset.id);
});
var getSimiliarArtists = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(accessToken, artist) {
    var res, data, i, html;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return fetch("https://api.spotify.com/v1/artists/".concat(artist, "/related-artists"), {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 3:
          res = _context8.sent;
          _context8.next = 6;
          return res.json();
        case 6:
          data = _context8.sent;
          if (res.ok) {
            _context8.next = 9;
            break;
          }
          throw new Error("Something went wrong while loading similiar artists.Try again.");
        case 9:
          similiarArtistsList.innerHTML = "";
          for (i = 0; i < (data.artists.length < 5 ? data.artists.length : 5); i++) {
            html = "\n            <div class=\"item-card similiar-artist\" data-id=\"".concat(data.artists[i].id, "\">\n            <img class=\"item-image\" src=\"").concat(data.artists[i].images[1].url, "\" alt=\"\" srcset=\"\">\n            <div class=\"item-desc\">\n                <p class=\"item-title\">").concat(data.artists[i].name.length > 15 ? data.artists[i].name.substring(0, 15) + "..." : data.artists[i].name, "</p>\n                <p class=\"item-artist\">Artist</p>\n            </div>\n        </div>\n            ");
            similiarArtistsList.insertAdjacentHTML('beforeend', html);
          }
          _context8.next = 16;
          break;
        case 13:
          _context8.prev = 13;
          _context8.t0 = _context8["catch"](0);
          (0, _pageResets.renderErrorPopup)(_context8.t0);
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 13]]);
  }));
  return function getSimiliarArtists(_x9, _x10) {
    return _ref8.apply(this, arguments);
  };
}();

// ALBUM PAGE

var currentAlbumName;
var getAlbumID = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(track) {
    var accessToken, res, data;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return getToken();
        case 2:
          accessToken = _context9.sent;
          _context9.next = 5;
          return fetch("https://api.spotify.com/v1/tracks/".concat(track), {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 5:
          res = _context9.sent;
          _context9.next = 8;
          return res.json();
        case 8:
          data = _context9.sent;
          currentAlbumName = data.album.name;
        case 10:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function getAlbumID(_x11) {
    return _ref9.apply(this, arguments);
  };
}();
var getAlbumHeader = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(album) {
    var albumHeaderContainer, accessToken, res, data, html, artistLink, albumImageWrapper, iconSelector;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          albumHeaderContainer = document.querySelector('.album-header');
          albumHeaderContainer.innerHTML = "\n    <div class=\"album-image-wrapper\">\n           <img class=\"album-image album-image-placeholder\">\n       </div>\n       <div class=\"album-header-bio\">\n           <div class=\"album-name-placeholder\"></div>\n           <div class=\"album-info-placeholder\"></div>\n       </div>";
          _context10.prev = 2;
          _context10.next = 5;
          return getToken();
        case 5:
          accessToken = _context10.sent;
          _context10.next = 8;
          return fetch("https://api.spotify.com/v1/albums/".concat(album), {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 8:
          res = _context10.sent;
          _context10.next = 11;
          return res.json();
        case 11:
          data = _context10.sent;
          if (res.ok) {
            _context10.next = 14;
            break;
          }
          throw new Error("Something went wrong while loading the album's header.Try again.");
        case 14:
          // console.log(data);
          html = "\n            <div class=\"album-image-wrapper\">\n                <img src=\"".concat(data.images[1].url, "\" alt=\"\" class=\"album-image\">\n            </div>\n            <div class=\"album-header-bio\">\n                <p class=\"album-name\">").concat(data.name.length > 50 ? data.name.substring(0, 50) + "..." : data.name, "</p>\n                <div style=\"display:flex;\"class=\"album-info\"><span class=\"album-artist-link\" data-id=\"").concat(data.artists[0].id, "\" >").concat(data.artists[0].name, " </span><p>| ").concat(data.release_date, " | ").concat(data.total_tracks, " tracks</p></div>\n            </div>\n        ");
          albumHeaderContainer.innerHTML = html;
          artistLink = document.querySelector('.album-artist-link');
          artistLink.addEventListener('click', function () {
            renderArtistPage(artistLink.dataset.id);
          });
          albumImageWrapper = document.querySelector('.album-image-wrapper');
          if (savedAlbums.includes(data.id)) {
            albumImageWrapper.insertAdjacentHTML('afterbegin', "<ion-icon class=\"album-like-icon\" name=\"heart\"></ion-icon>");
          } else {
            albumImageWrapper.insertAdjacentHTML('afterbegin', "<ion-icon class=\"album-like-icon\" name=\"heart-outline\"></ion-icon>");
          }
          iconSelector = document.querySelector('.album-like-icon');
          document.querySelector('.album-like-icon').addEventListener('click', function () {
            if (savedAlbums.includes(data.id)) {
              iconSelector.setAttribute('name', 'heart-outline');
              var index = savedAlbums.indexOf(data.id);
              savedAlbums.splice(index, 1);
            } else {
              iconSelector.setAttribute('name', 'heart');
              savedAlbums.push(data.id);
            }
            // console.log(savedAlbums);
          });
          _context10.next = 27;
          break;
        case 24:
          _context10.prev = 24;
          _context10.t0 = _context10["catch"](2);
          (0, _pageResets.renderErrorPopup)(_context10.t0);
        case 27:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[2, 24]]);
  }));
  return function getAlbumHeader(_x12) {
    return _ref10.apply(this, arguments);
  };
}();
var symbolsRegex = /[%"?]/g;
var currentTrackNo;
var currentlyPlayingAlbumObject = {};
var addTrackEventListeners = function addTrackEventListeners() {
  document.querySelector('.album-tracks-list').addEventListener('click', /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(e) {
      var tracks;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            if (!(e.target == e.target.closest('.track-like-icon'))) {
              _context11.next = 2;
              break;
            }
            return _context11.abrupt("return");
          case 2:
            currentlyPlayingAlbumObject = {};
            currentTrackNo = e.target.closest('.album-track').dataset.trackno;
            document.title = "Benjo | ".concat(e.target.closest('.album-track').dataset.artist, " - ").concat(e.target.closest('.album-track').dataset.title);
            playerUI.style.display = 'block';
            clearInterval(lyricsInterval);
            _context11.next = 9;
            return getAlbumID(e.target.closest('.album-track').dataset.id);
          case 9:
            playTrack(e.target.closest('.album-track').dataset.id);
            (0, _player.playID)("".concat(e.target.closest('.album-track').dataset.artist, " - ").concat(e.target.closest('.album-track').dataset.title.replace(symbolsRegex, '')));
            highlightTrack(e.target.closest('.album-track'));
            recentlyPlayed.push(e.target.closest('.album-track').dataset.id);
            fetchLyrics(e.target.closest('.album-track').dataset.title, e.target.closest('.album-track').dataset.artist, e.target.closest('.album-track').dataset.duration);
            tracks = document.querySelectorAll('.album-track');
            _toConsumableArray(tracks).forEach(function (track, index) {
              var artist = track.dataset.artist;
              var title = track.dataset.title;
              var duration = track.dataset.duration;
              var id = track.dataset.id;
              var trackDetails = {
                "index": index + 1,
                "artist": artist,
                "title": title,
                "duration": duration,
                "id": id
              };
              currentlyPlayingAlbumObject["track".concat(index + 1)] = trackDetails;
            });
            console.log(currentlyPlayingAlbumObject);
          case 17:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    }));
    return function (_x13) {
      return _ref11.apply(this, arguments);
    };
  }());
};
var currentTrackIDs = [];
var getAlbumTracks = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(album) {
    var albumTrackList, accessToken, res, data, counter, tracks;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          currentTrackIDs = [];
          albumTrackList = document.querySelector('.album-tracks-list');
          albumTrackList.innerHTML = "\n    <div class=\"album-track\">\n    <div class=\"album-track-no top-track-no-placeholder\"></div>\n    <div style=\"display: flex; flex-direction: column; gap: .5rem;\">\n        <div class=\"album-track-title-placeholder\"></div>\n        <div class=\"album-artist-placeholder\"></div>\n    </div>\n    <div class=\"album-track-duration top-track-duration-placeholder\"></div>\n    </div>\n    ";
          _context12.prev = 3;
          _context12.next = 6;
          return getToken();
        case 6:
          accessToken = _context12.sent;
          _context12.next = 9;
          return fetch("https://api.spotify.com/v1/albums/".concat(album, "/tracks?limit=50"), {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 9:
          res = _context12.sent;
          _context12.next = 12;
          return res.json();
        case 12:
          data = _context12.sent;
          if (res.ok) {
            _context12.next = 15;
            break;
          }
          throw new Error("Something went wrong while loading the album's tracks.Try again.");
        case 15:
          albumTrackList.innerHTML = "";
          counter = 0;
          data.items.forEach(function (track) {
            counter++;
            var html = "\n            <div class=\"album-track\" data-trackno=\"".concat(counter, "\" data-id=\"").concat(track.id, "\" data-artist=\"").concat(track.artists[0].name, "\" data-title=\"").concat(track.name, "\" data-duration=\"").concat(convertMillisecondsToMinutesAndSeconds(track.duration_ms), "\">\n            <p class=\"album-track-no\">").concat(counter, ".</p>\n            <div class=\"album-track-title-artist\">\n                <p class=\"album-track-title\">").concat(track.name, "</p>\n                <div class=\"album-track-artist-list track").concat(counter, "\"></div>\n            </div>\n            <p class=\"album-track-duration\">").concat(convertMillisecondsToMinutesAndSeconds(track.duration_ms), "</p>\n            </div> \n            ");
            currentTrackIDs.push(track.id);
            albumTrackList.insertAdjacentHTML('beforeend', html);
            for (var i = 0; i < track.artists.length; i++) {
              document.querySelector(".track".concat(counter)).insertAdjacentHTML('beforeend', "<p class=\"album-track-artist\">".concat(track.artists[i].name));
            }
          });
          document.querySelectorAll('.album-track').forEach(function (track) {
            if (savedTracks.includes(track.dataset.id)) {
              track.insertAdjacentHTML('afterbegin', "<ion-icon class=\"track-like-icon\" name=\"heart\"></ion-icon>");
            } else {
              track.insertAdjacentHTML('afterbegin', "<ion-icon class=\"track-like-icon\" name=\"heart-outline\"></ion-icon>");
            }
          });
          document.querySelectorAll('.track-like-icon').forEach(function (icon) {
            return icon.addEventListener('click', function (e) {
              if (savedTracks.includes(e.target.closest('.album-track').dataset.id)) {
                icon.setAttribute('name', 'heart-outline');
                var index = savedTracks.indexOf(e.target.closest('.album-track').dataset.id);
                savedTracks.splice(index, 1);
              } else {
                icon.setAttribute('name', 'heart');
                savedTracks.push(e.target.closest('.album-track').dataset.id);
              }
            });
          });
          addTrackEventListeners();
          tracks = document.querySelectorAll('.album-track');
          _toConsumableArray(tracks).forEach(function (track) {
            if (track.dataset.id == document.querySelector('.player-title').dataset.trackid) {
              highlightTrack(document.querySelector("[data-id=\"".concat(track.dataset.id, "\"]")));
            }
          });
          _context12.next = 28;
          break;
        case 25:
          _context12.prev = 25;
          _context12.t0 = _context12["catch"](3);
          (0, _pageResets.renderErrorPopup)(_context12.t0);
        case 28:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[3, 25]]);
  }));
  return function getAlbumTracks(_x14) {
    return _ref12.apply(this, arguments);
  };
}();
var highlightTrack = exports.highlightTrack = function highlightTrack(e) {
  var allTracks = document.querySelectorAll('.album-track');
  var allTopTrack = document.querySelectorAll('.top-track');
  var allSearchTrack = document.querySelectorAll('.search-track');
  var allRecentlyPlayedTrack = document.querySelectorAll('.recently-played-track');
  var allLikedTrack = document.querySelectorAll('.liked-track');
  allTracks.forEach(function (el) {
    return el.classList.remove('selected-track');
  });
  allTopTrack.forEach(function (el) {
    return el.classList.remove('selected-track');
  });
  allSearchTrack.forEach(function (el) {
    return el.classList.remove('selected-track');
  });
  allRecentlyPlayedTrack.forEach(function (el) {
    return el.classList.remove('selected-track');
  });
  allLikedTrack.forEach(function (el) {
    return el.classList.remove('selected-track');
  });
  e.classList.add('selected-track');
};
var clearHighlights = function clearHighlights() {
  var allTracks = document.querySelectorAll('.album-track');
  var allTopTrack = document.querySelectorAll('.top-track');
  var allSearchTrack = document.querySelectorAll('.search-track');
  var allRecentlyPlayedTrack = document.querySelectorAll('.recently-played-track');
  var allLikedTrack = document.querySelectorAll('.liked-track');
  allTracks.forEach(function (el) {
    return el.classList.remove('selected-track');
  });
  allTopTrack.forEach(function (el) {
    return el.classList.remove('selected-track');
  });
  allSearchTrack.forEach(function (el) {
    return el.classList.remove('selected-track');
  });
  allRecentlyPlayedTrack.forEach(function (el) {
    return el.classList.remove('selected-track');
  });
  allLikedTrack.forEach(function (el) {
    return el.classList.remove('selected-track');
  });
};
var playTrack = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(track) {
    var accessToken, res, data;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return getToken();
        case 3:
          accessToken = _context13.sent;
          _context13.next = 6;
          return fetch("https://api.spotify.com/v1/tracks/".concat(track), {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 6:
          res = _context13.sent;
          if (res.ok) {
            _context13.next = 9;
            break;
          }
          throw new Error("Couldn't play track. Try again.");
        case 9:
          _context13.next = 11;
          return res.json();
        case 11:
          data = _context13.sent;
          // console.log(data);
          updatePlayer(data.album.images[0].url, data.name.length > 35 ? data.name.substring(0, 35) + "..." : data.name, data.artists[0].name, data.id, data.album.id, data.artists[0].id);
          _context13.next = 18;
          break;
        case 15:
          _context13.prev = 15;
          _context13.t0 = _context13["catch"](0);
          (0, _pageResets.renderErrorPopup)(_context13.t0);
        case 18:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 15]]);
  }));
  return function playTrack(_x15) {
    return _ref13.apply(this, arguments);
  };
}();
var playerTitle = document.querySelector('.player-title');
var playerArtist = document.querySelector('.player-artist');
var titleClickHandler, artistClickHandler;
var onPlayerTitleClick = function onPlayerTitleClick(albumID) {
  return function () {
    if (currentTrackIDs.includes(playerTitle.dataset.trackid) && _pageResets.currentPage == "albumpage") return;
    renderAlbumPage(albumID);
  };
};
var onPlayerArtistClick = function onPlayerArtistClick(artistID) {
  return function () {
    renderArtistPage(artistID);
  };
};
var updatePlayer = function updatePlayer(image, trackName, trackArtist, trackID, albumID, artistID) {
  if (titleClickHandler) {
    playerTitle.removeEventListener('click', titleClickHandler);
  }
  if (artistClickHandler) {
    playerArtist.removeEventListener('click', artistClickHandler);
  }
  titleClickHandler = onPlayerTitleClick(albumID);
  artistClickHandler = onPlayerArtistClick(artistID);
  playerTitle.addEventListener('click', titleClickHandler);
  playerArtist.addEventListener('click', artistClickHandler);
  document.querySelector('.player-image').setAttribute('src', image);
  playerTitle.innerText = trackName;
  playerArtist.innerText = trackArtist;
  playerTitle.dataset.trackid = trackID;
  playerTitle.dataset.albumid = albumID;
  playerArtist.dataset.artistid = artistID;
};
var albumPage = document.querySelector('.album-page');
var albumContainer = document.querySelector('.album-container');
var albumPrompt = document.querySelector('.album-prompt');
var renderAlbumPage = function renderAlbumPage(album) {
  albumPage.innerHTML = "\n    <div class=\"album-header\">\n    </div>\n    <div class=\"album-tracks\">\n        <h2 class=\"section-title\">Tracklist</h2>\n        <div class=\"album-tracks-list\">\n        </div>\n    </div>\n    ";
  albumContainer.style.display = "block";
  albumPrompt.style.display = 'none';

  // console.log(currentlyPlayingAlbumID);
  (0, _pageResets.showAlbumPage)();
  getAlbumHeader(album);
  getAlbumTracks(album);
};
var getLikedAlbums = exports.getLikedAlbums = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
    var likedAlbumsContainer, likedAlbumsContainerDiscover, accessToken, albumRequests, data;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          if (!(savedAlbums.length == 0)) {
            _context14.next = 2;
            break;
          }
          return _context14.abrupt("return");
        case 2:
          likedAlbumsContainer = document.querySelector('.liked-albums-container');
          likedAlbumsContainerDiscover = document.querySelector('.liked-albums-container-discover'); // if (savedAlbums.length == 0) return
          _context14.prev = 4;
          _context14.next = 7;
          return getToken();
        case 7:
          accessToken = _context14.sent;
          albumRequests = savedAlbums.map(function (albumId) {
            return fetch("https://api.spotify.com/v1/albums/".concat(albumId, "?market=US"), {
              headers: {
                'Authorization': "Bearer ".concat(accessToken)
              }
            }).then(function (res) {
              return res.json();
            });
          });
          _context14.next = 11;
          return Promise.all(albumRequests);
        case 11:
          data = _context14.sent;
          likedAlbumsContainer.innerHTML = "";
          likedAlbumsContainerDiscover.innerHTML = "";
          data.forEach(function (data) {
            var html = "\n            <div class=\"item-card liked-album\" data-id=\"".concat(data.id, "\">\n            <img class=\"item-image\" src=\"").concat(data.images[1].url, "\" alt=\"\" srcset=\"\">\n            <div class=\"item-desc\" >\n            <p class=\"item-title\">").concat(data.name.length > 13 ? data.name.substring(0, 13) + "..." : data.name, "</p>\n            <p class=\"item-title item-title-full\">").concat(data.name, "</p>\n            <p class=\"item-artist\">").concat(data.artists[0].name.length > 13 ? data.artists[0].name.substring(0, 13) + "..." : data.artists[0].name, "</p>\n            <div class=\"item-info\">\n            <div class=\"item-type\">").concat(data.album_type, "</div>\n            <div class=\"item-trackcount\">").concat(data.total_tracks + " tracks", "</div>\n            </div>\n            </div>\n            </div>");
            likedAlbumsContainer.insertAdjacentHTML('afterbegin', html);
            likedAlbumsContainerDiscover.insertAdjacentHTML('afterbegin', html);
          });
          document.querySelectorAll('.liked-album').forEach(function (card) {
            return card.addEventListener('click', function (e) {
              renderAlbumPage(e.target.closest('.liked-album').dataset.id);
            });
          });
          _context14.next = 21;
          break;
        case 18:
          _context14.prev = 18;
          _context14.t0 = _context14["catch"](4);
          (0, _pageResets.renderErrorPopup)(_context14.t0);
        case 21:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[4, 18]]);
  }));
  return function getLikedAlbums() {
    return _ref14.apply(this, arguments);
  };
}();
var getLikedTracks = exports.getLikedTracks = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
    var likedTrackContainer, accessToken, albumRequests, data, counter;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          if (!(savedTracks.length == 0)) {
            _context16.next = 2;
            break;
          }
          return _context16.abrupt("return");
        case 2:
          likedTrackContainer = document.querySelector('.liked-tracks-container');
          _context16.next = 5;
          return getToken();
        case 5:
          accessToken = _context16.sent;
          albumRequests = savedTracks.map(function (trackID) {
            return fetch("https://api.spotify.com/v1/tracks/".concat(trackID), {
              headers: {
                'Authorization': "Bearer ".concat(accessToken)
              }
            }).then(function (res) {
              return res.json();
            });
          });
          _context16.next = 9;
          return Promise.all(albumRequests);
        case 9:
          data = _context16.sent;
          likedTrackContainer.innerHTML = "";
          counter = 0;
          data.forEach(function (track) {
            counter++;
            var html = "\n        <div class=\"liked-track\" data-likedtrackno=\"".concat(counter, "\" data-likedtrackid=\"").concat(track.id, "\" data-id=\"").concat(track.id, "\" data-artist=\"").concat(track.artists[0].name, "\" data-title=\"").concat(track.name, "\" data-duration=\"").concat(convertMillisecondsToMinutesAndSeconds(track.duration_ms), "\">\n        <p class=\"album-track-no\">").concat(counter, ".</p>\n        <div class=\"album-track-title-artist\">\n            <p class=\"album-track-title\">").concat(track.name, "</p>\n            <div class=\"album-track-artist-list liked-track").concat(counter, "\"></div>\n        </div>\n        <p class=\"album-track-duration\">").concat(convertMillisecondsToMinutesAndSeconds(track.duration_ms), "</p>\n        </div> \n        ");
            likedTrackContainer.insertAdjacentHTML('beforeend', html);
            var _loop = function _loop(i) {
              document.querySelectorAll(".liked-track".concat(counter)).forEach(function (likedTrack) {
                return likedTrack.insertAdjacentHTML('beforeend', "<p class=\"album-track-artist\">".concat(track.artists[i].name));
              });
            };
            for (var i = 0; i < track.artists.length; i++) {
              _loop(i);
            }
          });
          document.querySelectorAll('.liked-track').forEach(function (track) {
            return track.addEventListener('click', /*#__PURE__*/function () {
              var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(e) {
                var likedTracks;
                return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                  while (1) switch (_context15.prev = _context15.next) {
                    case 0:
                      currentlyPlayingAlbumObject = {};
                      clearHighlights();
                      currentTrackNo = e.target.closest('.liked-track').dataset.likedtrackno;
                      document.title = "Benjo | ".concat(e.target.closest('.liked-track').dataset.artist, " - ").concat(e.target.closest('.liked-track').dataset.title);
                      playerUI.style.display = 'block';
                      _context15.next = 7;
                      return getAlbumID(e.target.closest('.liked-track').dataset.id);
                    case 7:
                      playTrack(e.target.closest('.liked-track').dataset.id);
                      (0, _player.playID)("".concat(e.target.closest('.liked-track').dataset.artist, " - ").concat(e.target.closest('.liked-track').dataset.title.replace(symbolsRegex, '')));
                      highlightTrack(e.target.closest('.liked-track'));
                      recentlyPlayed.push(e.target.closest('.liked-track').dataset.id);
                      clearInterval(lyricsInterval);
                      fetchLyrics(e.target.closest('.liked-track').dataset.title, e.target.closest('.liked-track').dataset.artist, e.target.closest('.liked-track').dataset.duration);
                      likedTracks = document.querySelectorAll('.liked-track');
                      _toConsumableArray(likedTracks).forEach(function (track, index) {
                        var artist = track.dataset.artist;
                        var title = track.dataset.title;
                        var duration = track.dataset.duration;
                        var id = track.dataset.id;
                        var trackDetails = {
                          "index": index + 1,
                          "artist": artist,
                          "title": title,
                          "duration": duration,
                          "id": id
                        };
                        currentlyPlayingAlbumObject["track".concat(index + 1)] = trackDetails;
                      });
                    case 15:
                    case "end":
                      return _context15.stop();
                  }
                }, _callee15);
              }));
              return function (_x16) {
                return _ref16.apply(this, arguments);
              };
            }());
          });
        case 14:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return function getLikedTracks() {
    return _ref15.apply(this, arguments);
  };
}();
var getRecentlyPlayed = exports.getRecentlyPlayed = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
    var recentlyPlayedContainer, accessToken, albumRequests, data, counter;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          if (!(recentlyPlayed.buffer.length == 0)) {
            _context18.next = 2;
            break;
          }
          return _context18.abrupt("return");
        case 2:
          recentlyPlayedContainer = document.querySelector('.recently-played-container');
          _context18.next = 5;
          return getToken();
        case 5:
          accessToken = _context18.sent;
          albumRequests = recentlyPlayed.buffer.map(function (trackID) {
            return fetch("https://api.spotify.com/v1/tracks/".concat(trackID), {
              headers: {
                'Authorization': "Bearer ".concat(accessToken)
              }
            }).then(function (res) {
              return res.json();
            });
          });
          _context18.next = 9;
          return Promise.all(albumRequests);
        case 9:
          data = _context18.sent;
          document.querySelector('.recently-played-container').innerHTML = "";
          // console.log(data);
          counter = 0;
          data.forEach(function (track) {
            counter++;
            var html = "\n        <div class=\"recently-played-track\" data-recentlyplayedno=\"".concat(counter, "\" data-id=\"").concat(track.id, "\" data-recentlyplayedid=\"").concat(track.id, "\" data-artist=\"").concat(track.artists[0].name, "\" data-title=\"").concat(track.name, "\" data-duration=\"").concat(convertMillisecondsToMinutesAndSeconds(track.duration_ms), "\">\n        <p class=\"album-track-no\">").concat(counter, ".</p>\n        <div class=\"album-track-title-artist\">\n            <p class=\"album-track-title\">").concat(track.name, "</p>\n            <div class=\"album-track-artist-list recent-track").concat(counter, "\"></div>\n        </div>\n        <p class=\"album-track-duration\">").concat(convertMillisecondsToMinutesAndSeconds(track.duration_ms), "</p>\n        </div> \n        ");
            recentlyPlayedContainer.insertAdjacentHTML('beforeend', html);
            var _loop2 = function _loop2(i) {
              document.querySelectorAll(".recent-track".concat(counter)).forEach(function (recentTrack) {
                return recentTrack.insertAdjacentHTML('beforeend', "<p class=\"album-track-artist\">".concat(track.artists[i].name));
              });
            };
            for (var i = 0; i < track.artists.length; i++) {
              _loop2(i);
            }
          });
          document.querySelectorAll('.recently-played-track').forEach(function (card) {
            return card.addEventListener('click', /*#__PURE__*/function () {
              var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(e) {
                var recentlyPlayedTracks;
                return _regeneratorRuntime().wrap(function _callee17$(_context17) {
                  while (1) switch (_context17.prev = _context17.next) {
                    case 0:
                      currentlyPlayingAlbumObject = {};
                      clearHighlights();
                      currentTrackNo = e.target.closest('.recently-played-track').dataset.recentlyplayedno;
                      document.title = "Benjo | ".concat(e.target.closest('.recently-played-track').dataset.artist, " - ").concat(e.target.closest('.recently-played-track').dataset.title);
                      playerUI.style.display = 'block';
                      _context17.next = 7;
                      return getAlbumID(e.target.closest('.recently-played-track').dataset.id);
                    case 7:
                      // console.log(currentAlbumName);  
                      playTrack(e.target.closest('.recently-played-track').dataset.id);
                      (0, _player.playID)("".concat(e.target.closest('.recently-played-track').dataset.artist, " - ").concat(e.target.closest('.recently-played-track').dataset.title.replace(symbolsRegex, '')));
                      highlightTrack(e.target.closest('.recently-played-track'));
                      recentlyPlayed.push(e.target.closest('.recently-played-track').dataset.id);
                      clearInterval(lyricsInterval);
                      fetchLyrics(e.target.closest('.recently-played-track').dataset.title, e.target.closest('.recently-played-track').dataset.artist, e.target.closest('.recently-played-track').dataset.duration);
                      recentlyPlayedTracks = document.querySelectorAll('.recently-played-track');
                      _toConsumableArray(recentlyPlayedTracks).forEach(function (track, index) {
                        var artist = track.dataset.artist;
                        var title = track.dataset.title;
                        var duration = track.dataset.duration;
                        var id = track.dataset.id;
                        var trackDetails = {
                          "index": index + 1,
                          "artist": artist,
                          "title": title,
                          "duration": duration,
                          "id": id
                        };
                        currentlyPlayingAlbumObject["track".concat(index + 1)] = trackDetails;
                      });
                      console.log(currentlyPlayingAlbumObject);
                    case 16:
                    case "end":
                      return _context17.stop();
                  }
                }, _callee17);
              }));
              return function (_x17) {
                return _ref18.apply(this, arguments);
              };
            }());
          });
        case 14:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  }));
  return function getRecentlyPlayed() {
    return _ref17.apply(this, arguments);
  };
}();

// SEARCH FUNCTIONS

var searchAlbums = document.querySelector('.search-albums');
var searchTracks = document.querySelector('.search-tracks');
var searchArtists = document.querySelector('.search-artists');
var searchAlbumsNoLimit = document.querySelector('.search-albums-nolimit');
var searchTracksNoLimit = document.querySelector('.search-tracks-nolimit');
var searchArtistsNoLimit = document.querySelector('.search-artists-nolimit');
var searchPrompt = document.querySelector('.search-prompt');
var searchContainer = document.querySelector('.search-page-container');
var clearSearch = function clearSearch() {
  searchAlbums.innerHTML = "";
  searchTracks.innerHTML = "";
  searchArtists.innerHTML = "";
  searchAlbumsNoLimit.innerHTML = "";
  searchTracksNoLimit.innerHTML = "";
  searchArtistsNoLimit.innerHTML = "";
};
var searchAll = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(query) {
    var accessToken, res, data, counter, html, i, _i3, _i4, _i5, _i6, _i7, _i8, _i9, tracks;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          if (searchPrompt) searchPrompt.style.display = 'none';
          searchContainer.style.display = 'block';
          clearSearch();
          _context20.prev = 3;
          _context20.next = 6;
          return getToken();
        case 6:
          accessToken = _context20.sent;
          _context20.next = 9;
          return fetch("https://api.spotify.com/v1/search?q=".concat(query, "&type=album%2Cartist%2Ctrack&market=US&limit=50"), {
            headers: {
              'Authorization': "Bearer ".concat(accessToken)
            }
          });
        case 9:
          res = _context20.sent;
          if (res.ok) {
            _context20.next = 12;
            break;
          }
          throw new Error("Something went wrong while searching. Try again, or try another query.");
        case 12:
          _context20.next = 14;
          return res.json();
        case 14:
          data = _context20.sent;
          // console.log(data);
          counter = 0;
          for (i = 0; i < data.albums.items.length; i++) {
            html = "\n            <div class=\"item-card search-album-card\" data-id=\"".concat(data.albums.items[i].id, "\">\n            <img class=\"item-image\" src=\"").concat(data.albums.items[i].images[1].url, "\" alt=\"\" srcset=\"\">\n            <div class=\"item-desc\">\n                <p class=\"item-title\">").concat(data.albums.items[i].name.length > 13 ? data.albums.items[i].name.substring(0, 13) + "..." : data.albums.items[i].name, "</p>\n                <p class=\"item-title item-title-full\">").concat(data.albums.items[i].name, "</p>\n                <p class=\"item-artist\">").concat(data.albums.items[i].artists[0].name.length > 13 ? data.albums.items[i].artists[0].name.substring(0, 13) + "..." : data.albums.items[i].artists[0].name, "</p>\n                <div class=\"item-info\">\n                    <div class=\"item-type\">").concat(data.albums.items[i].album_type, "</div>\n                    <div class=\"item-trackcount\">").concat(data.albums.items[i].total_tracks + " tracks", "</div>\n                </div>\n            </div>\n            </div>\n                ");
            searchAlbumsNoLimit.insertAdjacentHTML('beforeend', html);
          }
          for (_i3 = 0; _i3 < data.tracks.items.length; _i3++) {
            counter++;
            html = "\n            <div class=\"search-track\" data-id=\"".concat(data.tracks.items[_i3].id, "\" data-artist=\"").concat(data.tracks.items[_i3].artists[0].name, "\" data-title=\"").concat(data.tracks.items[_i3].name, "\">\n            <p class=\"album-track-no\">").concat(counter, ".</p>\n            <div class=\"album-track-title-artist\">\n                <p class=\"album-track-title\">").concat(data.tracks.items[_i3].name, "</p>\n                <div class=\"album-track-artist-list search-track-nolimit").concat(counter, "\"></div>\n            </div>\n            <p class=\"album-track-duration\">").concat(convertMillisecondsToMinutesAndSeconds(data.tracks.items[_i3].duration_ms), "</p>\n            </div> \n            ");
            searchTracksNoLimit.insertAdjacentHTML('beforeend', html);
            for (_i4 = 0; _i4 < data.tracks.items[counter - 1].artists.length; _i4++) {
              document.querySelector(".search-track-nolimit".concat(counter)).insertAdjacentHTML('beforeend', "<p class=\"album-track-artist\">".concat(data.tracks.items[counter - 1].artists[_i4].name, "</p>"));
            }
          }
          for (_i5 = 0; _i5 < data.artists.items.length; _i5++) {
            html = "\n            <div data-id=\"".concat(data.artists.items[_i5].id, "\" class=\" artist-card\" >\n            <img class=\"item-image\" src=\"").concat(data.artists.items[_i5].images.length != 0 ? data.artists.items[_i5].images[1].url : "", "\">\n            <div class=\"item-desc\">\n                <p class=\"item-title\">").concat(data.artists.items[_i5].name.length > 15 ? data.artists.items[_i5].name.substring(0, 15) + "..." : data.artists.items[_i5].name, "</p>\n                <p class=\"item-artist\">Artist</p>\n            </div>\n            </div>\n            ");
            searchArtistsNoLimit.insertAdjacentHTML('beforeend', html);
          }
          for (_i6 = 0; _i6 < (data.albums.items.length < 5 ? data.tracks.items.length : 5); _i6++) {
            html = "\n            <div class=\"item-card search-album-card\" data-id=\"".concat(data.albums.items[_i6].id, "\">\n            <img class=\"item-image\" src=\"").concat(data.albums.items[_i6].images[1].url, "\" alt=\"\" srcset=\"\">\n            <div class=\"item-desc\">\n                <p class=\"item-title\">").concat(data.albums.items[_i6].name.length > 13 ? data.albums.items[_i6].name.substring(0, 13) + "..." : data.albums.items[_i6].name, "</p>\n                <p class=\"item-title item-title-full\">").concat(data.albums.items[_i6].name, "</p>\n                <p class=\"item-artist\">").concat(data.albums.items[_i6].artists[0].name.length > 13 ? data.albums.items[_i6].artists[0].name.substring(0, 13) + "..." : data.albums.items[_i6].artists[0].name, "</p>\n                <div class=\"item-info\">\n                    <div class=\"item-type\">").concat(data.albums.items[_i6].album_type, "</div>\n                    <div class=\"item-trackcount\">").concat(data.albums.items[_i6].total_tracks + " tracks", "</div>\n                </div>\n            </div>\n            </div>\n                ");
            searchAlbums.insertAdjacentHTML('beforeend', html);
          }
          counter = 0;
          for (_i7 = 0; _i7 < (data.tracks.items.length < 5 ? data.tracks.items.length : 5); _i7++) {
            counter++;
            html = "\n            <div class=\"search-track\" data-id=\"".concat(data.tracks.items[_i7].id, "\" data-artist=\"").concat(data.tracks.items[_i7].artists[0].name, "\" data-title=\"").concat(data.tracks.items[_i7].name, "\" data-duration=\"").concat(convertMillisecondsToMinutesAndSeconds(data.tracks.items[_i7].duration_ms), "\">\n            <p class=\"album-track-no\">").concat(counter, ".</p>\n            <div class=\"album-track-title-artist\">\n                <p class=\"album-track-title\">").concat(data.tracks.items[_i7].name, "</p>\n                <div class=\"album-track-artist-list search-track").concat(counter, "\"></div>\n            </div>\n            <p class=\"album-track-duration\">").concat(convertMillisecondsToMinutesAndSeconds(data.tracks.items[_i7].duration_ms), "</p>\n            </div> \n            ");
            searchTracks.insertAdjacentHTML('beforeend', html);
            for (_i8 = 0; _i8 < data.tracks.items[counter - 1].artists.length; _i8++) {
              document.querySelector(".search-track".concat(counter)).insertAdjacentHTML('beforeend', "<p class=\"album-track-artist\">".concat(data.tracks.items[counter - 1].artists[_i8].name, "</p>"));
            }
          }
          for (_i9 = 0; _i9 < (data.artists.items.length < 5 ? data.tracks.items.length : 5); _i9++) {
            html = "\n            <div data-id=\"".concat(data.artists.items[_i9].id, "\" class=\" artist-card\" >\n            <img class=\"item-image\" src=\"").concat(data.artists.items[_i9].images.length != 0 ? data.artists.items[_i9].images[1].url : "", "\">\n            <div class=\"item-desc\">\n                <p class=\"item-title\">").concat(data.artists.items[_i9].name.length > 15 ? data.artists.items[_i9].name.substring(0, 15) + "..." : data.artists.items[_i9].name, "</p>\n                <p class=\"item-artist\">Artist</p>\n            </div>\n            </div>\n            ");
            searchArtists.insertAdjacentHTML('beforeend', html);
          }
          document.querySelectorAll('.item-card').forEach(function (card) {
            return card.addEventListener('click', function (e) {
              renderAlbumPage(e.target.closest('.search-album-card').dataset.id);
            });
          });
          document.querySelectorAll('.artist-card').forEach(function (artist) {
            return artist.addEventListener('click', function (e) {
              renderArtistPage(e.target.closest('.artist-card').dataset.id);
            });
          });
          document.querySelectorAll('.search-track').forEach(function (track) {
            return track.addEventListener('click', /*#__PURE__*/function () {
              var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(e) {
                return _regeneratorRuntime().wrap(function _callee19$(_context19) {
                  while (1) switch (_context19.prev = _context19.next) {
                    case 0:
                      currentlyPlayingAlbumObject = {};
                      recentlyPlayed.push(e.target.closest('.search-track').dataset.id);
                      document.title = "Benjo | ".concat(e.target.closest('.search-track').dataset.artist, " - ").concat(e.target.closest('.search-track').dataset.title);
                      playerUI.style.display = 'block';
                      _context19.next = 6;
                      return getAlbumID(e.target.closest('.search-track').dataset.id);
                    case 6:
                      playTrack(e.target.closest('.search-track').dataset.id);
                      (0, _player.playID)("".concat(e.target.closest('.search-track').dataset.artist, " - ").concat(e.target.closest('.search-track').dataset.title.replace(symbolsRegex, '')));
                      highlightTrack(e.target.closest('.search-track'));
                      clearInterval(lyricsInterval);
                      fetchLyrics(e.target.closest('.search-track').dataset.title, e.target.closest('.search-track').dataset.artist, e.target.closest('.search-track').dataset.duration);
                    case 11:
                    case "end":
                      return _context19.stop();
                  }
                }, _callee19);
              }));
              return function (_x19) {
                return _ref20.apply(this, arguments);
              };
            }());
          });
          tracks = document.querySelectorAll('.search-track');
          _toConsumableArray(tracks).forEach(function (track) {
            if (track.dataset.id == document.querySelector('.player-title').dataset.trackid) {
              var index = _toConsumableArray(tracks).findIndex(function (track) {
                return track.dataset.id === document.querySelector('.player-title').dataset.trackid;
              }) + 1;
              // console.log(index);
              // console.log(document.querySelector(`[data-recentlyplayedno="${index}"]`));
              highlightTrack(document.querySelector("[data-id=\"".concat(track.id, "\"]")));
            }
          });
          _context20.next = 33;
          break;
        case 30:
          _context20.prev = 30;
          _context20.t0 = _context20["catch"](3);
          (0, _pageResets.renderErrorPopup)(_context20.t0);
        case 33:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[3, 30]]);
  }));
  return function searchAll(_x18) {
    return _ref19.apply(this, arguments);
  };
}();
var searchFn = function searchFn(source) {
  var query = document.querySelector(source).value;
  if (query == "") return;
  searchAll(query.replace(symbolsRegex, ''));
  (0, _pageResets.showSearchAllPage)();
};
document.querySelector('.search-button').addEventListener('click', function () {
  searchFn('.top-searchbar');
});
document.querySelector('.mobile-searchbar').addEventListener('keyup', function (e) {
  if (e.key == "Enter") searchFn('.mobile-searchbar');
});
document.querySelector('.top-searchbar').addEventListener('keyup', function (e) {
  if (e.key == "Enter") searchFn('.top-searchbar');
});
function convertMillisecondsToMinutesAndSeconds(milliseconds) {
  var minutes = Math.floor(milliseconds / 60000);
  var seconds = (milliseconds % 60000 / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
var onTrackChange = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21() {
    var track;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          track = Object.entries(currentlyPlayingAlbumObject)[currentTrackNo - 1][1];
          document.title = "Benjo | ".concat(track.artist, " - ").concat(track.title);
          playerUI.style.display = 'block';
          _context21.next = 5;
          return getAlbumID(track.id);
        case 5:
          playTrack(track.id);
          (0, _player.playID)("".concat(track.artist, " - ").concat(track.title.replace(symbolsRegex, '')));
          fetchLyrics(track.title, track.artist, track.duration);
          recentlyPlayed.push(track.id);
          clearInterval(lyricsInterval);
          clearHighlights();
          if (document.querySelector("[data-id=\"".concat(track.id, "\"]")) && _pageResets.currentPage == "albumpage") highlightTrack(document.querySelector("[data-id=\"".concat(track.id, "\"]")));
          if (document.querySelector("[data-likedtrackid=\"".concat(track.id, "\"]")) && _pageResets.currentPage == "likedtrackspage") highlightTrack(document.querySelector("[data-likedtrackid=\"".concat(track.id, "\"]")));
          if (document.querySelector("[data-recentlyplayedid=\"".concat(track.id, "\"]")) && _pageResets.currentPage == "recentlyplayedpage") highlightTrack(document.querySelector("[data-recentlyplayedid=\"".concat(track.id, "\"]")));
        case 14:
        case "end":
          return _context21.stop();
      }
    }, _callee21);
  }));
  return function onTrackChange() {
    return _ref21.apply(this, arguments);
  };
}();
var trackSkip = true;
var previousTrack = exports.previousTrack = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22() {
    var tracks;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          tracks = Object.values(currentlyPlayingAlbumObject);
          if (!(currentTrackNo < 2 || !trackSkip || tracks.length == 0)) {
            _context22.next = 3;
            break;
          }
          return _context22.abrupt("return");
        case 3:
          trackSkip = false;
          currentTrackNo--;
          onTrackChange();
          setTimeout(function () {
            trackSkip = true;
          }, 300);
        case 7:
        case "end":
          return _context22.stop();
      }
    }, _callee22);
  }));
  return function previousTrack() {
    return _ref22.apply(this, arguments);
  };
}();
var nextTrack = exports.nextTrack = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23() {
    var tracks;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          if (trackSkip) {
            _context23.next = 2;
            break;
          }
          return _context23.abrupt("return");
        case 2:
          tracks = Object.values(currentlyPlayingAlbumObject); // console.log(currentTrackNo);
          if (!(tracks.length == 0)) {
            _context23.next = 5;
            break;
          }
          return _context23.abrupt("return");
        case 5:
          if (!(currentTrackNo > tracks.length - 1)) {
            _context23.next = 7;
            break;
          }
          return _context23.abrupt("return");
        case 7:
          trackSkip = false;
          currentTrackNo++;
          onTrackChange();
          setTimeout(function () {
            trackSkip = true;
          }, 300);
        case 11:
        case "end":
          return _context23.stop();
      }
    }, _callee23);
  }));
  return function nextTrack() {
    return _ref23.apply(this, arguments);
  };
}();
document.querySelector('.PlayBack').addEventListener('click', previousTrack);
document.querySelector('.PlayForward').addEventListener('click', nextTrack);

// LYRICS

var lyricsObject;
var lyricsContainer = document.querySelector('.lyrics-container');
var fetchLyrics = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(title, artist, duration) {
    var res, data, _i10, _Object$entries, _Object$entries$_i, timestamp, lyric;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          lyricsContainer.innerHTML = "";
          _context24.prev = 1;
          _context24.next = 4;
          return fetch("https://paxsenixofc.my.id/server/getLyricsMusix?t=".concat(title, "&a=").concat(artist, "&d=").concat(duration, "&type=alternative"));
        case 4:
          res = _context24.sent;
          if (res.ok) {
            _context24.next = 7;
            break;
          }
          throw new Error('szar');
        case 7:
          _context24.next = 9;
          return res.text();
        case 9:
          data = _context24.sent;
          // console.log(data)
          exports.lyricsObject = lyricsObject = createTimestampObject(data);
          // console.log(lyricsObject);
          for (_i10 = 0, _Object$entries = Object.entries(lyricsObject); _i10 < _Object$entries.length; _i10++) {
            _Object$entries$_i = _slicedToArray(_Object$entries[_i10], 2), timestamp = _Object$entries$_i[0], lyric = _Object$entries$_i[1];
            lyricsContainer.insertAdjacentHTML('beforeend', "<p class=\"lyrics\">".concat(lyric, "</p>"));
          }
          _context24.next = 17;
          break;
        case 14:
          _context24.prev = 14;
          _context24.t0 = _context24["catch"](1);
          lyricsContainer.insertAdjacentHTML('afterbegin', "<p class=\"lyrics lyrics-active\">Something went wrong while gathering the lyrics for this song...</p>\n    ");
        case 17:
        case "end":
          return _context24.stop();
      }
    }, _callee24, null, [[1, 14]]);
  }));
  return function fetchLyrics(_x20, _x21, _x22) {
    return _ref24.apply(this, arguments);
  };
}();
function createTimestampObject(text) {
  var regex = /\[(\d+:\d+\.\d+)\](.+)/g;
  var matches = _toConsumableArray(text.matchAll(regex));
  var keyValuePairs = {};
  matches.forEach(function (match) {
    var timestamp = extractTimestamp(match[1]);
    var lyrics = match[2].trim();
    keyValuePairs[timestamp] = lyrics;
  });
  return keyValuePairs;
}
function extractTimestamp(lyric) {
  var _lyric$split$map = lyric.split(':').map(parseFloat),
    _lyric$split$map2 = _slicedToArray(_lyric$split$map, 2),
    minutes = _lyric$split$map2[0],
    seconds = _lyric$split$map2[1];
  var totalSeconds = minutes * 60 + seconds;
  return totalSeconds.toFixed(2);
}
var lyricsParent = document.querySelector('.lyrics-page');
var lyricsInterval;
var updateLyricsReadout = exports.updateLyricsReadout = function updateLyricsReadout(objectInput, time) {
  var timestamps = Object.keys(objectInput).map(parseFloat);
  var currentIndex = 0;
  var lyricsShown = false;
  var lyricsList = document.querySelectorAll('.lyrics');
  exports.lyricsInterval = lyricsInterval = setInterval(function () {
    var currentTimestamp = parseFloat(timestamps[currentIndex]);
    if (currentTimestamp > time && !lyricsShown) {
      lyricsShown = true;
      // if(currentLyrics >= 0) console.log(lyrics[currentLyrics]);
      // currentLyrics++;
      nextLyric(currentIndex, lyricsList);
    }
    if (time > currentTimestamp) {
      lyricsShown = false;
      currentIndex++;
    }
    time += 0.1;
  }, 100);
};
var renderArea = document.querySelector('.render-area');
var nextLyric = function nextLyric(currentIndex, list) {
  try {
    var currentLyrics = list[currentIndex - 1];
    list.forEach(function (el) {
      return el.classList.remove('lyrics-active');
    });
    currentLyrics.classList.add('lyrics-active');
    var positionFromTop = currentLyrics.getBoundingClientRect().top - lyricsContainer.getBoundingClientRect().top - window.innerHeight / 3;
    if (window.getComputedStyle(lyricsParent).display === 'block') {
      renderArea.scrollTo({
        top: positionFromTop,
        behavior: 'smooth'
      });
    }
  } catch (err) {}
};
},{"./player.js":"qbJK","./pageResets.js":"MF2j"}],"bcQp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storageSave = void 0;
var _musicFetch = require("./musicFetch.js");
var storageSave = exports.storageSave = window.addEventListener('beforeunload', function () {
  localStorage.setItem('savedAlbums', JSON.stringify(_musicFetch.savedAlbums));
  localStorage.setItem('savedTracks', JSON.stringify(_musicFetch.savedTracks));
});
document.querySelector('.reset-settings').addEventListener('click', function () {
  _musicFetch.savedAlbums = ([], function () {
    throw new Error('"' + "savedAlbums" + '" is read-only.');
  }());
  _musicFetch.savedTracks = ([], function () {
    throw new Error('"' + "savedTracks" + '" is read-only.');
  }());
  localStorage.clear();
  location.reload();
});
},{"./musicFetch.js":"fxcF"}],"niua":[function(require,module,exports) {
"use strict";

var musicFetch_exports = _interopRequireWildcard(require("./musicFetch.js"));
var player_exports = _interopRequireWildcard(require("./player.js"));
var pageResets_exports = _interopRequireWildcard(require("./pageResets.js"));
var storageSave_exports = _interopRequireWildcard(require("./localstorage.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
},{"./musicFetch.js":"fxcF","./player.js":"qbJK","./pageResets.js":"MF2j","./localstorage.js":"bcQp"}]},{},["niua"], null)
//# sourceMappingURL=controller.d46ce727.js.map