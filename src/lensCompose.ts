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
    get: x => acc.get(lens.get(x)),
    set: (v, x) => lens.set(
      acc.set(v, lens.get(x)),
      x
    )
  }))
}

export default lensCompose