/* =========================
   LEADERBOARD
========================= */


var players = [];


/* =========================
   โหลดคะแนนจาก Firebase
========================= */

db.collection("players")

.orderBy("score", "desc")

.limit(50)

.onSnapshot(function(snapshot){

    players = [];


    snapshot.forEach(function(doc){

        var data = doc.data();

        /*
        เก็บ ID ของ Firebase
        เอาไว้ใช้เปิดรายละเอียด
        */

        data.id = doc.id;

        players.push(data);

    });


    /* =========================
       เรียงคะแนน + เวลา
    ========================= */

    players.sort(function(a,b){

        if(b.score != a.score){

            return b.score - a.score;

        }


        return a.time - b.time;

    });


    showRanking();


    document.getElementById(
        "online"
    ).innerHTML =
        "🟢 เชื่อมต่อ Firebase แล้ว";


}, function(error){

    console.log(
        "Firebase Error:",
        error
    );


    document.getElementById(
        "online"
    ).innerHTML =
        "🔴 ไม่สามารถโหลดคะแนนได้";

});


/* =========================
   แสดง Ranking
========================= */

function showRanking(){

    var html = "";


    for(
        var i = 0;
        i < players.length;
        i++
    ){

        var player =
            players[i];


        var rank =
            i + 1;


        var medal = rank;


        if(rank == 1){

            medal = "🥇";

        }

        else if(rank == 2){

            medal = "🥈";

        }

        else if(rank == 3){

            medal = "🥉";

        }


        /* เวลา */

        var time =
            parseInt(player.time) || 0;


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


        /*
        ใช้ชื่อเป็นปุ่ม
        กดแล้วดูรายละเอียด
        */

        html +=

        "<tr>" +

        "<td>" +
        medal +
        "</td>" +


        "<td>" +

        '<button ' +

        'class="player-name-button" ' +

        'onclick="showPlayerDetail(' +
        i +
        ')">' +

        escapeHTML(player.name) +

        "</button>" +

        "</td>" +


        "<td>" +

        "<strong>" +

        player.score +

        "</strong>" +

        "</td>" +


        "<td>" +

        min +
        ":" +
        sec +

        "</td>" +

        "</tr>";

    }


    document.getElementById(
        "ranking"
    ).innerHTML = html;

}


/* =========================
   แสดงรายละเอียดผู้เล่น
========================= */

function showPlayerDetail(index){

    var player =
        players[index];


    if(!player){

        return;

    }


    /*
    แสดงกล่องรายละเอียด
    */

    var detail =
        document.getElementById(
            "playerDetail"
        );


    detail.style.display =
        "block";


    /*
    ชื่อ
    */

    document.getElementById(
        "detailName"
    ).innerHTML =

        "👤 " +
        escapeHTML(player.name);


    /*
    คะแนน
    */

    document.getElementById(
        "detailScore"
    ).innerHTML =

        "🏆 คะแนน: <strong>" +

        player.score +

        " / 20</strong>";


    /*
    answersLog
    */

    var logs =
        player.answersLog;


    var html = "";


    /*
    ถ้าไม่มี answersLog
    */

    if(
        !logs ||
        !Array.isArray(logs) ||
        logs.length == 0
    ){

        html =

        '<div class="answer-detail-box">' +

        "<p>" +

        "❌ ไม่พบข้อมูลคำตอบของผู้เล่นคนนี้" +

        "</p>" +

        "<p>" +

        "อาจเป็นคะแนนที่บันทึกก่อนเพิ่มระบบเก็บคำตอบ" +

        "</p>" +

        "</div>";

        document.getElementById(
            "answersDetail"
        ).innerHTML = html;


        return;

    }


    /*
    วนทุกข้อ
    */

    for(
        var i = 0;
        i < logs.length;
        i++
    ){

        var item =
            logs[i];


        var status = "";


        if(item.isCorrect){

            status =
                "correct";

        }

        else{

            status =
                "wrong";

        }


        var statusText = "";


        if(item.isCorrect){

            statusText =
                "✅ ตอบถูก";

        }

        else{

            statusText =
                "❌ ตอบผิด";

        }


        html +=

        '<div class="answer-detail-box ' +
        status +
        '">' +


        "<h3>" +

        "ข้อ " +

        item.questionNumber +

        " " +

        statusText +

        "</h3>" +


        "<p>" +

        "<strong>คำถาม:</strong><br>" +

        escapeHTML(item.question) +

        "</p>" +


        "<p>" +

        "<strong>คำตอบที่เลือก:</strong><br>" +

        escapeHTML(item.selectedAnswer) +

        "</p>";


        /*
        ถ้าตอบผิด
        แสดงคำตอบที่ถูก
        */

        if(!item.isCorrect){

            html +=

            "<p>" +

            "<strong>✅ คำตอบที่ถูก:</strong><br>" +

            escapeHTML(item.correctAnswer) +

            "</p>";

        }


        html +=

        "</div>";

    }


    document.getElementById(
        "answersDetail"
    ).innerHTML = html;


    /*
    เลื่อนหน้าจอลงมาที่รายละเอียด
    เหมาะกับมือถือ
    */

    setTimeout(function(){

        detail.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    },100);

}


/* =========================
   ป้องกัน HTML แปลก ๆ
========================= */

function escapeHTML(text){

    if(text === undefined ||
       text === null){

        return "";

    }


    return String(text)

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");

}
