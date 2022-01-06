const form = document.querySelector("form")
const input = document.getElementById("text")
const submitBtn = document.getElementById("submit")
const listContainer = document.querySelector(".list-container")
const clearAllBtn = document.getElementById("clear-all-btn")
const messageBox = document.querySelector(".message-box")
let list = []


window.addEventListener("load", () => {
    updateList()
})

const updateList = () => {
    form.addEventListener("submit", (ev) => {
        ev.preventDefault()

        if (input.value !== "") {
            list.push(input.value)            
            messageBox.innerHTML = `<p class="bg-green-200">item added to bucket</p>`

        } else return



        const mappedList = list.map(item => {
        return `<li class="list-box px-2 py-1 flex justify-between">
                    <span class= "span">${item}</span>
                    <ul class="edit-box flex gap-3">
                        <li><i class="fas fa-edit text-green-600 cursor-pointer"></i></li>
                        <li><i class="fas fa-trash-alt text-red-500 cursor-pointer"></i></li>
                    </ul>
                </li>`
        }).join("")

        input.value = ""
        listContainer.style.display = "block"
        listContainer.innerHTML = mappedList

        const trashBtn = document.querySelectorAll(".fa-trash-alt")

        trashBtn.forEach(btn => {
            btn.addEventListener("click", () => {

                const parentOfTrash = btn.parentElement
                const editboxContainer = parentOfTrash.parentElement
                const mainContainer = editboxContainer.parentElement

                list.pop(input.value)
                mainContainer.innerHTML = ""
                messageBox.innerHTML = `<p class="bg-red-500 text-white">item removed</p>`
                console.log(list)
            })
        })

        const editBtn = document.querySelectorAll(".fa-edit")
        const span = document.querySelector(".span")

        editBtn.forEach(btn => {
            btn.addEventListener("click", (ev) => {
                input.value = list
                submitBtn.innerText = "edit"
            })
        })
        clearAllBtn.addEventListener("click", () => {
            list = []
            messageBox.innerHTML = `<p class="bg-red-500 text-white">empty bucket</p>`
            listContainer.style.display = "none"
        })


        
    })
}


// ======== DELETE LIST ==========


// clearAllBtn.addEventListener("click", () => {
//     listContainer.style.display = "none"
// })

// input.addEventListener("click", () => {
//     listContainer.style.display = "block"
// })



// ======== my error/problem =========

// when user click trash icon, item disappear but array only remove the last index. not specific value

// popup message not disappear after few seconds

// edit button error