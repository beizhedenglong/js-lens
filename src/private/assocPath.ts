import { isNil, isInteger, isArray } from './utils'
import { lensType } from "../interface"

const assoc = (prop: any, val: any, x: any): any => {
  if (isInteger(prop) && isArray(x)) {
    const newX = [...x]
    newX[prop] = val
    return newX
  } else {
    return {
      ...x,
      [prop]: val
    }
  }
}

const assocPath = (paths: any[]) => (val: any, obj: any): any => {

  // replace obj with val when paths is []
  if (paths.length === 0) {
    return val
  }

  const firstPath = paths[0];
  obj = (!isNil(obj)) ? obj : (isInteger(firstPath) ? [] : {});

  if (paths.length === 1) {
    return assoc(firstPath, val, obj);
  }

  return assoc(
    firstPath,
    assocPath(paths.slice(1))(val, obj[firstPath]),
    obj
  );
};


export default assocPath