import { lensType } from './interface'

const over = (lens: lensType, f: Function, x: any) => {
  const v = lens.get(x)
  return lens.set(f(v), x)
}

export default over