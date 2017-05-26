'use strict';

const getPrototypeChain = require('get-prototype-chain');

// All own properties, not inherited, enumerable and non-enumerable. Options to exclude Object and Functions prototypes' built-in properties
function forEachOwnProperty(o, callback, { excludeBuiltInPropsOf = [Function, Object], excludeProps = ['prototype'] } = {}) {
	const builtInPropsToExclude = excludeBuiltInPropsOf.reduce((result, o) => result.concat(Object.getOwnPropertyNames(o.prototype)), excludeProps);

	Object.getOwnPropertyNames(o)
		.filter(prop => !builtInPropsToExclude.includes(prop))
		.forEach(prop => callback(o[prop], prop, o));
}

// All own properties, not inherited, enumerable only
function forEachOwnEnumerableProperty(o, callback) {
	Object.keys(o).forEach(prop => callback(o[prop], prop, o));
}

// All properties, including inherited (prototype-chain), enumerable and non-enumerable
function forEachProperty(o, callback, { excludeBuiltInPropsOf = [Function, Object], excludeProps = ['prototype'] } = {}) {
	const builtInPropsToExclude = excludeBuiltInPropsOf.reduce((result, o) => result.concat(Object.getOwnPropertyNames(o.prototype)), excludeProps);

	getPrototypeChain(o)
		.forEach(proto => {
			// console.log('proto', proto, proto === Function.prototype || proto === Object.prototype);

			// if (proto === Function.prototype || proto === Object.prototype) {
			// 	return;
			// }

			Object.getOwnPropertyNames(proto)
				.filter(prop => !builtInPropsToExclude.includes(prop))
				.forEach(prop => {
					callback(o[prop], prop, o);
				});
		});
}

// All properties, including inherited (prototype-chain), enumerable only, excluding Object and Functions prototypes' built-in properties
function forEachEnumerableProperty(o, callback) {
	for (let prop in o) {
		callback(o[prop], prop, o);
	}
}

function forEachProp(o, callback, { nonEnumerable = false, prototypeChain = false } = {}) {
	if (!prototypeChain && !nonEnumerable) {
		forEachOwnEnumerableProperty(o, callback);
	}

	if (!prototypeChain && nonEnumerable) {
		forEachOwnProperty(o, callback);
	}

	if (prototypeChain && !nonEnumerable) {
		forEachEnumerableProperty(o, callback);
	}

	if (prototypeChain && nonEnumerable) {
		forEachProperty(o, callback);
	}
}

forEachProp.forEachOwnEnumerableProperty = forEachOwnEnumerableProperty;
forEachProp.forEachOwnProperty = forEachOwnProperty;
forEachProp.forEachEnumerableProperty = forEachEnumerableProperty;
forEachProp.forEachProperty = forEachProperty;

module.exports = forEachProp;