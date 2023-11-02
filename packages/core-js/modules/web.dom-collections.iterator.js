'use strict';
var global = require('../internals/global');
var getBuiltInPrototypeMethod = require('../internals/get-built-in-prototype-method');
var DOMIterables = require('../internals/dom-iterables');
var DOMTokenListPrototype = require('../internals/dom-token-list-prototype');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// dependency: es.array.iterator
var ArrayValues = getBuiltInPrototypeMethod('Array', 'values');

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      // dependency: es.object.to-string
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) ['entries', 'keys', 'values'].forEach(function (METHOD_NAME) {
      // dependency: es.array.iterator
      var method = getBuiltInPrototypeMethod('Array', METHOD_NAME);
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== method) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, method);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = method;
      }
    });
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');
