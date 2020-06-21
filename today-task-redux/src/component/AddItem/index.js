import React from 'react'
import { Button} from "antd"
import {Input} from "antd"
import store from '../../store'
import {createTask_Add} from '../../store/action-creator'
class AddItem extends React.Component{
  state={
      inputTask:""
  }
  handleChange=(event)=>{
    var target=event.target
    var value=target.value
    this.setState({inputTask:value})
    }
    addInput=()=>{
        var inputTask={id:new Date()+Math.random(),content:this.state.inputTask,isComplete:false}
        // const {handleInput}=this.props
        // handleInput(inputTask)
        // this.setState({inputTask:""})
    // var action={
    //           type:TASK_ADD,
    //           value:inputTask
    //            }
            let action=createTask_Add(inputTask)
            store.dispatch(action)
            this.setState({inputTask:""})
        }
    render(){
        return(
        <div className="add-task">     
       <Input type="text" id="Task" value={this.state.inputTask} onChange={this.handleChange} />
       <Button type="primary" onClick={this.addInput}>add</Button>
       </div> 
        )
    }

}
export default AddItem
//state 私有 自己是自己的 子用父传值 父用子方法调用
