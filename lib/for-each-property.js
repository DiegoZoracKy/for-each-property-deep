'use strict';

const getinherited = require('get-prototype-chain');

function mountBuiltInPropsToExclude(excludeBuiltInPropsOf, excludeProps) {
	return excludeBuiltInPropsOf.reduce((result, o) => result.concat(Object.getOwnPropertyNames(o.prototype)), excludeProps);
}

// All own properties, not inherited, enumerable and non-enumerable. Options to exclude Object and Functions prototypes' built-in properties
function forEachOwnProperty(o, callback, { excludeBuiltInPropsOf = [Function, Object], excludeProps = ['prototype'] } = {}) {
	const builtInPropsToExclude = mountBuiltInPropsToExclude(excludeBuiltInPropsOf, excludeProps);

	Object.getOwnPropertyNames(o)
		.forEach(prop => !builtInPropsToExclude.includes(prop) && callback(o[prop], prop, o));
}

// All own properties, not inherited, enumerable only
function forEachOwnEnumerableProperty(o, callback) {
	Object.keys(o).forEach(prop => callback(o[prop], prop, o));
}

// All own properties, not inherited, non-enumerable only
function forEachOwnNonenumerableProperty(o, callback, { excludeBuiltInPropsOf = [Function, Object], excludeProps = ['prototype'] } = {}) {
	const builtInPropsToExclude = mountBuiltInPropsToExclude(excludeBuiltInPropsOf, excludeProps);

	Object.getOwnPropertyNames(o)
		.forEach(prop => !builtInPropsToExclude.includes(prop) && !o.propertyIsEnumerable(prop) && callback(o[prop], prop, o));
}

// All properties, including inherited (prototype-chain), enumerable and non-enumerable
function forEachProperty(o, callback, { excludeBuiltInPropsOf = [Function, Object], excludeProps = ['prototype'] } = {}) {
	const builtInPropsToExclude = mountBuiltInPropsToExclude(excludeBuiltInPropsOf, excludeProps);

	getinherited(o)
		.forEach(proto => {
			if (excludeBuiltInPropsOf.map(prop => prop.prototype).includes(proto)) {
				return;
			}

			Object.getOwnPropertyNames(proto)
				.forEach(prop => !builtInPropsToExclude.includes(prop) && callback(o[prop], prop, o));
		});
}

// All properties, including inherited (prototype-chain), enumerable only, excluding Object and Functions prototypes' built-in properties
function forEachEnumerableProperty(o, callback) {
	for (let prop in o) {
		callback(o[prop], prop, o);
	}
}

// All properties, including inherited (prototype-chain), non-enumerableonly
function forEachNonenumerableProperty(o, callback, { excludeBuiltInPropsOf = [Function, Object], excludeProps = ['prototype'] } = {}) {
	const builtInPropsToExclude = mountBuiltInPropsToExclude(excludeBuiltInPropsOf, excludeProps);

	getinherited(o)
		.forEach(proto => {
			if (excludeBuiltInPropsOf.map(prop => prop.prototype).includes(proto)) {
				return;
			}

			Object.getOwnPropertyNames(proto)
				.forEach(prop => {
					!builtInPropsToExclude.includes(prop) && !proto.propertyIsEnumerable(prop) && callback(o[prop], prop, o);
				});
		});
}

function forEachProp(o, callback, { enumerability = 'enumerable', inherited = false, excludeBuiltInPropsOf = [Function, Object], excludeProps = ['prototype'] } = {}) {
	if (!inherited && enumerability === 'enumerable') {
		forEachOwnEnumerableProperty(o, callback, { excludeBuiltInPropsOf, excludeProps });
	}

	if (!inherited && enumerability === 'nonenumerable') {
		forEachOwnNonenumerableProperty(o, callback, { excludeBuiltInPropsOf, excludeProps });
	}

	if (!inherited && enumerability === 'all') {
		forEachOwnProperty(o, callback, { excludeBuiltInPropsOf, excludeProps });
	}

	if (inherited && enumerability === 'enumerable') {
		forEachEnumerableProperty(o, callback, { excludeBuiltInPropsOf, excludeProps });
	}

	if (inherited && enumerability === 'nonenumerable') {
		forEachNonenumerableProperty(o, callback, { excludeBuiltInPropsOf, excludeProps });
	}

	if (inherited && enumerability === 'all') {
		forEachProperty(o, callback, { excludeBuiltInPropsOf, excludeProps });
	}
}

function forEachPropDeep(o, callback, { enumerability = 'enumerable', inherited = false, excludeBuiltInPropsOf = [Function, Object], excludeProps = ['prototype'], parent, state = {}, path = [] } = {}) {
	const forEachPropOptions = { enumerability, inherited, excludeBuiltInPropsOf, excludeProps };

	forEachProp(o, (value, key) => {
		let currentPath = path.concat(key);

		if (value && (typeof(value) === 'function' || typeof(o[key]) === 'object')) {
			forEachPropDeep(value, callback, { parent: o, path: currentPath, enumerability, inherited, state, excludeBuiltInPropsOf, excludeProps });
		}

		callback(value, key, currentPath, o, state);
	}, forEachPropOptions);

	return state;
}

forEachProp.forEachOwnEnumerableProperty = forEachOwnEnumerableProperty;
forEachProp.forEachOwnNonenumerableProperty = forEachOwnNonenumerableProperty;
forEachProp.forEachOwnProperty = forEachOwnProperty;
forEachProp.forEachEnumerableProperty = forEachEnumerableProperty;
forEachProp.forEachNonenumerableProperty = forEachNonenumerableProperty;
forEachProp.forEachProperty = forEachProperty;
forEachProp.forEachPropDeep = forEachPropDeep;

module.exports = forEachProp;