import React, { Component } from "react";
import "./index.css";
import TasksTable from "./tasksTable";
import { getTasks, addTask } from "../../actions/tasks";

class Tasks extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      text: '',
    }
  }

  componentDidMount = () => {
    this.fetchTasks();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchTasks();
    }
  }

  fetchTasks = async () => {
    const { level = 0, id } = this.props.match.params;
    const tasksResponse = await getTasks(Number(level) + 1, id);
    if (tasksResponse.data && tasksResponse.data.success) {
      this.setState({ tasks: tasksResponse.data.tasks });
    }
  }

  onChangeTitle = (e) => {
    this.setState({ text: e.target.value });
  }

  onClickAddNote = async () => {
    const { text } = this.state;
    if (!text) {
      alert('Invalid Task');
      return;
    };
    const { level = 0, id } = this.props.match.params;
    const initObject = {
      text,
      level: Number(level) + 1,
      taskId: id,
    };
    await addTask(initObject);
    this.setState({ text: '' });
    this.fetchTasks();
  }

  render() {
    const { text, tasks } = this.state;

    return (
      <div className="layout-column align-items-center justify-content-start" >
        <section className="layout-row align-items-center justify-content-center mt-30">
          <input type="text" className="large mx-8" placeholder="Task" onChange={this.onChangeTitle} value={text} />
          <button onClick={this.onClickAddNote}>Add Task</button>
        </section>

        <div className="card w-40 pt-30 pb-8">
          <TasksTable
            fetchTasks={this.fetchTasks}
            tasks={tasks}
          />
        </div>
      </div>
    );
  }
}


export default Tasks;