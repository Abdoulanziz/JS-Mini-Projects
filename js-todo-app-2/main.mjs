import { Todo } from './Todo.mjs';

let todosList = new Array();
document.querySelector("#btn-save-todo").addEventListener("click", (event) => {
    let value = document.querySelector("#input-todo").value;
    if (value.length > 0) {

        const todo = new Todo(value, false);

        document.querySelector(".todos").append(todo.todoBuilder());
        document.querySelector("#input-todo").value = "";

        todosList = JSON.parse(localStorage.getItem("Todos"));
        todosList.push(todo);
        localStorage.setItem("Todos", JSON.stringify(todosList));
    }
});
