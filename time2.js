/**
 * Created by Aaron on 8/13/2016.
 */
var freshmanStartTime = ["0735", "0835", "0900","1008", "1104", "1159", "1302", "1406", "1510"];
var freshmanEndTime = ["0840", "0855", "1000", "1104", "1159", "1254", "1358", "1502", "1605"];
var freshmanStartTimeWed = ["0735", "0835", "0900", "0956", "1029", "1114", "1204", "1303", "1356", "1428", "1521"];
var freshmanEndTimeWed = ["0840", "0855", "0948", "1021", "1114", "1204", "1255", "1348", "1420", "1513", "1605"];


var upperStartTime = ["0735", "0835", "0900","1008", "1112", "1207", "1302", "1406", "1510"];
var upperEndTime = ["0840", "0855", "1000", "1104", "1207", "1302", "1358", "1502", "1605"];
var upperStartTimeWed = ["0735", "0835", "0900", "1001", "1059", "1149", "1244", "1331", "1419", "1516"];
var upperEndTimeWed = ["0840", "0855", "0948", "1021", "1114", "1213", "1303", "1348", "1420", "1513", "1605"];
var load = 0;
var startTime;
var endTime;
var startTimeWed;
var endTimeWed;

var currentHours;
var currentMinutes;
var currentTime;
initGrade();
if(wednesday()){
    freshmanStartTime = freshmanStartTimeWed;
    freshmanEndTime = freshmanEndTimeWed;
    upperStartTime = upperStartTimeWed;
    upperEndTime =  upperEndTimeWed;
}

var loadedGrade = localStorage.getItem("grade");
var parser = document.createElement('a');
parser.href = window.location.href;

if(loadedGrade === null){
    if(parser.hash + "" === "freshman"){
        localStorage.setItem("grade", parser.hash.replace("#", ""));
    }else if(parser.hash + "" !== undefined){
        localStorage.setItem("grade", parser.hash.replace("#", ""));
    }
}
var endtime1;
var startTimeNext;
function main() {
    for(var x = 0; x < startTime.length; x++){
        endtime1 = endTime[x];
        startTimeNext = startTime[x+1];
        if(parseInt(currentTime) > startTime[x] && parseInt(currentTime) < endTime[x]){
            var timeleft = (parseInt(endTime[x]) - parseInt(currentTime));
            // console.log(currentHours[x] !== endTime[x].substring(0,2) + ", the hour ends during the same hour as the current one");
            if(currentHours[x] !== endTime[x].substring(0,2)){
            timeleft -= 40;
        }
        console.log("It is currently " + currentTime + ", the hour ends at " + endTime[x] + ". The hour ends in " + timeleft +  " minutes");
        $(".minutesLeft").html(timeleft);
        // console.log(parseInt(endTime[x]) - parseInt(currentTime) + "");
    }else if(parseInt(currentTime) > endTime[x] && parseInt(currentTime) < startTime[x+1]){
            var timeleft = parseInt(startTime[x+1]) - parseInt(currentTime);
            if(currentHours[x] !== startTime[x+1].substring(0,2)){
                timeleft -= 40;
            }
            console.log("It is currently passing period, the next hour begins at " +startTime[x+1]+ " and that is in " + timeleft + " minutes");
            $(".time").html("There Are " + timeleft + " Minutes Left Until Next Hour");

        }else{
            console.log("No valid time found");
            if(currentTime > endTime[endTime.length-1]){
                $(".time").html("School is over")
            }
        }
    }
}



function initGrade() {
    var grade = localStorage.getItem("grade");
    console.log("Grade " + grade + " Was Found");
    if(grade === "freshman"){
        console.log("Converting to freshman mode");
        startTime = freshmanStartTime;
        endTime = freshmanEndTime;
        startTimeWed = freshmanStartTimeWed;
        endTimeWed = freshmanEndTimeWed;
    }else{
        console.log("Converting to upperclassman mode");
        startTime = upperStartTime;
        endTime = upperEndTime;
        startTimeWed = upperStartTimeWed;
        endTimeWed = upperEndTimeWed;
    }

}

function wednesday() {
    var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    var d = new Date();
    var dotw = days[d.getDay()];
    return dotw === "wednesday";
}

function getTime() {
    var d = new Date();
    currentHours = d.getHours().toString();
    if(currentHours.length === 1){
        currentHours = " " + currentHours;
    }
    currentMinutes = d.getMinutes().toString();
    if(currentMinutes.length === 1){
        currentMinutes = " " + currentHours;
    }
    currentTime = currentHours + "" + currentMinutes;
}
//TODO: uncomment this for prod
setInterval(function () {

    getTime();
    main();
}, 500);