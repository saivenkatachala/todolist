// Selectors
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-btn');

// Event Listeners
document.addEventListener('DOMContentLoaded', loadTasks);
addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', manageTask);
filterButtons.forEach(btn => btn.addEventListener('click', filterTasks));

// Functions
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = {
            text: taskText,
            completed: false
        };
        saveTask(task);
        displayTask(task);
        taskInput.value = '';
    }
}

function manageTask(e) {
    const item = e.target;
    if (item.classList.contains('delete-btn')) {
        const task = item.parentElement;
        deleteTaskFromStorage(task.firstChild.textContent);
        task.remove();
    } else if (item.classList.contains('done-btn')) {
        const task = item.parentElement;
        toggleCompleteTask(task);
    }
}

function displayTask(task) {
    const li = document.createElement('li');
    li.classList.add('task');
    if (task.completed) {
        li.classList.add('completed');
    }
    li.textContent = task.text;

    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    doneBtn.classList.add('done-btn');
    li.appendChild(doneBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

function filterTasks(e) {
    const filter = e.target.dataset.filter;
    const tasks = document.querySelectorAll('.task');

    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'completed':
                if (task.classList.contains('completed')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
            case 'pending':
                if (!task.classList.contains('completed')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
        }
    });
}

// Local Storage Functions
function saveTask(task) {
    let tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

function loadTasks() {
    let tasks = getTasksFromStorage();
    tasks.forEach(task => displayTask(task));
}

function deleteTaskFromStorage(taskText) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleCompleteTask(taskElement) {
    taskElement.classList.toggle('completed');
    let tasks = getTasksFromStorage();
    tasks.forEach(task => {
        if (task.text === taskElement.firstChild.textContent) {
            task.completed = !task.completed;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
