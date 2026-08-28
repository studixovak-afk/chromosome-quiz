/* =========================
   ตัวแปร
========================= */

var allPlayers = [];


/* =========================
   โหลดผู้เล่น Real-time
========================= */

db.collection("players")

.onSnapshot(function(snapshot){

    allPlayers = [];


    snapshot.forEach(function(doc){

        var data =
            doc.data();


        allPlayers.push({

            id:
                doc.id,

            name:
                data.name || "ไม่ระบุชื่อ",

            score:
                Number(data.score) || 0,

            time:
                Number(data.time) || 0,

            answersLog:
                data.answersLog || []

        });

    });


    /* =========================
       เรียงคะแนน
    ========================= */

    allPlayers.sort(function(a,b){

        if(
            b.score !==
            a.score
        ){

            return b.score - a.score;

        }


        return a.time - b.time;

    });


    /* =========================
       แสดงสถานะ
    ========================= */

    var status =
        document.getElementById(
            "connectionStatus"
        );


    if(status){

        status.innerHTML =
            "🟢 เชื่อมต่อแล้ว • Real-time";

    }


    /* =========================
       แสดงสรุป
    ========================= */

    showSummary();


    /* =========================
       แสดงรายชื่อ
    ========================= */

    showPlayers();


    /* =========================
       วิเคราะห์ข้อสอบ
    ========================= */

    analyzeQuestions();

})


.catch(function(error){

    console.error(
        "Firebase Error:",
        error
    );


    var status =
        document.getElementById(
            "connectionStatus"
        );


    if(status){

        status.innerHTML =
            "🔴 ไม่สามารถเชื่อมต่อ Firebase";

    }

});


/* =========================
   สรุปข้อมูล
========================= */

function showSummary(){

    var total =
        allPlayers.length;


    var highest =
        0;


    var totalScore =
        0;


    for(
        var i = 0;
        i < allPlayers.length;
        i++
    ){

        var score =
            allPlayers[i].score;


        if(score > highest){

            highest =
                score;

        }


        totalScore +=
            score;

    }


    var average = 0;


    if(total > 0){

        average =
            totalScore / total;

    }


    var totalElement =
        document.getElementById(
            "totalPlayers"
        );


    var highestElement =
        document.getElementById(
            "highestScore"
        );


    var averageElement =
        document.getElementById(
            "averageScore"
        );


    if(totalElement){

        totalElement.innerHTML =
            total;

    }


    if(highestElement){

        highestElement.innerHTML =
            highest + "/10";

    }


    if(averageElement){

        averageElement.innerHTML =
            average.toFixed(1);

    }

}


/* =========================
   แสดงผู้เล่น
========================= */

function showPlayers(){

    var element =
        document.getElementById(
            "playerList"
        );


    if(!element){

        return;

    }


    if(allPlayers.length === 0){

        element.innerHTML =

            '<tr>' +

                '<td colspan="5">' +

                    'ยังไม่มีผู้เล่น' +

                '</td>' +

            '</tr>';

        return;

    }


    var html = "";


    for(
        var i = 0;
        i < allPlayers.length;
        i++
    ){

        var player =
            allPlayers[i];


        var rank =
            i + 1;


        var medal =
            rank;


        if(rank === 1){

            medal =
                "🥇";

        }

        else if(rank === 2){

            medal =
                "🥈";

        }

        else if(rank === 3){

            medal =
                "🥉";

        }


        var time =
            formatTime(
                player.time
            );


        html +=

            "<tr>" +

                "<td>" +
                    medal +
                "</td>" +

                "<td>" +
                    escapeHTML(
                        player.name
                    ) +
                "</td>" +

                "<td>" +

                    "<strong>" +

                        player.score +

                        "/10" +

                    "</strong>" +

                "</td>" +

                "<td>" +

                    time +

                "</td>" +

                "<td>" +

                    '<button ' +

                    'class="detail-button" ' +

                    'onclick="showPlayerDetails(\'' +

                    player.id +

                    '\')">' +

                    "ดูคำตอบ" +

                    "</button>" +

                "</td>" +

            "</tr>";

    }


    element.innerHTML =
        html;

}


/* =========================
   แสดงรายละเอียดผู้เล่น
========================= */

function showPlayerDetails(id){

    var player = null;


    for(
        var i = 0;
        i < allPlayers.length;
        i++
    ){

        if(
            allPlayers[i].id ===
            id
        ){

            player =
                allPlayers[i];

            break;

        }

    }


    if(!player){

        return;

    }


    var element =
        document.getElementById(
            "playerDetails"
        );


    if(!element){

        return;

    }


    var html = "";


    html +=

        '<div class="detail-card">';


    html +=

        '<div class="detail-header">' +

            '<div>' +

                '<h2>' +

                    "👤 " +

                    escapeHTML(
                        player.name
                    ) +

                '</h2>' +

                '<p>' +

                    "เวลา: " +

                    formatTime(
                        player.time
                    ) +

                '</p>' +

            '</div>' +

            '<div class="detail-score">' +

                player.score +

                "/10" +

            '</div>' +

        '</div>';


    html +=

        "<hr>";


    /* =========================
       ตรวจว่ามี answersLog
    ========================= */

    if(
        !player.answersLog ||
        player.answersLog.length === 0
    ){

        html +=

            "<p>" +

                "⚠️ ยังไม่มีข้อมูลคำตอบรายข้อ" +

            "</p>" +

            "</div>";


        element.innerHTML =
            html;


        element.scrollIntoView({
            behavior:"smooth"
        });


        return;

    }


    /* =========================
       แสดงแต่ละข้อ
    ========================= */

    for(
        var i = 0;
        i < player.answersLog.length;
        i++
    ){

        var answer =
            player.answersLog[i];


        var statusClass =
            answer.isCorrect
            ? "correct-answer"
            : "wrong-answer";


        var statusText =
            answer.isCorrect
            ? "✅ ถูก"
            : "❌ ผิด";


        var statusColor =
            answer.isCorrect
            ? "correct-text"
            : "wrong-text";


        html +=

            '<div class="answer-detail ' +

            statusClass +

            '">' +


                "<strong>" +

                    "ข้อ " +

                    answer.questionNumber +

                "</strong>" +


                "<p>" +

                    escapeHTML(
                        answer.question
                    ) +

                "</p>" +


                '<p class="answer-status ' +

                statusColor +

                '">' +

                    statusText +

                "</p>" +


                "<p>" +

                    "คำตอบที่เลือก: " +

                    "<strong>" +

                        escapeHTML(
                            answer.selectedAnswer
                        ) +

                    "</strong>" +

                "</p>";


        if(!answer.isCorrect){

            html +=

                "<p>" +

                    "คำตอบที่ถูก: " +

                    '<strong class="correct-text">' +

                        escapeHTML(
                            answer.correctAnswer
                        ) +

                    "</strong>" +

                "</p>";

        }


        html +=

            "</div>";

    }


    html +=

        "</div>";


    element.innerHTML =
        html;


    element.scrollIntoView({

        behavior:
            "smooth"

    });

}


/* =========================
   วิเคราะห์ข้อสอบ
========================= */

function analyzeQuestions(){

    var questionData = {};


    for(
        var i = 0;
        i < allPlayers.length;
        i++
    ){

        var player =
            allPlayers[i];


        var logs =
            player.answersLog;


        if(!logs){

            continue;

        }


        for(
            var j = 0;
            j < logs.length;
            j++
        ){

            var log =
                logs[j];


            var number =
                log.questionNumber;


            if(
                !questionData[number]
            ){

                questionData[number] = {

                    question:
                        log.question,

                    correct:
                        0,

                    wrong:
                        0

                };

            }


            if(log.isCorrect){

                questionData[number]
                .correct++;

            }

            else{

                questionData[number]
                .wrong++;

            }

        }

    }


    var numbers =
        Object.keys(
            questionData
        );


    numbers.sort(function(a,b){

        return Number(a) -
               Number(b);

    });


    var element =
        document.getElementById(
            "questionSummary"
        );


    if(!element){

        return;

    }


    if(numbers.length === 0){

        element.innerHTML =

            "<p>" +

                "ยังไม่มีข้อมูลคำตอบ" +

            "</p>";

        return;

    }


    var html = "";


    for(
        var i = 0;
        i < numbers.length;
        i++
    ){

        var number =
            numbers[i];


        var data =
            questionData[number];


        html +=

            '<div class="question-item">' +

                "<strong>" +

                    "ข้อ " +

                    number +

                "</strong>" +

                "<p>" +

                    escapeHTML(
                        data.question
                    ) +

                "</p>" +

                '<span class="correct-count">' +

                    "✅ ตอบถูก " +

                    data.correct +

                    " คน" +

                "</span>" +

                " &nbsp; " +

                '<span class="wrong-count">' +

                    "❌ ตอบผิด " +

                    data.wrong +

                    " คน" +

                "</span>" +

            "</div>";

    }


    element.innerHTML =
        html;

}


/* =========================
   แปลงเวลา
========================= */

function formatTime(seconds){

    seconds =
        Number(seconds) || 0;


    var min =
        Math.floor(
            seconds / 60
        );


    var sec =
        seconds % 60;


    if(min < 10){

        min =
            "0" + min;

    }


    if(sec < 10){

        sec =
            "0" + sec;

    }


    return min + ":" + sec;

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
