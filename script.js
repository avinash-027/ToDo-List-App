const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const filterOptions = document.querySelectorAll(".filter-option");

filterOptions.forEach(option => {
    option.addEventListener("click", function(){
        const filterValue = option.getAttribute('data-filter');
        filterTasks(filterValue);
    })
});

function filterTasks(filterValue){
    const tasks =listContainer.querySelectorAll("li")

    tasks.forEach(task => {
        switch(filterValue) {
            case "complete":
                if (task.classList.contains('checked')){
                    task.style.display = "flex";
                }else{
                    task.style.display = "none";
                }
                break;
            case "incomplete":
                task.style.display = !task.classList.contains('checked') ? "flex" : "none";
                break;
            case "all":
            default:
                task.style.display = "flex";
                break;
        }
    });
}

const warningIcon = document.querySelector(".warning-icon");

function AddTask(){
    const taskText = inputBox.value.trim();

    if(taskText === ''){
        inputBox.placeholder = "Please enter a task..!" // add input box
        inputBox.classList.add('warning'); // Add warning class
        document.querySelector(".row").style.backgroundColor = "rgba(94, 22, 22, 0.7)"; // Red background to indicate an error
        warningIcon.style.display = "inline"; // Hide warning icon
        return;
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = taskText;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerText = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = ""; // Reset input box
    inputBox.classList.remove('warning');  // Remove warning class after reset
    warningIcon.style.display = "none"; // Hide warning icon
    document.querySelector(".row").style.backgroundColor = ""; // Remove red background
    saveData();
}

// Input box event to reset warning on user input - every time the user TYPES
inputBox.addEventListener('input', function(){
    inputBox.placeholder = "Add YOUR Task"; // Reset placeholder
    warningIcon.style.display = "none"; // Hide warning icon
    document.querySelector(".row").style.backgroundColor = ""; // Remove red background
});

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }

    else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showData(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showData();
