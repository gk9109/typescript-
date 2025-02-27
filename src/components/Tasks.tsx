import React, { useEffect, useState } from 'react';

import '../style/Tasks.css'
import { Task } from "../interface/tasks.ts";
import  TaskSort  from "./TaskSort.jsx";
import { fetchActiveTasks, moveToArchive, updateCompletedTasks, loadTasks, saveTasks, deleteTask } from "./func.ts";
import  Quote  from "./Quote.tsx";

const TaskForm: React.FC = () => {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      id: crypto.randomUUID(), // Generate unique ID
      task: name,
      topic,
      description,
      dueDate,
      priority,
      isDone: false,
      isArchived: false,
    };

    const tasks = loadTasks();
    tasks.push(newTask);
    saveTasks(tasks);

    setName("");
    setTopic("");
    setDescription("");
    setDueDate("");
    setPriority(2);
  };

  return (
    <div className='form-cont'>
    <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder=" Name" required />
        <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Task Topic" required />
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        <select value={priority} onChange={e => setPriority(Number(e.target.value))}>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
        <button type="submit">Add Task</button>
    </form>
    </div>
  );
};

//display tasks
const TaskDisplay: React.FC = () => {
  //state stores an array of tasks <Task[]>
  const [tasks, setTasks] = useState<Task[]>([]);
  //stores string for filtering
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    setTasks(fetchActiveTasks()); // load all tasks (both completed and incomplete)
  }, []);

  const handleMoveToArchive = (taskId: string) => {
    setTasks(moveToArchive(taskId));
  };

  const handleCompleteTask = (taskId: string) => {
    updateCompletedTasks(taskId);
    setTasks(fetchActiveTasks());
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    setTasks(fetchActiveTasks());
  };

  //apply filtering logic
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.isDone;
    if (filter === "incomplete") return !task.isDone;
    return true; // "all" shows everything
  });

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  return (
    <div className='task-card-cont'>
      {/* display quote box */}
      <Quote />

      <h2>Tasks</h2>
      
      {/* sorting and filtering dropdowns */}
      <TaskSort onSortChange={() => {}} onFilterChange={handleFilterChange} />

      {filteredTasks.length === 0 ? <p>No tasks found</p> : (
        filteredTasks.map(task => (
          <div key={task.id} className={`task-card ${task.isDone ? "completed-task" : ""}`}>
            <p>Task: {task.task}</p>
            <p>Topic: {task.topic}</p>
            <p>{task.description}</p>
            <p>Due: {task.dueDate || "No due date"}</p>
            <p className={`priority ${task.priority === 1 ? "low" : task.priority === 2 ? "medium" : "high"}`}>
              Priority: {task.priority === 1 ? "Low" : task.priority === 2 ? "Medium" : "High"}
            </p>
            <p>{task.isDone ? "✅ Completed" : "⏳ Incomplete"}</p>
            <div className='btn-div'>
              <button onClick={() => handleCompleteTask(task.id)}>
                {task.isDone ? "Mark Incomplete" : "Mark Completed"}
              </button>
              <button onClick={() => handleMoveToArchive(task.id)}>Archive</button>
              <button onClick={() => handleDeleteTask(task.id)} className="delete-btn">🗑️ Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export  {TaskForm, TaskDisplay};
