const form = document.querySelector("form")
const input = document.getElementById("text")
const submitBtn = document.getElementById("submit")
const listContainer = document.querySelector(".list-container")
const clearAllBtn = document.getElementById("clear-all-btn")
const list = []


window.addEventListener("load", () => {
    updateList()
})

const updateList = () => {
    form.addEventListener("submit", (ev) => {
        ev.preventDefault()

        if (input.value !== "") {
            list.push(input.value)            
        } else return



        const mappedList = list.map(item => {
        return `<li class="px-2 py-1 flex justify-between list-box">
                    <span>${item}</span>
                    <ul class="edit-box flex gap-3">
                        <li><i class="fas fa-edit text-green-600 cursor-pointer"></i></li>
                        <li><i class="fas fa-trash-alt text-red-500 cursor-pointer"></i></li>
                    </ul>
                </li>`
        }).join("")

        input.value = ""
        listContainer.innerHTML = mappedList

        const trashBtn = document.querySelectorAll(".fa-trash-alt")

        trashBtn.forEach(btn => {
            btn.addEventListener("click", () => {

                const parentOfTrash = btn.parentElement
                const editboxContainer = parentOfTrash.parentElement
                const mainContainer = editboxContainer.parentElement
                console.log(mainContainer)
                list.pop(input.value)
                mainContainer.style.display = "none"
                console.log(list)
            })
        })

        
    })
}


// ======== DELETE LIST ==========


clearAllBtn.addEventListener("click", () => {
    // listContainer.style.display = "none"
})

const num = [2,3,5,6,7,8]

console.log(clearAllBtn.value)








