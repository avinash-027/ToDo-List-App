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

    // simplify the filterTasks function by using a single line 
    // task.style.display = (filterValue === "all" || 
    //     (filterValue === "complete" && task.classList.contains('checked')) || 
    //     (filterValue === "incomplete" && !task.classList.contains('checked'))) ? "flex" : "none";
    
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
        warningIcon.style.display = "inline"; // warning icon
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `${taskText} <i class="fas fa-edit edit-icon" onclick="editTask1(this)"></i>`;
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
    const data = localStorage.getItem("data");
    if(data){
        listContainer.innerHTML = data;
    }

    updateProgressBar();
}

// Syntax :- parent.replaceChild(newChild, oldChild);

function editTask(icon) {
    // Target the List Item to Edit
    const listitem = icon.parentElement;
    const currentText = listitem.childNodes[0].nodeValue.trim();
    const currentTextNode = listitem.childNodes[0]; // Store the original text node

    // Create Input Field for Editing
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.className = "edit-input";

    // Replace the Task Text with the Input Field
    listitem.replaceChild(input, currentTextNode);

    input.focus();

    // Handle Saving Edits on "Enter" Key Press
    input.addEventListener("keypress", function(e){
        if(e.key === "Enter"){
            const newText = input.value.trim();
            if (newText !== ""){
                // Replace input with new text
                // console.log("Editing task:", currentText);
                listitem.replaceChild(document.createTextNode(newText), input);

                saveData();
                updateProgressBar();
            }else{
                // If the input is empty, remove the task
                listitem.remove();

                saveData();
                updateProgressBar();
            }
        }
    });

    // Handle Losing Focus on the Input Field (Blur Event)
    input.addEventListener("blur",function(){
        const newText = input.value.trim();
        if(newText !== ""){
            listitem.replaceChild(document.createTextNode(newText), input);

            saveData();
            updateProgressBar();
        }else{
            listitem.remove();

            saveData();
            updateProgressBar();
        }
    })

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

// can also use 

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

// const dropdownBtn = document.querySelector(".dropdown-btn");
// const dropdownContent = document.querySelector(".dropdown-content");
// dropdownBtn.addEventListener("click",function(){
//     dropdownContent.style.display = (dropdownContent.style.display === "block") ? "block" :"none";
// });

    
// const editIcon = li.querySelector('.edit-icon');
// editIcon.addEventListener('click', function() {
//     editTask(editIcon);
// });