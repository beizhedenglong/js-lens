import path from '../src/private/path'

describe('path', function () {
  let deepObject = { a: { b: { c: 'c' } }, falseVal: false, nullVal: null, undefinedVal: undefined, arrayVal: ['arr'] };
  it('takes a path and an object and returns the value at the path or undefined', function () {
    let obj = {
      a: {
        b: {
          c: 100,
          d: 200
        },
        e: {
          f: [100, 101, 102],
          g: 'G'
        },
        h: 'H'
      },
      i: 'I',
      j: ['J']
    };
    expect(path(['a', 'b', 'c'])(obj)).toBe(100)
    expect(path([])(obj)).toBe(obj)
    expect(path(['a', 'e', 'f', 1])(obj)).toBe(101)
    expect(path(['j', 0])(obj)).toBe('J')
    expect(path(['j', 1])(obj)).toBe(undefined)
  });

  it("gets a deep property's value from objects", function () {
    expect(path(['a', 'b', 'c'])(deepObject)).toBe('c')
    expect(path(['a'])(deepObject)).toBe(deepObject.a)
  });

  it('returns undefined for items not found', function () {
    expect(path(['a', 'b', 'foo'])(deepObject)).toBe(undefined)
    expect(path(['bar'])(deepObject)).toBe(undefined)
    expect(path(['a', 'b'])({ a: null })).toBe(undefined)
  });

  it('works with falsy items', function () {
    expect(path(['toString'])(false)).toBe(Boolean.prototype.toString);
  });

});
