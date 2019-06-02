function onInit() {
   createTodos();
   renderTodos();
   coverMassage();
}



function renderTodos() {
    var todos = getTodosForDisplay();
    chackIfEmpty();
    sortTodo(todos); 
    var strHtmls = todos.map(function(todo){
        var formatTime=todo.time;
        var className = (todo.isDone)? 'done' : '';
        return `<li class="${className}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt} ,${formatTime}
            <button onclick="onDeleteTodo(event, '${todo.id}')">x</button>
        </li>`
    })

    document.querySelector('.todo-list').innerHTML = strHtmls.join('');

    renderStats();
    
    // console.table(gTodos)
}

function renderStats() {
    document.querySelector('.total-count').innerText = getTotalCount();
    document.querySelector('.active-count').innerText = getActiveCount()
}

function onAddTodo() {
    var txt = prompt('What todo?');
    if (txt==="") return;
    var imp=+prompt("write importance between 1-3")
    addTodo(txt,imp);
    renderTodos();
    coverMassage();
}

function onDeleteTodo(ev, todoId){
    ev.stopPropagation();
    if (isSure()){
    deleteTodo(todoId);
    renderTodos();
    }
}

function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();
}


function onSetFilter(txt) {
    console.log('Filtering by', txt);
    setFilter(txt);
    renderTodos();
}

function onSetSort(txt) {
    setSort(txt);
    renderTodos();
}


function coverMassage(){
    el=document.querySelector(".noItemMassage");
    el.classList.add('cover');
}


function displayEmptyMassage(){
    el=document.querySelector(".noItemMassage");
    el.classList.remove('cover');
}

