// =========== BETTER SOLUTION ============


// ========== GET ELEMENT ============

const input = document.getElementById("text")
const form = document.querySelector("form")
const submitBtn = document.getElementById("submit")
const clearAllBtn = document.getElementById("clear-all-btn")
const messageBox = document.querySelector(".message-box")
const listContainer = document.querySelector(".list-container")

const id = new Date().getTime().toString()
let editList = false
let editID = ""


form.addEventListener("submit", addItem)

clearAllBtn.addEventListener("click", () => {
    setToDefault()
    clearAll()

    messageBox.innerHTML = `<p class="bg-red-300">Empty Bucket</p>`
    setTimeout(disappear, 1000)
})



function addItem(ev) {
    ev.preventDefault()

    const inputValue = input.value

    if (inputValue && !editList) {
        
        const element = document.createElement("li")
        element.classList.add("list-item")
        const att = document.createAttribute("data-id")
        att.value = id
        element.setAttributeNode(att)

        element.innerHTML = `<span class= "input-item">${inputValue}</span>
                    <ul class="edit-box flex gap-3">
                        <li class= "edit-btn"><i class="fas fa-edit text-green-600 cursor-pointer"></i></li>
                        <li class = "delete-btn"><i class="fas fa-trash-alt text-red-500 cursor-pointer"></i></li>
                    </ul>`
        
        listContainer.appendChild(element)

        successMessage()
        setTimeout(disappear, 1000)
        addToLocalStorage(id, inputValue)
        setToDefault()
        clearAllBtn.classList.remove("hidden")

    } else if (inputValue && editList) {
        editList = true
        const inputItem = document.querySelector(".input-item")
        inputItem.innerText = inputValue
        editLocalStorage(editID, inputValue)
        setToDefault()
    } else {      
        emptyMessage()
        setTimeout(disappear, 1000)
    }

    // trash btn
    const trashBtn = document.querySelector(".delete-btn")
    const editBtn = document.querySelector(".edit-btn")

    trashBtn.addEventListener("click", deleteItem)
    editBtn.addEventListener("click", editItem)
}

// ============ MESSAGE FUNCTION =============

function successMessage() {
    messageBox.innerHTML = `<p class="bg-green-200">item added to bucket</p>`
}

function emptyMessage() {
    messageBox.innerHTML = `<p class="bg-red-300">please enter value</p>`
}

function disappear() {
    messageBox.innerHTML = ""
}

const setToDefault = () => {
    input.value = ""
    editList = false
    editID = ""
    submitBtn.innerText = "SUBMIT"
}

function clearAll() {
    const items = document.querySelectorAll(".list-item")

    if (items.length > 0) {
        items.forEach(list => {
            listContainer.removeChild(list)
        })
    }

    clearAllBtn.classList.add("hidden")
    setToDefault()
    localStorage.removeItem("list")
}

function deleteItem(ev) {
    const element = ev.currentTarget.parentElement.parentElement
    const id = element.dataset.id

    listContainer.removeChild(element)

    if (listContainer.children.length === 0) {
        clearAllBtn.classList.add("hidden")
    }
    
    messageBox.innerHTML = `<p class="bg-red-300">Item removed</p>`
    setTimeout(disappear, 1000)
    setToDefault()
    clearStorage(id)
}

function editItem(ev) {
    // const parentItem = ev.currentTarget.classList
    const element = ev.currentTarget.parentElement.parentElement
    const editItem = ev.currentTarget.parentElement.previousElementSibling

    editList = true
    editID = element.dataset.id
    input.value = editItem.textContent
    submitBtn.innerText = "EDIT"
    editLocalStorage(editID, input.value)
}




// ============ LOCAL STORAGE ===========


function addToLocalStorage(id, inputValue) {
    let groceriesData = {id, inputValue}
    let items = getLocalStorage()

    items.push(groceriesData)
    console.log(items)

    localStorage.setItem("list", JSON.stringify(items))
}
function getLocalStorage() {
    return localStorage.getItem("list")? JSON.parse(localStorage.getItem("list")): []
}
function clearStorage(id) {
    let items = getLocalStorage()

    items = items.filter(item => {
        if (item.id !== id) {
            return item
        }
    })
    
    localStorage.setItem("list", JSON.stringify(items))
}


function editLocalStorage(editID, value) {
    let items = getLocalStorage()

    items = items.map(item => {
        if (item.id === editID) {
            item.inputValue = value
        }

        return item
    })

    localStorage.setItem("list", JSON.stringify(items))
}






















