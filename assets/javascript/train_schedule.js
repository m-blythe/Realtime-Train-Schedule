//javascript for realtime train schedule//
$(document).ready(function () {
    //confirm the file is properly linked//
    //console.log("ready!");
    var config = {
        apiKey: "AIzaSyBT4xi7P-ghnrMMGiJI2xIOd0jXgBgSSgs",
        authDomain: "realtime-train-schedule.firebaseapp.com",
        databaseURL: "https://realtime-train-schedule.firebaseio.com",
        projectId: "realtime-train-schedule",
        storageBucket: "realtime-train-schedule.appspot.com",
        messagingSenderId: "1003305421267"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    //add new train, click on Submit button//
    $("#submitButton").on("click", function () {
        var trainName = $("#trainNameInput").val().trim();
        var trainDestination = $("#destinationInput").val().trim();
        var trainArrivalTime = $("#timeImput").val().trim();
        var trainFrequency = $("#frequencyInput").val().trim();

        console.log(trainName);
        console.log(trainDestination);
        console.log(trainArrivalTime);
        console.log(trainFrequency);

        var addedTrain = {
            name: trainName,
            destination:trainDestination,
            arrival:trainArrivalTime,
            frequency:trainFrequency,
        }

        trainData.push(addedTrain);

        alert("New Train Added!");

        //delete values from train form//
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#timeInput").val("");
        $("#frequencyInput").val("");

        return false;

    });//closes the submit button function//














}) //closes the document ready