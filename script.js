// =========== BETTER SOLUTION ============


// ========== GET ELEMENT ============

const input = document.getElementById("text")
const form = document.querySelector("form")
const submitBtn = document.getElementById("submit")
const clearAllBtn = document.getElementById("clear=all=btn")
const messageBox = document.querySelector(".message-box")
const listContainer = document.querySelector(".list-container")

let groceryList = []
let edited = false
let editItem = ""

const id = new Date().getTime().toString()

console.log(id)


form.addEventListener("submit", (ev) => {
    ev.preventDefault()
    const inputValue = input.value

    console.log(inputValue)

    if (inputValue && !edited) {
        
        const element = document.createElement("li")
        element.classList.add("list-item")
        const att = document.createAttribute("data-id")
        att.value = id
        element.setAttributeNode(att)

        element.innerHTML = `<span>${inputValue}</span>
                    <ul class="edit-box flex gap-3">
                        <li><i class="fas fa-edit text-green-600 cursor-pointer"></i></li>
                        <li><i class="fas fa-trash-alt text-red-500 cursor-pointer"></i></li>
                    </ul>`
        
        listContainer.appendChild(element)

        messageBox.innerHTML = `<p class="bg-green-200">item added to bucket</p>`
        setTimeout(disappear, 1000)

        input.value = ""
    } else if (!inputValue && edited) {
        edited = true
    } else {
        
        messageBox.innerHTML = `<p class="bg-red-300">please enter value</p>`
        setTimeout(disappear, 1000)
    }
    
})

function disappear() {
    messageBox.innerHTML = ""
}















