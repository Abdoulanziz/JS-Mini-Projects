import { Todo } from './Todo.mjs';

let todosList = new Array();
Todo.fetchTodosFromLocalStorage();
document.querySelector("#btn-save-todo").addEventListener("click", (event) => {
    let value = document.querySelector("#input-todo").value;
    if (value.length > 0) {
        Todo.fetchTodosFromLocalStorage();
        const todo = new Todo(value, false);

        document.querySelector(".todos").append(todo.todoBuilder());
        document.querySelector("#input-todo").value = "";

        if (localStorage.getItem("Todos2")) {
            todosList = JSON.parse(localStorage.getItem("Todos2"));
        } else {
            todosList = [];
        }

        todosList.unshift({ id: todo.todoId, title: todo.todoTitle, status: todo.todoStatus });
        localStorage.setItem("Todos2", JSON.stringify(todosList));
    }
});
