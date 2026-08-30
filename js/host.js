/* =========================================
   HOST - CHROMOSOME QUIZ
   ระบบเจ้าของห้อง + รายชื่อผู้เล่น Real-time
========================================= */


/* =========================================
   Firebase Game Setting
========================================= */

var gameRef =
    db.collection("settings")
      .doc("game");


/* =========================================
   ELEMENTS
========================================= */

var statusElement =
    document.getElementById("status");

var startButton =
    document.getElementById("startBtn");

var stopButton =
    document.getElementById("stopBtn");

var participantsElement =
    document.getElementById("participants");

var playerCountElement =
    document.getElementById("playerCount");

var connectionElement =
    document.getElementById("connectionStatus");


/* =========================================
   ตรวจสอบสถานะการแข่งขัน Real-time
========================================= */

gameRef.onSnapshot(

    function(doc){

        if(!doc.exists){

            statusElement.innerHTML =
                "⚠️ ยังไม่มีข้อมูลเกม";

            return;

        }


        var data =
            doc.data();


        if(data.started === true){

            statusElement.innerHTML =
                "🟢 การแข่งขันกำลังดำเนินอยู่";


            startButton.disabled =
                true;


            stopButton.disabled =
                false;

        }

        else{

            statusElement.innerHTML =
                "🔴 ยังไม่เริ่มการแข่งขัน";


            startButton.disabled =
                false;


            stopButton.disabled =
                true;

        }

    },

    function(error){

        console.log(
            "Firebase Game Error:",
            error
        );


        statusElement.innerHTML =
            "❌ ไม่สามารถเชื่อมต่อ Firebase";

    }

);


/* =========================================
   เริ่มการแข่งขัน
========================================= */

function startGame(){

    gameRef.set({

        started: true

    },{

        merge: true

    })

    .then(function(){

        statusElement.innerHTML =
            "🟢 การแข่งขันกำลังดำเนินอยู่";


        alert(
            "🚀 เริ่มการแข่งขันแล้ว!"
        );

    })

    .catch(function(error){

        console.log(
            "Firebase Error:",
            error
        );


        alert(
            "❌ ไม่สามารถเริ่มการแข่งขันได้\n\n" +
            error.message
        );

    });

}


/* =========================================
   หยุดการแข่งขัน
========================================= */

function stopGame(){

    gameRef.set({

        started: false

    },{

        merge: true

    })

    .then(function(){

        statusElement.innerHTML =
            "🔴 หยุดการแข่งขันแล้ว";


        alert(
            "🛑 หยุดการแข่งขันแล้ว"
        );

    })

    .catch(function(error){

        console.log(
            "Firebase Error:",
            error
        );


        alert(
            "❌ ไม่สามารถหยุดการแข่งขันได้\n\n" +
            error.message
        );

    });

}


/* =========================================
   แสดงรายชื่อผู้เล่น Real-time
========================================= */

db.collection("participants")

    .orderBy("joinedAt", "asc")

    .onSnapshot(

        function(snapshot){

            var players = [];


            snapshot.forEach(function(doc){

                var data =
                    doc.data();


                players.push({

                    id: doc.id,

                    name:
                        data.name || "ไม่ระบุชื่อ",

                    status:
                        data.status || "waiting",

                    score:
                        data.score,

                    time:
                        data.time

                });

            });


            /* =============================
               จำนวนผู้เล่น
            ============================= */

            playerCountElement.innerHTML =
                "👥 ผู้เล่นทั้งหมด: " +
                players.length +
                " คน";


            connectionElement.innerHTML =
                "🟢 เชื่อมต่อ Real-time แล้ว";


            /* =============================
               ถ้าไม่มีผู้เล่น
            ============================= */

            if(players.length === 0){

                participantsElement.innerHTML =

                    '<tr>' +

                    '<td colspan="5">' +

                    'ยังไม่มีผู้เล่นเข้าห้อง' +

                    '</td>' +

                    '</tr>';

                return;

            }


            /* =============================
               สร้างตาราง
            ============================= */

            var html = "";


            for(
                var i = 0;
                i < players.length;
                i++
            ){

                var player =
                    players[i];


                /* =========================
                   สถานะผู้เล่น
                ========================= */

                var statusText =
                    getStatusText(
                        player.status
                    );


                /* =========================
                   คะแนน
                ========================= */

                var scoreText =
                    "-";


                if(
                    player.score !== undefined &&
                    player.score !== null
                ){

                    scoreText =
                        player.score + " / 10";

                }


                /* =========================
                   เวลา
                ========================= */

                var timeText =
                    "-";


                if(
                    player.time !== undefined &&
                    player.time !== null
                ){

                    timeText =
                        formatTime(
                            player.time
                        );

                }


                /* =========================
                   สร้างแถว
                ========================= */

                html +=

                    "<tr>" +

                    "<td>" +

                    (i + 1) +

                    "</td>" +


                    "<td>" +

                    escapeHTML(
                        player.name
                    ) +

                    "</td>" +


                    "<td>" +

                    statusText +

                    "</td>" +


                    "<td>" +

                    "<strong>" +

                    scoreText +

                    "</strong>" +

                    "</td>" +


                    "<td>" +

                    timeText +

                    "</td>" +

                    "</tr>";

            }


            participantsElement.innerHTML =
                html;

        },


        function(error){

            console.log(
                "Participants Firebase Error:",
                error
            );


            connectionElement.innerHTML =
                "🔴 ไม่สามารถโหลดรายชื่อผู้เล่น";


            participantsElement.innerHTML =

                '<tr>' +

                '<td colspan="5">' +

                '❌ เกิดข้อผิดพลาดในการโหลดข้อมูล' +

                '</td>' +

                '</tr>';

        }

    );


/* =========================================
   แปลงสถานะผู้เล่น
========================================= */

function getStatusText(status){

    if(status === "waiting"){

        return "🟡 รอเริ่ม";

    }


    if(status === "playing"){

        return "🟢 กำลังเล่น";

    }


    if(status === "finished"){

        return "✅ ทำเสร็จแล้ว";

    }


    return "⚪ ไม่ทราบสถานะ";

}


/* =========================================
   แปลงเวลา
========================================= */

function formatTime(seconds){

    seconds =
        parseInt(seconds) || 0;


    var min =
        Math.floor(seconds / 60);


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
