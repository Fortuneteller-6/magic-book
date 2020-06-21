// actin 生成action提高代码可维护性 自动化检测更加方便
import {TASK_ADD,TASK_DELETE,TASK_COMPLETE,TASK_SEARCH,TASK_INIT} from "./constants"
export const createTask_Add=(task)=>({
    type:TASK_ADD,
    value:task
})
export const createTask_Del=(id)=>({
    type:TASK_DELETE,
    id:id
})
export const createTask_Com=(id)=>({
    type:TASK_COMPLETE,
    id:id
})
export const createTask_Sea=(value)=>({
    type:TASK_SEARCH,
    value:value
})
export const createTask_Ini=(datas)=>({
    type:TASK_INIT,
    datas
})
