// =========== BETTER SOLUTION ============


// ========== GET ELEMENT ============

const input = document.getElementById("text")
const form = document.querySelector("form")
const submitBtn = document.getElementById("submit")
const clearAllBtn = document.getElementById("clear-all-btn")
const messageBox = document.querySelector(".message-box")
const listContainer = document.querySelector(".list-container")

let editElement
let editList = false
let editID = ""

window.addEventListener("load", () => {
    loadExistingList()
})

form.addEventListener("submit", addItem)

clearAllBtn.addEventListener("click", () => {
    setToDefault()
    clearAll()
    alertMessage("red", 300, "Empty bucket")
    setTimeout(disappear, 1000)
})

// ============ FUNCTION =============

function addItem(ev) {
    ev.preventDefault()

    const id = new Date().getTime().toString() // id cannot be global scope
    const inputValue = input.value

    if (inputValue && !editList) {
        
        const element = document.createElement("li")
        element.classList.add("list-item")
        element.style.display = "flex"

        let att = document.createAttribute("data-id")
        att.value = id 
        element.setAttributeNode(att)

        element.innerHTML = `<span class= "input-item">${inputValue}</span>
                    <ul class="edit-box flex gap-3">
                        <li class= "edit-btn"><i class="fas fa-edit text-green-600 cursor-pointer"></i></li>
                        <li class = "delete-btn"><i class="fas fa-trash-alt text-red-500 cursor-pointer"></i></li>
                    </ul>`
        
        listContainer.appendChild(element)

        alertMessage("green", 200, "Item added to bucket")
        setTimeout(disappear, 1000)
        addToLocalStorage(id, inputValue)
        setToDefault()
        clearAllBtn.classList.remove("hidden")

        // trash btn & edit btn // cannot use document.querySelector cuz javascript will read all trashBtn when the list is more than 1(not specific)
        const trashBtn = element.querySelector(".delete-btn") 
        const editBtn = element.querySelector(".edit-btn")

        trashBtn.addEventListener("click", deleteItem)
        editBtn.addEventListener("click", editItem)
    } else if (inputValue && editList) {
        
        editElement.textContent = inputValue

        console.log(editID)
        alertMessage("green", 200, "Item changed")
        editLocalStorage(editID, inputValue)
        setToDefault()
    } else {      
        alertMessage("red", 300, "Please enter your item")
        setTimeout(disappear, 1000)
    }
}

function alertMessage(color, num, message) {
    messageBox.innerHTML = `<p class="bg-${color}-${num}">${message}</p>`
}

function disappear() {
    messageBox.innerHTML = ""
}

function setToDefault() {
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
    
    alertMessage("red", 300, "Item removed")
    setTimeout(disappear, 1000)
    setToDefault()
    clearStorage(id)
}

function editItem(ev) {
    
    const element = ev.currentTarget.parentElement.parentElement
    editElement = ev.currentTarget.parentElement.previousElementSibling

    editList = true
    input.value = editElement.textContent
    submitBtn.innerText = "EDIT"
    editID = element.dataset.id
}



// ============ LOCAL STORAGE ===========


function addToLocalStorage(id, inputValue) {
    let groceriesData = {id, inputValue}
    let items = getLocalStorage() //basically means items = array of groceriesData

    items.push(groceriesData)

    localStorage.setItem("list", JSON.stringify(items)) //JSON stringfy need to be used cuz we want the data stored in local storage is followw the format we exatcly want i.e in array
}
function getLocalStorage() {
    return localStorage.getItem("list")? JSON.parse(localStorage.getItem("list")): [] //this function is to create an array inside local storage

    // JSON parse is used cuz we want the data follow the format in local storage i.e an array
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


function editLocalStorage(id, value) {
    let items = getLocalStorage()

    items = items.map(item => {
        if (item.id === id) {
            item.inputValue = value
        }

        return item
    })

    localStorage.setItem("list", JSON.stringify(items))
}

// ====== RUN ON LOAD =========

const loadExistingList = () => {
    let items = getLocalStorage()

    if (items.length > 0) {
        items.forEach(item => {
        setupExistingList(item.id, item.inputValue )
        })
    } // if we dont use if statement, the code still working
}

const setupExistingList = (id, value) => {
    const element = document.createElement("li")
    element.classList.add("list-item")
    element.style.display = "flex"

    let att = document.createAttribute("data-id")
    att.value = id
    element.setAttributeNode(att)

    element.innerHTML = `<span class= "input-item">${value}</span>
                <ul class="edit-box flex gap-3">
                    <li class= "edit-btn"><i class="fas fa-edit text-green-600 cursor-pointer"></i></li>
                    <li class = "delete-btn"><i class="fas fa-trash-alt text-red-500 cursor-pointer"></i></li>
                </ul>`
    
    listContainer.appendChild(element)

    setToDefault()
    clearAllBtn.classList.remove("hidden")

    const trashBtn = element.querySelector(".delete-btn") 
    const editBtn = element.querySelector(".edit-btn")

    trashBtn.addEventListener("click", deleteItem)
    editBtn.addEventListener("click", editItem)
}




















