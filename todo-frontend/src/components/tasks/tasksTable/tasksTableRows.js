import React, { Component } from 'react';
import { completeTask, deleteTask } from '../../../actions/tasks';
import constants from '../../../constants';
import history from '../../../utils/browserHistory';

class TasksTableRows extends Component {

  onClickCompleted = async (taskId) => {
    await completeTask(taskId);
    this.props.fetchTasks();
  }

  onClickRemove = async (taskId) => {
    await deleteTask(taskId);
    this.props.fetchTasks();
  }

  onClickText = ({ level, taskId }) => {
    history.push(`/tasks/${level}/${taskId}`);
  }

  render() {
    const { tasks } = this.props;
    return tasks.map((note, index) => (
      <tr key={index}>
        <td onClick={() => this.onClickText(note)}>{note.text}</td>
        <td>{note.status}</td>
        {note.status !== constants.COMPLETED
          ? <td onClick={() => this.onClickCompleted(note.taskId)}>Mark as finished</td>
          : <td></td>
        }
        <td onClick={() => this.onClickRemove(note.taskId)}>Remove</td>
      </tr >)
    )
  }
}

export default TasksTableRows;
