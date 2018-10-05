import { lensType } from "./interface"



const set = (lens: lensType, v: any, x: any) => lens.set(v, x)

export default set