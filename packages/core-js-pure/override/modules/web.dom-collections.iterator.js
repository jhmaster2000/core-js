'use strict';
var global = require('../internals/global');
var getBuiltInPrototypeMethod = require('../internals/get-built-in-prototype-method');
var classof = require('../internals/classof');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var DOMIterables = require('../internals/dom-iterables');
var Iterators = require('../internals/iterators');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = getBuiltInPrototypeMethod('Array', 'values');

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
  }
  Iterators[COLLECTION_NAME] = ArrayValues;
}
