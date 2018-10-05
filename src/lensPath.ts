import path from './private/path'
import assocPath from './private/assocPath'
import { lensType } from './interface'
import lens from './private/lens'

const lensPath = (paths: any[]):lensType => lens(
  path(paths),
  assocPath(paths)
)

export default lensPath