//find the element

const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const inputTodo = document.querySelector("#inputTodo");
const addTodoButton = document.querySelector("#addTodoButtoncontainer");
const todoList = document.querySelector("#lists");
const messageElement = document.querySelector("#message");

//showMessage
const showMessage = (text,status) => {
    messageElement.textContent =text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(() => {
        messageElement.textContent = "";
        messageElement.classList.remove(`bg-${status}`);
    }, 1000);
};

//createTodo
const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.classList.add("li-style");
    todoElement.id = todoId;
    todoElement.innerHTML = `
    <span> ${todoValue} </span>
    <span> <button class="btnTodo" id="deleteButtonId"><i class="fa fa-trash"></i> </button> </span>
    `;
    todoList.appendChild(todoElement);

    const deleteButton = todoElement.querySelector("#deleteButtonId");
    deleteButton.addEventListener("click",deleteTodo);
};

//delete todo
const deleteTodo = (event) =>{
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
     todoList.removeChild(selectedTodo); 
     showMessage("Todo is deletade","danger")

     
     
    let todo = getTodosFromLocalStorage().filter((todo) => todo.todoId !== selectedTodo.id);
     localStorage.setItem("myTodos",JSON.stringify(todo))
};

//getTodosFromLocalStorage
const getTodosFromLocalStorage = () =>{
return localStorage.getItem("myTodos")?JSON.parse(localStorage.getItem("myTodos")) : [];
}

//add todo
const addTodo = (event) =>{
    event.preventDefault();
const todoValue = inputTodo.value;

    
    const todoId = Date.now().toString();//unique id
    
    createTodo(todoId,todoValue);
    showMessage("todo is add","success");

    const todos = getTodosFromLocalStorage();//get todo from local storage
    todos.push({todoId,todoValue});
    localStorage.setItem("myTodos",JSON.stringify(todos));

    inputTodo.value = "";

};

//loadTodos
const loadTodos = () => {
    let todos = getTodosFromLocalStorage();
    todos.map((todo)=>createTodo(todo.todoId,todo.todoValue))
};

//adding listeners

todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);
