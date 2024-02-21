function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f$2 = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f$2
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode: 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});
});

var _functionToString = _shared('native-function-to-string', Function.toString);

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');

var TO_STRING = 'toString';
var TPL = ('' + _functionToString).split(TO_STRING);

_core.inspectSource = function (it) {
  return _functionToString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
});
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE$1 = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE$1];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE$1] || (exports[PROTOTYPE$1] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min$1 = Math.min;
var _toLength = function (it) {
  return it > 0 ? min$1(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto$1 = Array.prototype;
if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});
var _addToUnscopables = function (key) {
  ArrayProto$1[UNSCOPABLES][key] = true;
};

// https://github.com/tc39/Array.prototype.includes

var $includes = _arrayIncludes(true);

_export(_export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

_addToUnscopables('includes');

_core.Array.includes;

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO$2 = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO$2) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f = {}.propertyIsEnumerable;

var _objectPie = {
	f: f
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)






var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

_core.Object.assign;

var isEnum = _objectPie.f;
var _objectToArray = function (isEntries) {
  return function (it) {
    var O = _toIobject(it);
    var keys = _objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!_descriptors || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

// https://github.com/tc39/proposal-object-values-entries

var $entries = _objectToArray(true);

_export(_export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

_core.Object.entries;

// https://github.com/tc39/proposal-object-values-entries

var $values = _objectToArray(false);

_export(_export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

_core.Object.values;

// 7.2.8 IsRegExp(argument)


var MATCH$1 = _wks('match');
var _isRegexp = function (it) {
  var isRegExp;
  return _isObject(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
};

// helper for String#{startsWith, endsWith, includes}



var _stringContext = function (that, searchString, NAME) {
  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(_defined(that));
};

var MATCH = _wks('match');
var _failsIsRegexp = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

_export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = _stringContext(this, searchString, STARTS_WITH);
    var index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

_core.String.startsWith;

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _iterators = {};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document = _global.document;
var _html = document && document.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var def = _objectDp.f;

var TAG$1 = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG$1)) def(it, TAG$1, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var ITERATOR$3 = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR$3] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (typeof IteratorPrototype[ITERATOR$3] != 'function') _hide(IteratorPrototype, ITERATOR$3, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((BUGGY || VALUES_BUG || !proto[ITERATOR$3])) {
    _hide(proto, ITERATOR$3, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

// call something on iterator step with safe closing on error

var _iterCall = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator

var ITERATOR$2 = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function (it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$2] === it);
};

var _createProperty = function (object, index, value) {
  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
  else object[index] = value;
};

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var ITERATOR$1 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$1]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var ITERATOR = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

var _iterDetect = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

_export(_export.S + _export.F * !_iterDetect(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = _toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = core_getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = _toLength(O.length);
      for (result = new C(length); length > index; index++) {
        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

_core.Array.from;

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

var SPECIES = _wks('species');

var _arraySpeciesConstructor = function (original) {
  var C;
  if (_isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
    if (_isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


var _arraySpeciesCreate = function (original, length) {
  return new (_arraySpeciesConstructor(original))(length);
};

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex





var _arrayMethods = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || _arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = _toObject($this);
    var self = _iobject(O);
    var f = _ctx(callbackfn, that, 3);
    var length = _toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

var $find = _arrayMethods(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
_export(_export.P + _export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables(KEY);

_core.Array.find;

class Container {
    /**
     * Register the store instance.
     */
    static register(store) {
        this.store = store;
    }
}

var install = (database, options = {}) => {
    const namespace = options.namespace || 'entities';
    return (store) => {
        database.start(store, namespace);
        Container.register(store);
    };
};

/**
 * Check if the given value is the type of array.
 */
function isArray(value) {
    return Array.isArray(value);
}
/**
 * Gets the size of collection by returning its length for array-like values
 * or the number of own enumerable string keyed properties for objects.
 */
function size(collection) {
    return isArray(collection)
        ? collection.length
        : Object.keys(collection).length;
}
/**
 * Check if the given array or object is empty.
 */
function isEmpty(collection) {
    return size(collection) === 0;
}
/**
 * Iterates over own enumerable string keyed properties of an object and
 * invokes `iteratee` for each property.
 */
function forOwn(object, iteratee) {
    Object.keys(object).forEach((key) => iteratee(object[key], key, object));
}
/**
 * Creates an array of values by running each element in collection thru
 * iteratee. The iteratee is invoked with three arguments:
 * (value, key, collection).
 */
function map(object, iteratee) {
    const result = [];
    for (const key in object) {
        result.push(iteratee(object[key], key, object));
    }
    return result;
}
/**
 * Creates an object with the same keys as object and values generated by
 * running each own enumerable string keyed property of object thru
 * iteratee. The iteratee is invoked with three arguments:
 * (value, key, object).
 */
function mapValues(object, iteratee) {
    const newObject = Object.assign({}, object);
    return Object.keys(object).reduce((records, key) => {
        records[key] = iteratee(object[key], key, object);
        return records;
    }, newObject);
}
/**
 * Creates an object composed of keys generated from the results of running
 * each element of collection by the given key.
 */
function keyBy(collection, key) {
    const o = {};
    collection.forEach((item) => {
        o[item[key]] = item;
    });
    return o;
}
/**
 * Creates an array of elements, sorted in specified order by the results
 * of running each element in a collection thru each iteratee.
 */
function orderBy(collection, iteratees, directions) {
    let index = -1;
    const result = collection.map((value) => {
        const criteria = iteratees.map((iteratee) => {
            return typeof iteratee === 'function' ? iteratee(value) : value[iteratee];
        });
        return { criteria, index: ++index, value };
    });
    return baseSortBy(result, (object, other) => {
        return compareMultiple(object, other, directions);
    });
}
/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order
 * of equal elements.
 */
function baseSortBy(array, comparer) {
    let length = array.length;
    array.sort(comparer);
    const newArray = [];
    while (length--) {
        newArray[length] = array[length].value;
    }
    return newArray;
}
/**
 * Used by `orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order.
 * Otherwise, specify an order of "desc" for descending or "asc" for
 * ascending sort order of corresponding values.
 */
function compareMultiple(object, other, orders) {
    let index = -1;
    const objCriteria = object.criteria;
    const othCriteria = other.criteria;
    const length = objCriteria.length;
    const ordersLength = orders.length;
    while (++index < length) {
        const result = compareAscending(objCriteria[index], othCriteria[index]);
        if (result) {
            if (index >= ordersLength) {
                return result;
            }
            const order = orders[index];
            return result * (order === 'desc' ? -1 : 1);
        }
    }
    return object.index - other.index;
}
/**
 * Compares values to sort them in ascending order.
 */
function compareAscending(value, other) {
    if (value !== other) {
        const valIsDefined = value !== undefined;
        const valIsNull = value === null;
        const valIsReflexive = value === value;
        const othIsDefined = other !== undefined;
        const othIsNull = other === null;
        const othIsReflexive = other === other;
        if (typeof value !== 'number' || typeof other !== 'number') {
            value = String(value);
            other = String(other);
        }
        if ((!othIsNull && value > other) ||
            (valIsNull && othIsDefined && othIsReflexive) ||
            (!valIsDefined && othIsReflexive) ||
            !valIsReflexive) {
            return 1;
        }
        if ((!valIsNull && value < other) ||
            (othIsNull && valIsDefined && valIsReflexive) ||
            (!othIsDefined && valIsReflexive) ||
            !othIsReflexive) {
            return -1;
        }
    }
    return 0;
}
/**
 * Creates an object composed of keys generated from the results of running
 * each element of collection thru iteratee.
 */
function groupBy(collection, iteratee) {
    return collection.reduce((records, record) => {
        const key = iteratee(record);
        if (records[key] === undefined) {
            records[key] = [];
        }
        records[key].push(record);
        return records;
    }, {});
}
/**
 * Deep clone the given target object.
 */
function cloneDeep(target) {
    if (target === null) {
        return target;
    }
    if (isArray(target)) {
        const cp = [];
        target.forEach((v) => cp.push(v));
        return cp.map((n) => cloneDeep(n));
    }
    if (typeof target === 'object' && target !== {}) {
        const cp = { ...target };
        Object.keys(cp).forEach((k) => (cp[k] = cloneDeep(cp[k])));
        return cp;
    }
    return target;
}
var Utils = {
    isArray,
    size,
    isEmpty,
    forOwn,
    map,
    mapValues,
    keyBy,
    orderBy,
    groupBy,
    cloneDeep
};

class Uid$1 {
    /**
     * Generate an UUID.
     */
    static make() {
        this.count++;
        return `${this.prefix}${this.count}`;
    }
    /**
     * Reset the count to 0.
     */
    static reset() {
        this.count = 0;
    }
}
/**
 * Count to create a unique id.
 */
Uid$1.count = 0;
/**
 * Prefix string to be used for the id.
 */
Uid$1.prefix = '$uid';

class Attribute {
    /**
     * Create a new attribute instance.
     */
    constructor(model) {
        this.model = model;
    }
}

class Type extends Attribute {
    /**
     * Create a new type instance.
     */
    constructor(model, value, mutator) {
        super(model); /* istanbul ignore next */
        /**
         * Whether if the attribute can accept `null` as a value.
         */
        this.isNullable = false;
        this.value = value;
        this.mutator = mutator;
    }
    /**
     * Set `isNullable` to be `true`.
     */
    nullable() {
        this.isNullable = true;
        return this;
    }
    /**
     * Mutate the given value by mutator.
     */
    mutate(value, key) {
        const mutator = this.mutator || this.model.mutators()[key];
        return mutator ? mutator(value) : value;
    }
}

class Attr extends Type {
    /**
     * Create a new attr instance.
     */
    constructor(model, value, mutator) {
        /* istanbul ignore next */
        super(model, value, mutator);
    }
    /**
     * Make value to be set to model property. This method is used when
     * instantiating a model or creating a plain object from a model.
     */
    make(value, _parent, key) {
        value = value !== undefined ? value : this.value;
        // Default Value might be a function (taking no parameter).
        let localValue = value;
        if (typeof value === 'function') {
            localValue = value();
        }
        return this.mutate(localValue, key);
    }
}

class String$1 extends Type {
    /**
     * Create a new string instance.
     */
    constructor(model, value, mutator) {
        /* istanbul ignore next */
        super(model, value, mutator);
    }
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value, _parent, key) {
        return this.mutate(this.fix(value), key);
    }
    /**
     * Convert given value to the string.
     */
    fix(value) {
        if (value === undefined) {
            return this.value;
        }
        if (typeof value === 'string') {
            return value;
        }
        if (value === null && this.isNullable) {
            return value;
        }
        return value + '';
    }
}

class Number extends Type {
    /**
     * Create a new number instance.
     */
    constructor(model, value, mutator) {
        /* istanbul ignore next */
        super(model, value, mutator);
    }
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value, _parent, key) {
        return this.mutate(this.fix(value), key);
    }
    /**
     * Transform given data to the number.
     */
    fix(value) {
        if (value === undefined) {
            return this.value;
        }
        if (typeof value === 'number') {
            return value;
        }
        if (typeof value === 'string') {
            return parseFloat(value);
        }
        if (typeof value === 'boolean') {
            return value ? 1 : 0;
        }
        if (value === null && this.isNullable) {
            return value;
        }
        return 0;
    }
}

class Boolean extends Type {
    /**
     * Create a new number instance.
     */
    constructor(model, value, mutator) {
        /* istanbul ignore next */
        super(model, value, mutator);
    }
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value, _parent, key) {
        return this.mutate(this.fix(value), key);
    }
    /**
     * Transform given data to the boolean.
     */
    fix(value) {
        if (value === undefined) {
            return this.value;
        }
        if (typeof value === 'boolean') {
            return value;
        }
        if (typeof value === 'string') {
            if (value.length === 0) {
                return false;
            }
            const int = parseInt(value, 0);
            return isNaN(int) ? true : !!int;
        }
        if (typeof value === 'number') {
            return !!value;
        }
        if (value === null && this.isNullable) {
            return value;
        }
        return false;
    }
}

class Uid extends Type {
    /**
     * Create a new uid instance.
     */
    constructor(model, value) {
        /* istanbul ignore next */
        super(model, value);
    }
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value) {
        if (typeof value === 'number' || typeof value === 'string') {
            return value;
        }
        if (typeof this.value === 'function') {
            return this.value();
        }
        return Uid$1.make();
    }
}

class Relation extends Attribute {
    /**
     * Get relation query instance with constraint attached.
     */
    getRelation(query, name, constraints) {
        const relation = query.newQuery(name);
        constraints.forEach((constraint) => {
            constraint(relation);
        });
        return relation;
    }
    /**
     * Get specified keys from the given collection.
     */
    getKeys(collection, key) {
        return collection.reduce((models, model) => {
            if (model[key] === null || model[key] === undefined) {
                return models;
            }
            models.push(model[key]);
            return models;
        }, []);
    }
    /**
     * Create a new indexed map for the single relation by specified key.
     */
    mapSingleRelations(collection, key) {
        const relations = new Map();
        collection.forEach((record) => {
            const id = record[key];
            !relations.get(id) && relations.set(id, record);
        });
        return relations;
    }
    /**
     * Create a new indexed map for the many relation by specified key.
     */
    mapManyRelations(collection, key) {
        const relations = new Map();
        collection.forEach((record) => {
            const id = record[key];
            let ownerKeys = relations.get(id);
            if (!ownerKeys) {
                ownerKeys = [];
                relations.set(id, ownerKeys);
            }
            ownerKeys.push(record);
        });
        return relations;
    }
    /**
     * Create a new indexed map for relations with order constraints.
     */
    mapRelationsByOrders(collection, relations, ownerKey, relationKey) {
        const records = {};
        relations.forEach((related, id) => {
            collection
                .filter((record) => record[relationKey] === id)
                .forEach((record) => {
                const id = record[ownerKey];
                if (!records[id]) {
                    records[id] = [];
                }
                records[id] = records[id].concat(related);
            });
        });
        return records;
    }
    /**
     * Check if the given record is a single relation, which is an object.
     */
    isOneRelation(record) {
        if (!isArray(record) && record !== null && typeof record === 'object') {
            return true;
        }
        return false;
    }
    /**
     * Check if the given records is a many relation, which is an array
     * of object.
     */
    isManyRelation(records) {
        if (!isArray(records)) {
            return false;
        }
        if (records.length < 1) {
            return false;
        }
        return true;
    }
    /**
     * Wrap the given object into a model instance.
     */
    makeOneRelation(record, model) {
        if (!this.isOneRelation(record)) {
            return null;
        }
        const relatedModel = model.getModelFromRecord(record) || model;
        return new relatedModel(record);
    }
    /**
     * Wrap the given records into a collection of model instances.
     */
    makeManyRelation(records, model) {
        if (!this.isManyRelation(records)) {
            return [];
        }
        return records
            .filter((record) => {
            return this.isOneRelation(record);
        })
            .map((record) => {
            const relatedModel = model.getModelFromRecord(record) || model;
            return new relatedModel(record);
        });
    }
}

class HasOne extends Relation {
    /**
     * Create a new has one instance.
     */
    constructor(model, related, foreignKey, localKey) {
        super(model); /* istanbul ignore next */
        this.related = this.model.relation(related);
        this.foreignKey = foreignKey;
        this.localKey = localKey;
    }
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema) {
        return schema.one(this.related);
    }
    /**
     * Attach the relational key to the related data. For example,
     * when User has one Phone, it will attach value to the
     * `user_id` field of Phone record.
     */
    attach(key, record, data) {
        // Check if the record has local key set. If not, set the local key to be
        // the id value. This happens if the user defines the custom local key
        // and didn't include it in the data being normalized.
        if (!record[this.localKey]) {
            record[this.localKey] = this.model.getIndexIdFromRecord(record);
        }
        // Then set the foreign key of the related record if it exists to be the
        // local key of this record.
        const related = data[this.related.entity] && data[this.related.entity][key];
        if (related) {
            related[this.foreignKey] = record[this.localKey];
        }
    }
    /**
     * Make value to be set to model property. This method is used when
     * instantiating a model or creating a plain object from a model.
     */
    make(value, _parent, _key) {
        return this.makeOneRelation(value, this.related);
    }
    /**
     * Load the has one relationship for the collection.
     */
    load(query, collection, name, constraints) {
        const relation = this.getRelation(query, this.related.entity, constraints);
        this.addEagerConstraints(relation, collection);
        this.match(collection, relation.get(), name);
    }
    /**
     * Set the constraints for an eager load of the relation.
     */
    addEagerConstraints(relation, collection) {
        relation.whereFk(this.foreignKey, this.getKeys(collection, this.localKey));
    }
    /**
     * Match the eagerly loaded results to their parents.
     */
    match(collection, relations, name) {
        const dictionary = this.buildDictionary(relations);
        collection.forEach((model) => {
            const id = model[this.localKey];
            const relation = dictionary[id];
            model[name] = relation || null;
        });
    }
    /**
     * Build model dictionary keyed by the relation's foreign key.
     */
    buildDictionary(relations) {
        return relations.reduce((dictionary, relation) => {
            const key = relation[this.foreignKey];
            dictionary[key] = relation;
            return dictionary;
        }, {});
    }
}

class BelongsTo extends Relation {
    /**
     * Create a new belongs to instance.
     */
    constructor(model, parent, foreignKey, ownerKey) {
        super(model); /* istanbul ignore next */
        this.parent = this.model.relation(parent);
        this.foreignKey = foreignKey;
        this.ownerKey = ownerKey;
    }
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema) {
        return schema.one(this.parent);
    }
    /**
     * Attach the relational key to the given data. For example, when Post
     * belongs to User, it will attach value to the `user_id` field of
     * Post record.
     */
    attach(key, record, data) {
        // See if the record has the foreign key, if yes, it means the user has
        // provided the key explicitly so do nothing and return.
        if (record[this.foreignKey] !== undefined) {
            return;
        }
        // If there is no foreign key, let's set it here.
        record[this.foreignKey] =
            data[this.parent.entity] && data[this.parent.entity][key]
                ? data[this.parent.entity][key][this.ownerKey]
                : key;
    }
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value, _parent, _key) {
        return this.makeOneRelation(value, this.parent);
    }
    /**
     * Load the belongs to relationship for the collection.
     */
    load(query, collection, name, constraints) {
        const relation = this.getRelation(query, this.parent.entity, constraints);
        this.addEagerConstraints(relation, collection);
        this.match(collection, relation.get(), name);
    }
    /**
     * Set the constraints for an eager load of the relation.
     */
    addEagerConstraints(relation, collection) {
        relation.whereFk(this.ownerKey, this.getKeys(collection, this.foreignKey));
    }
    /**
     * Match the eagerly loaded results to their parents.
     */
    match(collection, relations, name) {
        const dictionary = this.buildDictionary(relations);
        collection.forEach((model) => {
            const id = model[this.foreignKey];
            const relation = id !== null ? dictionary[id] : null;
            model[name] = relation || null;
        });
    }
    /**
     * Build model dictionary keyed by the relation's foreign key.
     */
    buildDictionary(relations) {
        return relations.reduce((dictionary, relation) => {
            const key = relation[this.ownerKey];
            dictionary[key] = relation;
            return dictionary;
        }, {});
    }
}

class HasMany extends Relation {
    /**
     * Create a new has many instance.
     */
    constructor(model, related, foreignKey, localKey) {
        super(model); /* istanbul ignore next */
        this.related = this.model.relation(related);
        this.foreignKey = foreignKey;
        this.localKey = localKey;
    }
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema) {
        return schema.many(this.related);
    }
    /**
     * Attach the relational key to the given data.
     */
    attach(key, record, data) {
        key.forEach((index) => {
            const related = data[this.related.entity];
            if (!related ||
                !related[index] ||
                related[index][this.foreignKey] !== undefined) {
                return;
            }
            related[index][this.foreignKey] = record[this.localKey];
        });
    }
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value, _parent, _key) {
        return this.makeManyRelation(value, this.related);
    }
    /**
     * Load the has many relationship for the collection.
     */
    load(query, collection, name, constraints) {
        const relation = this.getRelation(query, this.related.entity, constraints);
        this.addEagerConstraints(relation, collection);
        this.match(collection, relation.get(), name);
    }
    /**
     * Set the constraints for an eager load of the relation.
     */
    addEagerConstraints(relation, collection) {
        relation.whereFk(this.foreignKey, this.getKeys(collection, this.localKey));
    }
    /**
     * Match the eagerly loaded results to their parents.
     */
    match(collection, relations, name) {
        const dictionary = this.buildDictionary(relations);
        collection.forEach((model) => {
            const id = model[this.localKey];
            const relation = dictionary[id];
            model[name] = relation || [];
        });
    }
    /**
     * Build model dictionary keyed by the relation's foreign key.
     */
    buildDictionary(relations) {
        return relations.reduce((dictionary, relation) => {
            const key = relation[this.foreignKey];
            if (!dictionary[key]) {
                dictionary[key] = [];
            }
            dictionary[key].push(relation);
            return dictionary;
        }, {});
    }
}

class HasManyBy extends Relation {
    /**
     * Create a new has many by instance.
     */
    constructor(model, parent, foreignKey, ownerKey) {
        super(model); /* istanbul ignore next */
        this.parent = this.model.relation(parent);
        this.foreignKey = foreignKey;
        this.ownerKey = ownerKey;
    }
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema) {
        return schema.many(this.parent);
    }
    /**
     * Attach the relational key to the given data.
     */
    attach(key, record, _data) {
        if (key.length === 0) {
            return;
        }
        record[this.foreignKey] = key.map((parentId) => {
            return this.parent.getIdFromRecord(_data[this.parent.entity][parentId]);
        });
    }
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value, _parent, _key) {
        return this.makeManyRelation(value, this.parent);
    }
    /**
     * Load the has many by relationship for the collection.
     */
    load(query, collection, name, constraints) {
        const relatedQuery = this.getRelation(query, this.parent.entity, constraints);
        this.addConstraintForHasManyBy(relatedQuery, collection);
        const relations = this.mapSingleRelations(relatedQuery.get(), this.ownerKey);
        collection.forEach((item) => {
            const related = this.getRelatedRecords(relations, item[this.foreignKey]);
            item[name] = related;
        });
    }
    /**
     * Set the constraints for an eager load of the relation.
     */
    addConstraintForHasManyBy(query, collection) {
        const keys = collection.reduce((keys, item) => {
            return keys.concat(item[this.foreignKey]);
        }, []);
        query.where(this.ownerKey, keys);
    }
    /**
     * Get related records.
     */
    getRelatedRecords(relations, keys) {
        const records = [];
        relations.forEach((record, id) => {
            if (keys.indexOf(id) !== -1) {
                records.push(record);
            }
        });
        return records;
    }
}

class HasManyThrough extends Relation {
    /**
     * Create a new has many through instance.
     */
    constructor(model, related, through, firstKey, secondKey, localKey, secondLocalKey) {
        super(model); /* istanbul ignore next */
        this.related = this.model.relation(related);
        this.through = this.model.relation(through);
        this.firstKey = firstKey;
        this.secondKey = secondKey;
        this.localKey = localKey;
        this.secondLocalKey = secondLocalKey;
    }
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema) {
        return schema.many(this.related);
    }
    /**
     * Attach the relational key to the given data. Since has many through
     * relationship doesn't have any foreign key, it would do nothing.
     */
    attach(_key, _record, _data) {
        return;
    }
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value, _parent, _key) {
        return this.makeManyRelation(value, this.related);
    }
    /**
     * Load the has many through relationship for the collection.
     */
    load(query, collection, name, constraints) {
        const relatedQuery = this.getRelation(query, this.related.entity, constraints);
        const throughQuery = query.newQuery(this.through.entity);
        this.addEagerConstraintForThrough(throughQuery, collection);
        const throughs = throughQuery.get();
        this.addEagerConstraintForRelated(relatedQuery, throughs);
        const relateds = this.mapThroughRelations(throughs, relatedQuery);
        collection.forEach((item) => {
            const related = relateds[item[this.localKey]];
            item[name] = related || [];
        });
    }
    /**
     * Set the constraints for the through relation.
     */
    addEagerConstraintForThrough(query, collection) {
        query.where(this.firstKey, this.getKeys(collection, this.localKey));
    }
    /**
     * Set the constraints for the related relation.
     */
    addEagerConstraintForRelated(query, collection) {
        query.where(this.secondKey, this.getKeys(collection, this.secondLocalKey));
    }
    /**
     * Create a new indexed map for the through relation.
     */
    mapThroughRelations(throughs, relatedQuery) {
        const relations = this.mapManyRelations(relatedQuery.get(), this.secondKey);
        return throughs.reduce((records, record) => {
            const id = record[this.firstKey];
            if (!records[id]) {
                records[id] = [];
            }
            const related = relations.get(record[this.secondLocalKey]);
            if (related === undefined) {
                return records;
            }
            records[id] = records[id].concat(related);
            return records;
        }, {});
    }
}

class BelongsToMany extends Relation {
    /**
     * Create a new belongs to instance.
     */
    constructor(model, related, pivot, foreignPivotKey, relatedPivotKey, parentKey, relatedKey) {
        super(model); /* istanbul ignore next */
        /**
         * The key name of the pivot data.
         */
        this.pivotKey = 'pivot';
        this.related = this.model.relation(related);
        this.pivot = this.model.relation(pivot);
        this.foreignPivotKey = foreignPivotKey;
        this.relatedPivotKey = relatedPivotKey;
        this.parentKey = parentKey;
        this.relatedKey = relatedKey;
    }
    /**
     * Specify the custom pivot accessor to use for the relationship.
     */
    as(accessor) {
        this.pivotKey = accessor;
        return this;
    }
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema) {
        return schema.many(this.related);
    }
    /**
     * Attach the relational key to the given data. Since belongs to many
     * relationship doesn't have any foreign key, it would do nothing.
     */
    attach(_key, _record, _data) {
        return;
    }
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value, _parent, _key) {
        return this.makeManyRelation(value, this.related);
    }
    /**
     * Load the belongs to relationship for the record.
     */
    load(query, collection, name, constraints) {
        const relatedQuery = this.getRelation(query, this.related.entity, constraints);
        const pivotQuery = query.newQuery(this.pivot.entity);
        this.addEagerConstraintForPivot(pivotQuery, collection);
        const pivots = pivotQuery.get();
        this.addEagerConstraintForRelated(relatedQuery, pivots);
        const relateds = this.mapPivotRelations(pivots, relatedQuery);
        collection.forEach((item) => {
            const related = relateds[item[this.parentKey]];
            item[name] = related || [];
        });
    }
    /**
     * Set the constraints for the pivot relation.
     */
    addEagerConstraintForPivot(query, collection) {
        query.whereFk(this.foreignPivotKey, this.getKeys(collection, this.parentKey));
    }
    /**
     * Set the constraints for the related relation.
     */
    addEagerConstraintForRelated(query, collection) {
        query.whereFk(this.relatedKey, this.getKeys(collection, this.relatedPivotKey));
    }
    /**
     * Create a new indexed map for the pivot relation.
     */
    mapPivotRelations(pivots, relatedQuery) {
        const relations = this.mapManyRelations(relatedQuery.get(), this.relatedKey);
        if (relatedQuery.orders.length) {
            return this.mapRelationsByOrders(pivots, relations, this.foreignPivotKey, this.relatedPivotKey);
        }
        return pivots.reduce((records, record) => {
            const id = record[this.foreignPivotKey];
            if (!records[id]) {
                records[id] = [];
            }
            const related = relations.get(record[this.relatedPivotKey]);
            if (related) {
                records[id] = records[id].concat(related.map((model) => {
                    model[this.pivotKey] = record;
                    return model;
                }));
            }
            return records;
        }, {});
    }
    /**
     * Create pivot records for the given records if needed.
     */
    createPivots(parent, data, key) {
        if (!Utils.isArray(this.pivot.primaryKey))
            return data;
        Utils.forOwn(data[parent.entity], (record) => {
            const related = record[key];
            if (related === undefined || related.length === 0) {
                return;
            }
            this.createPivotRecord(data, record, related);
        });
        return data;
    }
    /**
     * Create a pivot record.
     */
    createPivotRecord(data, record, related) {
        related.forEach((id) => {
            const parentId = record[this.parentKey];
            const relatedId = data[this.related.entity][id][this.relatedKey];
            const pivotKey = JSON.stringify([
                this.pivot.primaryKey[0] === this.foreignPivotKey
                    ? parentId
                    : relatedId,
                this.pivot.primaryKey[1] === this.foreignPivotKey ? parentId : relatedId
            ]);
            const pivotRecord = data[this.pivot.entity]
                ? data[this.pivot.entity][pivotKey]
                : {};
            const pivotData = data[this.related.entity][id][this.pivotKey] || {};
            data[this.pivot.entity] = {
                ...data[this.pivot.entity],
                [pivotKey]: {
                    ...pivotRecord,
                    ...pivotData,
                    $id: pivotKey,
                    [this.foreignPivotKey]: parentId,
                    [this.relatedPivotKey]: relatedId
                }
            };
        });
    }
}

class MorphTo extends Relation {
    /**
     * Create a new morph to instance.
     */
    constructor(model, id, type) {
        super(model); /* istanbul ignore next */
        this.id = id;
        this.type = type;
    }
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema) {
        return schema.union((_value, parentValue) => parentValue[this.type]);
    }
    /**
     * Attach the relational key to the given record. Since morph to
     * relationship doesn't have any foreign key, it would do nothing.
     */
    attach(_key, _record, _data) {
        return;
    }
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value, parent, _key) {
        const related = parent[this.type];
        try {
            const model = this.model.relation(related);
            return this.makeOneRelation(value, model);
        }
        catch (_a) {
            return null;
        }
    }
    /**
     * Load the morph to relationship for the collection.
     */
    load(query, collection, name, constraints) {
        const types = this.getTypes(collection);
        const relations = types.reduce((related, type) => {
            const relatedQuery = this.getRelation(query, type, constraints);
            related[type] = this.mapSingleRelations(relatedQuery.get(), '$id');
            return related;
        }, {});
        collection.forEach((item) => {
            const id = item[this.id];
            const type = item[this.type];
            const related = relations[type].get(String(id));
            item[name] = related || null;
        });
    }
    /**
     * Get all types from the collection.
     */
    getTypes(collection) {
        return collection.reduce((types, item) => {
            const type = item[this.type];
            !types.includes(type) && types.push(type);
            return types;
        }, []);
    }
}

class MorphOne extends Relation {
    /**
     * Create a new belongs to instance.
     */
    constructor(model, related, id, type, localKey) {
        super(model); /* istanbul ignore next */
        this.related = this.model.relation(related);
        this.id = id;
        this.type = type;
        this.localKey = localKey;
    }
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema) {
        return schema.one(this.related);
    }
    /**
     * Attach the relational key to the given data.
     */
    attach(key, record, data) {
        const relatedRecord = data[this.related.entity][key];
        relatedRecord[this.id] =
            relatedRecord[this.id] || this.related.getIdFromRecord(record);
        relatedRecord[this.type] = relatedRecord[this.type] || this.model.entity;
    }
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value, _parent, _key) {
        return this.makeOneRelation(value, this.related);
    }
    /**
     * Load the morph many relationship for the record.
     */
    load(query, collection, name, constraints) {
        const relatedQuery = this.getRelation(query, this.related.entity, constraints);
        this.addEagerConstraintForMorphOne(relatedQuery, collection, query.entity);
        const relations = this.mapSingleRelations(relatedQuery.get(), this.id);
        collection.forEach((item) => {
            const related = relations.get(item[this.localKey]);
            item[name] = related || null;
        });
    }
    /**
     * Set the constraints for an eager load of the relation.
     */
    addEagerConstraintForMorphOne(query, collection, type) {
        query
            .whereFk(this.type, type)
            .whereFk(this.id, this.getKeys(collection, this.localKey));
    }
}

class MorphMany extends Relation {
    /**
     * Create a new belongs to instance.
     */
    constructor(model, related, id, type, localKey) {
        super(model); /* istanbul ignore next */
        this.related = this.model.relation(related);
        this.id = id;
        this.type = type;
        this.localKey = localKey;
    }
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema) {
        return schema.many(this.related);
    }
    /**
     * Attach the relational key to the given data.
     */
    attach(key, record, data) {
        const relatedItems = data[this.related.entity];
        key.forEach((id) => {
            const relatedItem = relatedItems[id];
            relatedItem[this.id] =
                relatedItem[this.id] || this.related.getIdFromRecord(record);
            relatedItem[this.type] = relatedItem[this.type] || this.model.entity;
        });
    }
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value, _parent, _key) {
        return this.makeManyRelation(value, this.related);
    }
    /**
     * Load the morph many relationship for the record.
     */
    load(query, collection, name, constraints) {
        const relatedQuery = this.getRelation(query, this.related.entity, constraints);
        this.addEagerConstraintForMorphMany(relatedQuery, collection, query.entity);
        const relations = this.mapManyRelations(relatedQuery.get(), this.id);
        collection.forEach((item) => {
            const related = relations.get(item[this.localKey]);
            item[name] = related || [];
        });
    }
    /**
     * Set the constraints for an eager load of the relation.
     */
    addEagerConstraintForMorphMany(query, collection, type) {
        query
            .whereFk(this.type, type)
            .whereFk(this.id, this.getKeys(collection, this.localKey));
    }
}

class MorphToMany extends Relation {
    /**
     * Create a new belongs to instance.
     */
    constructor(model, related, pivot, relatedId, id, type, parentKey, relatedKey) {
        super(model); /* istanbul ignore next */
        /**
         * The key name of the pivot data.
         */
        this.pivotKey = 'pivot';
        this.related = this.model.relation(related);
        this.pivot = this.model.relation(pivot);
        this.relatedId = relatedId;
        this.id = id;
        this.type = type;
        this.parentKey = parentKey;
        this.relatedKey = relatedKey;
    }
    /**
     * Specify the custom pivot accessor to use for the relationship.
     */
    as(accessor) {
        this.pivotKey = accessor;
        return this;
    }
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema) {
        return schema.many(this.related);
    }
    /**
     * Attach the relational key to the given record. Since morph to many
     * relationship doesn't have any foreign key, it would do nothing.
     */
    attach(_key, _record, _data) {
        return;
    }
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value, _parent, _key) {
        return this.makeManyRelation(value, this.related);
    }
    /**
     * Load the morph to many relationship for the collection.
     */
    load(query, collection, name, constraints) {
        const relatedQuery = this.getRelation(query, this.related.entity, constraints);
        const pivotQuery = query.newQuery(this.pivot.entity);
        this.addEagerConstraintForPivot(pivotQuery, collection, query.entity);
        const pivots = pivotQuery.get();
        this.addEagerConstraintForRelated(relatedQuery, pivots);
        const relateds = this.mapPivotRelations(pivots, relatedQuery);
        collection.forEach((item) => {
            const related = relateds[item[this.parentKey]];
            item[name] = related || [];
        });
    }
    /**
     * Set the constraints for the pivot relation.
     */
    addEagerConstraintForPivot(query, collection, type) {
        query
            .whereFk(this.type, type)
            .whereFk(this.id, this.getKeys(collection, this.parentKey));
    }
    /**
     * Set the constraints for the related relation.
     */
    addEagerConstraintForRelated(query, collection) {
        query.whereFk(this.relatedKey, this.getKeys(collection, this.relatedId));
    }
    /**
     * Create a new indexed map for the pivot relation.
     */
    mapPivotRelations(pivots, relatedQuery) {
        const relations = this.mapManyRelations(relatedQuery.get(), this.relatedKey);
        if (relatedQuery.orders.length) {
            return this.mapRelationsByOrders(pivots, relations, this.id, this.relatedId);
        }
        return pivots.reduce((records, record) => {
            const id = record[this.id];
            if (!records[id]) {
                records[id] = [];
            }
            const related = relations.get(record[this.relatedId]);
            /* istanbul ignore if */
            if (related === undefined || related.length === 0) {
                return records;
            }
            records[id] = records[id].concat(related.map((model) => {
                model[this.pivotKey] = record;
                return model;
            }));
            return records;
        }, {});
    }
    /**
     * Create pivot records for the given records if needed.
     */
    createPivots(parent, data, key) {
        Utils.forOwn(data[parent.entity], (record) => {
            const relatedIds = parent
                .query()
                .newQuery(this.pivot.entity)
                .where(this.id, record[this.parentKey])
                .where(this.type, parent.entity)
                .get();
            const relateds = (record[key] || []).filter((relatedId) => !relatedIds.includes(relatedId));
            if (!Utils.isArray(relateds) || relateds.length === 0) {
                return;
            }
            this.createPivotRecord(parent, data, record, relateds);
        });
        return data;
    }
    /**
     * Create a pivot record.
     */
    createPivotRecord(parent, data, record, related) {
        related.forEach((id) => {
            const parentId = record[this.parentKey];
            const relatedId = data[this.related.entity][id][this.relatedKey];
            const pivotKey = `${parentId}_${id}_${parent.entity}`;
            const pivotData = data[this.related.entity][id][this.pivotKey] || {};
            data[this.pivot.entity] = {
                ...data[this.pivot.entity],
                [pivotKey]: {
                    ...pivotData,
                    $id: pivotKey,
                    [this.relatedId]: relatedId,
                    [this.id]: parentId,
                    [this.type]: parent.entity
                }
            };
        });
    }
}

class MorphedByMany extends Relation {
    /**
     * Create a new belongs to instance.
     */
    constructor(model, related, pivot, relatedId, id, type, parentKey, relatedKey) {
        super(model); /* istanbul ignore next */
        /**
         * The key name of the pivot data.
         */
        this.pivotKey = 'pivot';
        this.related = this.model.relation(related);
        this.pivot = this.model.relation(pivot);
        this.relatedId = relatedId;
        this.id = id;
        this.type = type;
        this.parentKey = parentKey;
        this.relatedKey = relatedKey;
    }
    /**
     * Specify the custom pivot accessor to use for the relationship.
     */
    as(accessor) {
        this.pivotKey = accessor;
        return this;
    }
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema) {
        return schema.many(this.related);
    }
    /**
     * Attach the relational key to the given data. Since morphed by many
     * relationship doesn't have any foreign key, it would do nothing.
     */
    attach(_key, _record, _data) {
        return;
    }
    /**
     * Make value to be set to model property. This method is used when
     * instantiating a model or creating a plain object from a model.
     */
    make(value, _parent, _key) {
        return this.makeManyRelation(value, this.related);
    }
    /**
     * Load the morph many relationship for the record.
     */
    load(query, collection, name, constraints) {
        const relatedQuery = this.getRelation(query, this.related.entity, constraints);
        const pivotQuery = query.newQuery(this.pivot.entity);
        this.addEagerConstraintForPivot(pivotQuery, collection, this.related.entity);
        const pivots = pivotQuery.get();
        this.addEagerConstraintForRelated(relatedQuery, pivots);
        const relateds = this.mapPivotRelations(pivots, relatedQuery);
        collection.forEach((item) => {
            const related = relateds[item[this.parentKey]];
            item[name] = related || [];
        });
    }
    /**
     * Set the constraints for the pivot relation.
     */
    addEagerConstraintForPivot(query, collection, type) {
        query
            .whereFk(this.type, type)
            .whereFk(this.relatedId, this.getKeys(collection, this.parentKey));
    }
    /**
     * Set the constraints for the related relation.
     */
    addEagerConstraintForRelated(query, collection) {
        query.whereFk(this.relatedKey, this.getKeys(collection, this.id));
    }
    /**
     * Create a new indexed map for the pivot relation.
     */
    mapPivotRelations(pivots, relatedQuery) {
        const relations = this.mapManyRelations(relatedQuery.get(), this.relatedKey);
        if (relatedQuery.orders.length) {
            return this.mapRelationsByOrders(pivots, relations, this.relatedId, this.id);
        }
        return pivots.reduce((records, record) => {
            const id = record[this.relatedId];
            if (!records[id]) {
                records[id] = [];
            }
            const related = relations.get(record[this.id]);
            /* istanbul ignore if */
            if (related === undefined || related.length === 0) {
                return records;
            }
            records[id] = records[id].concat(related.map((model) => {
                model[this.pivotKey] = record;
                return model;
            }));
            return records;
        }, {});
    }
    /**
     * Create pivot records for the given records if needed.
     */
    createPivots(parent, data, key) {
        Utils.forOwn(data[parent.entity], (record) => {
            const related = record[key];
            if (!Utils.isArray(related)) {
                return;
            }
            this.createPivotRecord(data, record, related);
        });
        return data;
    }
    /**
     * Create a pivot record.
     */
    createPivotRecord(data, record, related) {
        related.forEach((id) => {
            const parentId = record[this.parentKey];
            const pivotKey = `${id}_${parentId}_${this.related.entity}`;
            const pivotData = data[this.related.entity][id][this.pivotKey] || {};
            data[this.pivot.entity] = {
                ...data[this.pivot.entity],
                [pivotKey]: {
                    ...pivotData,
                    $id: pivotKey,
                    [this.relatedId]: parentId,
                    [this.id]: this.model.getIdFromRecord(data[this.related.entity][id]),
                    [this.type]: this.related.entity
                }
            };
        });
    }
}

const defaultOption = {
    relations: true
};
/**
 * Serialize the given model to attributes. This method will ignore
 * relationships, and it includes the index id.
 */
function toAttributes(model) {
    const record = toJson(model, { relations: false });
    record.$id = model.$id;
    return record;
}
/**
 * Serialize given model POJO.
 */
function toJson(model, option = {}) {
    option = { ...defaultOption, ...option };
    const record = {};
    const fields = model.$fields();
    for (const key in fields) {
        const f = fields[key];
        const v = model[key];
        if (f instanceof Relation) {
            record[key] = option.relations ? relation(v) : emptyRelation(v);
            continue;
        }
        record[key] = value(model[key]);
    }
    return record;
}
/**
 * Serialize given value.
 */
function value(v) {
    if (v === null) {
        return null;
    }
    if (isArray(v)) {
        return array(v);
    }
    if (typeof v === 'object') {
        return object(v);
    }
    return v;
}
/**
 * Serialize an array into json.
 */
function array(a) {
    return a.map((v) => value(v));
}
/**
 * Serialize an object into json.
 */
function object(o) {
    const obj = {};
    for (const key in o) {
        obj[key] = value(o[key]);
    }
    return obj;
}
function relation(relation) {
    if (relation === null) {
        return null;
    }
    if (isArray(relation)) {
        return relation.map((model) => model.$toJson());
    }
    return relation.$toJson();
}
function emptyRelation(relation) {
    return isArray(relation) ? [] : null;
}

class Model {
    /**
     * Create a new model instance.
     */
    constructor(record) {
        /**
         * The index ID for the model.
         */
        this.$id = null;
        this.$fill(record);
    }
    /**
     * The definition of the fields of the model and its relations.
     */
    static fields() {
        return {};
    }
    /**
     * Create an attr attribute.
     */
    static attr(value, mutator) {
        return new Attr(this, value, mutator);
    }
    /**
     * Create a string attribute.
     */
    static string(value, mutator) {
        return new String$1(this, value, mutator);
    }
    /**
     * Create a number attribute.
     */
    static number(value, mutator) {
        return new Number(this, value, mutator);
    }
    /**
     * Create a boolean attribute.
     */
    static boolean(value, mutator) {
        return new Boolean(this, value, mutator);
    }
    /**
     * Create an uid attribute.
     */
    static uid(value) {
        return new Uid(this, value);
    }
    /**
     * @deprecated Use `uid` attribute instead.
     */
    static increment() {
        return this.uid();
    }
    /**
     * Create a has one relationship.
     */
    static hasOne(related, foreignKey, localKey) {
        return new HasOne(this, related, foreignKey, this.localKey(localKey));
    }
    /**
     * Create a belongs to relationship.
     */
    static belongsTo(parent, foreignKey, ownerKey) {
        return new BelongsTo(this, parent, foreignKey, this.relation(parent).localKey(ownerKey));
    }
    /**
     * Create a has many relationship.
     */
    static hasMany(related, foreignKey, localKey) {
        return new HasMany(this, related, foreignKey, this.localKey(localKey));
    }
    /**
     * Create a has many by relationship.
     */
    static hasManyBy(parent, foreignKey, ownerKey) {
        return new HasManyBy(this, parent, foreignKey, this.relation(parent).localKey(ownerKey));
    }
    /**
     * Create a has many through relationship.
     */
    static hasManyThrough(related, through, firstKey, secondKey, localKey, secondLocalKey) {
        return new HasManyThrough(this, related, through, firstKey, secondKey, this.localKey(localKey), this.relation(through).localKey(secondLocalKey));
    }
    /**
     * Create a belongs to many relationship.
     */
    static belongsToMany(related, pivot, foreignPivotKey, relatedPivotKey, parentKey, relatedKey) {
        return new BelongsToMany(this, related, pivot, foreignPivotKey, relatedPivotKey, this.localKey(parentKey), this.relation(related).localKey(relatedKey));
    }
    /**
     * Create a morph to relationship.
     */
    static morphTo(id, type) {
        return new MorphTo(this, id, type);
    }
    /**
     * Create a morph one relationship.
     */
    static morphOne(related, id, type, localKey) {
        return new MorphOne(this, related, id, type, this.localKey(localKey));
    }
    /**
     * Create a morph many relationship.
     */
    static morphMany(related, id, type, localKey) {
        return new MorphMany(this, related, id, type, this.localKey(localKey));
    }
    /**
     * Create a morph to many relationship.
     */
    static morphToMany(related, pivot, relatedId, id, type, parentKey, relatedKey) {
        return new MorphToMany(this, related, pivot, relatedId, id, type, this.localKey(parentKey), this.relation(related).localKey(relatedKey));
    }
    /**
     * Create a morphed by many relationship.
     */
    static morphedByMany(related, pivot, relatedId, id, type, parentKey, relatedKey) {
        return new MorphedByMany(this, related, pivot, relatedId, id, type, this.localKey(parentKey), this.relation(related).localKey(relatedKey));
    }
    /**
     * Mutators to mutate matching fields when instantiating the model.
     */
    static mutators() {
        return {};
    }
    /**
     * Types mapping used to dispatch entities based on their discriminator field
     */
    static types() {
        return {};
    }
    /**
     * Get the store instance from the container.
     */
    static store() {
        return Container.store;
    }
    /**
     * Get the database instance from store.
     */
    static database() {
        return this.store().$db();
    }
    /**
     * Create a namespaced method name for Vuex Module from the given
     * method name.
     */
    static namespace(method) {
        return `${this.database().namespace}/${this.entity}/${method}`;
    }
    /**
     * Call Vuex Getters.
     */
    static getters(method) {
        return this.store().getters[this.namespace(method)];
    }
    /**
     * Dispatch Vuex Action.
     */
    static dispatch(method, payload) {
        return this.store().dispatch(this.namespace(method), payload);
    }
    /**
     * Commit Vuex Mutation.
     */
    static commit(callback) {
        this.store().commit(`${this.database().namespace}/$mutate`, {
            entity: this.entity,
            callback
        });
    }
    /**
     * Get the Model schema definition from the cache.
     */
    static getFields() {
        if (!this.cachedFields) {
            this.cachedFields = {};
        }
        if (this.cachedFields[this.entity]) {
            return this.cachedFields[this.entity];
        }
        this.cachedFields[this.entity] = this.fields();
        return this.cachedFields[this.entity];
    }
    /**
     * Get all records.
     */
    static all() {
        return this.getters('all')();
    }
    /**
     * Find a record.
     */
    static find(id) {
        return this.getters('find')(id);
    }
    /**
     * Get the record of the given array of ids.
     */
    static findIn(idList) {
        return this.getters('findIn')(idList);
    }
    /**
     * Get query instance.
     */
    static query() {
        return this.getters('query')();
    }
    /**
     * Check wether the associated database contains data.
     */
    static exists() {
        return this.query().exists();
    }
    /**
     * Create new data with all fields filled by default values.
     */
    static new() {
        return this.dispatch('new');
    }
    /**
     * Save given data to the store by replacing all existing records in the
     * store. If you want to save data without replacing existing records,
     * use the `insert` method instead.
     */
    static create(payload) {
        return this.dispatch('create', payload);
    }
    /**
     * Insert records.
     */
    static insert(payload) {
        return this.dispatch('insert', payload);
    }
    /**
     * Update records.
     */
    static update(payload) {
        return this.dispatch('update', payload);
    }
    /**
     * Insert or update records.
     */
    static insertOrUpdate(payload) {
        return this.dispatch('insertOrUpdate', payload);
    }
    static delete(payload) {
        return this.dispatch('delete', payload);
    }
    /**
     * Delete all records from the store.
     */
    static deleteAll() {
        return this.dispatch('deleteAll');
    }
    /**
     * Check if the given key is the primary key. If the model has composite
     * primary key, this method is going to check if the given key is included
     * in the composite key.
     */
    static isPrimaryKey(key) {
        if (!Utils.isArray(this.primaryKey)) {
            return this.primaryKey === key;
        }
        return this.primaryKey.includes(key);
    }
    /**
     * Check if the primary key is a composite key.
     */
    static isCompositePrimaryKey() {
        return Utils.isArray(this.primaryKey);
    }
    /**
     * Get the id (value of primary key) from teh given record. If primary key is
     * not present, or it is invalid primary key value, which is other than
     * `string` or `number`, it's going to return `null`.
     *
     * If the model has composite key, it's going to return array of ids. If any
     * composite key missing, it will return `null`.
     */
    static getIdFromRecord(record) {
        const key = this.primaryKey;
        if (typeof key === 'string') {
            return this.getIdFromValue(record[key]);
        }
        const ids = key.reduce((keys, k) => {
            const id = this.getIdFromValue(record[k]);
            id !== null && keys.push(id);
            return keys;
        }, []);
        return ids.length === key.length ? ids : null;
    }
    /**
     * Get correct index id, which is `string` | `number`, from the given value.
     */
    static getIdFromValue(value) {
        if (typeof value === 'string' && value !== '') {
            return value;
        }
        if (typeof value === 'number') {
            return value;
        }
        return null;
    }
    /**
     * Get the index ID value from the given record. An index ID is a value that
     * used as a key for records within the Vuex Store.
     *
     * Most of the time, it's same as the value for the Model's primary key but
     * it's always `string`, even if the primary key value is `number`.
     *
     * If the Model has a composite primary key, each value corresponding to
     * those primary key will be stringified and become a single string value
     * such as `'[1,2]'`.
     *
     * If the primary key is not present at the given record, it returns `null`.
     * For the composite primary key, every key must exist at a given record,
     * or it will return `null`.
     */
    static getIndexIdFromRecord(record) {
        const id = this.getIdFromRecord(record);
        if (id === null) {
            return null;
        }
        if (Utils.isArray(id)) {
            return JSON.stringify(id);
        }
        return String(id);
    }
    /**
     * Get local key to pass to the attributes.
     */
    static localKey(key) {
        if (key) {
            return key;
        }
        return typeof this.primaryKey === 'string' ? this.primaryKey : 'id';
    }
    /**
     * Get the model object that matches the given record type. The method is for
     * getting the correct model object when the model has any inheritance
     * children model.
     *
     * For example, if a User Model have `static types()` declared, and if you
     * pass record with `{ type: 'admin' }`, then the method will likely to
     * return SuperUser class.
     */
    static getModelFromRecord(record) {
        // If the given record is already a model instance, return the
        // model object.
        if (record instanceof this) {
            return record.$self();
        }
        // Else, get the corresponding model for the type value if there's any.
        return this.getTypeModel(record[this.typeKey]);
    }
    /**
     * Get a model from the container.
     */
    static relation(model) {
        if (typeof model !== 'string') {
            return model;
        }
        return this.database().model(model);
    }
    /**
     * Get all `belongsToMany` fields from the schema.
     */
    static pivotFields() {
        const fields = [];
        Utils.forOwn(this.getFields(), (field, key) => {
            if (field instanceof BelongsToMany ||
                field instanceof MorphToMany ||
                field instanceof MorphedByMany) {
                fields.push({ [key]: field });
            }
        });
        return fields;
    }
    /**
     * Check if fields contains the `belongsToMany` field type.
     */
    static hasPivotFields() {
        return this.pivotFields().length > 0;
    }
    /**
     * Check if the current model has a type definition
     */
    static hasTypes() {
        return Object.keys(this.types()).length > 0;
    }
    /**
     * Get the model corresponding to the given type name. If it can't be found,
     * it'll return `null`.
     */
    static getTypeModel(name) {
        const model = this.types()[name];
        if (!model) {
            return null;
        }
        return model;
    }
    /**
     * Given a Model, this returns the corresponding key in the InheritanceTypes mapping
     */
    static getTypeKeyValueFromModel(model) {
        const modelToCheck = model || this;
        const types = this.types();
        for (const type in types) {
            if (types[type].entity === modelToCheck.entity) {
                return type;
            }
        }
        return null;
    }
    /**
     * Tries to find a Relation field in all types defined in the InheritanceTypes mapping
     */
    static findRelationInSubTypes(relationName) {
        const types = this.types();
        for (const type in types) {
            const fields = types[type].getFields();
            for (const fieldName in fields) {
                if (fieldName === relationName &&
                    fields[fieldName] instanceof Relation) {
                    return fields[fieldName];
                }
            }
        }
        return null;
    }
    /**
     * Fill any missing fields in the given record with the default value defined
     * in the model schema.
     */
    static hydrate(record) {
        return new this(record).$getAttributes();
    }
    /**
     * Get the constructor of this model.
     */
    $self() {
        return this.constructor;
    }
    /**
     * Get the primary key for the model.
     */
    $primaryKey() {
        return this.$self().primaryKey;
    }
    /**
     * The definition of the fields of the model and its relations.
     */
    $fields() {
        return this.$self().getFields();
    }
    /**
     * Set index id.
     */
    $setIndexId(id) {
        this.$id = id;
        return this;
    }
    /**
     * Get the store instance from the container.
     */
    $store() {
        return this.$self().store();
    }
    /**
     * Create a namespaced method name for Vuex Module from the given
     * method name.
     */
    $namespace(method) {
        return this.$self().namespace(method);
    }
    /**
     * Call Vuex Getetrs.
     */
    $getters(method) {
        return this.$self().getters(method);
    }
    /**
     * Dispatch Vuex Action.
     */
    async $dispatch(method, payload) {
        return this.$self().dispatch(method, payload);
    }
    /**
     * Get all records.
     */
    $all() {
        return this.$getters('all')();
    }
    /**
     * Find a record.
     */
    $find(id) {
        return this.$getters('find')(id);
    }
    /**
     * Find record of the given array of ids.
     */
    $findIn(idList) {
        return this.$getters('findIn')(idList);
    }
    /**
     * Get query instance.
     */
    $query() {
        return this.$getters('query')();
    }
    /**
     * Create records.
     */
    async $create(payload) {
        return this.$dispatch('create', payload);
    }
    /**
     * Create records.
     */
    async $insert(payload) {
        return this.$dispatch('insert', payload);
    }
    /**
     * Update records.
     */
    async $update(payload) {
        if (Utils.isArray(payload)) {
            return this.$dispatch('update', payload);
        }
        if (payload.where !== undefined) {
            return this.$dispatch('update', payload);
        }
        if (this.$self().getIndexIdFromRecord(payload) === null) {
            return this.$dispatch('update', {
                where: this.$self().getIdFromRecord(this),
                data: payload
            });
        }
        return this.$dispatch('update', payload);
    }
    /**
     * Insert or update records.
     */
    async $insertOrUpdate(payload) {
        return this.$dispatch('insertOrUpdate', payload);
    }
    /**
     * Save record.
     */
    async $save() {
        const fields = this.$self().getFields();
        const record = Object.keys(fields).reduce((record, key) => {
            if (fields[key] instanceof Type) {
                record[key] = this[key];
            }
            return record;
        }, {});
        const records = await this.$dispatch('insertOrUpdate', { data: record });
        this.$fill(records[this.$self().entity][0]);
        return this;
    }
    /**
     * Delete records that matches the given condition.
     */
    async $delete() {
        const primaryKey = this.$primaryKey();
        if (!Utils.isArray(primaryKey)) {
            return this.$dispatch('delete', this[primaryKey]);
        }
        return this.$dispatch('delete', (model) => {
            return primaryKey.every((id) => model[id] === this[id]);
        });
    }
    /**
     * Delete all records.
     */
    async $deleteAll() {
        return this.$dispatch('deleteAll');
    }
    /**
     * Fill the model instance with the given record. If no record were passed,
     * or if the record has any missing fields, each value of the fields will
     * be filled with its default value defined at model fields definition.
     */
    $fill(record = {}) {
        const fields = this.$fields();
        for (const key in fields) {
            const field = fields[key];
            const value = record[key];
            this[key] = field.make(value, record, key);
        }
        // If the record contains index id, set it to the model.
        record.$id !== undefined && this.$setIndexId(record.$id);
    }
    /**
     * Generate missing primary ids and index id.
     */
    $generateId() {
        return this.$generatePrimaryId().$generateIndexId();
    }
    /**
     * Generate any missing primary ids.
     */
    $generatePrimaryId() {
        const key = this.$self().primaryKey;
        const keys = Utils.isArray(key) ? key : [key];
        keys.forEach((k) => {
            if (this[k] === undefined || this[k] === null) {
                this[k] = Uid$1.make();
            }
        });
        return this;
    }
    /**
     * Generate index id from current model attributes.
     */
    $generateIndexId() {
        return this.$setIndexId(this.$getIndexIdFromAttributes());
    }
    /**
     * Get index id based on current model attributes.
     */
    $getIndexIdFromAttributes() {
        return this.$self().getIndexIdFromRecord(this);
    }
    /**
     * Get all of the current attributes on the model. It includes index id
     * value as well. This method is mainly used when saving a model to
     * the store.
     */
    $getAttributes() {
        return toAttributes(this);
    }
    /**
     * Serialize field values into json.
     */
    $toJson() {
        return toJson(this);
    }
}
/**
 * The primary key to be used for the model.
 */
Model.primaryKey = 'id';
/**
 * The discriminator key to be used for the model when inheritance is used
 */
Model.typeKey = 'type';
/**
 * Vuex Store state definition.
 */
Model.state = {};

/**
 * Create a new Query instance.
 */
const query$1 = (state, _getters, _rootState, rootGetters) => () => {
    return rootGetters[`${state.$connection}/query`](state.$name);
};
/**
 * Get all data of given entity.
 */
const all$1 = (state, _getters, _rootState, rootGetters) => () => {
    return rootGetters[`${state.$connection}/all`](state.$name);
};
/**
 * Find a data of the given entity by given id.
 */
const find$1 = (state, _getters, _rootState, rootGetters) => (id) => {
    return rootGetters[`${state.$connection}/find`](state.$name, id);
};
/**
 * Find array of data of the given entity by given ids.
 */
const findIn$1 = (state, _getters, _rootState, rootGetters) => (idList) => {
    return rootGetters[`${state.$connection}/findIn`](state.$name, idList);
};
const Getters = {
    query: query$1,
    all: all$1,
    find: find$1,
    findIn: findIn$1
};

/**
 * Create new data with all fields filled by default values.
 */
async function newRecord$1(context) {
    const state = context.state;
    const entity = state.$name;
    return context.dispatch(`${state.$connection}/new`, { entity }, { root: true });
}
/**
 * Save given data to the store by replacing all existing records in the
 * store. If you want to save data without replacing existing records,
 * use the `insert` method instead.
 */
async function create$1(context, payload) {
    const state = context.state;
    const entity = state.$name;
    return context.dispatch(`${state.$connection}/create`, { ...payload, entity }, { root: true });
}
/**
 * Insert given data to the state. Unlike `create`, this method will not
 * remove existing data within the state, but it will update the data
 * with the same primary key.
 */
async function insert$2(context, payload) {
    const state = context.state;
    const entity = state.$name;
    return context.dispatch(`${state.$connection}/insert`, { ...payload, entity }, { root: true });
}
/**
 * Update data in the store.
 */
async function update$2(context, payload) {
    const state = context.state;
    const entity = state.$name;
    // If the payload is an array, then the payload should be an array of
    // data so let's pass the whole payload as data.
    if (isArray(payload)) {
        return context.dispatch(`${state.$connection}/update`, { entity, data: payload }, { root: true });
    }
    // If the payload doesn't have `data` property, we'll assume that
    // the user has passed the object as the payload so let's define
    // the whole payload as a data.
    if (payload.data === undefined) {
        return context.dispatch(`${state.$connection}/update`, { entity, data: payload }, { root: true });
    }
    // Else destructure the payload and let root action handle it.
    return context.dispatch(`${state.$connection}/update`, { entity, ...payload }, { root: true });
}
/**
 * Insert or update given data to the state. Unlike `insert`, this method
 * will not replace existing data within the state, but it will update only
 * the submitted data with the same primary key.
 */
async function insertOrUpdate$1(context, payload) {
    const state = context.state;
    const entity = state.$name;
    return context.dispatch(`${state.$connection}/insertOrUpdate`, { entity, ...payload }, { root: true });
}
async function destroy$2(context, payload) {
    const state = context.state;
    const entity = state.$name;
    const where = payload;
    return context.dispatch(`${state.$connection}/delete`, { entity, where }, { root: true });
}
/**
 * Delete all data from the store.
 */
async function deleteAll$1(context) {
    const state = context.state;
    const entity = state.$name;
    return context.dispatch(`${state.$connection}/deleteAll`, { entity }, { root: true });
}
const Actions = {
    new: newRecord$1,
    create: create$1,
    insert: insert$2,
    update: update$2,
    insertOrUpdate: insertOrUpdate$1,
    delete: destroy$2,
    deleteAll: deleteAll$1
};

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/**
 * Helpers to enable Immutable compatibility *without* bringing in
 * the 'immutable' package as a dependency.
 */

/**
 * Check if an object is immutable by checking if it has a key specific
 * to the immutable library.
 *
 * @param  {any} object
 * @return {bool}
 */
function isImmutable(object) {
  return !!(object && typeof object.hasOwnProperty === 'function' && (object.hasOwnProperty('__ownerID') || // Immutable.Map
  object._map && object._map.hasOwnProperty('__ownerID'))); // Immutable.Record
}
/**
 * Denormalize an immutable entity.
 *
 * @param  {Schema} schema
 * @param  {Immutable.Map|Immutable.Record} input
 * @param  {function} unvisit
 * @param  {function} getDenormalizedEntity
 * @return {Immutable.Map|Immutable.Record}
 */

function denormalizeImmutable(schema, input, unvisit) {
  return Object.keys(schema).reduce(function (object, key) {
    // Immutable maps cast keys to strings on write so we need to ensure
    // we're accessing them using string keys.
    var stringKey = "" + key;

    if (object.has(stringKey)) {
      return object.set(stringKey, unvisit(object.get(stringKey), schema[stringKey]));
    } else {
      return object;
    }
  }, input);
}

var getDefaultGetId = function getDefaultGetId(idAttribute) {
  return function (input) {
    return isImmutable(input) ? input.get(idAttribute) : input[idAttribute];
  };
};

var EntitySchema = /*#__PURE__*/function () {
  function EntitySchema(key, definition, options) {
    if (definition === void 0) {
      definition = {};
    }

    if (options === void 0) {
      options = {};
    }

    if (!key || typeof key !== 'string') {
      throw new Error("Expected a string key for Entity, but found " + key + ".");
    }

    var _options = options,
        _options$idAttribute = _options.idAttribute,
        idAttribute = _options$idAttribute === void 0 ? 'id' : _options$idAttribute,
        _options$mergeStrateg = _options.mergeStrategy,
        mergeStrategy = _options$mergeStrateg === void 0 ? function (entityA, entityB) {
      return _extends({}, entityA, entityB);
    } : _options$mergeStrateg,
        _options$processStrat = _options.processStrategy,
        processStrategy = _options$processStrat === void 0 ? function (input) {
      return _extends({}, input);
    } : _options$processStrat,
        _options$fallbackStra = _options.fallbackStrategy,
        fallbackStrategy = _options$fallbackStra === void 0 ? function (key, schema) {
      return undefined;
    } : _options$fallbackStra;
    this._key = key;
    this._getId = typeof idAttribute === 'function' ? idAttribute : getDefaultGetId(idAttribute);
    this._idAttribute = idAttribute;
    this._mergeStrategy = mergeStrategy;
    this._processStrategy = processStrategy;
    this._fallbackStrategy = fallbackStrategy;
    this.define(definition);
  }

  var _proto = EntitySchema.prototype;

  _proto.define = function define(definition) {
    this.schema = Object.keys(definition).reduce(function (entitySchema, key) {
      var _extends2;

      var schema = definition[key];
      return _extends({}, entitySchema, (_extends2 = {}, _extends2[key] = schema, _extends2));
    }, this.schema || {});
  };

  _proto.getId = function getId(input, parent, key) {
    return this._getId(input, parent, key);
  };

  _proto.merge = function merge(entityA, entityB) {
    return this._mergeStrategy(entityA, entityB);
  };

  _proto.fallback = function fallback(id, schema) {
    return this._fallbackStrategy(id, schema);
  };

  _proto.normalize = function normalize(input, parent, key, visit, addEntity, visitedEntities) {
    var _this = this;

    var id = this.getId(input, parent, key);
    var entityType = this.key;

    if (!(entityType in visitedEntities)) {
      visitedEntities[entityType] = {};
    }

    if (!(id in visitedEntities[entityType])) {
      visitedEntities[entityType][id] = [];
    }

    if (visitedEntities[entityType][id].some(function (entity) {
      return entity === input;
    })) {
      return id;
    }

    visitedEntities[entityType][id].push(input);

    var processedEntity = this._processStrategy(input, parent, key);

    Object.keys(this.schema).forEach(function (key) {
      if (processedEntity.hasOwnProperty(key) && typeof processedEntity[key] === 'object') {
        var schema = _this.schema[key];
        var resolvedSchema = typeof schema === 'function' ? schema(input) : schema;
        processedEntity[key] = visit(processedEntity[key], processedEntity, key, resolvedSchema, addEntity, visitedEntities);
      }
    });
    addEntity(this, processedEntity, input, parent, key);
    return id;
  };

  _proto.denormalize = function denormalize(entity, unvisit) {
    var _this2 = this;

    if (isImmutable(entity)) {
      return denormalizeImmutable(this.schema, entity, unvisit);
    }

    Object.keys(this.schema).forEach(function (key) {
      if (entity.hasOwnProperty(key)) {
        var schema = _this2.schema[key];
        entity[key] = unvisit(entity[key], schema);
      }
    });
    return entity;
  };

  _createClass(EntitySchema, [{
    key: "key",
    get: function get() {
      return this._key;
    }
  }, {
    key: "idAttribute",
    get: function get() {
      return this._idAttribute;
    }
  }]);

  return EntitySchema;
}();

var PolymorphicSchema = /*#__PURE__*/function () {
  function PolymorphicSchema(definition, schemaAttribute) {
    if (schemaAttribute) {
      this._schemaAttribute = typeof schemaAttribute === 'string' ? function (input) {
        return input[schemaAttribute];
      } : schemaAttribute;
    }

    this.define(definition);
  }

  var _proto = PolymorphicSchema.prototype;

  _proto.define = function define(definition) {
    this.schema = definition;
  };

  _proto.getSchemaAttribute = function getSchemaAttribute(input, parent, key) {
    return !this.isSingleSchema && this._schemaAttribute(input, parent, key);
  };

  _proto.inferSchema = function inferSchema(input, parent, key) {
    if (this.isSingleSchema) {
      return this.schema;
    }

    var attr = this.getSchemaAttribute(input, parent, key);
    return this.schema[attr];
  };

  _proto.normalizeValue = function normalizeValue(value, parent, key, visit, addEntity, visitedEntities) {
    var schema = this.inferSchema(value, parent, key);

    if (!schema) {
      return value;
    }

    var normalizedValue = visit(value, parent, key, schema, addEntity, visitedEntities);
    return this.isSingleSchema || normalizedValue === undefined || normalizedValue === null ? normalizedValue : {
      id: normalizedValue,
      schema: this.getSchemaAttribute(value, parent, key)
    };
  };

  _proto.denormalizeValue = function denormalizeValue(value, unvisit) {
    var schemaKey = isImmutable(value) ? value.get('schema') : value.schema;

    if (!this.isSingleSchema && !schemaKey) {
      return value;
    }

    var id = this.isSingleSchema ? undefined : isImmutable(value) ? value.get('id') : value.id;
    var schema = this.isSingleSchema ? this.schema : this.schema[schemaKey];
    return unvisit(id || value, schema);
  };

  _createClass(PolymorphicSchema, [{
    key: "isSingleSchema",
    get: function get() {
      return !this._schemaAttribute;
    }
  }]);

  return PolymorphicSchema;
}();

var UnionSchema = /*#__PURE__*/function (_PolymorphicSchema) {
  _inheritsLoose(UnionSchema, _PolymorphicSchema);

  function UnionSchema(definition, schemaAttribute) {
    if (!schemaAttribute) {
      throw new Error('Expected option "schemaAttribute" not found on UnionSchema.');
    }

    return _PolymorphicSchema.call(this, definition, schemaAttribute) || this;
  }

  var _proto = UnionSchema.prototype;

  _proto.normalize = function normalize(input, parent, key, visit, addEntity, visitedEntities) {
    return this.normalizeValue(input, parent, key, visit, addEntity, visitedEntities);
  };

  _proto.denormalize = function denormalize(input, unvisit) {
    return this.denormalizeValue(input, unvisit);
  };

  return UnionSchema;
}(PolymorphicSchema);

var ValuesSchema = /*#__PURE__*/function (_PolymorphicSchema) {
  _inheritsLoose(ValuesSchema, _PolymorphicSchema);

  function ValuesSchema() {
    return _PolymorphicSchema.apply(this, arguments) || this;
  }

  var _proto = ValuesSchema.prototype;

  _proto.normalize = function normalize(input, parent, key, visit, addEntity, visitedEntities) {
    var _this = this;

    return Object.keys(input).reduce(function (output, key, index) {
      var _extends2;

      var value = input[key];
      return value !== undefined && value !== null ? _extends({}, output, (_extends2 = {}, _extends2[key] = _this.normalizeValue(value, input, key, visit, addEntity, visitedEntities), _extends2)) : output;
    }, {});
  };

  _proto.denormalize = function denormalize(input, unvisit) {
    var _this2 = this;

    return Object.keys(input).reduce(function (output, key) {
      var _extends3;

      var entityOrId = input[key];
      return _extends({}, output, (_extends3 = {}, _extends3[key] = _this2.denormalizeValue(entityOrId, unvisit), _extends3));
    }, {});
  };

  return ValuesSchema;
}(PolymorphicSchema);

var validateSchema = function validateSchema(definition) {
  var isArray = Array.isArray(definition);

  if (isArray && definition.length > 1) {
    throw new Error("Expected schema definition to be a single schema, but found " + definition.length + ".");
  }

  return definition[0];
};

var getValues = function getValues(input) {
  return Array.isArray(input) ? input : Object.keys(input).map(function (key) {
    return input[key];
  });
};

var normalize = function normalize(schema, input, parent, key, visit, addEntity, visitedEntities) {
  schema = validateSchema(schema);
  var values = getValues(input); // Special case: Arrays pass *their* parent on to their children, since there
  // is not any special information that can be gathered from themselves directly

  return values.map(function (value, index) {
    return visit(value, parent, key, schema, addEntity, visitedEntities);
  });
};

var ArraySchema = /*#__PURE__*/function (_PolymorphicSchema) {
  _inheritsLoose(ArraySchema, _PolymorphicSchema);

  function ArraySchema() {
    return _PolymorphicSchema.apply(this, arguments) || this;
  }

  var _proto = ArraySchema.prototype;

  _proto.normalize = function normalize(input, parent, key, visit, addEntity, visitedEntities) {
    var _this = this;

    var values = getValues(input);
    return values.map(function (value, index) {
      return _this.normalizeValue(value, parent, key, visit, addEntity, visitedEntities);
    }).filter(function (value) {
      return value !== undefined && value !== null;
    });
  };

  _proto.denormalize = function denormalize(input, unvisit) {
    var _this2 = this;

    return input && input.map ? input.map(function (value) {
      return _this2.denormalizeValue(value, unvisit);
    }) : input;
  };

  return ArraySchema;
}(PolymorphicSchema);

var _normalize = function normalize(schema, input, parent, key, visit, addEntity, visitedEntities) {
  var object = _extends({}, input);

  Object.keys(schema).forEach(function (key) {
    var localSchema = schema[key];
    var resolvedLocalSchema = typeof localSchema === 'function' ? localSchema(input) : localSchema;
    var value = visit(input[key], input, key, resolvedLocalSchema, addEntity, visitedEntities);

    if (value === undefined || value === null) {
      delete object[key];
    } else {
      object[key] = value;
    }
  });
  return object;
};

var _denormalize = function denormalize(schema, input, unvisit) {
  if (isImmutable(input)) {
    return denormalizeImmutable(schema, input, unvisit);
  }

  var object = _extends({}, input);

  Object.keys(schema).forEach(function (key) {
    if (object[key] != null) {
      object[key] = unvisit(object[key], schema[key]);
    }
  });
  return object;
};

var ObjectSchema = /*#__PURE__*/function () {
  function ObjectSchema(definition) {
    this.define(definition);
  }

  var _proto = ObjectSchema.prototype;

  _proto.define = function define(definition) {
    this.schema = Object.keys(definition).reduce(function (entitySchema, key) {
      var _extends2;

      var schema = definition[key];
      return _extends({}, entitySchema, (_extends2 = {}, _extends2[key] = schema, _extends2));
    }, this.schema || {});
  };

  _proto.normalize = function normalize() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _normalize.apply(void 0, [this.schema].concat(args));
  };

  _proto.denormalize = function denormalize() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _denormalize.apply(void 0, [this.schema].concat(args));
  };

  return ObjectSchema;
}();

var visit = function visit(value, parent, key, schema, addEntity, visitedEntities) {
  if (typeof value !== 'object' || !value) {
    return value;
  }

  if (typeof schema === 'object' && (!schema.normalize || typeof schema.normalize !== 'function')) {
    var method = Array.isArray(schema) ? normalize : _normalize;
    return method(schema, value, parent, key, visit, addEntity, visitedEntities);
  }

  return schema.normalize(value, parent, key, visit, addEntity, visitedEntities);
};

var addEntities = function addEntities(entities) {
  return function (schema, processedEntity, value, parent, key) {
    var schemaKey = schema.key;
    var id = schema.getId(value, parent, key);

    if (!(schemaKey in entities)) {
      entities[schemaKey] = {};
    }

    var existingEntity = entities[schemaKey][id];

    if (existingEntity) {
      entities[schemaKey][id] = schema.merge(existingEntity, processedEntity);
    } else {
      entities[schemaKey][id] = processedEntity;
    }
  };
};

var schema = {
  Array: ArraySchema,
  Entity: EntitySchema,
  Object: ObjectSchema,
  Union: UnionSchema,
  Values: ValuesSchema
};
var normalize$1 = function normalize(input, schema) {
  if (!input || typeof input !== 'object') {
    throw new Error("Unexpected input given to normalize. Expected type to be \"object\", found \"" + (input === null ? 'null' : typeof input) + "\".");
  }

  var entities = {};
  var addEntity = addEntities(entities);
  var visitedEntities = {};
  var result = visit(input, input, null, schema, addEntity, visitedEntities);
  return {
    entities: entities,
    result: result
  };
};

class Normalizer {
    /**
     * Normalize the record.
     */
    static process(query, record) {
        if (Utils.isEmpty(record)) {
            return {};
        }
        const entity = query.database.schemas[query.model.entity];
        const schema = Utils.isArray(record) ? [entity] : entity;
        return normalize$1(record, schema).entities;
    }
}

class PivotCreator {
    /**
     * Create an intermediate entity if the data contains any entities that
     * require it for example `belongsTo` or `morphMany`.
     */
    static process(query, data) {
        Object.keys(data).forEach((entity) => {
            const model = query.getModel(entity);
            if (model.hasPivotFields()) {
                Utils.forOwn(model.pivotFields(), (field) => {
                    Utils.forOwn(field, (attr, key) => {
                        attr.createPivots(model, data, key);
                    });
                });
            }
        });
        return data;
    }
}

class Attacher {
    /**
     * Attach missing relational key to the records.
     */
    static process(query, data) {
        Utils.forOwn(data, (entity, name) => {
            const fields = query.getModel(name).fields();
            Utils.forOwn(entity, (record) => {
                Utils.forOwn(record, (value, key) => {
                    const field = fields[key];
                    if (field instanceof Relation) {
                        value !== null && field.attach(value, record, data);
                    }
                });
            });
        });
        return data;
    }
}

class Processor {
    /**
     * Normalize the given data.
     */
    static normalize(query, record) {
        // First, let's normalize the data.
        let data = Normalizer.process(query, record);
        // Then, attach any missing foreign keys. For example, if a User has many
        // Post nested but without foreign key such as `user_id`, we can attach
        // the `user_id` value to the Post entities.
        data = Attacher.process(query, data);
        // Now we'll create any missing pivot entities for relationships such as
        // `belongsTo` or `morphMany`.
        data = PivotCreator.process(query, data);
        // And we'll return the result as a normalized data.
        return data;
    }
}

class WhereFilter {
    /**
     * Filter the given data by registered where clause.
     */
    static filter(query, records) {
        if (query.wheres.length === 0) {
            return records;
        }
        return records.filter((record) => this.check(query, record));
    }
    /**
     * Checks if given Record matches the registered where clause.
     */
    static check(query, record) {
        const whereTypes = Utils.groupBy(query.wheres, (where) => where.boolean);
        const comparator = this.getComparator(query, record);
        let results = [];
        whereTypes.and && results.push(whereTypes.and.every(comparator));
        whereTypes.or && results.push(whereTypes.or.some(comparator));
        return results.indexOf(true) !== -1;
    }
    /**
     * Get comparator for the where clause.
     */
    static getComparator(query, record) {
        return (where) => {
            // Function with Record and Query as argument.
            if (typeof where.field === 'function') {
                const newQuery = new Query(query.store, query.entity);
                const result = this.executeWhereClosure(newQuery, record, where.field);
                if (typeof result === 'boolean') {
                    return result;
                }
                // If closure returns undefined, we need to execute the local query.
                const matchingRecords = newQuery.get();
                // And check if current record is part of the result.
                return !Utils.isEmpty(matchingRecords.filter((rec) => {
                    return rec['$id'] === record['$id'];
                }));
            }
            // Function with Record value as argument.
            if (typeof where.value === 'function') {
                return where.value(record[where.field]);
            }
            // Check if field value is in given where Array.
            if (Utils.isArray(where.value)) {
                return where.value.indexOf(record[where.field]) !== -1;
            }
            // Simple equal check.
            return record[where.field] === where.value;
        };
    }
    /**
     * Execute where closure.
     */
    static executeWhereClosure(query, record, closure) {
        if (closure.length !== 3) {
            return closure(record, query);
        }
        const model = new query.model(record);
        return closure(record, query, model);
    }
}

class OrderByFilter {
    /**
     * Sort the given data by registered orders.
     */
    static filter(query, records) {
        if (query.orders.length === 0) {
            return records;
        }
        const keys = query.orders.map((order) => order.key);
        const directions = query.orders.map((order) => order.direction);
        return Utils.orderBy(records, keys, directions);
    }
}

class LimitFilter {
    /**
     * Limit the given records by the lmilt and offset.
     */
    static filter(query, records) {
        return records.slice(query.offsetNumber, query.offsetNumber + query.limitNumber);
    }
}

class Filter {
    /**
     * Filter the given data by registered where clause.
     */
    static where(query, records) {
        return WhereFilter.filter(query, records);
    }
    /**
     * Sort the given data by registered orders.
     */
    static orderBy(query, records) {
        return OrderByFilter.filter(query, records);
    }
    /**
     * Limit the given records by the lmilt and offset.
     */
    static limit(query, records) {
        return LimitFilter.filter(query, records);
    }
}

class Loader {
    /**
     * Set the relationships that should be eager loaded with the query.
     */
    static with(query, name, constraint) {
        // If the name of the relation is `*`, we'll load all relationships.
        if (name === '*') {
            this.withAll(query, constraint);
            return;
        }
        // If we passed an array, we dispatch the bits to with queries.
        if (isArray(name)) {
            name.forEach((relationName) => this.with(query, relationName, constraint));
            return;
        }
        // Else parse relations and set appropriate constraints.
        this.parseWithRelations(query, name.split('.'), constraint);
    }
    /**
     * Set all relationships to be eager loaded with the query.
     */
    static withAll(query, constraint) {
        const fields = query.model.getFields();
        for (const field in fields) {
            fields[field] instanceof Relation && this.with(query, field, constraint);
        }
    }
    /**
     * Set relationships to be recursively eager loaded with the query.
     */
    static withAllRecursive(query, depth) {
        this.withAll(query, (relatedQuery) => {
            depth > 0 && relatedQuery.withAllRecursive(depth - 1);
        });
    }
    /**
     * Set eager load relation and constraint.
     */
    static setEagerLoad(query, name, constraint = null) {
        if (!query.load[name]) {
            query.load[name] = [];
        }
        constraint && query.load[name].push(constraint);
    }
    /**
     * Parse a list of relations into individuals.
     */
    static parseWithRelations(query, relations, constraint) {
        // First we'll get the very first relationship from teh whole relations.
        const relation = relations[0];
        // If the first relation has "or" syntax which is `|` for example
        // `posts|videos`, set each of them as separate eager load.
        relation.split('|').forEach((name) => {
            // If there's only one relationship in relations array, that means
            // there's no nested relationship. So we'll set the given
            // constraint to the relationship loading.
            if (relations.length === 1) {
                this.setEagerLoad(query, name, constraint);
                return;
            }
            // Else we'll skip adding constraint because the constraint has to be
            // applied to the nested relationship. We'll let `addNestedWiths`
            // method to handle that later.
            this.setEagerLoad(query, name);
        });
        // If the given relations only contains a single name, which means it
        // doesn't have any nested relations such as `posts.comments`, we
        // don't need go farther so return here.
        if (relations.length === 1) {
            return;
        }
        // Finally, we shift the first relation from the array and handle lest
        // of relations as a nested relation.
        relations.shift();
        this.addNestedWiths(query, relation, relations, constraint);
    }
    /**
     * Parse the nested relationships in a relation.
     */
    static addNestedWiths(query, name, children, constraint) {
        this.setEagerLoad(query, name, (nestedQuery) => {
            nestedQuery.with(children.join('.'), constraint);
        });
    }
    /**
     * Eager load the relationships for the given collection.
     */
    static eagerLoadRelations(query, collection) {
        const fields = query.model.getFields();
        for (const name in query.load) {
            const constraints = query.load[name];
            let relation = fields[name];
            if (relation instanceof Relation) {
                relation.load(query, collection, name, constraints);
                continue;
            }
            // If no relation was found on the query, it might be run on the
            // base entity of a hierarchy. In this case, we try looking up
            // the relation on the derived entities
            if (query.model.hasTypes()) {
                const candidateRelation = query.model.findRelationInSubTypes(name);
                if (candidateRelation !== null) {
                    candidateRelation.load(query, collection, name, constraints);
                }
            }
        }
    }
}

class Rollcaller {
    /**
     * Set where constraint based on relationship existence.
     */
    static has(query, relation, operator, count) {
        this.setHas(query, relation, 'exists', operator, count);
    }
    /**
     * Set where constraint based on relationship absence.
     */
    static hasNot(query, relation, operator, count) {
        this.setHas(query, relation, 'doesntExist', operator, count);
    }
    /**
     * Add where has condition.
     */
    static whereHas(query, relation, constraint) {
        this.setHas(query, relation, 'exists', undefined, undefined, constraint);
    }
    /**
     * Add where has not condition.
     */
    static whereHasNot(query, relation, constraint) {
        this.setHas(query, relation, 'doesntExist', undefined, undefined, constraint);
    }
    /**
     * Set `has` condition.
     */
    static setHas(query, relation, type, operator = '>=', count = 1, constraint = null) {
        if (typeof operator === 'number') {
            query.have.push({
                relation,
                type,
                operator: '>=',
                count: operator,
                constraint
            });
            return;
        }
        query.have.push({ relation, type, operator, count, constraint });
    }
    /**
     * Convert `has` conditions to where clause. It will check any relationship
     * existence, or absence for the records then set ids of the records that
     * matched the condition to `where` clause.
     *
     * This way, when the query gets executed, only those records that matched
     * the `has` condition get retrieved. In the future, once relationship index
     * mapping is implemented, we can simply do all checks inside the where
     * filter since we can treat `has` condition as usual `where` condition.
     *
     * For now, since we must fetch any relationship by eager loading them, due
     * to performance concern, we'll apply `has` conditions this way to gain
     * maximum performance.
     */
    static applyConstraints(query) {
        if (query.have.length === 0) {
            return;
        }
        const newQuery = query.newQuery();
        this.addHasWhereConstraints(query, newQuery);
        this.addHasConstraints(query, newQuery.get());
    }
    /**
     * Add has constraints to the given query. It's going to set all relationship
     * as `with` alongside with its closure constraints.
     */
    static addHasWhereConstraints(query, newQuery) {
        query.have.forEach((constraint) => {
            newQuery.with(constraint.relation, constraint.constraint);
        });
    }
    /**
     * Add has constraints as where clause.
     */
    static addHasConstraints(query, collection) {
        const comparators = this.getComparators(query);
        const ids = [];
        collection.forEach((model) => {
            if (comparators.every((comparator) => comparator(model))) {
                ids.push(model.$self().getIdFromRecord(model));
            }
        });
        query.whereIdIn(ids);
    }
    /**
     * Get comparators for the has clause.
     */
    static getComparators(query) {
        return query.have.map((constraint) => this.getComparator(constraint));
    }
    /**
     * Get a comparator for the has clause.
     */
    static getComparator(constraint) {
        const compare = this.getCountComparator(constraint.operator);
        return (model) => {
            const count = this.getRelationshipCount(model[constraint.relation]);
            const result = compare(count, constraint.count);
            return constraint.type === 'exists' ? result : !result;
        };
    }
    /**
     * Get count of the relationship.
     */
    static getRelationshipCount(relation) {
        if (isArray(relation)) {
            return relation.length;
        }
        return relation ? 1 : 0;
    }
    /**
     * Get comparator function for the `has` clause.
     */
    static getCountComparator(operator) {
        switch (operator) {
            case '=':
                return (x, y) => x === y;
            case '>':
                return (x, y) => x > y;
            case '>=':
                return (x, y) => x >= y;
            case '<':
                return (x, y) => x > 0 && x < y;
            case '<=':
                return (x, y) => x > 0 && x <= y;
            default:
                return (x, y) => x === y;
        }
    }
}

class Query {
    /**
     * Create a new Query instance.
     */
    constructor(store, entity) {
        /**
         * This flag lets us know if current Query instance applies to
         * a base class or not (in order to know when to filter out
         * some records).
         */
        this.appliedOnBase = true;
        /**
         * Primary key ids to filter records by. It is used for filtering records
         * direct key lookup when a user is trying to fetch records by its
         * primary key.
         *
         * It should not be used if there is a logic which prevents index usage, for
         * example, an "or" condition which already requires a full scan of records.
         */
        this.idFilter = null;
        /**
         * Whether to use `idFilter` key lookup. True if there is a logic which
         * prevents index usage, for example, an "or" condition which already
         * requires full scan.
         */
        this.cancelIdFilter = false;
        /**
         * Primary key ids to filter joined records. It is used for filtering
         * records direct key lookup. It should not be cancelled, because it
         * is free from the effects of normal where methods.
         */
        this.joinedIdFilter = null;
        /**
         * The where constraints for the query.
         */
        this.wheres = [];
        /**
         * The has constraints for the query.
         */
        this.have = [];
        /**
         * The orders of the query result.
         */
        this.orders = [];
        /**
         * Number of results to skip.
         */
        this.offsetNumber = 0;
        /**
         * Maximum number of records to return.
         *
         * We use polyfill of `Number.MAX_SAFE_INTEGER` for IE11 here.
         */
        this.limitNumber = Math.pow(2, 53) - 1;
        /**
         * The relationships that should be eager loaded with the result.
         */
        this.load = {};
        this.store = store;
        this.database = store.$db();
        this.model = this.getModel(entity);
        this.baseModel = this.getBaseModel(entity);
        this.entity = entity;
        this.baseEntity = this.baseModel.entity;
        this.rootState = this.database.getState();
        this.state = this.rootState[this.baseEntity];
        this.appliedOnBase = this.baseEntity === this.entity;
    }
    /**
     * Delete all records from the store.
     */
    static deleteAll(store) {
        const database = store.$db();
        const models = database.models();
        for (const entity in models) {
            const state = database.getState()[entity];
            state && new this(store, entity).deleteAll();
        }
    }
    /**
     * Register a global hook. It will return ID for the hook that users may use
     * it to unregister hooks.
     */
    static on(on, callback) {
        const id = ++this.lastHookId;
        if (!this.hooks[on]) {
            this.hooks[on] = [];
        }
        this.hooks[on].push({ id, callback });
        return id;
    }
    /**
     * Unregister global hook with the given id.
     */
    static off(id) {
        return Object.keys(this.hooks).some((on) => {
            const hooks = this.hooks[on];
            const index = hooks.findIndex((h) => h.id === id);
            if (index === -1) {
                return false;
            }
            hooks.splice(index, 1);
            return true;
        });
    }
    /**
     * Get query class.
     */
    self() {
        return this.constructor;
    }
    /**
     * Create a new query instance.
     */
    newQuery(entity) {
        entity = entity || this.entity;
        return new Query(this.store, entity);
    }
    /**
     * Get model of given name from the container.
     */
    getModel(name) {
        const entity = name || this.entity;
        return this.database.model(entity);
    }
    /**
     * Get all models from the container.
     */
    getModels() {
        return this.database.models();
    }
    /**
     * Get base model of given name from the container.
     */
    getBaseModel(name) {
        return this.database.baseModel(name);
    }
    /**
     * Returns all record of the query chain result. This method is alias
     * of the `get` method.
     */
    all() {
        return this.get();
    }
    /**
     * Find the record by the given id.
     */
    find(value) {
        const record = this.state.data[this.normalizeIndexId(value)];
        if (!record) {
            return null;
        }
        return this.item(this.hydrate(record));
    }
    /**
     * Get the record of the given array of ids.
     */
    findIn(values) {
        if (!Utils.isArray(values)) {
            return [];
        }
        const records = values.reduce((collection, value) => {
            const record = this.state.data[this.normalizeIndexId(value)];
            if (!record) {
                return collection;
            }
            collection.push(this.hydrate(record));
            return collection;
        }, []);
        return this.collect(records);
    }
    /**
     * Returns all record of the query chain result.
     */
    get() {
        const records = this.select();
        return this.collect(records);
    }
    /**
     * Returns the first record of the query chain result.
     */
    first() {
        const records = this.select();
        if (records.length === 0) {
            return null;
        }
        return this.item(this.hydrate(records[0]));
    }
    /**
     * Returns the last record of the query chain result.
     */
    last() {
        const records = this.select();
        if (records.length === 0) {
            return null;
        }
        return this.item(this.hydrate(records[records.length - 1]));
    }
    /**
     * Checks whether a result of the query chain exists.
     */
    exists() {
        const records = this.select();
        return records.length > 0;
    }
    /**
     * Add a and where clause to the query.
     */
    where(field, value) {
        if (this.isIdfilterable(field)) {
            this.setIdFilter(value);
        }
        this.wheres.push({ field, value, boolean: 'and' });
        return this;
    }
    /**
     * Add a or where clause to the query.
     */
    orWhere(field, value) {
        // Cancel id filter usage, since "or" needs full scan.
        this.cancelIdFilter = true;
        this.wheres.push({ field, value, boolean: 'or' });
        return this;
    }
    /**
     * Filter records by their primary key.
     */
    whereId(value) {
        if (this.model.isCompositePrimaryKey()) {
            return this.where('$id', this.normalizeIndexId(value));
        }
        return this.where(this.model.primaryKey, value);
    }
    /**
     * Filter records by their primary keys.
     */
    whereIdIn(values) {
        if (this.model.isCompositePrimaryKey()) {
            const idList = values.reduce((keys, value) => {
                return [...keys, this.normalizeIndexId(value)];
            }, []);
            return this.where('$id', idList);
        }
        return this.where(this.model.primaryKey, values);
    }
    /**
     * Fast comparison for foreign keys. If the foreign key is the primary key,
     * it uses object lookup, fallback normal where otherwise.
     *
     * Why separate `whereFk` instead of just `where`? Additional logic needed
     * for the distinction between where and orWhere in normal queries, but
     * Fk lookups are always "and" type.
     */
    whereFk(field, value) {
        const values = Utils.isArray(value) ? value : [value];
        // If lookup filed is the primary key. Initialize or get intersection,
        // because boolean and could have a condition such as
        // `whereId(1).whereId(2).get()`.
        if (field === this.model.primaryKey) {
            this.setJoinedIdFilter(values);
            return this;
        }
        // Else fallback to normal where.
        this.where(field, values);
        return this;
    }
    /**
     * Convert value to string for composite primary keys as it expects an array.
     * Otherwise return as is.
     *
     * Throws an error when malformed value is given:
     * - Composite primary key defined on model, expects value to be array.
     * - Normal primary key defined on model, expects a primitive value.
     */
    normalizeIndexId(value) {
        if (this.model.isCompositePrimaryKey()) {
            if (!Utils.isArray(value)) {
                throw new Error('[Vuex ORM] Entity `' +
                    this.entity +
                    '` is configured with a composite ' +
                    'primary key and expects an array value but instead received: ' +
                    JSON.stringify(value));
            }
            return JSON.stringify(value);
        }
        if (Utils.isArray(value)) {
            throw new Error('[Vuex ORM] Entity `' +
                this.entity +
                '` expects a single value but ' +
                'instead received: ' +
                JSON.stringify(value));
        }
        return value;
    }
    /**
     * Check whether the given field is filterable through primary key
     * direct look up.
     */
    isIdfilterable(field) {
        return ((field === this.model.primaryKey || field === '$id') &&
            !this.cancelIdFilter);
    }
    /**
     * Set id filter for the given where condition.
     */
    setIdFilter(value) {
        const values = Utils.isArray(value) ? value : [value];
        // Initialize or get intersection, because boolean and could have a
        // condition such as `whereIdIn([1,2,3]).whereIdIn([1,2]).get()`.
        if (this.idFilter === null) {
            this.idFilter = new Set(values);
            return;
        }
        this.idFilter = new Set(values.filter((v) => this.idFilter.has(v)));
    }
    /**
     * Set joined id filter for the given where condition.
     */
    setJoinedIdFilter(values) {
        // Initialize or get intersection, because boolean and could have a
        // condition such as `whereId(1).whereId(2).get()`.
        if (this.joinedIdFilter === null) {
            this.joinedIdFilter = new Set(values);
            return;
        }
        this.joinedIdFilter = new Set(values.filter((v) => this.joinedIdFilter.has(v)));
    }
    /**
     * Add an order to the query.
     */
    orderBy(key, direction = 'asc') {
        this.orders.push({ key, direction });
        return this;
    }
    /**
     * Add an offset to the query.
     */
    offset(offset) {
        this.offsetNumber = offset;
        return this;
    }
    /**
     * Add limit to the query.
     */
    limit(limit) {
        this.limitNumber = limit;
        return this;
    }
    /**
     * Set the relationships that should be loaded.
     */
    with(name, constraint = null) {
        Loader.with(this, name, constraint);
        return this;
    }
    /**
     * Query all relations.
     */
    withAll(constraint = null) {
        Loader.withAll(this, constraint);
        return this;
    }
    /**
     * Query all relations recursively.
     */
    withAllRecursive(depth = 3) {
        Loader.withAllRecursive(this, depth);
        return this;
    }
    /**
     * Set where constraint based on relationship existence.
     */
    has(relation, operator, count) {
        Rollcaller.has(this, relation, operator, count);
        return this;
    }
    /**
     * Set where constraint based on relationship absence.
     */
    hasNot(relation, operator, count) {
        Rollcaller.hasNot(this, relation, operator, count);
        return this;
    }
    /**
     * Add where has condition.
     */
    whereHas(relation, constraint) {
        Rollcaller.whereHas(this, relation, constraint);
        return this;
    }
    /**
     * Add where has not condition.
     */
    whereHasNot(relation, constraint) {
        Rollcaller.whereHasNot(this, relation, constraint);
        return this;
    }
    /**
     * Get all records from the state and convert them into the array of
     * model instances.
     */
    records() {
        this.finalizeIdFilter();
        return this.getIdsToLookup().reduce((models, id) => {
            const record = this.state.data[id];
            if (!record) {
                return models;
            }
            const model = this.hydrate(record);
            // Ignore if the model is not current type of model.
            if (!this.appliedOnBase &&
                !(this.model.entity === model.$self().entity)) {
                return models;
            }
            models.push(model);
            return models;
        }, []);
    }
    /**
     * Check whether if id filters should on select. If not, clear out id filter.
     */
    finalizeIdFilter() {
        if (!this.cancelIdFilter || this.idFilter === null) {
            return;
        }
        this.where(this.model.isCompositePrimaryKey() ? '$id' : this.model.primaryKey, Array.from(this.idFilter.values()));
        this.idFilter = null;
    }
    /**
     * Get a list of id that should be used to lookup when fetching records
     * from the state.
     */
    getIdsToLookup() {
        // If both id filter and joined id filter are set, intersect them.
        if (this.idFilter && this.joinedIdFilter) {
            return Array.from(this.idFilter.values()).filter((id) => {
                return this.joinedIdFilter.has(id);
            });
        }
        // If only either one is set, return which one is set.
        if (this.idFilter || this.joinedIdFilter) {
            return Array.from((this.idFilter || this.joinedIdFilter).values());
        }
        // If none is set, return all keys.
        return Object.keys(this.state.data);
    }
    /**
     * Process the query and filter data.
     */
    select() {
        // At first, well apply any `has` condition to the query.
        Rollcaller.applyConstraints(this);
        // Next, get all record as an array and then start filtering it through.
        let records = this.records();
        // Process `beforeSelect` hook.
        records = this.executeSelectHook('beforeSelect', records);
        // Let's filter the records at first by the where clauses.
        records = this.filterWhere(records);
        // Process `afterWhere` hook.
        records = this.executeSelectHook('afterWhere', records);
        // Next, lets sort the data.
        records = this.filterOrderBy(records);
        // Process `afterOrderBy` hook.
        records = this.executeSelectHook('afterOrderBy', records);
        // Finally, slice the record by limit and offset.
        records = this.filterLimit(records);
        // Process `afterLimit` hook.
        records = this.executeSelectHook('afterLimit', records);
        return records;
    }
    /**
     * Filter the given data by registered where clause.
     */
    filterWhere(records) {
        return Filter.where(this, records);
    }
    /**
     * Sort the given data by registered orders.
     */
    filterOrderBy(records) {
        return Filter.orderBy(this, records);
    }
    /**
     * Limit the given records by the limit and offset.
     */
    filterLimit(records) {
        return Filter.limit(this, records);
    }
    /**
     * Get the count of the retrieved data.
     */
    count() {
        return this.get().length;
    }
    /**
     * Get the max value of the specified filed.
     */
    max(field) {
        const numbers = this.get().reduce((numbers, item) => {
            if (typeof item[field] === 'number') {
                numbers.push(item[field]);
            }
            return numbers;
        }, []);
        return numbers.length === 0 ? 0 : Math.max(...numbers);
    }
    /**
     * Get the min value of the specified filed.
     */
    min(field) {
        const numbers = this.get().reduce((numbers, item) => {
            if (typeof item[field] === 'number') {
                numbers.push(item[field]);
            }
            return numbers;
        }, []);
        return numbers.length === 0 ? 0 : Math.min(...numbers);
    }
    /**
     * Get the sum value of the specified filed.
     */
    sum(field) {
        return this.get().reduce((sum, item) => {
            if (typeof item[field] === 'number') {
                sum += item[field];
            }
            return sum;
        }, 0);
    }
    /**
     * Create a item from given record.
     */
    item(item) {
        if (Object.keys(this.load).length > 0) {
            Loader.eagerLoadRelations(this, [item]);
        }
        return item;
    }
    /**
     * Create a collection (array) from given records.
     */
    collect(collection) {
        if (collection.length < 1) {
            return [];
        }
        if (Object.keys(this.load).length > 0) {
            collection = collection.map((item) => {
                const model = this.model.getModelFromRecord(item);
                return new model(item);
            });
            Loader.eagerLoadRelations(this, collection);
        }
        return collection;
    }
    /**
     * Create new data with all fields filled by default values.
     */
    new() {
        const model = new this.model().$generateId();
        this.commitInsert(model.$getAttributes());
        return model;
    }
    /**
     * Save given data to the store by replacing all existing records in the
     * store. If you want to save data without replacing existing records,
     * use the `insert` method instead.
     */
    create(data, options) {
        return this.persist('create', data, options);
    }
    /**
     * Create records to the state.
     */
    createRecords(records) {
        this.deleteAll();
        return this.insertRecords(records);
    }
    /**
     * Insert given data to the store. Unlike `create`, this method will not
     * remove existing data within the store, but it will update the data
     * with the same primary key.
     */
    insert(data, options) {
        return this.persist('insert', data, options);
    }
    /**
     * Insert records to the store.
     */
    insertRecords(records) {
        let collection = this.mapHydrateRecords(records);
        collection = this.executeMutationHooks('beforeCreate', collection);
        this.commitInsertRecords(this.convertCollectionToRecords(collection));
        this.executeMutationHooks('afterCreate', collection);
        return collection;
    }
    /**
     * Update data in the state.
     */
    update(data, condition, options) {
        // If the data is array, simply normalize the data and update them.
        if (Utils.isArray(data)) {
            return this.persist('update', data, options);
        }
        // OK, the data is not an array. Now let's check `data` to see what we can
        // do if it's a closure.
        if (typeof data === 'function') {
            // If the data is closure, but if there's no condition, we wouldn't know
            // what record to update so raise an error and abort.
            if (!condition) {
                throw new Error('You must specify `where` to update records by specifying `data` as a closure.');
            }
            // If the condition is a closure, then update records by the closure.
            if (typeof condition === 'function') {
                return this.updateByCondition(data, condition);
            }
            // Else the condition is either String or Number, so let's
            // update the record by ID.
            return this.updateById(data, condition);
        }
        // Now the data is not a closure, and it's not an array, so it should be an object.
        // If the condition is closure, we can't normalize the data so let's update
        // records using the closure.
        if (typeof condition === 'function') {
            return this.updateByCondition(data, condition);
        }
        // If there's no condition, let's normalize the data and update them.
        if (!condition) {
            return this.persist('update', data, options);
        }
        // Now since the condition is either String or Number, let's check if the
        // model's primary key is not a composite key. If yes, we can't set the
        // condition as ID value for the record so throw an error and abort.
        if (this.model.isCompositePrimaryKey() && !Utils.isArray(condition)) {
            throw new Error("[Vuex ORM] You can't specify `where` value as `string` or `number` " +
                'when you have a composite key defined in your model. Please include ' +
                'composite keys to the `data` fields.');
        }
        // Finally, let's add condition as the primary key of the object and
        // then normalize them to update the records.
        return this.updateById(data, condition);
    }
    /**
     * Update all records.
     */
    updateRecords(records) {
        const models = this.hydrateRecordsByMerging(records);
        return this.performUpdate(models);
    }
    /**
     * Update the state by id.
     */
    updateById(data, id) {
        id = typeof id === 'number' ? id.toString() : this.normalizeIndexId(id);
        const record = this.state.data[id];
        if (!record) {
            return null;
        }
        const model = this.hydrate(record);
        const instances = {
            [id]: this.processUpdate(data, model)
        };
        this.performUpdate(instances);
        return instances[id];
    }
    /**
     * Update the state by condition.
     */
    updateByCondition(data, condition) {
        const instances = Object.keys(this.state.data).reduce((instances, id) => {
            const instance = this.hydrate(this.state.data[id]);
            if (!condition(instance)) {
                return instances;
            }
            instances[id] = this.processUpdate(data, instance);
            return instances;
        }, {});
        return this.performUpdate(instances);
    }
    /**
     * Update the given record with given data.
     */
    processUpdate(data, instance) {
        if (typeof data === 'function') {
            data(instance);
            return instance;
        }
        // When the updated instance is not the base model, we tell te hydrate what model to use
        if (instance.constructor !== this.model && instance instanceof Model) {
            return this.hydrate({ ...instance, ...data }, instance.constructor);
        }
        return this.hydrate({ ...instance, ...data });
    }
    /**
     * Commit `update` to the state.
     */
    performUpdate(models) {
        const beforeHooks = this.buildHooks('beforeUpdate');
        const afterHooks = this.buildHooks('afterUpdate');
        const updated = [];
        for (const id in models) {
            const model = models[id];
            if (beforeHooks.some((hook) => hook(model, null, this.entity) === false)) {
                continue;
            }
            this.commitUpdate(String(model.$getIndexIdFromAttributes()), model.$getAttributes());
            afterHooks.forEach((hook) => {
                hook(model, null, this.entity);
            });
            updated.push(model);
        }
        return updated;
    }
    /**
     * Insert or update given data to the state. Unlike `insert`, this method
     * will not replace existing data within the state, but it will update only
     * the submitted data with the same primary key.
     */
    insertOrUpdate(data, options) {
        return this.persist('insertOrUpdate', data, options);
    }
    /**
     * Insert or update the records.
     */
    insertOrUpdateRecords(records) {
        let toBeInserted = {};
        let toBeUpdated = {};
        Object.keys(records).forEach((id) => {
            const record = records[id];
            if (this.state.data[id]) {
                toBeUpdated[id] = record;
                return;
            }
            toBeInserted[id] = record;
        });
        return [
            ...this.insertRecords(toBeInserted),
            ...this.updateRecords(toBeUpdated)
        ];
    }
    /**
     * Persist data into the state while preserving it's original structure.
     */
    persist(method, data, options) {
        const clonedData = Utils.cloneDeep(data);
        const normalizedData = this.normalize(clonedData);
        if (Utils.isEmpty(normalizedData)) {
            if (method === 'create') {
                this.emptyState();
            }
            return {};
        }
        return Object.entries(normalizedData).reduce((collections, [entity, records]) => {
            const newQuery = this.newQuery(entity);
            const methodForEntity = this.getPersistMethod(entity, options, method);
            const collection = newQuery.persistRecords(methodForEntity, records);
            if (collection.length > 0) {
                collections[entity] = collection;
            }
            return collections;
        }, {});
    }
    /**
     * Persist given records to the store by the given method.
     */
    persistRecords(method, records) {
        switch (method) {
            case 'create':
                return this.createRecords(records);
            case 'insert':
                return this.insertRecords(records);
            case 'update':
                return this.updateRecords(records);
            case 'insertOrUpdate':
                return this.insertOrUpdateRecords(records);
        }
    }
    /**
     * Get persist method from given information.
     */
    getPersistMethod(entity, options, fallback) {
        if (options.create && options.create.includes(entity)) {
            return 'create';
        }
        if (options.insert && options.insert.includes(entity)) {
            return 'insert';
        }
        if (options.update && options.update.includes(entity)) {
            return 'update';
        }
        if (options.insertOrUpdate && options.insertOrUpdate.includes(entity)) {
            return 'insertOrUpdate';
        }
        return fallback;
    }
    delete(condition) {
        if (typeof condition === 'function') {
            return this.deleteByCondition(condition);
        }
        return this.deleteById(condition);
    }
    /**
     * Delete all records from the store. Even when deleting all records, we'll
     * iterate over all records to ensure that before and after hook will be
     * called for each existing records.
     */
    deleteAll() {
        // If the target entity is the base entity and not inherited entity, we can
        // just delete all records.
        if (this.appliedOnBase) {
            return this.deleteByCondition(() => true);
        }
        // Otherwise, we should filter out any derived entities from being deleted
        // so we'll add such filter here.
        return this.deleteByCondition((model) => model.$self().entity === this.model.entity);
    }
    /**
     * Delete a record from the store by given id.
     */
    deleteById(id) {
        const item = this.find(id);
        if (!item) {
            return null;
        }
        return this.deleteByCondition((model) => model.$id === item.$id)[0];
    }
    /**
     * Perform the actual delete query to the store.
     */
    deleteByCondition(condition) {
        let collection = this.mapHydrateAndFilterRecords(this.state.data, condition);
        collection = this.executeMutationHooks('beforeDelete', collection);
        if (collection.length === 0) {
            return [];
        }
        this.commitDelete(collection.map((model) => model.$id));
        this.executeMutationHooks('afterDelete', collection);
        return collection;
    }
    /**
     * Commit mutation.
     */
    commit(name, payload) {
        this.store.commit(`${this.database.namespace}/${name}`, {
            entity: this.baseEntity,
            ...payload
        });
    }
    /**
     * Commit insert mutation.
     */
    commitInsert(record) {
        this.commit('insert', { record });
    }
    /**
     * Commit update mutation.
     */
    commitUpdate(newId, record) {
        this.commit('update', { newId, record });
    }
    /**
     * Commit insert records mutation.
     */
    commitInsertRecords(records) {
        this.commit('insertRecords', { records });
    }
    /**
     * Commit delete mutation.
     */
    commitDelete(id) {
        this.commit('delete', { id });
    }
    /**
     * Normalize the given data.
     */
    normalize(data) {
        return Processor.normalize(this, data);
    }
    /**
     * Convert given record to the model instance.
     */
    hydrate(record, forceModel) {
        if (forceModel) {
            return new forceModel(record);
        }
        const newModel = this.model.getModelFromRecord(record);
        if (newModel !== null) {
            return new newModel(record);
        }
        if (!this.appliedOnBase && record[this.model.typeKey] === undefined) {
            const typeValue = this.model.getTypeKeyValueFromModel();
            record = { ...record, [this.model.typeKey]: typeValue };
            return new this.model(record);
        }
        const baseModel = this.getBaseModel(this.entity);
        return new baseModel(record);
    }
    /**
     * Convert given records to instances by merging existing record. If there's
     * no existing record, that record will not be included in the result.
     */
    hydrateRecordsByMerging(records) {
        return Object.keys(records).reduce((instances, id) => {
            const recordInStore = this.state.data[id];
            if (!recordInStore) {
                return instances;
            }
            const record = records[id];
            const modelForRecordInStore = this.model.getModelFromRecord(recordInStore);
            if (modelForRecordInStore === null) {
                instances[id] = this.hydrate({ ...recordInStore, ...record });
                return instances;
            }
            instances[id] = this.hydrate({ ...recordInStore, ...record }, modelForRecordInStore);
            return instances;
        }, {});
    }
    /**
     * Convert all given records and return it as a collection.
     */
    mapHydrateRecords(records) {
        return Utils.map(records, (record) => this.hydrate(record));
    }
    /**
     * Convert all given records and return it as a collection.
     */
    mapHydrateAndFilterRecords(records, condition) {
        const collection = [];
        for (const key in records) {
            const model = this.hydrate(records[key]);
            condition(model) && collection.push(model);
        }
        return collection;
    }
    /**
     * Convert given collection to records by using index id as a key.
     */
    convertCollectionToRecords(collection) {
        return collection.reduce((carry, model) => {
            carry[model['$id']] = model.$getAttributes();
            return carry;
        }, {});
    }
    /**
     * Clears the current state from any data related to current model.
     *
     * - Everything if not in a inheritance scheme.
     * - Only derived instances if applied to a derived entity.
     */
    emptyState() {
        this.deleteAll();
    }
    /**
     * Build executable hook collection for the given hook.
     */
    buildHooks(on) {
        const hooks = this.getGlobalHookAsArray(on);
        const localHook = this.model[on];
        localHook && hooks.push(localHook.bind(this.model));
        return hooks;
    }
    /**
     * Get global hook of the given name as array by stripping id key and keep
     * only hook functions.
     */
    getGlobalHookAsArray(on) {
        const hooks = this.self().hooks[on];
        return hooks ? hooks.map((h) => h.callback.bind(this)) : [];
    }
    /**
     * Execute mutation hooks to the given collection.
     */
    executeMutationHooks(on, collection) {
        const hooks = this.buildHooks(on);
        if (hooks.length === 0) {
            return collection;
        }
        return collection.filter((model) => {
            return !hooks.some((hook) => hook(model, null, this.entity) === false);
        });
    }
    /**
     * Execute retrieve hook for the given method.
     */
    executeSelectHook(on, models) {
        const hooks = this.buildHooks(on);
        return hooks.reduce((collection, hook) => {
            collection = hook(models, this.entity);
            return collection;
        }, models);
    }
}
/**
 * The global lifecycle hook registries.
 */
Query.hooks = {};
/**
 * The counter to generate the UID for global hooks.
 */
Query.lastHookId = 0;

/**
 * Create a new Query instance.
 */
function query(_state) {
    return (entity) => new Query(this, entity);
}
/**
 * Get all data of given entity.
 */
function all(_state) {
    return (entity) => new Query(this, entity).all();
}
/**
 * Find a data of the given entity by given id.
 */
function find(_state) {
    return (entity, id) => {
        return new Query(this, entity).find(id);
    };
}
/**
 * Find a data of the given entity by given id.
 */
function findIn(_state) {
    return (entity, idList) => {
        return new Query(this, entity).findIn(idList);
    };
}
const RootGetters = {
    query,
    all,
    find,
    findIn
};

class OptionsBuilder {
    /**
     * Get persist options from the given payload.
     */
    static createPersistOptions(payload) {
        return {
            create: payload.create,
            insert: payload.insert,
            update: payload.update,
            insertOrUpdate: payload.insertOrUpdate
        };
    }
}

/**
 * Create new data with all fields filled by default values.
 */
async function newRecord(_context, payload) {
    return new Query(this, payload.entity).new();
}
/**
 * Save given data to the store by replacing all existing records in the
 * store. If you want to save data without replacing existing records,
 * use the `insert` method instead.
 */
async function create(_context, payload) {
    const entity = payload.entity;
    const data = payload.data;
    const options = OptionsBuilder.createPersistOptions(payload);
    return new Query(this, entity).create(data, options);
}
/**
 * Insert given data to the state. Unlike `create`, this method will not
 * remove existing data within the state, but it will update the data
 * with the same primary key.
 */
async function insert$1(_context, payload) {
    const entity = payload.entity;
    const data = payload.data;
    const options = OptionsBuilder.createPersistOptions(payload);
    return new Query(this, entity).insert(data, options);
}
/**
 * Update data in the store.
 */
async function update$1(_context, payload) {
    const entity = payload.entity;
    const data = payload.data;
    const where = payload.where || null;
    const options = OptionsBuilder.createPersistOptions(payload);
    return new Query(this, entity).update(data, where, options);
}
/**
 * Insert or update given data to the state. Unlike `insert`, this method
 * will not replace existing data within the state, but it will update only
 * the submitted data with the same primary key.
 */
async function insertOrUpdate(_context, payload) {
    const entity = payload.entity;
    const data = payload.data;
    const options = OptionsBuilder.createPersistOptions(payload);
    return new Query(this, entity).insertOrUpdate(data, options);
}
async function destroy$1(_context, payload) {
    const { entity, where } = payload;
    return new Query(this, entity).delete(where);
}
/**
 * Delete all data from the store.
 */
async function deleteAll(_context, payload) {
    if (payload && payload.entity) {
        new Query(this, payload.entity).deleteAll();
        return;
    }
    Query.deleteAll(this);
}
const RootActions = {
    new: newRecord,
    create,
    insert: insert$1,
    update: update$1,
    insertOrUpdate,
    delete: destroy$1,
    deleteAll
};

class Connection {
    /**
     * Create a new connection instance.
     */
    constructor(store, connection, entity) {
        this.store = store;
        this.connection = connection;
        this.entity = entity;
        this.rootState = this.store.state[connection];
        this.state = this.rootState[entity];
    }
    /**
     * Insert the given record.
     */
    insert(record) {
        this.state.data = { ...this.state.data, [record.$id]: record };
    }
    /**
     * Insert the given records.
     */
    insertRecords(records) {
        this.state.data = { ...this.state.data, ...records };
    }
    /**
     * Updates the given record.
     */
    update(newId, record) {
        delete this.state.data[record.$id];
        record.$id = newId;
        this.state.data = { ...this.state.data, [record.$id]: record };
    }
    /**
     * Delete records that matches the given id.
     */
    delete(id) {
        const data = {};
        for (const i in this.state.data) {
            if (!id.includes(i)) {
                data[i] = this.state.data[i];
            }
        }
        this.state.data = data;
    }
}

/**
 * Execute generic mutation. This method is used by `Model.commit` method so
 * that user can commit any state changes easily through models.
 */
function $mutate(state, payload) {
    payload.callback(state[payload.entity]);
}
/**
 * Insert the given record.
 */
function insert(state, payload) {
    const { entity, record } = payload;
    new Connection(this, state.$name, entity).insert(record);
}
/**
 * Insert the given records.
 */
function insertRecords(state, payload) {
    const { entity, records } = payload;
    new Connection(this, state.$name, entity).insertRecords(records);
}
/**
 * Update the given record.
 */
function update(state, payload) {
    const { entity, record, newId } = payload;
    new Connection(this, state.$name, entity).update(newId, record);
}
/**
 * Delete records from the store. The actual name for this mutation is
 * `delete`, but named `destroy` here because `delete` can't be declared at
 * this scope level.
 */
function destroy(state, payload) {
    const { entity, id } = payload;
    new Connection(this, state.$name, entity).delete(id);
}
const RootMutations = {
    $mutate,
    insert,
    insertRecords,
    update,
    delete: destroy
};

class IdAttribute {
    /**
     * Creates a closure that generates the required id's for an entity.
     */
    static create(model) {
        return (value, _parentValue, _key) => {
            this.generateIds(value, model);
            const indexId = this.generateIndexId(value, model);
            return indexId;
        };
    }
    /**
     * Generate a field that is defined as primary keys. For keys with a proper
     * value set, it will do nothing. If a key is missing, it will generate
     * UID for it.
     */
    static generateIds(record, model) {
        const keys = isArray(model.primaryKey)
            ? model.primaryKey
            : [model.primaryKey];
        keys.forEach((k) => {
            if (record[k] !== undefined && record[k] !== null) {
                return;
            }
            const attr = model.getFields()[k];
            record[k] = attr instanceof Uid ? attr.make() : Uid$1.make();
        });
    }
    /**
     * Generate index id field (which is `$id`) and attach to the given record.
     */
    static generateIndexId(record, model) {
        record.$id = model.getIndexIdFromRecord(record);
        return record.$id;
    }
}

class Schema {
    /**
     * Create a new schema instance.
     */
    constructor(model) {
        /**
         * List of generated schemas.
         */
        this.schemas = {};
        this.model = model;
        const models = model.database().models();
        Object.keys(models).forEach((name) => {
            this.one(models[name]);
        });
    }
    /**
     * Create a schema for the given model.
     */
    static create(model) {
        return new this(model).one();
    }
    /**
     * Create a single schema for the given model.
     */
    one(model) {
        model = model || this.model;
        if (this.schemas[model.entity]) {
            return this.schemas[model.entity];
        }
        const schema$1 = new schema.Entity(model.entity, {}, {
            idAttribute: IdAttribute.create(model)
        });
        this.schemas[model.entity] = schema$1;
        const definition = this.definition(model);
        schema$1.define(definition);
        return schema$1;
    }
    /**
     * Create an array schema for the given model.
     */
    many(model) {
        return new schema.Array(this.one(model));
    }
    /**
     * Create an union schema for the given model.
     */
    union(callback) {
        return new schema.Union(this.schemas, callback);
    }
    /**
     * Create a dfinition for the given model.
     */
    definition(model) {
        const fields = model.getFields();
        return Object.keys(fields).reduce((definition, key) => {
            const field = fields[key];
            if (field instanceof Relation) {
                definition[key] = field.define(this);
            }
            return definition;
        }, {});
    }
}

class Database {
    constructor() {
        /**
         * The list of entities. It contains models and modules with its name.
         * The name is going to be the namespace for the Vuex Modules.
         */
        this.entities = [];
        /**
         * The normalizr schema.
         */
        this.schemas = {};
        /**
         * Whether the database has already been installed to Vuex or not.
         * Model registration steps depend on its value.
         */
        this.isStarted = false;
    }
    /**
     * Initialize the database before a user can start using it.
     */
    start(store, namespace) {
        this.store = store;
        this.namespace = namespace;
        this.connect();
        this.registerModules();
        this.createSchema();
        this.isStarted = true;
    }
    /**
     * Register a model and a module to Database.
     */
    register(model, module = {}) {
        this.checkModelTypeMappingCapability(model);
        const entity = {
            name: model.entity,
            base: model.baseEntity || model.entity,
            model: this.createBindingModel(model),
            module
        };
        this.entities.push(entity);
        if (this.isStarted) {
            this.registerModule(entity);
            this.registerSchema(entity);
        }
    }
    model(model) {
        const name = typeof model === 'string' ? model : model.entity;
        const entity = this.entities.find((entity) => {
            return entity.name === name;
        });
        const m = entity ? entity.model : null;
        if (!m) {
            throw new Error(`[Vuex ORM] Could not find the model \`${name}\`. Please check if you ` +
                'have registered the model to the database.');
        }
        return m;
    }
    baseModel(model) {
        const name = typeof model === 'string' ? model : model.entity;
        const entity = this.entities.find((entity) => {
            return entity.name === name;
        });
        const m = entity ? this.model(entity.base) : null;
        if (!m) {
            throw new Error(`[Vuex ORM] Could not find the model \`${name}\`. Please check if you ` +
                'have registered the model to the database.');
        }
        return m;
    }
    /**
     * Get all models from the entities list.
     */
    models() {
        return this.entities.reduce((models, entity) => {
            models[entity.name] = entity.model;
            return models;
        }, {});
    }
    /**
     * Get all base models from the entities list.
     */
    baseModels() {
        return this.entities.reduce((models, entity) => {
            models[entity.name] = this.model(entity.base);
            return models;
        }, {});
    }
    /**
     * Get the module of the given name from the entities list.
     */
    module(name) {
        const module = this.modules()[name];
        if (!module) {
            throw new Error(`[Vuex ORM] Could not find the module \`${name}\`. Please check if you ` +
                'have registered the module to the database.');
        }
        return module;
    }
    /**
     * Get all modules from the entities list.
     */
    modules() {
        return this.entities.reduce((modules, entity) => {
            modules[entity.name] = entity.module;
            return modules;
        }, {});
    }
    /**
     * Get the root state from the store.
     */
    getState() {
        return this.store.state[this.namespace];
    }
    /**
     * Create a new model that binds the database.
     *
     * Transpiled classes cannot extend native classes. Implemented a workaround
     * until Babel releases a fix (https://github.com/babel/babel/issues/9367).
     */
    createBindingModel(model) {
        let proxy;
        try {
            proxy = new Function('model', `
        'use strict';
        return class ${model.name} extends model {}
      `)(model);
        }
        catch (_a) {
            /* istanbul ignore next: rollback (mostly <= IE10) */
            proxy = class extends model {
            };
            /* istanbul ignore next: allocate model name */
            Object.defineProperty(proxy, 'name', { get: () => model.name });
        }
        Object.defineProperty(proxy, 'store', {
            value: () => this.store
        });
        return proxy;
    }
    /**
     * Create Vuex Module from the registered entities, and register to
     * the store.
     */
    registerModules() {
        this.store.registerModule(this.namespace, this.createModule());
    }
    /**
     * Generate module from the given entity, and register to the store.
     */
    registerModule(entity) {
        this.store.registerModule([this.namespace, entity.name], this.createSubModule(entity));
    }
    /**
     * Create Vuex Module from the registered entities.
     */
    createModule() {
        const module = this.createRootModule();
        this.entities.forEach((entity) => {
            module.modules[entity.name] = this.createSubModule(entity);
        });
        return module;
    }
    /**
     * Create root module.
     */
    createRootModule() {
        return {
            namespaced: true,
            state: this.createRootState(),
            getters: this.createRootGetters(),
            actions: this.createRootActions(),
            mutations: this.createRootMutations(),
            modules: {}
        };
    }
    /**
     * Create root state.
     */
    createRootState() {
        return () => ({ $name: this.namespace });
    }
    /**
     * Create root getters. For the getters, we bind the store instance to each
     * function to retrieve database instances within getters. We only need this
     * for the getter since actions and mutations are already bound to store.
     */
    createRootGetters() {
        return mapValues(RootGetters, (_getter, name) => {
            return RootGetters[name].bind(this.store);
        });
    }
    /**
     * Create root actions.
     */
    createRootActions() {
        return RootActions;
    }
    /**
     * Create root mutations.
     */
    createRootMutations() {
        return RootMutations;
    }
    /**
     * Create sub module.
     */
    createSubModule(entity) {
        return {
            namespaced: true,
            state: this.createSubState(entity),
            getters: this.createSubGetters(entity),
            actions: this.createSubActions(entity),
            mutations: this.createSubMutations(entity)
        };
    }
    /**
     * Create sub state.
     */
    createSubState(entity) {
        const { name, model, module } = entity;
        const modelState = typeof model.state === 'function' ? model.state() : model.state;
        const moduleState = typeof module.state === 'function' ? module.state() : module.state;
        return () => ({
            ...modelState,
            ...moduleState,
            $connection: this.namespace,
            $name: name,
            data: {}
        });
    }
    /**
     * Create sub getters.
     */
    createSubGetters(entity) {
        return { ...Getters, ...entity.module.getters };
    }
    /**
     * Create sub actions.
     */
    createSubActions(entity) {
        return { ...Actions, ...entity.module.actions };
    }
    /**
     * Create sub mutations.
     */
    createSubMutations(entity) {
        var _a;
        return (_a = entity.module.mutations) !== null && _a !== void 0 ? _a : {};
    }
    /**
     * Create the schema definition from registered entities list and set it to
     * the `schema` property. This schema will be used by the normalizer
     * to normalize data before persisting them to the Vuex Store.
     */
    createSchema() {
        this.entities.forEach((entity) => {
            this.registerSchema(entity);
        });
    }
    /**
     * Generate schema from the given entity.
     */
    registerSchema(entity) {
        this.schemas[entity.name] = Schema.create(entity.model);
    }
    /**
     * Inject database to the store instance.
     */
    connect() {
        this.store.$db = () => this;
    }
    /**
     * Warn user if the given model is a type of an inherited model that is being
     * defined without overwriting `Model.types()` because the user will not be
     * able to use the type mapping feature in this case.
     */
    checkModelTypeMappingCapability(model) {
        // We'll not be logging any warning if it's on a production environment,
        // so let's return here if it is.
        /* istanbul ignore next */
        {
            return;
        }
    }
}

function use (plugin, options = {}) {
    const components = {
        Model,
        Attribute,
        Type,
        Attr,
        String: String$1,
        Number,
        Boolean,
        Uid,
        Relation,
        HasOne,
        BelongsTo,
        HasMany,
        HasManyBy,
        BelongsToMany,
        HasManyThrough,
        MorphTo,
        MorphOne,
        MorphMany,
        MorphToMany,
        MorphedByMany,
        Getters,
        Actions,
        RootGetters,
        RootActions,
        RootMutations,
        Query,
        Database
    };
    plugin.install(components, options);
}

var index = {
    install,
    use,
    Container,
    Database,
    Model,
    Attribute,
    Type,
    Attr,
    String: String$1,
    Number,
    Boolean,
    Uid,
    Relation,
    HasOne,
    BelongsTo,
    HasMany,
    HasManyBy,
    BelongsToMany,
    HasManyThrough,
    MorphTo,
    MorphOne,
    MorphMany,
    MorphToMany,
    MorphedByMany,
    Getters,
    Actions,
    RootGetters,
    RootActions,
    RootMutations,
    Query
};

export { Actions, Attr, Attribute, BelongsTo, BelongsToMany, Boolean, Container, Database, Getters, HasMany, HasManyBy, HasManyThrough, HasOne, Model, MorphMany, MorphOne, MorphTo, MorphToMany, MorphedByMany, Number, Query, Relation, RootActions, RootGetters, RootMutations, String$1 as String, Type, Uid, index as default, install, use };
