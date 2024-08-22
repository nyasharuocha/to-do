// Select elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const task = { text: taskText, completed: false };
        const tasks = getTasksFromStorage();
        tasks.push(task);
        saveTasksToStorage(tasks);

        createTaskElement(task);
        taskInput.value = '';
    }
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(createTaskElement);
}

// Function to create a task element
function createTaskElement(task) {
    const li = document.createElement('li');
    li.textContent = task.text;

    if (task.completed) {
        li.classList.add('completed');
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
        taskList.removeChild(li);
        removeTaskFromStorage(task.text);
    };

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => {
        editTask(li, task.text);
    };

    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
    completeBtn.onclick = () => {
        toggleTaskComplete(li, task);
    };

    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Function to get tasks from localStorage
function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Function to save tasks to localStorage
function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove a task from localStorage
function removeTaskFromStorage(taskText) {
    const tasks = getTasksFromStorage();
    const filteredTasks = tasks.filter(task => task.text !== taskText);
    saveTasksToStorage(filteredTasks);
}

// Function to toggle task completion
function toggleTaskComplete(li, task) {
    const tasks = getTasksFromStorage();
    const taskIndex = tasks.findIndex(t => t.text === task.text);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasksToStorage(tasks);

    li.classList.toggle('completed');
    li.querySelector('button:first-child').textContent = tasks[taskIndex].completed ? 'Undo' : 'Complete';
}

// Function to edit a task
function editTask(li, oldTaskText) {
    const newTaskText = prompt('Edit your task:', oldTaskText);
    if (newTaskText && newTaskText.trim() !== '') {
        const tasks = getTasksFromStorage();
        const taskIndex = tasks.findIndex(task => task.text === oldTaskText);
        tasks[taskIndex].text = newTaskText;
        saveTasksToStorage(tasks);

        li.firstChild.textContent = newTaskText;
    }
}

// Event listener for the Add Task button
addTaskBtn.addEventListener('click', addTask);

// Optional: Allow adding tasks with Enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
