import TaskItem from "./TaskItem.jsx";
import {useContext} from "react";
import {MyContext} from "../App.jsx";

const CompletedTaskList = (props) => {
  const {
  } = props

  const {completedTasks, deleteTask} = useContext(MyContext)
  return (
    <ul>
      {completedTasks.map((task) => (
        <TaskItem
          {...task}
          key={task.taskDeadline}
          deleteTask={deleteTask}
        />
      ))}

    </ul>
  );
};

export default CompletedTaskList;