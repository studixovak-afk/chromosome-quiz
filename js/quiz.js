var questions = [

{
question:"มนุษย์ปกติมีโครโมโซมทั้งหมดกี่แท่ง?",
answers:["23 แท่ง","44 แท่ง","46 แท่ง","48 แท่ง"],
correct:2
},

{
question:"มนุษย์มีโครโมโซมกี่คู่?",
answers:["22 คู่","23 คู่","24 คู่","46 คู่"],
correct:1
},

{
question:"โครโมโซมเพศของเพศหญิงโดยทั่วไปคืออะไร?",
answers:["XY","XX","YY","XO"],
correct:1
},

{
question:"โครโมโซมเพศของเพศชายโดยทั่วไปคืออะไร?",
answers:["XX","XY","YY","XO"],
correct:1
},

{
question:"สารพันธุกรรมหลักที่อยู่บนโครโมโซมคืออะไร?",
answers:["DNA","RNA","โปรตีน","ไขมัน"],
correct:0
},

{
question:"โครโมโซมอยู่บริเวณใดของเซลล์?",
answers:["เยื่อหุ้มเซลล์","ไซโทพลาซึม","นิวเคลียส","ไมโทคอนเดรียเท่านั้น"],
correct:2
},

{
question:"Down syndrome เกี่ยวข้องกับโครโมโซมคู่ใด?",
answers:["คู่ที่ 13","คู่ที่ 18","คู่ที่ 21","คู่ที่ 23"],
correct:2
},

{
question:"Edwards syndrome เกี่ยวข้องกับความผิดปกติของโครโมโซมคู่ใด?",
answers:["คู่ที่ 13","คู่ที่ 18","คู่ที่ 21","คู่ที่ 23"],
correct:1
},

{
question:"Patau syndrome เกี่ยวข้องกับโครโมโซมคู่ใด?",
answers:["คู่ที่ 13","คู่ที่ 18","คู่ที่ 21","คู่ที่ 22"],
correct:0
},

{
question:"เซลล์สืบพันธุ์ของมนุษย์มีโครโมโซมกี่แท่ง?",
answers:["23","46","44","92"],
correct:0
}

];

var currentQuestion = 0;
var score = 0;
var seconds = 0;
var timer;

var playerName =
localStorage.getItem("playerName");

if(!playerName){

window.location.href =
"index.html";

}

var nameElement =
document.getElementById("playerName");

if(nameElement){

nameElement.innerHTML =
playerName;

}

/* TIMER */

function startTimer(){

timer = setInterval(function(){

seconds++;

var min =
Math.floor(seconds / 60);

var sec =
seconds % 60;

if(min < 10){

min = "0" + min;

}

if(sec < 10){

sec = "0" + sec;

}

var timeElement =
document.getElementById("time");

if(timeElement){

timeElement.innerHTML =
min + ":" + sec;

}

},1000);

}

/* SHOW QUESTION */

function showQuestion(){

var q =
questions[currentQuestion];

document.getElementById(
"questionNumber"
).innerHTML =

"ข้อ " +
(currentQuestion + 1) +
" / " +
questions.length;

document.getElementById(
"question"
).innerHTML =
q.question;

var html = "";

for(
var i=0;
i<q.answers.length;
i++
){

html +=

'<button class="answer" onclick="checkAnswer('
+
i
+
')">'
+
q.answers[i]
+
'</button>';

}

document.getElementById(
"answers"
).innerHTML =
html;

var progress =

((currentQuestion + 1) /
questions.length) * 100;

document.getElementById(
"progressBar"
).style.width =
progress + "%";

}

/* CHECK ANSWER */

function checkAnswer(answer){

var q =
questions[currentQuestion];

var buttons =
document.getElementsByClassName(
"answer"
);

for(
var i=0;
i<buttons.length;
i++
){

buttons[i].disabled =
true;

}

if(answer == q.correct){

score++;

buttons[answer].className =
"answer correct";

}

else{

buttons[answer].className =
"answer wrong";

buttons[q.correct].className =
"answer correct";

}

setTimeout(function(){

currentQuestion++;

if(
currentQuestion >=
questions.length
){

finishGame();

}

else{

showQuestion();

}

},700);

}

/* FINISH GAME */

function finishGame(){

clearInterval(timer);

localStorage.setItem(
"score",
score
);

localStorage.setItem(
"time",
seconds
);

/* เปลี่ยนสถานะเป็น finished */

if(typeof db !== "undefined"){

db.collection("participants")
.where(
"name",
"==",
playerName
)
.get()
.then(function(snapshot){

snapshot.forEach(function(doc){

doc.ref.update({

status:"finished"

});

});

window.location.href =
"result.html";

})
.catch(function(){

window.location.href =
"result.html";

});

}
else{

window.location.href =
"result.html";

}

}

startTimer();
showQuestion();
