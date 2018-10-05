export const isNil = (x: any) => x == null

export const isInteger = (x: any) => {
  return Number.isInteger? Number.isInteger(x) : x === parseInt(x, 10)
}

export const isArray = (x: any) =>  {
  return Array.isArray ? Array.isArray(x) : Object.prototype.toString.call(x) === '[object Array]'
}