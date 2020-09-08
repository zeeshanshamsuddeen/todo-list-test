import React, { Component } from 'react';
import TasksTableRows from './tasksTableRows';

class TasksTable extends Component {
  render() {
    const { tasks, fetchTasks } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Text</th>
            <th>Status</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <TasksTableRows
            tasks={tasks}
            fetchTasks={fetchTasks}
          />
        </tbody>
      </table>
    )
  }
}

export default TasksTable;
