/* =========================================
   RESULT.JS
   Chromosome Quiz
========================================= */

/* =========================================
   โหลดข้อมูลจาก LocalStorage
========================================= */

var playerName =
    localStorage.getItem("playerName") || "ไม่ระบุชื่อ";

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

try{

    answersLog =
        JSON.parse(
            localStorage.getItem("answersLog")
        ) || [];

}
catch(error){

    console.log(
        "answersLog error:",
        error
    );

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
        escapeHTML(
            playerName
        );

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
        score +
        " / 20";

}


/* =========================================
   แสดงเวลา
========================================= */

var resultTime =
    document.getElementById(
        "resultTime"
    );

if(resultTime){

    var minutes =
        Math.floor(
            time / 60
        );

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

    resultTime.innerHTML =
        minutes +
        ":" +
        seconds;

}


/* =========================================
   ข้อความตามคะแนน
========================================= */

var message =
    "";

if(score >= 19){

    message =
        "🏆 มนุษย์ Google ชัด ๆ";

}
else if(score >= 16){

    message =
        "🥇 เซียนความรู้รอบตัว";

}
else if(score >= 10){

    message =
        "🥈 เก่งใช้ได้เลย";

}
else{

    message =
        "🥉 ยังต้องฝึกอีกนิด";

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
   บันทึกคะแนน Firebase
========================================= */

if(
    localStorage.getItem(
        "savedScore"
    ) !== "true"
){

    console.log(
        "Saving score..."
    );

    db.collection(
        "players"
    )
    .add({

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
            "Saved:",
            docRef.id
        );

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
            "❌ ไม่สามารถบันทึกคะแนนได้"
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
