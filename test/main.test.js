'use strict';

const assert = require('assert');

const forEachProp = require('../');

const {
	forEachOwnEnumerableProperty,
	forEachOwnNonenumerableProperty,
	forEachOwnProperty,
	forEachEnumerableProperty,
	forEachNonenumerableProperty,
	forEachProperty,
	forEachPropDeep
} = forEachProp;

const testDataSet = require('./test.data.js');

////////////////////////////
// functionWithProperties //
////////////////////////////

testDataSet.forEach(testData => {
	describe(testData.name, function() {
		describe(`forEachOwnEnumerableProperty`, function() {
			testMethod(forEachOwnEnumerableProperty, testData.ref, testData.forEachOwnEnumerableProperty);
		});

		describe(`forEachOwnNonenumerableProperty`, function() {
			testMethod(forEachOwnNonenumerableProperty, testData.ref, testData.forEachOwnNonenumerableProperty);
		});

		describe(`forEachOwnProperty`, function() {
			testMethod(forEachOwnProperty, testData.ref, testData.forEachOwnProperty);
		});

		describe(`forEachEnumerableProperty`, function() {
			testMethod(forEachEnumerableProperty, testData.ref, testData.forEachEnumerableProperty);
		});

		describe(`forEachNonenumerableProperty`, function() {
			testMethod(forEachNonenumerableProperty, testData.ref, testData.forEachNonenumerableProperty);
		});

		describe(`forEachProperty`, function() {
			testMethod(forEachProperty, testData.ref, testData.forEachProperty);
		});

		describe(`forEachProp :: forEachOwnEnumerableProperty :: enumerability: 'enumerable', inherited: false`, function() {
			testMethod(forEachProp, testData.ref, testData.forEachOwnEnumerableProperty, { enumerability: 'enumerable', inherited: false });
		});

		describe(`forEachProp :: forEachOwnNonenumerableProperty :: enumerability: 'nonenumerable', inherited: false`, function() {
			testMethod(forEachProp, testData.ref, testData.forEachOwnNonenumerableProperty, { enumerability: 'nonenumerable', inherited: false });
		});

		describe(`forEachProp :: forEachOwnProperty :: enumerability: 'all', inherited: false`, function() {
			testMethod(forEachProp, testData.ref, testData.forEachOwnProperty, { enumerability: 'all', inherited: false });
		});

		describe(`forEachProp :: forEachEnumerableProperty :: enumerability: 'enumerable', inherited: true`, function() {
			testMethod(forEachProp, testData.ref, testData.forEachEnumerableProperty, { enumerability: 'enumerable', inherited: true });
		});

		describe(`forEachProp :: forEachNonenumerableProperty :: enumerability: 'nonenumerable', inherited: true`, function() {
			testMethod(forEachProp, testData.ref, testData.forEachNonenumerableProperty, { enumerability: 'nonenumerable', inherited: true });
		});

		describe(`forEachProp :: forEachProperty :: enumerability: 'all', inherited: true`, function() {
			testMethod(forEachProp, testData.ref, testData.forEachProperty, { enumerability: 'all', inherited: true });
		});

		describe(`forEachPropDeep :: forEachOwnEnumerableProperty :: enumerability: 'enumerable', inherited: false`, function() {
			testMethod(forEachPropDeep, testData.ref, testData.forEachPropDeep.forEachOwnEnumerableProperty, { enumerability: 'enumerable', inherited: false });
		});

		describe(`forEachPropDeep :: forEachOwnNonenumerableProperty :: enumerability: 'nonenumerable', inherited: false`, function() {
			testMethod(forEachPropDeep, testData.ref, testData.forEachPropDeep.forEachOwnNonenumerableProperty, { enumerability: 'nonenumerable', inherited: false });
		});

		describe(`forEachPropDeep :: forEachOwnProperty :: enumerability: 'all', inherited: false`, function() {
			testMethod(forEachPropDeep, testData.ref, testData.forEachPropDeep.forEachOwnProperty, { enumerability: 'all', inherited: false });
		});

		describe(`forEachPropDeep :: forEachEnumerableProperty :: enumerability: 'enumerable', inherited: true`, function() {
			testMethod(forEachPropDeep, testData.ref, testData.forEachPropDeep.forEachEnumerableProperty, { enumerability: 'enumerable', inherited: true });
		});

		describe(`forEachPropDeep :: forEachNonenumerableProperty :: enumerability: 'nonenumerable', inherited: true`, function() {
			testMethod(forEachPropDeep, testData.ref, testData.forEachPropDeep.forEachNonenumerableProperty, { enumerability: 'nonenumerable', inherited: true });
		});

		describe(`forEachPropDeep :: forEachProperty :: enumerability: 'all', inherited: true`, function() {
			testMethod(forEachPropDeep, testData.ref, testData.forEachPropDeep.forEachProperty, { enumerability: 'all', inherited: true });
		});
	});
});

function testMethod(methodToTest, ref, propsExpected, options) {
	const propsFound = [];

	it(`must find the same number of props expected`, function() {
		methodToTest(ref, (value, key, o) => {
			propsFound.push(key);
		}, options);

		assert.equal(propsFound.length, propsExpected.length);
	});

	it(`must find every prop expected`, function() {
		assert(propsFound.every(prop => propsExpected.includes(prop)));
	});
}