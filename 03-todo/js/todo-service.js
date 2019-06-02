
var gTodos;
var gFilterBy = 'All';
var gSortBy = "created";

function createTodos() {
    var todos = loadFromStorage('todos')
    if (!todos || !todos.length) {
        todos = [
            createTodo('Learn JS', 0),
            createTodo('Master CSS', 0),
            createTodo('Live good', 0),
        ]
    }
    gTodos = todos;
    saveTodos();
}

function createTodo(txt, imp) {
    return {
        id: makeId(),
        txt: txt,
        isDone: false,
        time: new Date(),
        importance: imp,
    }
}
function compareBytxt(nameA, nameB) {
    if (nameA.txt > nameB.txt) return 1;
    else if (nameA.txt < nameB.txt) return -1;
    return 0;
}
function compareByCreated(lst1, lst2) {
    if (lst1.time < lst2.time) return 1;
    else if (lst1.time > lst2.time) return -1;
    return 0;
}
function compareByimportance(lst1, lst2) {
    return lst2.importance-lst1.importance;
}

function sortTodo(todos){
    switch (gSortBy) {
        case 'txt':
          console.log('txt selected');
         todos.sort(compareBytxt);
          break;
        case 'created':
                console.log('create selected');
                todos.sort(compareByCreated);
         break;
        case 'importance':
                console.log('importance selected');
                todos.sort(compareByimportance);
          break;
       
      }

}

function chackIfEmpty(){
    var num = getTotalCount();
    if (gFilterBy === 'All' && num===0){
       displayEmptyMassage();
       return;
    }
    var res = gTodos.every(function (list) {
        //console.log(list.isDone);
         return (!list.isDone);
        });
     if (gFilterBy==='Done' && res) {
       displayEmptyMassage();
       return;
     }
    else var res = gTodos.every(function (list) {
        //console.log(list.isDone);
         return (list.isDone);
        });
    if (gFilterBy==='Active' && res) {
       displayEmptyMassage();
       return; 
    }
    
    coverMassage();
}

function isSure(){
    var areSure= confirm("are you sure you wont to delet?");
    return areSure;
}

function getTodosForDisplay() {

    if (gFilterBy === 'All') {
        return gTodos;
    }

    return gTodos.filter(function (todo) {
        return (todo.isDone && gFilterBy === 'Done') ||
            (!todo.isDone && gFilterBy === 'Active')
    })
}


function addTodo(txt, imp) {
    var todo = createTodo(txt, imp);
    gTodos.unshift(todo);
    saveTodos();
}

function deleteTodo(todoId) {
    var todoIdx = gTodos.findIndex(function (todo) { return todo.id === todoId });
    gTodos.splice(todoIdx, 1);
    saveTodos();
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) { return todo.id === todoId });
    todo.isDone = !todo.isDone;
    saveTodos();
}

function setFilter(txt) {
    gFilterBy = txt;
}

function setSort(txt) {
    gSortBy = txt;
}

function getTotalCount() {
    return gTodos.length
}

function getActiveCount() {
    var activeTodos = gTodos.filter(function (todo) { return !todo.isDone })
    return activeTodos.length;
}

function saveTodos() {
    saveToStorage('todos', gTodos)
}



