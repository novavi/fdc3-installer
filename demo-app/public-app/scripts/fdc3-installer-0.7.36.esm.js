function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

var fdc3InstallerName = 'Open FDC3 Installer';
var fdc3InstallerVersion = '0.7.36';

var InstallerConfigSource;
(function (InstallerConfigSource) {
  InstallerConfigSource["Container"] = "Container";
  InstallerConfigSource["App"] = "App";
})(InstallerConfigSource || (InstallerConfigSource = {}));

var getContainerOrigin = function getContainerOrigin() {
  var containerOrigin;
  if (window.parent && window.parent !== window) {
    // Application is running in an iframe inside a micro-frontend container
    if (window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0) {
      // Use the origin of ultimate ancestor browsing context.  This handles both the (common) iframe and (uncommon) nested-iframe scenarios.
      // Note that this assumes the micro-frontend container itself is *not* hosted in an iframe (which would arguably be an odd thing to do)
      containerOrigin = new URL(window.location.ancestorOrigins[window.location.ancestorOrigins.length - 1]).origin;
    } else {
      throw new Error("ancestorOrigins for application at url '" + window.location.href + "' could not be found in window.location");
    }
  } else if (window.opener) {
    // Application is running in an external window spawned from a micro-frontend container.
    // Note that this assumes the application was spawned *directly* by the micro-frontend container.  This might be a reasonable assumption in
    // the case where the container and application use an FDC3 Agent which relies on local native browser event APIs for FDC3 messaging, because
    // such an FDC3 Agent will likely require an 'FDC3 messaging router' of sorts in the container, and so the FDC3 Agent's fdc3.open() method can
    // delegate the actual window.open() invocation to the container - meaning that  document.referrer  will in fact reference the container as expected.
    // However, there will be some scenarios where this would not work in the case of a FDC3 Agent which relies on WebSockets for cloud-based FDC3 messaging, because
    // in that scenario the lack of an 'FDC3 messaging router' in the container (because there would be no requirement for a container at all) would mean that application
    // windows would be spawned from each other (rather than from a container) and therefore  document.referrer  *could* reference another application, rather than a container.
    // In practice, it's fair to say that a container-based discovery strategy is neither appropriate (or supported by this library) for the case of applications
    // using cloud-based FDC3 Agent implementations.  Those applications can however by supported by this library by simply using an application-based discovery strategy.
    containerOrigin = new URL(document.referrer).origin;
  } else {
    throw new Error("Failed to determine container origin because application at url '" + window.location.href + "' does not appear to be running inside a micro-frontend container");
  }
  return containerOrigin;
};

var getInstallerConfig = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(configSource) {
    var installerConfig, fdc3InstallerConfigFileName, fdc3InstallerConfigUrl, icResponse, pdResponse;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log(fdc3InstallerName + " - Loading installer config for source '" + configSource + "'...");
          // Attempt to load installer config
          fdc3InstallerConfigFileName = 'fdc3-installer-config.json';
          fdc3InstallerConfigUrl = configSource === InstallerConfigSource.Container ? getContainerOrigin() + "/" + fdc3InstallerConfigFileName : fdc3InstallerConfigFileName;
          _context.next = 5;
          return fetch(fdc3InstallerConfigUrl);
        case 5:
          icResponse = _context.sent;
          if (icResponse.ok) {
            _context.next = 8;
            break;
          }
          throw new Error("Installer config at url '" + fdc3InstallerConfigUrl + "' for configSource '" + configSource + "' could not be located");
        case 8:
          _context.prev = 8;
          _context.next = 11;
          return icResponse.json();
        case 11:
          installerConfig = _context.sent;
          _context.next = 17;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](8);
          throw new Error("Installer config at url '" + fdc3InstallerConfigUrl + "' for configSource '" + configSource + "' could not be parsed");
        case 17:
          if (!(!installerConfig.providerDirectory || installerConfig.providerDirectory.length === 0)) {
            _context.next = 38;
            break;
          }
          if (installerConfig.providerDirectoryUrl) {
            _context.next = 22;
            break;
          }
          throw new Error("No providerDirectory or providerDirectoryUrl could be found in config");
        case 22:
          _context.next = 24;
          return fetch(installerConfig.providerDirectoryUrl);
        case 24:
          pdResponse = _context.sent;
          if (pdResponse.ok) {
            _context.next = 27;
            break;
          }
          throw new Error("Provider directory at url '" + installerConfig.providerDirectoryUrl + "' could not be located");
        case 27:
          _context.prev = 27;
          _context.next = 30;
          return pdResponse.json();
        case 30:
          installerConfig.providerDirectory = _context.sent;
          _context.next = 36;
          break;
        case 33:
          _context.prev = 33;
          _context.t1 = _context["catch"](27);
          throw new Error("Provider directory at url '" + installerConfig.providerDirectoryUrl + "' could not be parsed");
        case 36:
          if (!(!installerConfig.providerDirectory || installerConfig.providerDirectory.length === 0)) {
            _context.next = 38;
            break;
          }
          throw new Error("Provider directory at url '" + installerConfig.providerDirectoryUrl + "' is empty");
        case 38:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            resolve(installerConfig);
          }));
        case 39:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[8, 14], [27, 33]]);
  }));
  return function getInstallerConfig(_x) {
    return _ref.apply(this, arguments);
  };
}();

var DiscoveryStrategyType;
(function (DiscoveryStrategyType) {
  DiscoveryStrategyType["ContainerExplicit"] = "ContainerExplicit";
  DiscoveryStrategyType["ContainerOrigin"] = "ContainerOrigin";
  DiscoveryStrategyType["AppExplicit"] = "AppExplicit";
  DiscoveryStrategyType["AppOrigin"] = "AppOrigin";
  DiscoveryStrategyType["AppQuerystring"] = "AppQuerystring";
  DiscoveryStrategyType["AppWindowName"] = "AppWindowName";
  DiscoveryStrategyType["AppSessionStorage"] = "AppSessionStorage";
})(DiscoveryStrategyType || (DiscoveryStrategyType = {}));

var discoveryContainerExplicitStrategyExecutor = function discoveryContainerExplicitStrategyExecutor(discoveryStrategy) {
  if (!discoveryStrategy.providerId) {
    throw new Error("providerId could not be found in discoveryStrategy");
  }
  return discoveryStrategy.providerId;
};
var discoveryContainerOriginStrategyExecutor = function discoveryContainerOriginStrategyExecutor(discoveryStrategy) {
  var originProviderIdMapping;
  var containerOrigin = getContainerOrigin();
  var originProviderIdMappings = discoveryStrategy.originProviderIdMappings.filter(function (opm) {
    return opm.origin === containerOrigin;
  });
  if (originProviderIdMappings.length === 0) {
    throw new Error("originProviderIdMapping for origin '" + containerOrigin + "' could not be found in discoveryStrategy");
  } else if (originProviderIdMappings.length > 1) {
    throw new Error("Multiple originProviderIdMapping items with origin '" + containerOrigin + "' found in discoveryStrategy");
  } else {
    originProviderIdMapping = originProviderIdMappings[0];
  }
  return originProviderIdMapping.providerId;
};
var discoveryAppExplicitStrategyExecutor = function discoveryAppExplicitStrategyExecutor(discoveryStrategy) {
  if (!discoveryStrategy.providerId) {
    throw new Error("providerId could not be found in discoveryStrategy");
  }
  return discoveryStrategy.providerId;
};
var discoveryAppOriginStrategyExecutor = function discoveryAppOriginStrategyExecutor(discoveryStrategy) {
  var originProviderIdMapping;
  var originProviderIdMappings = discoveryStrategy.originProviderIdMappings.filter(function (opm) {
    return opm.origin === window.location.origin;
  });
  if (originProviderIdMappings.length === 0) {
    throw new Error("originProviderIdMapping for origin '" + window.location.origin + "' could not be found in discoveryStrategy");
  } else if (originProviderIdMappings.length > 1) {
    throw new Error("Multiple originProviderIdMapping items with origin '" + window.location.origin + "' found in discoveryStrategy");
  } else {
    originProviderIdMapping = originProviderIdMappings[0];
  }
  return originProviderIdMapping.providerId;
};
var discoveryAppQuerystringStrategyExecutor = function discoveryAppQuerystringStrategyExecutor(discoveryStrategy) {
  var paramValueProviderIdMapping;
  if (!discoveryStrategy.paramName) {
    throw new Error("paramName could not be found in discoveryStrategy");
  }
  var runtimeAppParams = new URL(window.location.href).searchParams;
  var runtimeAppParamValue = runtimeAppParams.get(discoveryStrategy.paramName);
  if (!runtimeAppParamValue) {
    throw new Error("param '" + discoveryStrategy.paramName + "' could not be found in application url");
  }
  var paramValueProviderIdMappings = discoveryStrategy.paramValueProviderIdMappings.filter(function (pvpm) {
    return pvpm.paramValue === runtimeAppParamValue;
  });
  if (paramValueProviderIdMappings.length === 0) {
    throw new Error("paramValueProviderIdMapping for paramValue '" + runtimeAppParamValue + "' could not be found in discoveryStrategy");
  } else if (paramValueProviderIdMappings.length > 1) {
    throw new Error("Multiple paramValueProviderIdMapping items with paramValue '" + runtimeAppParamValue + "' found in discoveryStrategy");
  } else {
    paramValueProviderIdMapping = paramValueProviderIdMappings[0];
  }
  return paramValueProviderIdMapping.providerId;
};
var discoveryAppWindowNameStrategyExecutor = function discoveryAppWindowNameStrategyExecutor(discoveryStrategy) {
  throw new Error('Not implemented');
  // Use:
  //  discoveryStrategy.valueDelimiter
  //  discoveryStrategy.providerNameOrdinal
  //  discoveryStrategy.providerVersionOrdinal
  //  discoveryStrategy.providerFdc3VersionOrdinal
  // For example:
  //  * use window.name to get the string containing the values that have been projected through to the app window from the micro-frontend container that spawned it
  //  * Create and return a ProviderID object
};

var discoveryAppSessionStorageStrategyExecutor = function discoveryAppSessionStorageStrategyExecutor(discoveryStrategy) {
  throw new Error('Not implemented');
  // Use:
  //  discoveryStrategy.keyName
  //  discoveryStrategy.providerNameValuePath
  //  discoveryStrategy.providerVersionValuePath
  //  discoveryStrategy.providerFdc3VersionValuePath
  // For example:
  //  * use something like this to get the item value:  sessionStorage.getItem(discoveryStrategy.keyName)
  //  * parse the stringified item value into an object, and use Lodash get() method or similar to get the values specified by the xxxValuePath properties from the object
  //  * Create and return a ProviderID object
  // Further thoughts:
  //  * Could consider supporting a stringified ProviderID object (still using keyName to retrieve) but using implicit xxxValuePath properties unless they are explicitly supplied
  //  * Additionally, could also potentially support three separate item key names for the three properties (instead of having a single item value and parsing it into an object)
};

var discoveryStrategyExecutors = /*#__PURE__*/new Map();
discoveryStrategyExecutors.set(DiscoveryStrategyType.ContainerExplicit, discoveryContainerExplicitStrategyExecutor);
discoveryStrategyExecutors.set(DiscoveryStrategyType.ContainerOrigin, discoveryContainerOriginStrategyExecutor);
discoveryStrategyExecutors.set(DiscoveryStrategyType.AppExplicit, discoveryAppExplicitStrategyExecutor);
discoveryStrategyExecutors.set(DiscoveryStrategyType.AppOrigin, discoveryAppOriginStrategyExecutor);
discoveryStrategyExecutors.set(DiscoveryStrategyType.AppQuerystring, discoveryAppQuerystringStrategyExecutor);
discoveryStrategyExecutors.set(DiscoveryStrategyType.AppWindowName, discoveryAppWindowNameStrategyExecutor);
discoveryStrategyExecutors.set(DiscoveryStrategyType.AppSessionStorage, discoveryAppSessionStorageStrategyExecutor);
var getDiscoveryStrategyExecutor = function getDiscoveryStrategyExecutor(discoveryStrategyType) {
  console.log(fdc3InstallerName + " - Getting discovery strategy executor for type '" + discoveryStrategyType + "'...");
  var discoveryStrategyExecutor = discoveryStrategyExecutors.get(discoveryStrategyType);
  if (!discoveryStrategyExecutor) {
    throw new Error("Implementation for discoveryStrategy type '" + discoveryStrategyType + "' could not be found");
  }
  return discoveryStrategyExecutor;
};

var CreationStrategyType;
(function (CreationStrategyType) {
  CreationStrategyType["ClassInstance"] = "ClassInstance";
  CreationStrategyType["Class"] = "Class";
  CreationStrategyType["FactoryFunction"] = "FactoryFunction";
  CreationStrategyType["FactoryClassInstance"] = "FactoryClassInstance";
  CreationStrategyType["FactoryClass"] = "FactoryClass";
  CreationStrategyType["StaticFactoryClass"] = "StaticFactoryClass";
})(CreationStrategyType || (CreationStrategyType = {}));

var creationClassInstanceStrategyExecutor = function creationClassInstanceStrategyExecutor(creationStrategy, fdc3AgentModuleObject) {
  if (typeof fdc3AgentModuleObject !== 'object') {
    throw new Error("Expected fdc3AgentModuleObject to be a class instance, but it is of type '" + typeof fdc3AgentModuleObject + "'");
  }
  return new Promise(function (resolve, reject) {
    resolve(fdc3AgentModuleObject);
  });
};
var creationClassStrategyExecutor = function creationClassStrategyExecutor(creationStrategy, fdc3AgentModuleObject) {
  if (typeof fdc3AgentModuleObject !== 'function' || typeof fdc3AgentModuleObject.constructor !== 'function') {
    throw new Error("Expected fdc3AgentModuleObject to be a class, but it is of type '" + typeof fdc3AgentModuleObject + "'");
  }
  if (!!creationStrategy.constructorArgs && !Array.isArray(creationStrategy.constructorArgs)) {
    throw new Error('creationStrategy.functionArgs in config needs to be an array');
  }
  return new Promise(function (resolve, reject) {
    var _Function$prototype$b;
    var fdc3Agent = /*DesktopAgent*/new ((_Function$prototype$b = Function.prototype.bind).call.apply(_Function$prototype$b, [fdc3AgentModuleObject, undefined].concat(creationStrategy.constructorArgs)))();
    resolve(fdc3Agent);
  });
};
var creationFactoryFunctionStrategyExecutor = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(creationStrategy, fdc3AgentModuleObject) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(typeof fdc3AgentModuleObject !== 'function')) {
            _context.next = 2;
            break;
          }
          throw new Error("Expected fdc3AgentModuleObject to be a factory function, but it is of type '" + typeof fdc3AgentModuleObject + "'");
        case 2:
          if (!(!!creationStrategy.functionArgs && !Array.isArray(creationStrategy.functionArgs))) {
            _context.next = 4;
            break;
          }
          throw new Error('creationStrategy.functionArgs in config needs to be an array');
        case 4:
          _context.next = 6;
          return fdc3AgentModuleObject.apply(undefined, creationStrategy.functionArgs);
        case 6:
          return _context.abrupt("return", _context.sent);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function creationFactoryFunctionStrategyExecutor(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var creationFactoryClassInstanceStrategyExecutor = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(creationStrategy, fdc3AgentModuleObject) {
    var factoryMethod;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(typeof fdc3AgentModuleObject !== 'object')) {
            _context2.next = 2;
            break;
          }
          throw new Error("Expected fdc3AgentModuleObject to be a factory class instance, but it is of type '" + typeof fdc3AgentModuleObject + "'");
        case 2:
          if (creationStrategy.methodName) {
            _context2.next = 4;
            break;
          }
          throw new Error('Missing creationStrategy.methodName in config');
        case 4:
          factoryMethod = fdc3AgentModuleObject[creationStrategy.methodName];
          if (factoryMethod) {
            _context2.next = 7;
            break;
          }
          throw new Error("Factory method named '" + creationStrategy.methodName + "' could not be found on factory class instance");
        case 7:
          if (!(typeof factoryMethod !== 'function')) {
            _context2.next = 9;
            break;
          }
          throw new Error("Expected factory method named '" + creationStrategy.methodName + "' to be a method, but it is of type '" + typeof factoryMethod + "'");
        case 9:
          if (!(!!creationStrategy.methodArgs && !Array.isArray(creationStrategy.methodArgs))) {
            _context2.next = 11;
            break;
          }
          throw new Error('creationStrategy.methodArgs in config needs to be an array');
        case 11:
          _context2.next = 13;
          return factoryMethod.apply(fdc3AgentModuleObject, creationStrategy.methodArgs);
        case 13:
          return _context2.abrupt("return", _context2.sent);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function creationFactoryClassInstanceStrategyExecutor(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var creationFactoryClassStrategyExecutor = function creationFactoryClassStrategyExecutor(creationStrategy, fdc3AgentModuleObject) {
  throw new Error('Not implemented');
  // Use:
  //  creationStrategy.constructorArgs
  //  creationStrategy.methodName
  //  creationStrategy.methodArgs
};

var creationStaticFactoryClassStrategyExecutor = function creationStaticFactoryClassStrategyExecutor(creationStrategy, fdc3AgentModuleObject) {
  throw new Error('Not implemented');
  // Use:
  //  creationStrategy.methodName
  //  creationStrategy.methodArgs
};

var creationStrategyExecutors = /*#__PURE__*/new Map();
creationStrategyExecutors.set(CreationStrategyType.ClassInstance, creationClassInstanceStrategyExecutor);
creationStrategyExecutors.set(CreationStrategyType.Class, creationClassStrategyExecutor);
creationStrategyExecutors.set(CreationStrategyType.FactoryFunction, creationFactoryFunctionStrategyExecutor);
creationStrategyExecutors.set(CreationStrategyType.FactoryClassInstance, creationFactoryClassInstanceStrategyExecutor);
creationStrategyExecutors.set(CreationStrategyType.FactoryClass, creationFactoryClassStrategyExecutor);
creationStrategyExecutors.set(CreationStrategyType.StaticFactoryClass, creationStaticFactoryClassStrategyExecutor);
var getCreationStrategyExecutor = function getCreationStrategyExecutor(creationStrategyType) {
  console.log(fdc3InstallerName + " - Getting creation strategy executor for type '" + creationStrategyType + "'...");
  var creationStrategyExecutor = creationStrategyExecutors.get(creationStrategyType);
  if (!creationStrategyExecutor) {
    throw new Error("Implementation for creationStrategyType '" + creationStrategyType + "' could not be found");
  }
  return creationStrategyExecutor;
};

var BootstrapStrategyType;
(function (BootstrapStrategyType) {
  BootstrapStrategyType["Implicit"] = "Implicit";
  BootstrapStrategyType["Explicit"] = "Explicit";
})(BootstrapStrategyType || (BootstrapStrategyType = {}));

var bootstrapImplicitStrategyExecutor = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(bootstrapStrategy, fdc3Agent) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            resolve();
          }));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function bootstrapImplicitStrategyExecutor(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var bootstrapExplicitStrategyExecutor = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(bootstrapStrategy, fdc3Agent) {
    var fdc3AgentBootstrapMethod;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (bootstrapStrategy.methodName) {
            _context2.next = 2;
            break;
          }
          throw new Error('Missing bootstrapStrategy.methodName in config');
        case 2:
          fdc3AgentBootstrapMethod = fdc3Agent[bootstrapStrategy.methodName];
          if (fdc3AgentBootstrapMethod) {
            _context2.next = 5;
            break;
          }
          throw new Error("Bootstrap method named '" + bootstrapStrategy.methodName + "' could not be found on FDC3 Agent");
        case 5:
          if (!(typeof fdc3AgentBootstrapMethod !== 'function')) {
            _context2.next = 7;
            break;
          }
          throw new Error("Expected bootstrap method named '" + bootstrapStrategy.methodName + "' to be a method, but it is of type '" + typeof fdc3AgentBootstrapMethod + "'");
        case 7:
          if (!(!!bootstrapStrategy.methodArgs && !Array.isArray(bootstrapStrategy.methodArgs))) {
            _context2.next = 9;
            break;
          }
          throw new Error('bootstrapStrategy.methodArgs in config needs to be an array');
        case 9:
          _context2.next = 11;
          return fdc3AgentBootstrapMethod.apply(fdc3Agent, bootstrapStrategy.methodArgs);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function bootstrapExplicitStrategyExecutor(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var bootstrapStrategyExecutors = /*#__PURE__*/new Map();
bootstrapStrategyExecutors.set(BootstrapStrategyType.Implicit, bootstrapImplicitStrategyExecutor);
bootstrapStrategyExecutors.set(BootstrapStrategyType.Explicit, bootstrapExplicitStrategyExecutor);
var getBootstrapStrategyExecutor = function getBootstrapStrategyExecutor(bootstrapStrategyType) {
  console.log(fdc3InstallerName + " - Getting bootstrap strategy executor for type '" + bootstrapStrategyType + "'...");
  var bootstrapStrategyExecutor = bootstrapStrategyExecutors.get(bootstrapStrategyType);
  if (!bootstrapStrategyExecutor) {
    throw new Error("Implementation for bootstrapStrategyType '" + bootstrapStrategyType + "' could not be found");
  }
  return bootstrapStrategyExecutor;
};

var nameof = function nameof(name) {
  return name;
};
var validateAgent = function validateAgent(providerId, installedImplementation) {
  //TODO - Consider improving this as the naive string-based equality test for version / fdc3Version would actually fail validation for '1.2' against '1.2.0' for example
  var mismatchedPropValues = [];
  if (installedImplementation.provider !== providerId.name) {
    mismatchedPropValues.push(nameof('name'));
  }
  if (installedImplementation.providerVersion !== providerId.version) {
    mismatchedPropValues.push(nameof('version'));
  }
  if (installedImplementation.fdc3Version !== providerId.fdc3Version) {
    mismatchedPropValues.push(nameof('fdc3Version'));
  }
  if (mismatchedPropValues.length > 0) {
    console.error("Installed provider implementation does not match providerId specified in provider directory entry (mismatched properties: " + mismatchedPropValues.join(', ') + ")");
    console.error('Provider directory entry:');
    console.error(providerId);
    console.error('Installed provider implementation');
    console.error(installedImplementation);
    throw new Error('Invalid agent');
  }
};

var fdc3Installer = {
  getInfo: function getInfo() {
    var installerMetadata = {
      installerName: fdc3InstallerName,
      installerVersion: fdc3InstallerVersion
    };
    return new Promise(function (resolve, reject) {
      resolve(installerMetadata);
    });
  },
  installAgent: /*#__PURE__*/function () {
    var _installAgent = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(configSource) {
      var providerDef, fdc3Agent, installerConfig, discoveryStrategyExecutor, discoveredProviderId, providerDefs, fdc3AgentModule, effectiveExportedName, fdc3AgentModuleObject, creationStrategyExecutor, bootstrapStrategyExecutor, installedImplementation;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!window.fdc3) {
              _context.next = 5;
              break;
            }
            fdc3Agent = window.fdc3;
            console.log("%c**\n** FDC3 is already supported in this environment. Therefore " + fdc3InstallerName + " v" + fdc3InstallerVersion + " will *not* attempt to discover and install an FDC3 Agent using the installer config. **\n**", 'font-weight:bold;');
            _context.next = 55;
            break;
          case 5:
            _context.next = 7;
            return getInstallerConfig(configSource);
          case 7:
            installerConfig = _context.sent;
            if (installerConfig.discoveryStrategy) {
              _context.next = 10;
              break;
            }
            throw new Error('Missing discoveryStrategy in config');
          case 10:
            discoveryStrategyExecutor = getDiscoveryStrategyExecutor(installerConfig.discoveryStrategy.type);
            discoveredProviderId = discoveryStrategyExecutor(installerConfig.discoveryStrategy); // Retrieve the provider definition for the given FDC3 Agent by using the installer config's provider directory
            console.log(fdc3InstallerName + " - Retrieving provider definition for provider '" + discoveredProviderId.name + "'...");
            providerDefs = installerConfig.providerDirectory.filter(function (pd) {
              return pd.providerId.name === discoveredProviderId.name && (!discoveredProviderId.version || pd.providerId.version === discoveredProviderId.version) && (!discoveredProviderId.fdc3Version || pd.providerId.fdc3Version === discoveredProviderId.fdc3Version);
            });
            if (!(providerDefs.length === 0)) {
              _context.next = 18;
              break;
            }
            throw new Error("No provider definition '" + discoveredProviderId.name + "' could be found in provider directory config");
          case 18:
            if (!(providerDefs.length > 1)) {
              _context.next = 22;
              break;
            }
            throw new Error("Multiple provider definitions for '" + discoveredProviderId.name + "' found in provider directory config");
          case 22:
            providerDef = providerDefs[0];
            // Import the FDC3 Agent module using the module url defined for the provider implementation
            console.log(fdc3InstallerName + " - Importing FDC3 Agent module using url '" + providerDef.providerImplementation.moduleUrl + "'...");
            _context.next = 26;
            return import(providerDef.providerImplementation.moduleUrl);
          case 26:
            fdc3AgentModule = _context.sent;
            if (fdc3AgentModule) {
              _context.next = 29;
              break;
            }
            throw new Error("Failure obtaining module from FDC3 Agent at url '" + providerDef.providerImplementation.moduleUrl + "'");
          case 29:
            // Get the FDC3 Agent module object using the exported name defined for the provider implementation
            effectiveExportedName = providerDef.providerImplementation.exportedName || "default";
            console.log(fdc3InstallerName + " - Getting FDC3 Agent module object using name '" + effectiveExportedName + "'...");
            fdc3AgentModuleObject = fdc3AgentModule[effectiveExportedName];
            if (fdc3AgentModuleObject) {
              _context.next = 34;
              break;
            }
            throw new Error("Failure obtaining exported object named '" + effectiveExportedName + "' from FDC3 Agent at url '" + providerDef.providerImplementation.moduleUrl + "'");
          case 34:
            if (providerDef.providerImplementation.creationStrategy) {
              _context.next = 36;
              break;
            }
            throw new Error('Missing creationStrategy in config');
          case 36:
            creationStrategyExecutor = getCreationStrategyExecutor(providerDef.providerImplementation.creationStrategy.type);
            console.log(fdc3InstallerName + " - Creating provider " + providerDef.providerId.name + " v" + providerDef.providerId.version + "...");
            _context.next = 40;
            return creationStrategyExecutor(providerDef.providerImplementation.creationStrategy, fdc3AgentModuleObject);
          case 40:
            fdc3Agent = _context.sent;
            if (providerDef.providerImplementation.bootstrapStrategy) {
              _context.next = 43;
              break;
            }
            throw new Error('Missing bootstrapStrategy in config');
          case 43:
            bootstrapStrategyExecutor = getBootstrapStrategyExecutor(providerDef.providerImplementation.bootstrapStrategy.type);
            console.log(fdc3InstallerName + " - Bootstrapping provider " + providerDef.providerId.name + " v" + providerDef.providerId.version + "...");
            _context.next = 47;
            return bootstrapStrategyExecutor(providerDef.providerImplementation.bootstrapStrategy, fdc3Agent);
          case 47:
            if (!installerConfig.discoveryStrategy.validateProvider) {
              _context.next = 53;
              break;
            }
            console.log(fdc3InstallerName + " - Validating installed provider " + providerDef.providerId.name + " v" + providerDef.providerId.version + "...");
            _context.next = 51;
            return fdc3Agent.getInfo();
          case 51:
            installedImplementation = _context.sent;
            validateAgent(providerDef.providerId, installedImplementation);
          case 53:
            console.log(fdc3InstallerName + " - Completed discovery, import, creation and bootstrap for provider " + providerDef.providerId.name + " v" + providerDef.providerId.version);
            // console.log(fdc3Agent);
            console.log(fdc3InstallerName + " - All done");
          case 55:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var installResolution = {
                providerDefinition: providerDef,
                fdc3: fdc3Agent
              };
              resolve(installResolution);
            }));
          case 56:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function installAgent(_x) {
      return _installAgent.apply(this, arguments);
    }
    return installAgent;
  }()
};

export { InstallerConfigSource, fdc3Installer };
//# sourceMappingURL=fdc3-installer-0.7.36.esm.js.map
