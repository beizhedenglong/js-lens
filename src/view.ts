import { lensType } from './interface'

const view = (lens: lensType, x: any) => lens.get(x)

export default view