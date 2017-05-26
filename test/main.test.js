'use strict';

const assert = require('assert');

const forEachProp = require('../');

const {
	forEachOwnEnumerableProperty,
	forEachOwnProperty,
	forEachEnumerableProperty,
	forEachProperty
} = forEachProp;

const testDataSet = require('./test.data.js');

////////////////////////////
// functionWithProperties //
////////////////////////////

testDataSet.forEach(testData => {
	describe(testData.name, function() {
		describe('forEachOwnEnumerableProperty', function() {
			testMethod(forEachOwnEnumerableProperty, testData.ref, testData.forEachOwnEnumerableProperty);
		});

		describe('forEachOwnProperty', function() {
			testMethod(forEachOwnProperty, testData.ref, testData.forEachOwnProperty);
		});

		describe('forEachEnumerableProperty', function() {
			testMethod(forEachEnumerableProperty, testData.ref, testData.forEachEnumerableProperty);
		});

		describe('forEachProperty', function() {
			testMethod(forEachProperty, testData.ref, testData.forEachProperty);
		});

		describe('forEachProp :: forEachOwnEnumerableProperty :: nonEnumerable: false, prototypeChain: false', function() {
			testForEachProp(forEachOwnEnumerableProperty, testData.ref, testData.forEachOwnEnumerableProperty, { nonEnumerable: false, prototypeChain: false });
		});

		describe('forEachProp :: forEachOwnProperty :: nonEnumerable: true, prototypeChain: false', function() {
			testForEachProp(forEachOwnProperty, testData.ref, testData.forEachOwnProperty, { nonEnumerable: true, prototypeChain: false });
		});

		describe('forEachProp :: forEachEnumerableProperty :: nonEnumerable: false, prototypeChain: true', function() {
			testForEachProp(forEachEnumerableProperty, testData.ref, testData.forEachEnumerableProperty, { nonEnumerable: false, prototypeChain: true });
		});

		describe('forEachProp :: forEachProperty :: nonEnumerable: true, prototypeChain: true', function() {
			testForEachProp(forEachProperty, testData.ref, testData.forEachProperty, { nonEnumerable: true, prototypeChain: true });
		});
	});
});

function testMethod(methodToTest, ref, propsExpected) {
	const propsFound = [];

	it('must find the same number of props expected', function() {
		methodToTest(ref, (value, key, o) => {
			propsFound.push(key);
		});

		assert.equal(propsFound.length, propsExpected.length);
	});

	it('must find every prop expected', function() {
		assert(propsFound.every(prop => propsExpected.includes(prop)));
	});
}

function testForEachProp(methodToTest, ref, propsExpected, options) {
	const propsFound = [];

	it('must find the same number of props expected', function() {
		forEachProp(ref, (value, key, o) => {
			propsFound.push(key);
		}, options);

		assert.equal(propsFound.length, propsExpected.length);
	});

	it('must find every prop expected', function() {
		assert(propsFound.every(prop => propsExpected.includes(prop)));
	});
}


// console.log('=============== nonEnumerable: true, prototypeChain: true ================');
// forEachProp(functionWithProperties, (value, key, o) => console.log(key, value), { nonEnumerable: true, prototypeChain: true });
// console.log('=============== nonEnumerable: true, prototypeChain: false ================');
// forEachProp(functionWithProperties, (value, key, o) => console.log(key, value), { nonEnumerable: true, prototypeChain: false });
// console.log('=============== nonEnumerable: false, prototypeChain: false ================');
// forEachProp(functionWithProperties, (value, key, o) => console.log(key, value), { nonEnumerable: false, prototypeChain: false });
// console.log('=============== nonEnumerable: false, prototypeChain: true ================');
// forEachProp(functionWithProperties, (value, key, o) => console.log(key, value), { nonEnumerable: false, prototypeChain: true });