import { isNil } from './utils'

let path = (paths: any[]) => (obj: any): any => {
  return paths.reduce((val, key) => {
    if (isNil(val)) {
      return undefined
    }
    return val[key]
  }, obj)
}

export default path