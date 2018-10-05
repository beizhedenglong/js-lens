import { lensType } from '../interface'

const lens = (getter: (x: any) => any, setter: (v: any, x: any) => any): lensType => ({
  get: getter,
  set: setter
})

export default lens