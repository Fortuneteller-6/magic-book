import {TASK_ADD,TASK_DELETE,TASK_COMPLETE,TASK_SEARCH,TASK_INIT} from "./constants"
import list from '../data'
const defaultState={
    isSearch:false,
    list:[],
    searchList:[]
}

// store必须唯一
// 只有store能改变自己的数据（从reducer获取state来更新自己的数据）
// reducer 是一个纯函数 固定输入 一定固定输出
// 没有副作用 
const reducer=function(state=defaultState,action){
    if(action.type===TASK_INIT){
        var new_state_INI=JSON.parse(JSON.stringify(state))
        new_state_INI.list=action.datas
        new_state_INI.isSearch=false
        return new_state_INI
    }
    if(action.type===TASK_ADD){
        var new_state_ADD=JSON.parse(JSON.stringify(state))
        new_state_ADD.list.push(action.value)
        list.push(action.value)
        new_state_ADD.isSearch=false
        return new_state_ADD
    }
    else if(action.type===TASK_DELETE){
       var new_state_DEL=JSON.parse(JSON.stringify(state))
       let deleteIndex=state.list.findIndex(item=>{  
       return item.id=== action.id
       })
       new_state_DEL.list.splice(deleteIndex,1)
       new_state_DEL.isSearch=false
       return new_state_DEL
    }
    else if(action.type===TASK_COMPLETE){
        var new_state_COM=JSON.parse(JSON.stringify(state))
        let finishIndex=state.list.findIndex(item=>{  
        return item.id=== action.id
        })
        new_state_COM.list[finishIndex].isComplete=!new_state_COM.list[finishIndex].isComplete
        new_state_COM.isSearch=false
        return new_state_COM
     }
     if(action.type===TASK_SEARCH){
        var new_state_SEA=JSON.parse(JSON.stringify(state))
        var filterList=list.filter(item=>{
              return item.content.indexOf(action.value)!==-1
            })
            new_state_SEA.searchList=filterList
            new_state_SEA.isSearch=true
        return new_state_SEA 
    }
    return state
}
export default reducer