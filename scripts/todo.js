'use strict'
//8. Hiển thị Todo List
const inputTask = document.getElementById('input-task');
const addBtn = document.getElementById('btn-add');
const todoListEl = document.getElementById('todo-list');


let todoArr = getFromStorage('todoArrStore') || [];
let isDone = false;
//8.a. Thêm mới Todo và Lưu dữ liệu vào LocalStorage
class Task {
    constructor(task, owner, isDone) {
        this.task = task;
        this.owner = owner;
        this.isDone = isDone;
    }
}

//hàm chuyển  JS object sang Class Instance
function parseTask(taskData) {
    const task = new Task(taskData.task, taskData.owner, taskData.isDone);
    return task;
}
todoArr = todoArr.map((todo) => parseTask(todo));
console.log(todoArr);

//8.b. Hiển thị Task
renderTodo(todoArr);

//8.b.1.Sự kiện add todolist
addBtn.addEventListener('click', function () {
    const data = inputTask.value;
    //tạo instance
    const todo = new Task(data, currentUser.username, isDone);
    let checkToDo = true;
    //xác nhận thông tin
    function validateData() {
        if (!currentUser.username) {
            inputTask.value = "";
            checkToDo = false;
        } else {
            if (data === "") {
                alert('Please input todo!');
                checkToDo = false;
            };
        }
        return checkToDo;
    }
    //console.log(validateData());
    const validate = validateData(todo)
    if (validate) {
        todoArr.push(todo);
        console.log(todoArr);
        saveToStorage('todoArrStore', todoArr);
        renderTodo(todoArr);
        inputTask.value = "";
    }
});

//8.b.2.Hàm hiển thị Task
function renderTodo(todoList) {
    let html = ``;
    todoListEl.innerHTML = "";
    todoList.forEach(function (todo, index) {
        if (todo.owner === currentUser.username) {
            html = `<li class="${todo.isDone ? "checked" : ""}" onclick='toDoTask(${index})'>${todo.task}<span class="close" onclick="deleteToDo(${index},event)">x</span></li>`;
            todoListEl.insertAdjacentHTML("beforeend", html);
        }
    });
}


//8.c.Toggle Task
function toDoTask(y) {
    if (todoArr[y].isDone) {
        todoArr[y].isDone = false;
    } else {
        todoArr[y].isDone = true;
    }
    renderTodo(todoArr);
    console.log(todoArr);
    saveToStorage('todoArrStore', todoArr);
};

//8.d.Delete Task
function deleteToDo(index, e) {
    //chặn sự kiện phần tử span (delete) lan lên phần tử cha (li)
    e.stopPropagation();
    const toDoConfirm = confirm("Are you sure?");
    if (toDoConfirm) {
        todoArr.splice(index, 1);
    }
    saveToStorage('todoArrStore', todoArr);
    renderTodo(todoArr);
    console.log(todoArr);
};

