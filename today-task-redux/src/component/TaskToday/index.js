import React from 'react';
// import ReactDOM from 'react-dom';
import TaskList from "../TaskList"
import AddItem from "../AddItem"
import SearchItem  from "../SearchItem"
// import datas from '../../data'
// import"antd/dist/antd.css";
import {createTask_Sea,createTask_Ini} from "../../store/action-creator"
import store from '../../store'
import {Layout} from "antd"
import axios from "axios"
import './index.less'
const {Header,Content}=Layout
class TaskToday extends React.Component{
  // constructor(props){
  //     super(props)
  // }
  // componentWillMount(){
  //   this.setState({
  //     list:datas
  //   })
  // }
  componentDidMount(){
  axios.get("http://localhost:3001/datas").then(res=>{
    let action=createTask_Ini(res.data)
    store.dispatch(action)
  })
  }
  handleFinish=(id)=>{   
    // let changeIndex=datas.findIndex(item=>{  
    //   return item.id===id
    // })
    // datas[changeIndex].isComplete=!datas[changeIndex].isComplete
    // this.setState({
    //   list:datas
    // })
  }
  handleInput=(inputTask)=>{
  // list.push(inputTask)
  // var action={
  //   type:TASK_ADD,
  //   value:inputTask
  // }
  // store.dispatch(action)

  // this.setState({
  //     list:datas
  // })
  // this.state.inputTask="" 
  }
  render(){
      return(
        <Layout className="task-list">
        <Header >
        <h1 className="logo">TASK</h1>
        </Header>
        <Content className="content">
          <AddItem  handleInput={this.handleInput}></AddItem>
          <SearchItem  handleSearch={this.handleTaskSearche}></SearchItem>
         <TaskList  handleDelete={this.handleDelete} handleFinish={this.handleFinish}></TaskList>
        </Content>
          </Layout>
      )
  }
  handleTaskSearche=(value)=>{
    let action=createTask_Sea(value)
        store.dispatch(action)
    // console.log(msg);
    // var filterList=datas.filter(item=>{
    //   return item.content.indexOf(msg)!==-1
    // })
    // this.setState({
    //   list:filterList
    // })
  }
  handleDelete=(id)=>{
    // let changeIndex=datas.findIndex(item=>{  
    //   return item.id===id
    // })
    // datas.splice(changeIndex,1)
    // this.setState({
    //     list:datas
    // })
  }
}
// ReactDOM.render(<TaskList />,document.getElementById('root'));
export default TaskToday;
 