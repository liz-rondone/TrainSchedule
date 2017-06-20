$(document).ready(function() {

  /********* Database *********/
  


  /********* Global Variables *********/
  var database = firebase.database();
  var trainName = null;
  var trainDest = null;
  var trainStart = null;
  var trainFreq = null;


    
  /********* Whenever a user clicks the submit-bid button *********/
  $("#submit").on("click", function(event) {

    event.preventDefault();
    //console.log('submit clicked');

    // Get the input values
    trainName = $("#train-name").val().trim();
    trainDest = $("#destination").val().trim();
    trainStart = $("#start-time").val().trim();
    trainFreq = parseInt($("#frequency").val().trim());

    // console.log(trainName);
    // console.log(trainDest);
    // console.log(trainStart);
    // console.log(trainFreq);

    database.ref().push({
      name: trainName,
      destination: trainDest,
      start: trainStart,
      frequency: trainFreq
    })

  })



  /********* Database Function *********/
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    var snapshotStart = childSnapshot.val().start;
    var snapshotFreq = childSnapshot.val().frequency;
    var snapshotName = childSnapshot.val().name;
    var snapshotDest = childSnapshot.val().destination;

       // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(snapshotStart, "hh:mm").subtract(1, "years");
    //console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var remainder = diffTime % snapshotFreq;
    //console.log(remainder);

    // Minute Until Train
    var minutesTillTrain = snapshotFreq - remainder;
    //console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

    // Next Train
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var nextTrainUnix = moment.unix(nextTrain).format("hh:mm a");
    console.log(nextTrain);
    console.log(nextTrainUnix);
    //moment.unix(start).format("MM/DD/YY");
    //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


     // adding train schedule HTML
    var newRow = $("<tr>");
       
    newRow.html("<td>" + snapshotName + "</td><td>" + snapshotDest + "</td><td>" + snapshotFreq + " min</td><td>" + nextTrainUnix + "</td><td>" + minutesTillTrain + " min</td>");

    $('#current-schedule').append(newRow);

  })

});

/* 

//How to change the employeStart from the database a moment time object

moment.unix(start).format("MM/DD/YY");

// To calculate the difference from start date until now.
moment().diff(moment.unix(start, "X"), "minutes")


          var rowContainer = $('<tr>').attr('id', 'tr-container');
          $("#current-schedule").append(rowContainer);


      var empStartPretty = moment().diff(moment.unix(empStart, "X"), "months");
      console.log("monhths: " + empMonths);

      var months = moment().diff(moment.unix(empStart, "X"), "months");

      var empBilled = empMonths * empRate;

      database.ref().orderByChild("date-added").limitToLast(1).on("child_added", function() {
      
      })

      // function clear(element) {
  //   $(element).empty();
  // }

*/