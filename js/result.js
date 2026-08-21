var playerName =
    localStorage.getItem("playerName");

var score =
    parseInt(localStorage.getItem("score")) || 0;

var time =
    parseInt(localStorage.getItem("time")) || 0;


document.getElementById("resultName").innerHTML =
    "ผู้เล่น : " + playerName;

document.getElementById("score").innerHTML =
    score;


var min =
    Math.floor(time / 60);

var sec =
    time % 60;

if(min < 10){
    min = "0" + min;
}

if(sec < 10){
    sec = "0" + sec;
}

document.getElementById("resultTime").innerHTML =
    min + ":" + sec;


/* บันทึกคะแนน */

function saveScore(){

    db.collection("players")

    .add({

        name: playerName,

        score: score,

        time: time,

        createdAt:
            firebase.firestore.FieldValue.serverTimestamp()

    })

    .then(function(){

        alert("บันทึกคะแนนแล้ว");

    })

    .catch(function(error){

        console.log(error);

        alert("เกิดข้อผิดพลาด");

    });

}
