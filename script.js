const form = document.querySelector("form")
const input = document.getElementById("text")
const submitBtn = document.getElementById("submit")
const listContainer = document.querySelector(".list-container")
const list = []


window.addEventListener("load", () => {
    updateList()
})

const mappedList = list.map(item => {
        return item = `<li class="px-2 py-1 flex justify-between">
                    <span>${item}</span>
                    <ul class="edit-box flex gap-3">
                        <li><i class="fas fa-edit text-green-600 cursor-pointer"></i></li>
                        <li><i class="fas fa-trash-alt text-red-500 cursor-pointer"></i></li>
                    </ul>
                </li>`
    }).join("")

const updateList = () => {
    form.addEventListener("submit", (ev) => {
        ev.preventDefault()

        if (input.value != "") {
            list.push(input.value)
            listContainer.innerHTML = mappedList
        } else return

        list.push(input.value)
        input.value = ""
        console.log(list)
    })
    console.log("hello")
}

    // console.log(list)






