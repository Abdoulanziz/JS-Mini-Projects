/*
 * Model this Todo App
 * Using OOP
 */
export class Todo {
    todoId;
    todoTitle = "";
    todoStatus;

    static todoTitleMaxLen = 25;

    constructor(title, status) {
        this.todoId = Todo.generateRandomStr(20);
        this.todoTitle = title;
        this.todoStatus = status;
    }

    static fetchTodosFromLocalStorage() {
        let todosList = localStorage.getItem("Todos2");
        todosList = JSON.parse(todosList);
        todosList.forEach(todo => {

        });

    }

    deleteTodo(event) {
        // if (event.target.innerText == "Delete") {
        //     todosList = JSON.parse(localStorage.getItem("Todos2"));

        //     todosList.forEach(todo => {
        //         if (event.target.parentElement.id === todo.id) {
        //             todosList.splice(todo, 1);
        //             event.target.parentElement.remove();
        //             localStorage.setItem("Todos2", JSON.stringify(todosList));
        //         }
        //     });
        // }
    }

    todoBuilder() {
        const todo = document.createElement("div");
        todo.setAttribute("id", this.todoId);
        todo.classList.add("todo");
        const title = document.createElement("h5");
        title.classList.add("title");
        title.innerText = Todo.limitStrLen(Todo.caplitalizeFirstLetter(this.todoTitle));
        todo.append(title);

        const editBtn = document.createElement("h6");
        editBtn.classList.add("edit");
        editBtn.innerText = "Edit";
        todo.append(editBtn);

        const deleteBtn = document.createElement("h6");
        deleteBtn.classList.add("delete");
        deleteBtn.innerText = "Delete";
        todo.append(deleteBtn);
        todo.addEventListener("click", this.deleteTodo);
        console.log(2, todo);
        return todo;
    }

    static limitStrLen(str) {
        if (str.length >= Todo.todoTitleMaxLen) {
            str = str.slice(0, Todo.todoTitleMaxLen);
            console.log(`${str}...`);
            return `${str}...`;
        }
        return str;
    }

    static caplitalizeFirstLetter(text) {
        const firstLetter = text.charAt(0);
        const otherLetters = text.slice(1, text.length);
        const newStr = firstLetter.toUpperCase() + otherLetters;
        return newStr;
    }

    static generateRandomStr(size) {
        let str = "";
        const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < size; i++) {
            const randomIndex = Math.floor(Math.random() * (size - 0) - 0);
            str += characters[randomIndex];
        }
        return str;
    }
}