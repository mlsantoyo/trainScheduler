  
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCG0LsZDcULl3JWopPqIjBHKRgNJR_FadE",
    authDomain: "mstrainscheduler-e15a1.firebaseapp.com",
    databaseURL: "https://mstrainscheduler-e15a1.firebaseio.com",
    projectId: "mstrainscheduler-e15a1",
    storageBucket: "mstrainscheduler-e15a1.appspot.com",
    messagingSenderId: "514163953916"
  };
  firebase.initializeApp(config);

  

  var database = firebase.database();

  // Button for adding a train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var time = moment($("#time-input").val().trim(), 'HH').format('X');
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: destination,
    time: time,
    frequency: frequency
  };

  // Uploads train info to the database
  database.ref().push(newTrain);

  // checks
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  

  // Clear form
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// Create Firebase event for adding train to the database and a row in the html when a user adds a train

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());



  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var time = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(time);
  console.log(frequency);

  
  


  
    // difference between first train and now
    var delta = moment().diff(moment.unix(time), "minutes");

    // calculates the times the train has arrived from first to now
    var timeLeft = moment().diff(moment.unix(time), "minutes") % frequency;

    // calculates the amount of minutes until next train
    var minAway = moment(frequency - timeLeft, "minutes").format("mm");

    // adds minutes away to get next arrival time
    var nextArrival = moment().add(minAway, "minutes").format("HH:mm A");

  // Append train data to the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");
});
