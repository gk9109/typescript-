import React, { useEffect, useState } from "react";
import { fetchArchivedTasks, deleteTask } from "./func.ts";
import { Task } from "../interface/tasks.ts";
import "../style/archive.css";

const Archive: React.FC = () => {
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);

  useEffect(() => {
    setArchivedTasks(fetchArchivedTasks());
  }, []);

  //delete archived task
  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    setArchivedTasks(fetchArchivedTasks());
  };

  return (
    <div className="archive">
      {archivedTasks.length === 0 ? (
        <p>No archived tasks</p>
      ) : (
        archivedTasks.map(task => (
          <div key={task.id} className="taskDisplayArchived">
            <p>Topic: {task.topic}</p>
            <p>Name: {task.task}</p>
            <p>Description: {task.description}</p>
            <p>📅 Due Date: {task.dueDate || "No due date"}</p>
            <p className={`priority ${task.priority === 1 ? "low" : task.priority === 2 ? "medium" : "high"}`}>
              Priority: {task.priority === 1 ? "Low" : task.priority === 2 ? "Medium" : "High"}
            </p>
            <p>📌 Archived</p>
            <button onClick={() => handleDeleteTask(task.id)} className="delete-btn">🗑️ Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Archive;
