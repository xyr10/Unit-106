var isImportant = false; //this is the global variable
const serverUrl = "http://fsdiapi.azurewebsites.net";

function togglePanel(){
    console.log("button clicked");
    //hide the section/element using jQuery
    $("#form").slideToggle("slow"); //other solutions are .hide or .toggle vice .slideToggle

}
function saveTask(){
    console.log("Save clicked");
    //hide the section/element;
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const dueDate = $("#selDueDate").val();
    const duration = $("#txtDuration").val();    
    const status = $("#selStatus").val();
    const color = $("#selColor").val();
    const budget = $("#txtBudget").val();  
 
    let task = new Task(title, isImportant, desc, dueDate, duration, status, color, budget);
    $.ajax({
        type: "POST",
        url: serverUrl + "/api/tasks/",
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function(res){
            console.log("Saved worked", res);
        },
        error: function(error){
            console.log("Save failed", error);
        }
    });
    
    console.log(task);

    displayTask(task);
    clearForm();
}

function clearForm(){
        $("#txtTitle").val("");
        $("#txtDescription").val("");
        $("#selDueDate").val("");
        $("#txtDuration").val("");
        $("#selStatus").val("");
        $("#selColor").val("");        
        $("#txtBudget").val("");   
}

function formatDate(date){
    let trueDate = new Date(date); //parse date string into date obj
    return trueDate.toLocaleDateString() + " " + trueDate.toLocaleTimeString();
}

function displayTask(task) {
    let syntax = `<div class="task" style="border:1px solid ${task.color};">
        <div class="info">
        <h5>${task.title}</h5>
        <p>${task.description}</p>
        </div>
        
        <label>${task.status}</label>
        // <label>${task.budget}</label>

        <div class="dates">
        <label>${formatDate(task.dueDate)}</label>
        <label>${task.duration}</label>
        </div>
    </div>`;

    $("#pendingTasks").append(syntax);

}
function toggleImportant(){
    const nonImpClasses = "fa-solid fa-tag not-important";
    const impClasses = "fa-solid fa-tag important";

    if(isImportant) {
        $("#iImportant").removeClass(impClasses).addClass(nonImpClasses);
        isImportant = false;
    }
    else {
    //hide the section/element;
        $("#iImportant").removeClass(nonImpClasses).addClass(impClasses);
        isImportant = true;
    }
}
function taskForm(){
    //get the values from the inputs in the form
    let inputTitle = $("#txtTitle").val();
    let inputDescription = $("#txtDescription").val();
    let inputDueDate = $("#txtDueDate").val();
    let inputDuration = $("#txtDuration").val();
    let inputStatus = $("#selStatus").val();
    let inputColor = $("#selColor").val();
    let inputBudget = $("#txtBudget").val();
}

function fetchTasks(){
    // retrieve all the tasks from the server
    $.ajax({
        url: serverUrl + "/api/tasks/",
        type: "GET",
        success: function(response){
            const list = JSON.parse(response); //parse a json string into array/objects
            for(let i=0; i<list.length; i++) {
                let record = list[i];
                if(record.name === "Xyrone") {
                // if the task name is equal to my name, then:
                displayTask(record);
                }
            }
        },
        error: function(error){
            console.log("Error", error);

        }
    });

}
function init(){
    console.log("Task Manager");

    // retrieve data
    fetchTasks();

    // hook events
    $("#btnShowPanel").click(togglePanel);
    $("#btnSave").click(saveTask);
    $("#iImportant").click(toggleImportant);
}

window.onload = init;


/**
 * Inv home:
 * http methods/verbs
 * http status codes
 * 
 * 
 * 
 * Challenges:
 * - format date
 * - clear form after displaying
 * 
 */