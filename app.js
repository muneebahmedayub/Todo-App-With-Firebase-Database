// SELECTORS
const preloader = document.querySelector(".preloader")
const todoList = document.querySelector(".todo-list")
const todoInput = document.querySelector(".todo-input input")
const addTodo = document.querySelector(".add-todo")
const delAll = document.querySelector(".del-all")

// EVENT LISTENER
addTodo.addEventListener('click', addDataFirebase)
delAll.addEventListener('click', delAllData)
window.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        addDataFirebase()
    }
})


// Getting data from fireabase
firebase.database().ref('todos').once('value', (data) => {
    setTimeout(() => {
        preloader.style.display = "none"
    })
    data.forEach(element => {
        updateTodoList(element.child('key').val(), element.val())
    });
})



var key = 0;

// FUNCTIONS
function addDataFirebase() {
    if (todoInput.value.length === 0) {
        todoInput.style.border = '1px solid red'
        todoInput.focus()
    }
    else {
        if(todoList.childElementCount === 0){
            key = 1
        }
        else {
            key = parseInt(todoList.lastChild.childNodes[1].innerHTML) + 1

        }

        var todos = {
            key: key,
            todo: todoInput.value
        }
        firebase.database().ref('todos/' + key).set(todos)

        updateTodoList(todos.key, todos)
        todoInput.style.border = 'none'
        todoInput.focus()
    }
}

function updateTodoList(key, todos) {

    const newTodo = document.createElement("div")
    newTodo.classList.add("new-todo")

    const todoIn = document.createElement("input")
    todoIn.classList.add("todo")
    newTodo.appendChild(todoIn)
    todoIn.disabled = true
    todoIn.value = todos.todo
    todoInput.value = ""

    const todoKey = document.createElement('p')
    newTodo.appendChild(todoKey)
    todoKey.innerHTML = key
    todoKey.style.display = 'none'

    const editTodo = document.createElement("button")
    editTodo.classList.add("edit-btn")
    newTodo.appendChild(editTodo)
    editTodo.innerHTML = '<i class="fas fa-edit"></i>'
    editTodo.setAttribute("onclick", "edit(this, key)")


    const delTodo = document.createElement("button")
    delTodo.classList.add("del-btn")
    newTodo.appendChild(delTodo)
    delTodo.innerHTML = '<i class="fas fa-minus-circle"></i>'
    delTodo.setAttribute("onclick", "del(this, key)")

    todoList.appendChild(newTodo)
}


var edited = true
function edit(e, key) {
    const todoIn = e.parentNode.firstChild

    if (edited === true) {
        todoIn.disabled = false
        todoIn.classList.add("center")
        todoIn.focus()
        e.firstChild.remove()
        e.innerHTML = '<i class="fas fa-check-circle"></i>'

        edited = false
    }
    else if (edited === false) {
        todoIn.disabled = true
        todoIn.classList.remove("center")
        e.firstChild.remove()
        e.innerHTML = '<i class="fas fa-edit"></i>'

        edited = true

        // to update firebase databse
        key = e.parentNode.childNodes[1].innerHTML
        console.log(todoIn)
        updatedData = {
            key: key,
            todo: todoIn.value
        }
        firebase.database().ref('todos/' + key).set(updatedData)
    }
}


function del(e, key) {
    const newTodo = e.parentNode
    newTodo.classList.add("fall")
    newTodo.addEventListener("transitionend", function () {
        newTodo.remove()
    })

    // delete from firebase
    key = e.parentNode.childNodes[1].innerHTML
    firebase.database().ref('todos/' + key).remove()
}


function delAllData() {
    todoList.innerHTML = ''

    // delete all from firebase
    firebase.database().ref('todos').remove()
}