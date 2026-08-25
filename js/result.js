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


/* =================================
   รับคำตอบของผู้เล่น
================================= */

var playerAnswers = [];

var savedAnswers =
    localStorage.getItem(
        "playerAnswers"
    );


if(savedAnswers){

    try{

        playerAnswers =
            JSON.parse(savedAnswers);

    }
    catch(error){

        console.log(
            "ไม่สามารถอ่านคำตอบได้",
            error
        );

        playerAnswers = [];

    }

}


/* =================================
   ตรวจสอบข้อมูลผู้เล่น
================================= */

if(!playerName){

    window.location.href =
        "index.html";

}


/* =================================
   แสดงชื่อ
================================= */

document.getElementById(
    "resultName"
).innerHTML =

    "👤 " + playerName;


/* =================================
   แสดงคะแนน
================================= */

document.getElementById(
    "score"
).innerHTML = score;


/* =================================
   แสดงเวลา
================================= */

var min =
    Math.floor(time / 60);

var sec =
    time % 60;


if(min < 10){

    min =
        "0" + min;

}


if(sec < 10){

    sec =
        "0" + sec;

}


document.getElementById(
    "resultTime"
).innerHTML =

    min + ":" + sec;


/* =================================
   ข้อความสรุป
================================= */

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


/* =================================
   บันทึก Firebase
================================= */


/*
   ป้องกันการบันทึกซ้ำ
*/

if(
    localStorage.getItem(
        "savedScore"
    ) != "true"
){


    /*
       สร้างข้อมูลผู้เล่น
    */

    var playerData = {

        name: playerName,

        score: score,

        time: time,

        answers: playerAnswers,

        finished: true,

        createdAt:
            firebase.firestore
            .FieldValue
            .serverTimestamp()

    };


    /*
       บันทึกลง Firebase
    */

    db.collection("players")

    .add(playerData)

    .then(function(docRef){

        console.log(
            "บันทึกคะแนนแล้ว:",
            docRef.id
        );


        /*
           จำ ID ของผู้เล่น
           เอาไว้ใช้เปิดหน้ารายละเอียด
        */

        localStorage.setItem(
            "playerId",
            docRef.id
        );


        /*
           ป้องกันบันทึกซ้ำ
        */

        localStorage.setItem(
            "savedScore",
            "true"
        );


    })

    .catch(function(error){

        console.log(
            "Firebase Error:",
            error
        );

    });

}
