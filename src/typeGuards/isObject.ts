const isObject = (x: unknown): x is {} => typeof x === 'object' && x !== null && !Array.isArray(x);

export default isObject;
