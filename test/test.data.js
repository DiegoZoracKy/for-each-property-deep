//////////////
// Function //
//////////////

function functionWithProperties() {}

// Function Inner Property
functionWithProperties.functionWithPropertiesEnumerablePropEnumerable = 'functionWithPropertiesEnumerablePropEnumerableVALUE';

Object.defineProperty(functionWithProperties, 'functionWithPropertiesEnumerablePropNonEnumerable', {
	configurable: true,
	enumerable: false,
	writable: true,
	value: 'functionWithPropertiesEnumerablePropNonEnumerableVALUE'
});

Object.defineProperty(functionWithProperties.prototype, 'protoEnumerableProp', {
	configurable: true,
	enumerable: true,
	writable: true,
	value: 'protoEnumerablePropVALUE'
});

Object.defineProperty(functionWithProperties.prototype, 'protoNonEnumerableProp', {
	configurable: true,
	enumerable: false,
	writable: true,
	value: 'nonEnumerablePropVALUE'
});

///////////////////////////////////
// Object Instance from Function //
// Object.defineProperty 		 //
///////////////////////////////////

const instanceFromFunctionWithProperties = new functionWithProperties();

Object.defineProperty(instanceFromFunctionWithProperties, 'propEnumerable', {
	configurable: true,
	enumerable: true,
	writable: true,
	value: 'propEnumerableVALUE'
});

Object.defineProperty(instanceFromFunctionWithProperties, 'propNonEnumerable', {
	configurable: true,
	enumerable: false,
	writable: true,
	value: 'propNonEnumerableVALUE'
});

////////////////////
// Object Literal //
////////////////////

const fnTest = x => console.log('fnTest!');
fnTest.innerFn = x => console.log('fnTest.innerFn!');

const objectLiteral = {
	a: {
		b: {
			c: x => x
		},
		d: 'e',
		f: {
			g: 'h'
		}
	},
	fn: fnTest,
	z: {
		k: {},
		zk: 'ZK',
		N: 1984,
		de: { ep: 10 },
		kz: {
			zz: {
				kk: function ha() {}
			},
			k: 'K',
			fnR: fnTest
		}
	}
};

///////////
// CLASS //
///////////
class classRef3 {
	constructor() {
		this.z = 'classRef3';
	}

	static classRef3Static() {
		console.log('classRef3Static');
	}

	fffn() {
		console.log('classRef3Static fffn');
	}

	ffn() {
		console.log('classRef3Static ffn');
	}
}

class classRef2 extends classRef3 {
	constructor() {
		super();
		this.zz = 'classRef2';
		this.superFn = {
			superInnerFn: x => console.log(`superFn!`)
		};

		this.superFn.superInnerFn.fnWithProp = x => console.log(`fnWithProp!`);
	}

	static classRef2Static() {
		console.log('classRef2Static');
	}

	ffn() {
		console.log('classRef2Static ffn');
	}
}

class classRef extends classRef2 {
	constructor() {
		super();
		this.z = 'classRef';
		this.instanceFn = x => console.log(`instanceFn!`);
	}

	static classRefStatic() {
		console.log('classRefStatic');
	}

	fn() {
		console.log('classRefStatic fn');
	}
}

////////////////////////////////
// OBJECT INSTANCE FROM CLASS //
////////////////////////////////

const instanceFromClassRef = new classRef();
Object.defineProperty(instanceFromClassRef, 'instanceFnNonEnumerable', {
	value: 'instanceFnNonEnumerableVALUE'
});

/////////////////////////////////////////
// OBJECT.CREATE FROM PARENT PROTOTYPE //
/////////////////////////////////////////

const Parent = function() {};

Parent.ParentEnumerableProp = 'ParentEnumerablePropVALUE';

Object.defineProperty(Parent.prototype, 'ParentEnumerablePropt', {
	configurable: true,
	enumerable: true,
	writable: true,
	value: 'ParentEnumerableProptVALUE'
});

Object.defineProperty(Parent.prototype, 'ParentNonEnumerableProto', {
	configurable: false,
	enumerable: false,
	writable: false,
	value: 'ParentNonEnumerableProtoVALUE'
});


Object.defineProperty(Parent, 'parentNonEnumerableProp', {
	configurable: false,
	enumerable: false,
	writable: false,
	value: 'parentNonEnumerablePropVALUE'
});

const objectCreatedWithParentProto = Object.create(Parent, {
	ownNonEmurableProp: {
		value: 'ownNonEmurablePropVALUE'
	},
	ownEmurableProp: {
		value: 'ownEmurablePropVALUE',
		enumerable: true
	}
});

objectCreatedWithParentProto.enumerableProp = 'enumerablePropVALUE';

const {
	forEachOwnEnumerableProperty,
	forEachOwnProperty,
	forEachEnumerableProperty,
	forEachProperty
} = require('../');


// console.log('=============== forEachOwnEnumerableProperty :: nonEnumerable: false, prototypeChain: false ================');
// forEachOwnEnumerableProperty(objectCreatedWithParentProto, (value, key, o) => console.log(key));
// console.log('=============== forEachOwnProperty :: nonEnumerable: true, prototypeChain: false ================');
// forEachOwnProperty(objectCreatedWithParentProto, (value, key, o) => console.log(key));
// console.log('=============== forEachEnumerableProperty :: nonEnumerable: false, prototypeChain: true ================');
// forEachEnumerableProperty(objectCreatedWithParentProto, (value, key, o) => console.log(key));
// console.log('=============== forEachProperty :: nonEnumerable: true, prototypeChain: true ================');
// forEachProperty(objectCreatedWithParentProto, (value, key, o) => console.log(key));


module.exports = [{
	name: 'functionWithProperties',
	ref: functionWithProperties,
	forEachOwnEnumerableProperty: ['functionWithPropertiesEnumerablePropEnumerable'],
	forEachOwnProperty: ['functionWithPropertiesEnumerablePropEnumerable', 'functionWithPropertiesEnumerablePropNonEnumerable'],
	forEachEnumerableProperty: ['functionWithPropertiesEnumerablePropEnumerable'],
	forEachProperty: ['functionWithPropertiesEnumerablePropEnumerable', 'functionWithPropertiesEnumerablePropNonEnumerable']
}, {
	name: 'instanceFromFunctionWithProperties',
	ref: instanceFromFunctionWithProperties,
	forEachOwnEnumerableProperty: ['propEnumerable'],
	forEachOwnProperty: ['propEnumerable', 'propNonEnumerable'],
	forEachEnumerableProperty: ['propEnumerable', 'protoEnumerableProp'],
	forEachProperty: ['propEnumerable', 'propNonEnumerable', 'protoEnumerableProp', 'protoNonEnumerableProp']
}, {
	name: 'objectLiteral',
	ref: objectLiteral,
	forEachOwnEnumerableProperty: ['a', 'fn', 'z'],
	forEachOwnProperty: ['a', 'fn', 'z'],
	forEachEnumerableProperty: ['a', 'fn', 'z'],
	forEachProperty: ['a', 'fn', 'z']
}, {
	name: 'classRef',
	ref: classRef,
	forEachOwnEnumerableProperty: [],
	forEachOwnProperty: ['classRefStatic'],
	forEachEnumerableProperty: [],
	forEachProperty: ['classRefStatic', 'classRef2Static', 'classRef3Static']
}, {
	name: 'instanceFromClassRef',
	ref: instanceFromClassRef,
	forEachOwnEnumerableProperty: ['z', 'zz', 'superFn', 'instanceFn'],
	forEachOwnProperty: ['z', 'zz', 'superFn', 'instanceFn', 'instanceFnNonEnumerable'],
	forEachEnumerableProperty: ['z', 'zz', 'superFn', 'instanceFn'],
	forEachProperty: ['z', 'zz', 'superFn', 'instanceFn', 'instanceFnNonEnumerable', 'fn', 'ffn', 'fffn', 'ffn']
}, {
	name: 'objectCreatedWithParentProto',
	ref: objectCreatedWithParentProto,
	forEachOwnEnumerableProperty: ['ownEmurableProp', 'enumerableProp'],
	forEachOwnProperty: ['ownEmurableProp', 'enumerableProp', 'ownNonEmurableProp'],
	forEachEnumerableProperty: ['ownEmurableProp', 'enumerableProp', 'ParentEnumerableProp'],
	forEachProperty: ['ownNonEmurableProp', 'ownEmurableProp', 'enumerableProp', 'ParentEnumerableProp', 'parentNonEnumerableProp']
}];