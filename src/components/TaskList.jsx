import TaskItem from "./TaskItem.jsx";
import {useContext} from "react";
import {MyContext} from "../App.jsx";

const TaskList = () => {
  const {activeTask, deleteTask, completedTask} = useContext(MyContext)

  return (
    <ul className="task-list">
      {activeTask.map((task) => (
        <TaskItem
          {...task}
          key={task.taskDeadline}
          deleteTask={deleteTask}
          completedTask={completedTask}
        />
      ))}

    </ul>
  )
}

export default TaskList