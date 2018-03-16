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
    database.ref().on("child_added", function (childSnapshot) {
        //console.log("name " + childSnapshot.val().name);
        //console.log("dest " + childSnapshot.val().dest);
        //console.log("time " + childSnapshot.val().time);
        //console.log("freq " + childSnapshot.val().freq);
        //console.log("date added " + childSnapshot.val().dateAdded);

        var firstTime = childSnapshot.val().time;
        var trainFreq = childSnapshot.val().freq;
        //console.log("arrvl time "+firstTime);

        //current time
        var currentTime = moment();

        //difference between train arrival time and current time
        var diffTime = moment().diff(moment(firstTime), "minutes");

        //time apart
        var tRemainder = diffTime % trainFreq;

        //minutes until the next train arrives
        var tMinutesTillTrain = trainFreq - tRemainder;

        //next train will arrive
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var nextTrainConverted = moment(nextTrain).format("hh:mm a");

        var newRowContent = "<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().dest + "</td><td>" + childSnapshot.val().freq + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>"
        $("#trainTable tbody").append(newRowContent);

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });//closes the child added function

});//closes the document.ready