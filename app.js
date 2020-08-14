// SELECTORS
const todoList = document.querySelector(".todo-list")
const todoInput = document.querySelector(".todo-input input")
const addTodo = document.querySelector(".add-todo")
const delAll = document.querySelector(".del-all")

// EVENT LISTENER
addTodo.addEventListener('click', addDataFirebase)
delAll.addEventListener('click', delAllData)


// Getting data from fireabase
firebase.database().ref('todos').once('value', (data) => {
    data.forEach(element => {
        updateTodoList(element.child('key').val(), element.val())
    });
})



var key = 0;

// FUNCTIONS
function addDataFirebase() {
    if (todoInput.value.length === 0) {
        todoInput.style.border = '1px solid red'
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




// // Functions
// function addNewTodo() {
//     if (todoInput.value.length === 0) {
//         alert("Please Enter A Todo")
//     }
//     else {
//         const newTodo = document.createElement("div")
//         newTodo.classList.add("new-todo")

//         const todo = document.createElement("input")
//         todo.classList.add("todo")
//         newTodo.appendChild(todo)
//         todo.disabled = true
//         todo.value = todoInput.value
//         todoInput.value = ""

//         const editTodo = document.createElement("button")
//         editTodo.classList.add("edit-btn")
//         newTodo.appendChild(editTodo)
//         editTodo.innerHTML = '<i class="fas fa-edit"></i>'
//         editTodo.setAttribute("onclick", "edit(this)")


//         const delTodo = document.createElement("button")
//         delTodo.classList.add("del-btn")
//         newTodo.appendChild(delTodo)
//         delTodo.innerHTML = '<i class="fas fa-minus-circle"></i>'
//         delTodo.setAttribute("onclick", "del(this)")

//         todoList.appendChild(newTodo)
//     }
// }

// function deleteAll() {
//     todoList.innerHTML = ""
// }


// function del(e) {
//     const newTodo = e.parentNode
//     newTodo.classList.add("fall")
//     newTodo.addEventListener("transitionend", function () {
//         newTodo.remove()
//     })
// }


// var edited = true
// function edit(e) {
//     const todo = e.parentNode.firstChild

//     if (edited === true) {
//         todo.disabled = false
//         todo.classList.add("center")
//         todo.focus()
//         e.firstChild.remove()
//         e.innerHTML = '<i class="fas fa-check-circle"></i>'

//         edited = false
//     }
//     else if (edited === false) {
//         todo.disabled = true
//         todo.classList.remove("center")
//         e.firstChild.remove()
//         e.innerHTML = '<i class="fas fa-edit"></i>'

//         edited = true
//     }

// }


// todoInput.addEventListener("keypress", enterKey)


// function enterKey (e) {
//     if (e.keyCode === 13) {
//         if (todoInput.value.length === 0) {
//             alert("Please Enter A Todo")
//         }
//         else {
//             const newTodo = document.createElement("div")
//             newTodo.classList.add("new-todo")

//             const todo = document.createElement("input")
//             todo.classList.add("todo")
//             newTodo.appendChild(todo)
//             todo.disabled = true
//             todo.value = todoInput.value
//             todoInput.value = ""

//             const editTodo = document.createElement("button")
//             editTodo.classList.add("edit-btn")
//             newTodo.appendChild(editTodo)
//             editTodo.innerHTML = '<i class="fas fa-edit"></i>'
//             editTodo.setAttribute("onclick", "edit(this)")


//             const delTodo = document.createElement("button")
//             delTodo.classList.add("del-btn")
//             newTodo.appendChild(delTodo)
//             delTodo.innerHTML = '<i class="fas fa-minus-circle"></i>'
//             delTodo.setAttribute("onclick", "del(this)")

//             todoList.appendChild(newTodo)
//         }
//     }
// }