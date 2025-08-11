import TaskItem from "./TaskItem.jsx";
import {useContext} from "react";
import MyContext from './MyContext.jsx'

const CompletedTaskList = () => {

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