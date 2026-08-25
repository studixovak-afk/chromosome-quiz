
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


try{

    answersLog =
        JSON.parse(
            localStorage.getItem("answersLog")
        ) || [];

}
catch(error){

    console.log(
        "ไม่สามารถอ่าน answersLog ได้",
        error
    );

    answersLog = [];

}


/* =========================
   ตรวจสอบข้อมูลผู้เล่น
========================= */

if(!playerName){

    window.location.href =
        "index.html";

}


/* =========================
   แสดงชื่อ
========================= */

document.getElementById(
    "resultName"
).innerHTML =

    "👤 " + escapeHTML(playerName);


/* =========================
   แสดงคะแนน
========================= */

document.getElementById(
    "score"
).innerHTML = score;


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


document.getElementById(
    "resultTime"
).innerHTML =

    min + ":" + sec;


/* =========================
   ข้อความสรุปคะแนน
========================= */

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


/* =========================
   บันทึก Firebase
========================= */


/*
ป้องกันการบันทึกซ้ำ
กรณีกด F5 หรือกลับเข้าหน้านี้
*/

if(
    localStorage.getItem(
        "savedScore"
    ) != "true"
){


    console.log(
        "กำลังบันทึกคะแนน..."
    );


    console.log(
        "answersLog:",
        answersLog
    );


    db.collection("players").add({

    name: playerName,

    score: score,

    time: time,

    answersLog: JSON.parse(
        localStorage.getItem("answersLog")
    ) || [],

    createdAt:
        firebase.firestore.FieldValue.serverTimestamp()

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
        บันทึกสถานะว่า
        คะแนนถูกบันทึกแล้ว
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


        alert(
            "ไม่สามารถบันทึกคะแนนได้ กรุณาตรวจสอบอินเทอร์เน็ต"
        );

    });

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
```
