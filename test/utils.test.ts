import {isArray, isInteger, isNil} from "../src/private/utils"


describe('isNil', function () {
  it('tests a value for `null` or `undefined`', function () {
    expect(isNil(void 0)).toEqual(true)
    expect(isNil(null)).toEqual(true)
    expect(isNil([])).toEqual(false)
    expect(isNil({})).toEqual(false)
    expect(isNil(0)).toEqual(false)
    expect(isNil('')).toEqual(false)
  });

});

describe('isInteger', function () {
  it('tests a value for integer', function () {
    expect(isInteger(void 0)).toEqual(false)
    expect(isInteger(null)).toEqual(false)
    expect(isInteger([])).toEqual(false)
    expect(isInteger({})).toEqual(false)
    expect(isInteger(0)).toEqual(true)
    expect(isInteger('')).toEqual(false)
    // set Number.isInteger to undefined
    expect(isInteger(Number.MAX_SAFE_INTEGER)).toEqual(true)
    expect(isInteger(1.1)).toEqual(false)
  });

});