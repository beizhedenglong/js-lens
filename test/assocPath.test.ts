import assocPath from "../src/private/assocPath"


describe('assocPath', function () {
  it('makes a shallow clone of an object, overriding only what is necessary for the path', function () {
    let obj1 = { a: { b: 1, c: 2, d: { e: 3 } }, f: { g: { h: 4, i: [5, 6, 7], j: { k: 6, l: 7 } } }, m: 8 };
    let obj2 = assocPath(['f', 'g', 'i', 1])(42, obj1);
    expect(obj2.f.g.i).toEqual([5, 42, 7]);
    // Note: reference equality below!
    expect(obj2.a).toBe(obj1.a);
    expect(obj2.m).toBe(obj1.m);
    expect(obj2.f.g.h).toBe(obj1.f.g.h);
    expect(obj2.f.g.j).toBe(obj1.f.g.j);
  });

  it('is the equivalent of clone and setPath if the property is not on the original', function () {
    let obj1 = { a: 1, b: { c: 2, d: 3 }, e: 4, f: 5 };
    let obj2 = assocPath(['x', 0, 'y'])(42, obj1);
    expect(obj2).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4, f: 5, x: [{ y: 42 }] });
    // Note: reference equality below!
    expect(obj2.a).toEqual(obj1.a);
    expect(obj2.b).toEqual(obj1.b);
    expect(obj2.e).toEqual(obj1.e);
    expect(obj2.f).toEqual(obj1.f);
  });

  it('empty path replaces the the whole object', function () {
    expect(assocPath([])(3, { a: 1, b: 2 })).toEqual(3);
  });

  it('replaces `undefined` with a new object', function () {
    expect(assocPath(['foo', 'bar', 'baz'])(42, { foo: undefined })).toEqual({ foo: { bar: { baz: 42 } } });
  });

  it('replaces `null` with a new object', function () {
    expect(assocPath(['foo', 'bar', 'baz'])(42, { foo: null })).toEqual({ foo: { bar: { baz: 42 } } });
  });

});