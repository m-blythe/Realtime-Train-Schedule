$(document).ready(function () {

    // Global Var
    var database = firebase.database();

    // Event listener for form
    $("#submitButton").on("click", function () {

        var trainName = $("#trainNameInput").val().trim();
        console.log(name);
        var trainDest = $("#destinationInput").val().trim();
        var trainTime = $("#timeInput").val().trim();
        var trainFreq = $("#frequencyInput").val().trim();


        //create addTrain object
        var addTrain = {
            name: trainName,
            dest: trainDest,
            time: trainTime,
            freq: trainFreq
        }
        //add new train record to the database//
        database.ref().push(addTrain);

alert("New train has been added!");

//when a new train is added, do this 
database.ref().on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());
});


    });


});