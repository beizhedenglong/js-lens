import { lensType } from './interface'
import over from './over'

const lensCompose = (...lenses: lensType[]): lensType => {
  if (lenses.length === 0) {
    return {
      get: x => x,
      set: (v, x) => x
    }
  }
  if (lenses.length === 1) {
    return lenses[0]
  }
  return lenses.reduce((acc, lens) => ({
    get: x => lens.get(acc.get(x)),
    set: (v, x) => acc.set(lens.set(v, acc.get(x)),x)
  }))
}

export default lensCompose