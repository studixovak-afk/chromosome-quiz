/* =========================================
   RESULT - CHROMOSOME QUIZ
   แสดงผลคะแนน + บันทึก Firebase
========================================= */


/* =========================================
   ข้อมูลผู้เล่นจาก LocalStorage
========================================= */

var playerName =
    localStorage.getItem("playerName");

var participantId =
    localStorage.getItem("participantId");

var score =
    parseInt(
        localStorage.getItem("score"),
        10
    ) || 0;

var time =
    parseInt(
        localStorage.getItem("time"),
        10
    ) || 0;


/* =========================================
   โหลด answersLog
========================================= */

var answersLog = [];

try {

    answersLog =
        JSON.parse(
            localStorage.getItem("answersLog")
        ) || [];

}
catch(error) {

    console.error(
        "ไม่สามารถอ่าน answersLog ได้:",
        error
    );

    answersLog = [];

}


/* =========================================
   ตรวจสอบชื่อ
========================================= */

if(!playerName){

    window.location.href =
        "index.html";

}


/* =========================================
   แสดงชื่อ
========================================= */

var resultName =
    document.getElementById(
        "resultName"
    );

if(resultName){

    resultName.innerHTML =
        "👤 " +
        escapeHTML(playerName);

}


/* =========================================
   แสดงคะแนน
========================================= */

var scoreElement =
    document.getElementById(
        "score"
    );

if(scoreElement){

    scoreElement.innerHTML =
        score;

}


/* =========================================
   แสดงเวลา
========================================= */

var minutes =
    Math.floor(time / 60);

var seconds =
    time % 60;


if(minutes < 10){

    minutes =
        "0" + minutes;

}

if(seconds < 10){

    seconds =
        "0" + seconds;

}


var resultTime =
    document.getElementById(
        "resultTime"
    );

if(resultTime){

    resultTime.innerHTML =
        minutes +
        ":" +
        seconds;

}


/* =========================================
   ข้อความสรุปคะแนน
========================================= */

var message = "";


if(score >= 9){

    message =
        "🏆 ยอดเยี่ยมมาก!";

}
else if(score >= 7){

    message =
        "🎉 ดีมาก!";

}
else if(score >= 5){

    message =
        "👍 ผ่านเกณฑ์";

}
else{

    message =
        "📚 ลองทบทวนอีกครั้ง";

}


var messageElement =
    document.getElementById(
        "message"
    );

if(messageElement){

    messageElement.innerHTML =
        message;

}


/* =========================================
   ตรวจสอบ Firebase
========================================= */

if(typeof db === "undefined"){

    console.error(
        "ไม่พบ Firebase Database"
    );

    alert(
        "❌ ไม่สามารถเชื่อมต่อ Firebase ได้"
    );

}
else{


    /* =====================================
       1. อัปเดต participants
       
       สำคัญมาก:
       ใช้ participantId เดิม
       ไม่สร้างคนใหม่
    ===================================== */

    if(participantId){

        db.collection("participants")
        .doc(participantId)
        .update({

            name:
                playerName,

            status:
                "finished",

            score:
                score,

            time:
                time,

            finishedAt:
                firebase.firestore
                .FieldValue
                .serverTimestamp()

        })

        .then(function(){

            console.log(
                "อัปเดต participants สำเร็จ"
            );

        })

        .catch(function(error){

            console.error(
                "Participants Error:",
                error
            );

        });

    }


    /* =====================================
       2. บันทึกคะแนนลง players
       
       ป้องกันบันทึกซ้ำด้วย savedScore
    ===================================== */

    var savedScore =
        localStorage.getItem(
            "savedScore"
        );


    if(savedScore !== "true"){

        console.log(
            "กำลังบันทึกคะแนนลง players..."
        );


        db.collection("players")
        .add({

            name:
                playerName,

            score:
                score,

            time:
                time,

            answersLog:
                answersLog,

            participantId:
                participantId || null,

            createdAt:
                firebase.firestore
                .FieldValue
                .serverTimestamp()

        })

        .then(function(docRef){

            console.log(
                "บันทึกคะแนนสำเร็จ"
            );

            console.log(
                "Player ID:",
                docRef.id
            );


            /* =========================
               จำไว้ว่าบันทึกแล้ว
            ========================= */

            localStorage.setItem(
                "savedScore",
                "true"
            );

        })

        .catch(function(error){

            console.error(
                "Players Firebase Error:",
                error
            );


            alert(
                "❌ ไม่สามารถบันทึกคะแนนได้\n\n" +
                error.message
            );

        });

    }
    else{

        console.log(
            "คะแนนถูกบันทึกไว้แล้ว ไม่บันทึกซ้ำ"
        );

    }

}


/* =========================================
   ป้องกัน HTML
========================================= */

function escapeHTML(text){

    if(
        text === undefined ||
        text === null
    ){

        return "";

    }


    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
