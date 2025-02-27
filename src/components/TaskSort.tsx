import React from "react";
import "../style/TaskSort.css";

interface TaskSortProps {
  //gets string and returns void
  onSortChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}

//dropdown filter for sorting tasks
const TaskSort: React.FC<TaskSortProps> = ({ onSortChange, onFilterChange }) => {
  return (
    <div className="sort-container">
      <label className="label">Filter By:</label>
      <select onChange={(e) => onFilterChange(e.target.value)} className="sort-dropdown">
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
};

export default TaskSort;

