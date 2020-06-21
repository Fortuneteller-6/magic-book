import React from 'react'
import {List} from "antd"
import TaskItem from "../TaskItem"
import store from '../../store'
class TaskList extends React.Component{
  constructor(props){
    super(props)
    this.state=store.getState()
    // console.log(this.state);
    store.subscribe(this.handleStoreChange)
    }

    handleStoreChange=()=>{
      this.setState(store.getState()) 
    }
    // handleDelete=(id)=>{
    // const {handleDelete}=this.props
    // handleDelete(id)
    // }
    // handleFinish=(id)=>{
    // const {handleFinish}=this.props
    // handleFinish(id)
    // }
    render(){
       var datas
       if(this.state.isSearch){
      datas=this.state.searchList
       }else{
       datas=this.state.list
       }
       
      //  console.log(datas);
       
        return(
            <List
            size="large"
            bordered
            dataSource={datas}
            renderItem={item => 
            <List.Item>
        <TaskItem 
          // deleteTask={this.handleDelete} 
          isComplete={item.isComplete}
          date={new Date().toLocaleDateString()} 
          id={item.id} 
          content={item.content} 
          key={item.id} 
          // finishItem={this.handleFinish}
          >
          </TaskItem>
            </List.Item>}
          />
        )
    }
}
export default TaskList