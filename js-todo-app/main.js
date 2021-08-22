fetchTodosFromLocalStorage();

let todosList = new Array();
document.querySelector("#btn-save-todo").addEventListener("click", (event) => {
    let value = document.querySelector("#input-todo").value;
    value = caplitalizeFirstLetter(value);
    if (value.length > 0) {
        const todo = {
            id: generateRandStr(8),
            title: value,
            isComplete: false
        };

        const todoObj = todoBuilder(todo);
        document.querySelector(".todos").append(todoObj);
        document.querySelector("#input-todo").value = "";


        // Before we save new todo
        // Grab existing todos and
        // recreate the array including the new todo

        if (localStorage.getItem("Todos")) {
            todosList = JSON.parse(localStorage.getItem("Todos"));
        } else {
            todosList = [];
        }
        // prevent resetting the todoList
        todosList.push(todo);
        localStorage.setItem("Todos", JSON.stringify(todosList));
        console.log(localStorage.getItem("Todos"));
    }
    console.log(generateRandStr(8));
});

function generateRandStr(size) {
    let str = "";
    const chars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < size; i++) {
        let index = Math.floor(Math.random() * (0, chars.length - 1) + 0);
        str += chars[index];
    }
    return str;
}

function fetchTodosFromLocalStorage() {
    if (localStorage.getItem("Todos")) {
        let todos = JSON.parse(localStorage.getItem("Todos"));
        todos.forEach(todo => {
            const todoObj = todoBuilder(todo);
            document.querySelector(".todos").append(todoObj);
        });
    }
}

function actionTodo(event) {
    todosList = JSON.parse(localStorage.getItem("Todos"));
    if (event.target.innerText == "Delete") {
        todosList.forEach(todo => {
            if (event.target.parentElement.id === todo.id) {
                if (confirm("Sure?")) {
                    todosList.splice(todo, 1);
                    event.target.parentElement.remove();
                    localStorage.setItem("Todos", JSON.stringify(todosList));
                }
            }
        });
    } else if (event.target.innerText == "Edit") {
        todosList.forEach(todo => {
            if (event.target.parentElement.id === todo.id) {
                const newTitle = prompt(todo.title);
                if (newTitle) {
                    event.target.parentElement.querySelector(".title").innerText = caplitalizeFirstLetter(newTitle);
                    todo.title = newTitle;
                    localStorage.setItem("Todos", JSON.stringify(todosList));
                }
            }
        });
    }
}

function todoBuilder(td) {
    const value = caplitalizeFirstLetter(td.title);
    const todo = document.createElement("div");
    todo.setAttribute("id", td.id);
    todo.classList.add("todo");
    const title = document.createElement("h5");
    title.classList.add("title");
    title.innerText = limitStrLen(value, 25);
    todo.append(title);

    const editBtn = document.createElement("h6");
    editBtn.classList.add("edit");
    editBtn.innerText = "Edit";
    todo.append(editBtn);

    const deleteBtn = document.createElement("h6");
    deleteBtn.classList.add("delete");
    deleteBtn.innerText = "Delete";
    todo.append(deleteBtn);
    todo.addEventListener("click", actionTodo);
    return todo;
}

function limitStrLen(str, len) {
    let newStr = str;
    if (str.length >= len) {
        newStr = str.slice(0, len);
        return `${newStr}...`;
    }
    return newStr;
}

function caplitalizeFirstLetter(str) {
    const firstLetter = str.charAt(0);
    const otherLetters = str.slice(1, str.length);
    const newStr = firstLetter.toUpperCase() + otherLetters;
    return newStr;
}