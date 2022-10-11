// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listners
loadEventListners();

function loadEventListners() {
    // dom load event
    document.addEventListener('DOMContentLoaded',getTask)
    // add task event
    form.addEventListener('submit', addTask);
    // remove task
    taskList.addEventListener('click', removeTask);
    //clear task
    clearBtn.addEventListener('click',clearTasks);
    // filter tasks
    filter.addEventListener('keyup',filterTasks);
}

// get tasks
function getTask(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task=>{
        const li = document.createElement('li');
        // add a class
        li.className = 'collection-item';
        // create textnode and append to the li(kan også bruke li.innerHTML=taskInput.value;)
        li.appendChild(document.createTextNode(task));
        // create a new text element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append the link to the li
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);
    })
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('add a task');
    }
    else {
        // Create li element
        const li = document.createElement('li');
        // add a class
        li.className = 'collection-item';
        // create textnode and append to the li(kan også bruke li.innerHTML=taskInput.value;)
        li.appendChild(document.createTextNode(taskInput.value));
        // create a new text element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append the link to the li
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);
        // store in lS
        storeTaskInLocalStorage(taskInput.value);
        // clear input
        taskInput.value = '';
        // console.log(li);
    }

    e.preventDefault();
}

function removeTask(e) {
    // Can also use parentElement
    if (e.target.parentNode.classList.contains('delete-item')) {
        if (confirm('are you sure')) {
            e.target.parentNode.parentNode.remove();
            // remove from LS
            removeTaskFromLocalStorage(e.target.parentNode.parentNode);
        }
    }
}

function clearTasks(){
    // taskList.innerHTML='';

    // faster seloution
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
        // clear form LS
    }
    clearTasksFromLocalStorage();
}

function filterTasks(e){
    const textInput=e.target.value.toLowerCase();
    // Henter ut alle elementene fra queryselctor
    document.querySelectorAll('.collection-item').forEach(task =>{
        // Legger første tasken inn i item
        const item=task.firstChild.textContent;
        // Searcher stringen item etter hva som puttes i søkerfeltet
        if(item.toLowerCase().indexOf(textInput)!=-1){
            // Finnes det i søkerfeltet blir tasken synelig
            task.style.display='block'
        }
        else{
            // Dersom den ikke finnes blir den usynelig
            task.style.display='none'
        }
    });
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
    
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task, index)=>{
        if(taskItem.textContent===task){
            tasks.splice(index,1);
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}