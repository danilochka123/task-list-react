import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import CompletedTaskList from "./components/CompletedTaskList.jsx";
import Footer from "./components/Footer.jsx";
import {useState} from "react";
import classNames from "classnames";
import {useEffect} from "react";

function App() {
  const [openSections, setOpenSections] = useState({
    taskForm: true,
    taskList: true,
    taskCompletedList: true
  })

  const [tasks, setTasks] = useState(() =>{
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  const [sortOrder, setSortOrder] = useState('asc')
  const [sortType, setSortType] = useState('date')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  useEffect(() =>{
    const timer = setInterval(() => {
      setTasks(tasks =>
        tasks.map((task) => {
          const overdue = new Date(task.taskDeadline) < new Date();
            return {
              ...task,
              overdue,
            }
        })
      )
    }, 1000 * 30)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const handleToggleSection = (section) => {
    setOpenSections((currentSections) => ({
      ...currentSections,
      [section]: !currentSections[section]
    }))
  }

  function addTask(newTask) {
    setTasks(currentTasks => [...currentTasks, {...newTask, completed: false, id: Date.now(), overdue: false}])
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((currentTasks) => currentTasks.id !== id))
  }

  function completedTask(id) {
    setTasks(currentTasks => currentTasks.map(task => task.id === id ? {...task, completed: true} : task))
  }

  function toggleSort(type) {
    if (sortType === type){
      setSortOrder(sortOrder === 'asc' ? "desc" : 'asc')
    } else{
      setSortType(type)
      setSortOrder('asc')
    }
  }

  function sortTasks(tasks) {
    return tasks.slice().sort((a, b) => {
      if (sortType === 'priority') {
        const priorityOrder = {
          'High' : 1,
          'Medium' : 2,
          'Low' : 3,
        }

        return sortOrder === 'asc'
          ? priorityOrder[a.taskPriority] - priorityOrder[b.taskPriority]
          : priorityOrder[b.taskPriority] - priorityOrder[a.taskPriority]
      } else{
        return sortOrder === 'asc'
          ? new Date(a.taskDeadline) - new Date(b.taskDeadline)
          : new Date(b.taskDeadline) - new Date(a.taskDeadline)
      }
    })
  }

  const activeTask = sortTasks(tasks.filter((task) => !task.completed))
  const completedTasks = sortTasks(tasks.filter((task) => task.completed))

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
        {openSections.taskList && <TaskList
          tasks={activeTask}
          deleteTask={deleteTask}
          completedTask={completedTask}
        />}
      </div>

      <div className="completed-task-container">
        <h2>Completed Task</h2>
        <button
          className={classNames("close-button", {
            'open' : openSections.taskCompletedList
          })}
          onClick={() => handleToggleSection('taskCompletedList')}
        >+</button>
        {openSections.taskCompletedList && <CompletedTaskList tasks={completedTasks} deleteTask={deleteTask}/>}
      </div>

      <Footer />
    </div>
  );
}

export default App;
