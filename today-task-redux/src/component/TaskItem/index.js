import './index.less'
import React from 'react';
import PropTypes from 'prop-types';
import { Button ,Typography} from "antd"
import store from '../../store'
import {createTask_Del ,createTask_Com } from "../../store/action-creator"
// import {TASK_DELETE,TASK_COMPLETE} from "../../store/constants"
const{Text}=Typography

class TaskItem extends React.Component{
  // constructor(props){
  //     super(props) 
  // }
  render(){ 
      return(
          <>
          <div className="item-container" onDoubleClick={this.finishItem}>
            <Text delete={this.props.isComplete}>
              {this.props.date}--{this.props.content}</Text>   <Button type="danger" onClick={this.deleteTask}>delete</Button></div>
          {/* <input type="text" /> */}
          </>
      )
  }
  finishItem=()=>{
    const{id,finishItem}=this.props
    // finishItem(id)
    // var action={
    //   type:TASK_COMPLETE,
    //   id:id
    // }
   let action=createTask_Com(id)
   store.dispatch(action)
  }
  deleteTask=()=>{
      const {id}=this.props
      // deleteTask(index)
      // var action={
      //   type:TASK_DELETE,
      //   id:id
      // }
      let action=createTask_Del(id)
      store.dispatch(action)
  }
}
TaskItem.propTypes={
  date:PropTypes.string,           
  item:PropTypes.oneOfType([PropTypes.string.isRequired,PropTypes.number.isRequired]),
  index:PropTypes.number
}
TaskItem.defaultProps={
 date:new Date().toLocaleDateString()
}
export default TaskItem;