import React from 'react';
import TaskItem from "./TaskItem.jsx";

const CompletedTaskList = (props) => {
  const {
    tasks,
    deleteTask
  } = props
  return (
    <ul>
      {tasks.map((task) => (
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