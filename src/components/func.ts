import { Task } from "../interface/tasks"; 


//load tasks from local storage
export const loadTasks = (): Task[] => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};
  
//save tasks to local storage
export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

//fetch active (not archived) tasks
export const fetchActiveTasks = (): Task[] => {
  return loadTasks().filter(task => !task.isArchived);
};

//fetch archived tasks
export const fetchArchivedTasks = (): Task[] => {
  return loadTasks().filter(task => task.isArchived);
};

//move a task to archive
export const moveToArchive = (taskId: string): Task[] => {
  const tasks = loadTasks().map(task =>
    task.id === taskId ? { ...task, isArchived: true } : task
  );
  saveTasks(tasks);
  return fetchActiveTasks();
};

//mark task as completed
export const updateCompletedTasks = (taskId: string): void => {
  const tasks = loadTasks().map(task =>
    task.id === taskId ? { ...task, isDone: !task.isDone } : task
  );
  saveTasks(tasks);
  fetchActiveTasks();
};
  
//add new task
export const addTask = (newTask: Task): void => {
  const tasks = loadTasks();
  tasks.push(newTask);
  saveTasks(tasks);
  //fetach active tasks
};

//delete task
export const deleteTask = (taskId: string): void => {
  const tasks = loadTasks().filter(task => task.id !== taskId);
  saveTasks(tasks);
}
