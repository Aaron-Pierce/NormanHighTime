/**
 * Created by Aaron on 7/11/2016.
 */
var freshmanStartTime = ["0735", "0835", "0900","1008", "1104", "1159", "1302", "1406", "1510"];
var freshmanEndTime = ["0840", "0855", "1000", "1104", "1159", "1254", "1358", "1502", "1605"];
var upperStartTime = ["0735", "0835", "0900","1008", "1112", "1207", "1302", "1406", "1510"];
var upperEndTime = ["0840", "0855", "1000", "1104", "1207", "1302", "1358", "1502", "1605"];

var freshmanStartTimeWed = ["0735", "0835", "0900", "0956", "1029", "1114", "1204", "1303", "1356", "1428", "1521"];
var freshmanEndTimeWed = ["0840", "0855", "0948", "1021", "1114", "1204", "1255", "1348", "1420", "1513", "1605"];
var upperStartTimeWed = ["0735", "0835", "0900", "1001", "1059", "1149", "1244", "1331", "1419", "1516"];
var upperEndTimeWed = ["0840", "0855", "0948", "1021", "1114", "1213", "1303", "1348", "1420", "1513", "1605"];

var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
var d = new Date();
var dotw = days[d.getDay()];
if(dotw === "wednesday"){
    freshmanStartTime = freshmanStartTimeWed;
    freshmanEndTime = freshmanEndTimeWed;
    upperStartTime = upperStartTimeWed;
    upperEndTime =  upperEndTimeWed;
}

var currentHours = d.getHours();
var currentMinutes = d.getMinutes();
var currentTime = currentHours + "" + currentMinutes;
console.log("initialised timejs");


function reinitTime() {
    d = new Date();
    currentHours = d.getHours();
    currentMinutes = d.getMinutes();
    if(currentMinutes < 10){
        currentMinutes = "0" + currentMinutes
    }
    if(currentHours < 10){
        currentHours = "0" + currentHours
    }

    currentTime = currentHours + "" + currentMinutes;
}


var timeLeft;
var hour;
var inval;
var loadedGrade = localStorage.getItem("grade");
var parser = document.createElement('a');
parser.href = window.location.href;
alert(loadedGrade);
if(loadedGrade === null){
    if(parser.hash + "" === "freshman"){
        localStorage.setItem("grade", parser.hash.replace("#", ""));
    }else if(parser.hash + "" !== undefined){
        localStorage.setItem("grade", parser.hash.replace("#", ""));
    }
}

function main() {
    var grade = localStorage.getItem("grade");
    console.log("Grade " + grade + " Was Found");
    if (grade === "freshman") {
        console.log("Converting to freshman mode");

        for (var x = 0; x < freshmanStartTime.length; x++) {

            if (freshmanStartTime[x] <= currentTime && currentTime <= freshmanEndTime[x]) {
                console.log("valid time found");
                var startTime = freshmanStartTime[x].toString();
                var endTime = freshmanEndTime[x].toString();
                timeLeft = freshmanEndTime[x] - currentTime;
                if (currentHours + "".substring(0, 2) !== endTime.toString().substring(0, 2)) {
                    timeLeft = timeLeft - 40;
                }

                console.log(timeLeft);
                $(document).ready(function () {
                    $(".minutesLeft").html(timeLeft);
                });

                inval = 0;

                break;

            }
            else if (currentTime >= freshmanEndTime [x] && freshmanStartTime[x + 1] >= currentTime) {
                if (currentHours + "".substring(0, 2) !== endTime.toString().substring(0, 2)) {
                    timeLeft = timeLeft - 40;
                }else{
                    timeLeft = freshmanStartTime[x + 1] - currentTime;
                }

                $(".time").html("There are " + timeLeft + " Minutes Left Until Next Period");


            }
            else {
                console.log("Checked time, was invalid.");
                inval++;
                if (inval === freshmanStartTime.length) {
                    console.log("School Is Over");
                    $(".time").html("School Is Over");
                }
            }
        }
    } else {
        console.log("Converting to upperclassman mode");
        for (var x = 0; x < upperStartTime.length; x++) {

            if (upperStartTime[x] <= currentTime && currentTime <= upperEndTime[x]) {
                console.log("valid time found");
                var startTime = upperStartTime[x].toString();
                var endTime = upperEndTime[x].toString();
                timeLeft = upperEndTime[x] - currentTime;
                if (currentHours + "".substring(0, 2) !== endTime.toString().substring(0, 2)) {
                    timeLeft = timeLeft - 40;
                }

                console.log(timeLeft);
                $(document).ready(function () {
                    $(".minutesLeft").html(timeLeft);
                });

                inval = 0;

                break;

            }
            else if (currentTime >= upperEndTime [x] && upperStartTime[x + 1] >= currentTime) {
                var startTime = upperStartTime[x].toString();
                var endTime = upperEndTime[x].toString();
                if (currentHours + "".substring(0, 2) !== endTime.toString().substring(0, 2)) {
                    timeLeft = timeLeft - 40;
                }else{
                    timeLeft = freshmanStartTime[x + 1] - currentTime;
                }
                $(".time").html("There are " + timeLeft + " Minutes Left Until Next Period");


            }
            else {
                console.log("Checked time, was invalid.");
                inval++;
                if (inval === upperStartTime.length) {
                    console.log("School Is Over");
                    $(".time").html("School Is Over");
                }
            }

        }
    }
}



setInterval(function () {
reinitTime();
    main();
}, 1000);