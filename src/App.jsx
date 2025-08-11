import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import CompletedTaskList from "./components/CompletedTaskList.jsx";
import Footer from "./components/Footer.jsx";
import classNames from "classnames";
import {useContext} from "react";
import MyContext from "./components/MyContext.jsx";


function App() {
  const {
    openSections,
    sortOrder,
    sortType,
    toggleSort,
    addTask,
    handleToggleSection
  } = useContext(MyContext)

  return (
    <div className='app'>
      <div className="task-container">
        <h1>Task List with Priority</h1>
        <button
          className={classNames("close-button", {
            'open' : openSections.taskForm
          })}
          onClick={() => handleToggleSection('taskForm')}
        >+</button>
        {openSections.taskForm && <TaskForm addTask={addTask}/>}
      </div>

      <div className="task-container">
        <h2>Tasks</h2>
        <button
          className={classNames("close-button", {
            'open' : openSections.taskList
          })}
          onClick={() => handleToggleSection('taskList')}
        >+</button>
        <div className="sort-controls">
          <button className="sort-button" onClick={() => toggleSort('date')}>
            By Date {sortType === 'date' && (sortOrder === 'asc' ? "\u2191" : "\u2193")}</button>
          <button className="sort-button" onClick={() => toggleSort('priority')}>
            By Priority {sortType === 'priority' && (sortOrder === 'asc' ? "\u2191" : "\u2193")}</button>
        </div>
        {openSections.taskList && <TaskList/>}
      </div>

      <div className="completed-task-container">
        <h2>Completed Task</h2>
        <button
          className={classNames("close-button", {
            'open' : openSections.taskCompletedList
          })}
          onClick={() => handleToggleSection('taskCompletedList')}
        >+</button>
        {openSections.taskCompletedList && <CompletedTaskList/>}
      </div>
      <Footer />
    </div>
  );
}

export default App;
