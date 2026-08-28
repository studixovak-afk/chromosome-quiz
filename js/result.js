/* =========================
   ข้อมูลผู้เล่น
========================= */

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


/* =========================
   โหลด answersLog
========================= */

var answersLog = [];


try {

    answersLog =
        JSON.parse(
            localStorage.getItem("answersLog")
        ) || [];

}
catch(error) {

    console.log(
        "ไม่สามารถอ่าน answersLog ได้",
        error
    );

    answersLog = [];

}


/* =========================
   ตรวจสอบชื่อผู้เล่น
========================= */

if(!playerName){

    window.location.href =
        "index.html";

}


/* =========================
   แสดงชื่อ
========================= */

var resultName =
    document.getElementById(
        "resultName"
    );


if(resultName){

    resultName.innerHTML =
        "👤 " +
        escapeHTML(playerName);

}


/* =========================
   แสดงคะแนน
========================= */

var scoreElement =
    document.getElementById(
        "score"
    );


if(scoreElement){

    scoreElement.innerHTML =
        score;

}


/* =========================
   แสดงเวลา
========================= */

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


var resultTime =
    document.getElementById(
        "resultTime"
    );


if(resultTime){

    resultTime.innerHTML =
        min + ":" + sec;

}


/* =========================
   ข้อความสรุปคะแนน
   สำหรับ 10 ข้อ
========================= */

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


/* =========================
   บันทึกคะแนน Firebase
========================= */


/*
   ป้องกันการบันทึกซ้ำ
   ถ้ารีเฟรชหน้า Result
*/

if(
    localStorage.getItem(
        "savedScore"
    ) !== "true"
){


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
        "answersLog:",
        answersLog
    );


    /*
       ตรวจสอบ Firebase
    */

    if(
        typeof db === "undefined"
    ){

        console.error(
            "ไม่พบ Firebase Database"
        );

        alert(
            "ไม่สามารถเชื่อมต่อ Firebase ได้"
        );

    }

    else{


        db.collection(
            "players"
        ).add({

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

        })


        .then(function(docRef){

            console.log(
                "บันทึกคะแนนสำเร็จ"
            );


            console.log(
                "Player ID:",
                docRef.id
            );


            /*
               จำไว้ว่าบันทึกแล้ว
               ป้องกันการบันทึกซ้ำ
            */

            localStorage.setItem(
                "savedScore",
                "true"
            );

        })


        .catch(function(error){

            console.error(
                "Firebase Error:",
                error
            );


            alert(
                "ไม่สามารถบันทึกคะแนนได้ กรุณาตรวจสอบอินเทอร์เน็ต"
            );

        });

    }

}


/* =========================
   ป้องกัน HTML
========================= */

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
