import lensPath from "../src/lensPath"
import set from "../src/set"
import view from "../src/view"
import over from "../src/over"
import lensCompose from '../src/lensCompose'

const R = require("ramda")
// use Ramda's test cases

const testObj = {
  a: [{
    b: 1
  }, {
    b: 2
  }],
  d: 3
};

describe("lensPath", () => {
  describe("view", () => {
    it('focuses the specified object property', function () {
      expect(view(lensPath(["d"]), testObj)).toBe(3)
      expect(view(lensPath(['a', 1, 'b']), testObj)).toBe(2)
      expect(view(lensPath([]), testObj)).toBe(testObj)
    });
  })

  describe("set", () => {
    it("sets the value of the object property specified", () => {
      expect(set(lensPath(['d']), 0, testObj)).toEqual({ a: [{ b: 1 }, { b: 2 }], d: 0 });
      expect(set(lensPath(['a', 0, 'b']), 0, testObj)).toEqual({ a: [{ b: 0 }, { b: 2 }], d: 3 });
      expect(set(lensPath([]), 0, testObj)).toEqual(0);
    })
    it('adds the property to the object if it doesn\'t exist', function () {
      expect(set(lensPath(['X']), 0, testObj)).toEqual({ a: [{ b: 1 }, { b: 2 }], d: 3, X: 0 });
      expect(set(lensPath(['a', 0, 'X']), 0, testObj)).toEqual({ a: [{ b: 1, X: 0 }, { b: 2 }], d: 3 });
    });
  })
  describe('over', function () {

    it('applies function to the value of the specified object property', function () {
      expect(over(lensPath(['d']), R.inc, testObj)).toEqual({ a: [{ b: 1 }, { b: 2 }], d: 4 });
      expect(over(lensPath(['a', 1, 'b']), R.inc, testObj)).toEqual({ a: [{ b: 1 }, { b: 3 }], d: 3 });
      expect(over(lensPath([]), R.toPairs, testObj)).toEqual([['a', [{ b: 1 }, { b: 2 }]], ['d', 3]]);
    });
    it('applies function to undefined and adds the property if it doesn\'t exist', function () {
      expect(over(lensPath(['X']), R.identity, testObj)).toEqual({ a: [{ b: 1 }, { b: 2 }], d: 3, X: undefined });
      expect(over(lensPath(['a', 0, 'X']), R.identity, testObj)).toEqual({ a: [{ b: 1, X: undefined }, { b: 2 }], d: 3 });
    });
  });
  describe('composability', function () {
    it('can be composed', function () {
      const composedLens = lensCompose(lensPath(['a']), lensPath([1, 'b']));
      const aLens = lensCompose(lensPath(["a"]))
      expect(view(composedLens, testObj)).toBe(2)
      expect(set(composedLens, 123, testObj)).toEqual({ a: [{ b: 1 }, { b: 123 }], d: 3 })
      expect(view(lensCompose(), testObj)).toBe(testObj)
      expect(set(lensCompose(), 123, testObj)).toBe(testObj)
      expect(set(aLens, undefined, testObj)).toEqual({ a: undefined, d: 3 })
      expect(view(aLens, testObj)).toEqual([{ b: 1 }, { b: 2 }])
    });
  });
  describe('well behaved lens', function () {
    it('set s (get s) === s', function () {
      expect(set(lensPath(['d']), view(lensPath(['d']), testObj), testObj)).toEqual(testObj);
      expect(set(lensPath(['a', 0, 'b']), view(lensPath(['a', 0, 'b']), testObj), testObj)).toEqual(testObj);
    });
    it('get (set s v) === v', function () {
      expect(view(lensPath(['d']), set(lensPath(['d']), 0, testObj))).toEqual(0);
      expect(view(lensPath(['a', 0, 'b']), set(lensPath(['a', 0, 'b']), 0, testObj))).toEqual(0);
    });
    it('get (set(set s v1) v2) === v2', function () {
      let p = ['d'];
      let q = ['a', 0, 'b'];
      expect(view(lensPath(p), set(lensPath(p), 11, set(lensPath(p), 10, testObj)))).toEqual(11);
      expect(view(lensPath(q), set(lensPath(q), 11, set(lensPath(q), 10, testObj)))).toEqual(11);
    });
  });
})