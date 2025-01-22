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
        document.querySelector(".dropdown-content").style.display = "none";
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

    let li = document.createElement("li");
    li.innerHTML = `${taskText} <i class="fas fa-edit edit-icon" onclick="editTask(this)"></i>`;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.classList.add('fa-solid', 'fa-trash'); // delete character
    li.appendChild(span);

    inputBox.value = ""; // Reset input box
    inputBox.classList.remove('warning');  // Remove warning class after reset
    document.querySelector(".row").style.backgroundColor = ""; // Remove red background
    // warningIcon.style.display = "none"; // Hide warning icon


    saveData();
    updateProgressBar();
}

// Input box event to reset warning on user input - every time the user TYPES
inputBox.addEventListener('input', function(){
    inputBox.placeholder = "Add YOUR Task"; // Reset placeholder
    warningIcon.style.display = "none"; // Hide warning icon
    document.querySelector(".row").style.backgroundColor = ""; // Remove red background
});

// Check and Remove action
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        updateProgressBar();
    }
    else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
        updateProgressBar();
    }
}, false);

function saveData(){
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("data", listContainer.innerHTML);
    } else {
        console.error("LocalStorage is not supported.");
    }
}
function showData(){
    listContainer.innerHTML = localStorage.getItem("data");

    updateProgressBar();
}

function editTask(icon){
    const listItem = icon.parentElement;
    const currentText = listItem.childNodes[0].nodeValue.trim();
    const newText = prompt("Edit: ",currentText);

    if(newText !== null && newText !== ""){
        listItem.childNodes[0].nodeValue = newText + "";
    }
}

const progressBar = document.getElementById("progress");
const progressNumber = document.getElementById("numbers");

function updateProgressBar(){
    const tasks = listContainer.querySelectorAll("li");
    const completedTasks = listContainer.querySelectorAll("li.checked");

    const progressPercent = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

    progressBar.style.width = `${progressPercent}%`;

    progressNumber.textContent = `${completedTasks.length} / ${tasks.length}`;
}

showData();


    // span.addEventListener('click', function(){
    //     li.remove();
    //     saveData();
    //     updateProgressBar();
    // });
    // li.addEventListener('click',function(){
    //     li.classList.toggle("checked");
    //     saveData();
    //     updateProgressBar();
    // });