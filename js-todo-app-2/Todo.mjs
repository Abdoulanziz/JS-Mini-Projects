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

        // this.limitStrLen();
        // this.caplitalizeFirstLetter();
        // this.todoBuilder();
        this.fetchTodosFromLocalStorage();
    }

    fetchTodosFromLocalStorage() {
        if (localStorage.getItem("Todos")) {
            let todos = JSON.parse(localStorage.getItem("Todos"));
            todos.forEach(todo => {
                const todoObj = this.todoBuilder(todo);
                document.querySelector(".todos").append(todoObj);
            });
        }
    }

    deleteTodo(event) {
        if (event.target.innerText == "Delete") {
            todosList = JSON.parse(localStorage.getItem("Todos"));

            todosList.forEach(todo => {
                if (event.target.parentElement.id === todo.id) {
                    todosList.splice(todo, 1);
                    event.target.parentElement.remove();
                    localStorage.setItem("Todos", JSON.stringify(todosList));
                }
            });
        }
    }

    todoBuilder() {
        const value = this.caplitalizeFirstLetter(this.todoTitle);
        const todo = document.createElement("div");
        todo.setAttribute("id", this.todoId);
        todo.classList.add("todo");
        const title = document.createElement("h5");
        title.classList.add("title");
        title.innerText = this.limitStrLen();
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
        console.log(todo);
        return todo;
    }

    limitStrLen() {
        if (this.todoTitle.length >= Todo.todoTitleMaxLen) {
            this.todoTitle = this.todoTitle.slice(0, Todo.todoTitleMaxLen);
            console.log(`${this.todoTitle}...`);
            return `${this.todoTitle}...`;
        }
        return this.todoTitle;
    }

    caplitalizeFirstLetter() {
        const firstLetter = this.todoTitle.charAt(0);
        const otherLetters = this.todoTitle.slice(1, this.todoTitle.length);
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