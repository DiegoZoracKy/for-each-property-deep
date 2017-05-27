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

module.exports = [{
	name: 'functionWithProperties',
	ref: functionWithProperties,
	forEachOwnEnumerableProperty: ['functionWithPropertiesEnumerablePropEnumerable'],
	forEachOwnNonenumerableProperty: ['functionWithPropertiesEnumerablePropNonEnumerable'],
	forEachOwnProperty: ['functionWithPropertiesEnumerablePropEnumerable', 'functionWithPropertiesEnumerablePropNonEnumerable'],
	forEachEnumerableProperty: ['functionWithPropertiesEnumerablePropEnumerable'],
	forEachNonenumerableProperty: ['functionWithPropertiesEnumerablePropNonEnumerable'],
	forEachProperty: ['functionWithPropertiesEnumerablePropEnumerable', 'functionWithPropertiesEnumerablePropNonEnumerable'],
	forEachPropDeep: {
		forEachOwnEnumerableProperty: ['functionWithPropertiesEnumerablePropEnumerable'],
		forEachOwnNonenumerableProperty: ['functionWithPropertiesEnumerablePropNonEnumerable'],
		forEachOwnProperty: ['functionWithPropertiesEnumerablePropEnumerable', 'functionWithPropertiesEnumerablePropNonEnumerable'],
		forEachEnumerableProperty: ['functionWithPropertiesEnumerablePropEnumerable'],
		forEachNonenumerableProperty: ['functionWithPropertiesEnumerablePropNonEnumerable'],
		forEachProperty: ['functionWithPropertiesEnumerablePropEnumerable', 'functionWithPropertiesEnumerablePropNonEnumerable'],
	}
}, {
	name: 'instanceFromFunctionWithProperties',
	ref: instanceFromFunctionWithProperties,
	forEachOwnEnumerableProperty: ['propEnumerable'],
	forEachOwnNonenumerableProperty: ['propNonEnumerable'],
	forEachOwnProperty: ['propEnumerable', 'propNonEnumerable'],
	forEachEnumerableProperty: ['propEnumerable', 'protoEnumerableProp'],
	forEachNonenumerableProperty: ['propNonEnumerable', 'protoNonEnumerableProp'],
	forEachProperty: ['propEnumerable', 'propNonEnumerable', 'protoEnumerableProp', 'protoNonEnumerableProp'],
	forEachPropDeep: {
		forEachOwnEnumerableProperty: ['propEnumerable'],
		forEachOwnNonenumerableProperty: ['propNonEnumerable'],
		forEachOwnProperty: ['propEnumerable', 'propNonEnumerable'],
		forEachEnumerableProperty: ['propEnumerable', 'protoEnumerableProp'],
		forEachNonenumerableProperty: ['propNonEnumerable', 'protoNonEnumerableProp'],
		forEachProperty: ['propEnumerable', 'propNonEnumerable', 'protoEnumerableProp', 'protoNonEnumerableProp'],
	}
}, {
	name: 'objectLiteral',
	ref: objectLiteral,
	forEachOwnEnumerableProperty: ['a', 'fn', 'z'],
	forEachOwnNonenumerableProperty: [],
	forEachOwnProperty: ['a', 'fn', 'z'],
	forEachEnumerableProperty: ['a', 'fn', 'z'],
	forEachNonenumerableProperty: [],
	forEachProperty: ['a', 'fn', 'z'],
	forEachPropDeep:{
		forEachOwnEnumerableProperty: ['c','b','d','g','f','a','innerFn','fn','k','zk','N','ep','de','kk','zz','k','innerFn','fnR','kz','z'],
		forEachOwnNonenumerableProperty: [],
		forEachOwnProperty: ['c','b','d','g','f','a','innerFn','fn','k','zk','N','ep','de','kk','zz','k','innerFn','fnR','kz','z'],
		forEachEnumerableProperty: ['c','b','d','g','f','a','innerFn','fn','k','zk','N','ep','de','kk','zz','k','innerFn','fnR','kz','z'],
		forEachNonenumerableProperty: [],
		forEachProperty: ['c','b','d','g','f','a','innerFn','fn','k','zk','N','ep','de','kk','zz','k','innerFn','fnR','kz','z']
	}
}, {
	name: 'classRef',
	ref: classRef,
	forEachOwnEnumerableProperty: [],
	forEachOwnNonenumerableProperty: ['classRefStatic'],
	forEachOwnProperty: ['classRefStatic'],
	forEachEnumerableProperty: [],
	forEachNonenumerableProperty: ['classRefStatic', 'classRef2Static', 'classRef3Static'],
	forEachProperty: ['classRefStatic', 'classRef2Static', 'classRef3Static'],
	forEachPropDeep:{
		forEachOwnEnumerableProperty: [],
		forEachOwnNonenumerableProperty: ['classRefStatic'],
		forEachOwnProperty: ['classRefStatic'],
		forEachEnumerableProperty: [],
		forEachNonenumerableProperty: ['classRefStatic', 'classRef2Static', 'classRef3Static'],
		forEachProperty: ['classRefStatic','classRef2Static','classRef3Static']
	}
}, {

	name: 'instanceFromClassRef',
	ref: instanceFromClassRef,
	forEachOwnEnumerableProperty: ['z', 'zz', 'superFn', 'instanceFn'],
	forEachOwnNonenumerableProperty: ['instanceFnNonEnumerable'],
	forEachOwnProperty: ['z', 'zz', 'superFn', 'instanceFn', 'instanceFnNonEnumerable'],
	forEachEnumerableProperty: ['z', 'zz', 'superFn', 'instanceFn'],
	forEachNonenumerableProperty: ['instanceFnNonEnumerable', 'fn', 'ffn', 'fffn', 'ffn'],
	forEachProperty: ['z', 'zz', 'superFn', 'instanceFn', 'instanceFnNonEnumerable', 'fn', 'ffn', 'fffn', 'ffn'],
	forEachPropDeep:{
		forEachOwnEnumerableProperty: ['z','zz','fnWithProp','superInnerFn','superFn','instanceFn'],
		forEachOwnNonenumerableProperty: ['instanceFnNonEnumerable'],
		forEachOwnProperty: ['z','zz','fnWithProp','superInnerFn','superFn','instanceFn','instanceFnNonEnumerable'],
		forEachEnumerableProperty: ['z','zz','fnWithProp','superInnerFn','superFn','instanceFn'],
		forEachNonenumerableProperty: ['instanceFnNonEnumerable', 'fn', 'ffn', 'fffn', 'ffn'],
		forEachProperty: ['z','zz','fnWithProp','superInnerFn','superFn','instanceFn','instanceFnNonEnumerable','fn','ffn','fffn','ffn']
	}
}, {
	name: 'objectCreatedWithParentProto',
	ref: objectCreatedWithParentProto,
	forEachOwnEnumerableProperty: ['ownEmurableProp', 'enumerableProp'],
	forEachOwnNonenumerableProperty: ['ownNonEmurableProp'],
	forEachOwnProperty: ['ownEmurableProp', 'enumerableProp', 'ownNonEmurableProp'],
	forEachEnumerableProperty: ['ownEmurableProp', 'enumerableProp', 'ParentEnumerableProp'],
	forEachNonenumerableProperty: ['ownNonEmurableProp', 'parentNonEnumerableProp'],
	forEachProperty: ['ownNonEmurableProp', 'ownEmurableProp', 'enumerableProp', 'ParentEnumerableProp', 'parentNonEnumerableProp'],
	forEachPropDeep:{
		forEachOwnEnumerableProperty: ['ownEmurableProp','enumerableProp'],
		forEachOwnNonenumerableProperty: ['ownNonEmurableProp'],
		forEachOwnProperty: ['ownNonEmurableProp','ownEmurableProp','enumerableProp'],
		forEachEnumerableProperty: ['ownEmurableProp','enumerableProp','ParentEnumerableProp'],
		forEachNonenumerableProperty: ['ownNonEmurableProp', 'parentNonEnumerableProp'],
		forEachProperty: ['ownNonEmurableProp','ownEmurableProp','enumerableProp','ParentEnumerableProp','parentNonEnumerableProp']
	}
}];