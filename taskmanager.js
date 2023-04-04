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

    //validations
    const isValid = true;

    // if no title OR no description OR no duration OR no budget
    if(!title || !desc || !duration || !budget) {
        isValid = false;
        //if the data is not valid, then
        //show an error, and
        $("#pnlError").show();
        setTimeout(() => {
            $("#pnlError").slideToggle('slow');
        }, 6000);
    //stop the execution / don't do anything else in this function
    }
 
    let task = new Task(title, isImportant, desc, dueDate, duration, status, color, budget);
   
    //send the obj to server
    $.ajax({
        type: "POST",
        url: serverUrl + "/api/tasks/",
        data: JSON.stringify(task), //encode our object into a string (xml and JSON but JSON the most popular)
        contentType: "application/json", //specify your data here, or else it will try to read it as a document
        success: function(res){ //this is where we listen to the server
            console.log("Saved worked", res);
            displayTask(task);
            clearForm();

            $("#pnlSuccess").show();
            setTimeout(() => {
                $("#pnlSuccess").slideToggle('slow');
            } ,6000); //this will receive two parameters, what should happen (using an anonymous inline function), and how long 6000ms
        },
        error: function(error){
            console.log("Save failed", error);
            alert("unexpected error, task was not saved")
        }
    });
    
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

function getIcon(savedAsImportant) {
    if(savedAsImportant) {
        //HERE
        return '<i class="fa-solid fa-tag important"></i>';
    }
    else{
        return '<i class="fa-solid fa-tag not-important"></i>';
    }

}
function formatBudget(budget) {
    if(!budget) return "0.00"; //curly braces optional if on a single line

    //parse budget to a number, and then fix it to 2 decimals
    return parseFloat(budget).toFixed(2);
}

function displayTask(task) {
    let syntax = `<div id="${task._id}" class="task" style="border:1px solid ${task.color};">
        
        ${getIcon(task.important)}

    
        <div class="info">
        <h5>${task.title}</h5>
        <p>${task.description}</p>
        </div>
        
        <label>${task.status}</label>
        <label>$${formatBudget(task.budget)}</label>

        <div class="dates">
        <label>${formatDate(task.dueDate)}</label>
        <label>Duration: ${task.duration} days</label>
        </div>

        <i onclick="deleteTask('${task._id}')" class="fa-solid fa-trash-alt iDelete"></i>
    </div>`;

    $("#pendingTasks").append(syntax);

}

function deleteTask(id){
    console.log("icon clicked", id);

    $.ajax({
        type: "DELETE",
        url: serverUrl + `/api/tasks/${id}/`,
        success: function(){
            console.log("Task removed");
            $("#" + id).remove(); // remove div from screen

        },
        error: function(error){
            console.log("Error deleting", error);

        }
    });

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

function deleteAllTasks(){
    console.log("delete all tasks clicked");
    $.ajax({
        type: "DELETE",
        url: serverUrl + "/api/tasks/clear/Xyrone/",
        success: function(response){
            console.log("tasks cleared");
            $("#pendingTasks").html('');
        },
        error: function(error){
            console.log("Error clearing tasks", error);
        }

});
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
    $("#btnDeleteAllTasks").click(deleteAllTasks);
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

/* DELETE /api/tasks/clear/<name>/
DELETE /api/tasks/clear/<name>/

Create the button 
Click on the button, call a function (deleteAllTasks)
the fn send a DELETE request to /api/tasks/clear/<name>/

on success clear the contents of the list
$("#pendingTasks").html('');

*/


