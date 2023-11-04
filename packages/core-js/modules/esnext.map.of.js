'use strict';
var $ = require('../internals/export');
var of = require('../internals/collection-of');

// `Map.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
// dependency: es.map.constructor
$({ target: 'Map', stat: true, forced: true }, {
  of: of,
});
