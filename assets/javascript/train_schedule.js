$(document).ready(function () {

    // Global Var
    var database = firebase.database();

    // Event listener for form
    $("#submitButton").on("click", function () {

        var trainName = $("#trainNameInput").val().trim();
        //console.log(trainName,trainDest,trainTime,trainFreq);
        var trainDest = $("#destinationInput").val().trim();
        var trainTime = $("#timeInput").val().trim();
        var trainFreq = $("#frequencyInput").val().trim();

        //add new train record to the database//
        database.ref().push({
            name: trainName,
            dest: trainDest,
            time: trainTime,
            freq: trainFreq,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        alert("New train has been added!");

    });

    //when a new train is added, do this 
    database.ref().on("child_added", function(childSnapshot) {
        console.log("name "+childSnapshot.val().name);
        console.log("dest "+childSnapshot.val().dest);
        console.log("time "+childSnapshot.val().time);
        console.log("freq "+childSnapshot.val().freq);
        console.log("date added "+childSnapshot.val().dateAdded);
       
        var tMinutesTillTrain = 0;
        var nextTrainConverted = 0;
        
        //add new train record into the main table
        $("#trainTable > tbody").append("<tr><td>" + childSnapshot.val().name + "<tr><td>" + childSnapshot.val().dest 
        + "<tr><td>" + "every " + childSnapshot.val().freq + " minutes" + "<tr><td>" + nextTrainConverted 
        + "<tr><td>" + tMinutesTillTrain + "<tr><td>");

    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });//closes the child added function

});//closes the document.ready