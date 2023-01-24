function getType(value) {
  const rawType = Object.prototype.toString.call(value).slice(8, -1)

  // Special case - it is more useful to not distinguish
  // between async and ordinary functions - both can return a promise.
  return rawType === "AsyncFunction" ? "Function" : rawType
}

/* Optional map of possible values */

const types = {
  Array: "Array",
  BigInt: "BigInt",
  Boolean: "Boolean",
  Error: "Error",
  Function: "Function",
  Generator: "Generator",
  GeneratorFunction: "GeneratorFunction",
  Null: "Null",
  Number: "Number",
  Object: "Object",
  Promise: "Promise",
  RegExp: "RegExp",
  String: "String",
  Symbol: "Symbol",
  Undefined: "Undefined",
}

/* Usage example */

function repeat(val, times) {
  switch (getType(val)) {
    case types.String:
      return val.repeat(times)

    case types.Array:
      return new Array(times).fill(val).flat()

    case types.Number:
      return Number(String(val).repeat(times))

    default:
      throw new Error("Wrong argument type.")
  }
}

console.log(repeat("hi", 3)) // "hihihi"
console.log(repeat([1, 2, 3], 2)) // [ 1, 2, 3, 1, 2, 3 ]
console.log(repeat(7, 5)) // 77777
