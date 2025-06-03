document.addEventListener('DOMContentLoaded', () => {
  const dayNumber = document.getElementById('day-number');
  const dayName = document.getElementById('day-name');
  const monthName = document.getElementById('month-name');
  const yearNumber = document.getElementById('year-number');
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  const sortButton = document.getElementById('sort-tasks');

  const setDate = () => {
    const now = new Date();
    dayNumber.textContent = now.getDate();
    dayName.textContent = now.toLocaleString('es', { weekday: 'long' });
    monthName.textContent = now.toLocaleString('es', { month: 'short' });
    yearNumber.textContent = now.getFullYear();
  };

  const createTaskElement = text => {
    const task = document.createElement('div');
    task.classList.add('task');
    task.textContent = text;
    task.addEventListener('click', () => task.classList.toggle('done'));
    return task;
  };

  const handleNewTask = event => {
    event.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;
    const task = createTaskElement(text);
    taskList.prepend(task);
    taskInput.value = '';
  };

  const sortTasks = () => {
    const tasks = Array.from(taskList.children);
    const toDo = tasks.filter(task => !task.classList.contains('done'));
    const done = tasks.filter(task => task.classList.contains('done'));
    taskList.replaceChildren(...toDo, ...done);
  };

  // Event Listeners
  taskForm.addEventListener('submit', handleNewTask);
  sortButton.addEventListener('click', sortTasks);

  // Initialize
  setDate();
});
