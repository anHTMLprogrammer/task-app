const taskFormNode = document.querySelector('.task-form');
const taskTemplateNode = document.querySelector('.task-item__template');
const taskListNode = document.querySelector('.task-list');
const taskStorage = JSON.parse(localStorage.getItem('data')) || {};

function saveList() {
  localStorage.setItem('data', JSON.stringify(taskStorage))
}

function displayTask(taskId) {
  const taskText = taskStorage[taskId];
  
  const taskNode = taskTemplateNode.content.cloneNode(true);
  const taskTextNode = taskNode.querySelector('.task-item__text');
  const taskStatusNode = taskNode.querySelector('.task-item__status');

  taskTextNode.textContent = taskText;

  // Activate checkbox when click text
  taskTextNode.setAttribute('for', taskId);
  taskStatusNode.setAttribute('id', taskId);

  taskStatusNode.addEventListener('change', () => {
    if (taskStorage[taskId]) {
      delete taskStorage[taskId];
    } else {
      taskStorage[taskId] = taskText;
    }
    saveList();
  });

  taskListNode.prepend(taskNode);
}

// Display all tasks from local storage
Object.keys(taskStorage).forEach(displayTask);

taskFormNode.onsubmit = function(e) {
  e.preventDefault(); // Without page reload
  
  const taskId = Date.now();
  taskStorage[taskId] = this.text.value;
  displayTask(taskId);

  this.text.value = ''; // clear input field
  saveList();
}