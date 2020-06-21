import React from 'react'
// import { Button} from "antd"
import {Input} from "antd"
// import {TASK_SEARCH} from "../../store/constants"

import './index.less'
// UI组件（无逻辑） 和 容器组件（有逻辑）
// 无状态组件 性能高 函数组件 
const { Search } = Input
// class SearchItem extends React.Component{
//   state={
//       searchTask:""
//   }
//   searchChange=(event)=>{
//     var target=event.target
//     var value=target.value
//     this.setState({searchTask:value})
//     } 
    // handleSearch=(value)=>{
    //const {handleTaskSearche}=this.props
    // handleTaskSearche(value)
    // var action={
    //     type:TASK_SEARCH,
    //     value:value
    // }
//     let action=createTask_Sea(value)
//     store.dispatch(action)
    
//     }
//     render(){
//         return(
//         <div className="search-task">     
//        <Search
//        placeholder="input search text"
//        enterButton="Search"
//        size="large"
//        onSearch={(value)=>this.handleSearch(value)}
//        />
//        </div> 
//         )
//     }
// }
function SearchItem(props){
    return(
        <div className="search-task">     
       <Search
       placeholder="input search text"
       enterButton="Search"
       size="large"
       onSearch={(value)=>props.handleSearch(value)}
       />
       </div> 
        )     
}
export default SearchItem
//state 私有 自己是自己的 子用父传值 父用子方法调用
