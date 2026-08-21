var playerName =
    localStorage.getItem("playerName");

var score =
    parseInt(
        localStorage.getItem("score")
    ) || 0;

var time =
    parseInt(
        localStorage.getItem("time")
    ) || 0;


/* ตรวจสอบข้อมูล */

if(!playerName){

    window.location.href =
        "index.html";

}


/* แสดงชื่อ */

document.getElementById(
    "resultName"
).innerHTML =

    "👤 " + playerName;


/* แสดงคะแนน */

document.getElementById(
    "score"
).innerHTML = score;


/* แสดงเวลา */

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


document.getElementById(
    "resultTime"
).innerHTML =

    min + ":" + sec;


/* ข้อความสรุป */

var message = "";


if(score >= 18){

    message =
        "🏆 ยอดเยี่ยมมาก";

}
else if(score >= 15){

    message =
        "🎉 ดีมาก";

}
else if(score >= 10){

    message =
        "👍 ผ่านเกณฑ์";

}
else{

    message =
        "📚 ลองทบทวนอีกครั้ง";

}


document.getElementById(
    "message"
).innerHTML =
    message;


/* =====================
   บันทึก Firebase อัตโนมัติ
===================== */


/*
ป้องกันกด F5 แล้วบันทึกซ้ำ
*/

if(
    localStorage.getItem(
        "savedScore"
    ) != "true"
){

    db.collection("players")

    .add({

        name: playerName,

        score: score,

        time: time,

        createdAt:
        firebase.firestore
        .FieldValue
        .serverTimestamp()

    })

    .then(function(){

        console.log(
            "บันทึกคะแนนแล้ว"
        );

        localStorage.setItem(
            "savedScore",
            "true"
        );

    })

    .catch(function(error){

        console.log(error);

    });

}
