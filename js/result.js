/* =========================================
   RESULT - CHROMOSOME QUIZ
   หน้าสรุปผลคะแนน
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
        localStorage.getItem("score")
    ) || 0;

var time =
    parseInt(
        localStorage.getItem("time")
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
   แสดงชื่อผู้เล่น
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

var min =
    Math.floor(
        time / 60
    );

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


var resultTime =
    document.getElementById(
        "resultTime"
    );

if(resultTime){

    resultTime.innerHTML =
        min + ":" + sec;

}


/* =========================================
   ข้อความสรุปคะแนน
   สำหรับ 10 ข้อ
========================================= */

var message = "";


if(score === 10){

    message =
        "🏆 เต็ม 10! ยอดเยี่ยมมาก!";

}

else if(score >= 8){

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

}
else{

    saveResult();

}


/* =========================================
   บันทึกผลคะแนน
========================================= */

function saveResult(){

    /*
       ใช้ savedScore ป้องกัน
       การบันทึกคะแนนซ้ำเมื่อกด F5
    */

    var savedScore =
        localStorage.getItem(
            "savedScore"
        );


    if(savedScore === "true"){

        console.log(
            "คะแนนนี้ถูกบันทึกไว้แล้ว"
        );

        /*
           ถึงบันทึก players ไปแล้ว
           ให้ลองอัปเดต participant
           เผื่อสถานะยังไม่เป็น finished
        */

        updateParticipant();

        return;

    }


    console.log(
        "กำลังบันทึกคะแนน..."
    );

    console.log(
        "ชื่อ:",
        playerName
    );

    console.log(
        "คะแนน:",
        score
    );

    console.log(
        "เวลา:",
        time
    );

    console.log(
        "Participant ID:",
        participantId
    );


    /*
       ข้อมูลที่จะบันทึกใน players
    */

    var playerData = {

        name:
            playerName,

        score:
            score,

        time:
            time,

        answersLog:
            answersLog,

        createdAt:
            firebase.firestore
            .FieldValue
            .serverTimestamp()

    };


    /*
       บันทึกลง collection players
    */

    db.collection("players")
        .add(playerData)

        .then(function(docRef){

            console.log(
                "✅ บันทึกคะแนนสำเร็จ"
            );

            console.log(
                "Player ID:",
                docRef.id
            );


            /*
               จำไว้ว่าบันทึกแล้ว
            */

            localStorage.setItem(
                "savedScore",
                "true"
            );


            /*
               อัปเดตสถานะใน participants
            */

            updateParticipant();

        })

        .catch(function(error){

            console.error(
                "❌ Firebase Error:",
                error
            );


            /*
               ไม่ตั้ง savedScore
               เพื่อให้ลองบันทึกใหม่ได้
            */

            alert(
                "❌ ไม่สามารถบันทึกคะแนนได้\n\n" +
                error.message
            );

        });

}


/* =========================================
   อัปเดต participants
   เป็น finished
========================================= */

function updateParticipant(){

    /*
       ถ้าไม่มี participantId
       ก็ไม่สามารถอัปเดตได้
    */

    if(!participantId){

        console.log(
            "ไม่มี participantId " +
            "จึงไม่สามารถอัปเดต participants"
        );

        return;

    }


    console.log(
        "กำลังอัปเดตสถานะผู้เล่น..."
    );


    db.collection("participants")
        .doc(participantId)
        .set({

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

        }, {

            merge: true

        })

        .then(function(){

            console.log(
                "✅ อัปเดต participants เป็น finished สำเร็จ"
            );

        })

        .catch(function(error){

            console.error(
                "❌ ไม่สามารถอัปเดต participants:",
                error
            );

        });

}


/* =========================================
   ป้องกัน HTML Injection
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
