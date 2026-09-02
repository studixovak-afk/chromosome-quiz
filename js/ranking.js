/* =========================================
   RANKING - CHROMOSOME QUIZ
   โหลดคะแนนแบบ Real-time
========================================= */

var rankingElement =
    document.getElementById("ranking");

var onlineElement =
    document.getElementById("online");


/* =========================================
   ตรวจสอบ Firebase
========================================= */

if(typeof db === "undefined"){

    if(onlineElement){

        onlineElement.innerHTML =
            "🔴 ไม่พบ Firebase";

    }

    console.error(
        "ไม่พบ Firebase Database"
    );

}


/* =========================================
   โหลดคะแนนจาก players
========================================= */

else{

    db.collection("players")
    .onSnapshot(

        function(snapshot){

            console.log(
                "จำนวนผู้เล่นใน players:",
                snapshot.size
            );


            var players = [];


            /* =============================
               อ่านข้อมูล
            ============================= */

            snapshot.forEach(function(doc){

                var data = doc.data();


                console.log(
                    "Player:",
                    doc.id,
                    data
                );


                players.push({

                    id: doc.id,

                    name:
                        data.name ||
                        "ไม่ระบุชื่อ",

                    score:
                        Number(data.score) || 0,

                    time:
                        Number(data.time) || 0

                });

            });


            /* =============================
               เรียงคะแนน
            ============================= */

            players.sort(function(a,b){

                if(b.score !== a.score){

                    return b.score - a.score;

                }

                return a.time - b.time;

            });


            /* =============================
               แสดงสูงสุด 50 คน
            ============================= */

            players =
                players.slice(0,50);


            /* =============================
               สร้าง HTML
            ============================= */

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


                if(rank === 1){

                    medal = "🥇";

                }

                else if(rank === 2){

                    medal = "🥈";

                }

                else if(rank === 3){

                    medal = "🥉";

                }


                /* =========================
                   เวลา
                ========================= */

                var time =
                    player.time;


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


                /* =========================
                   แถวตาราง
                ========================= */

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

                            "</strong>" +

                        "</td>" +

                        "<td>" +

                            min +
                            ":" +
                            sec +

                        "</td>" +

                    "</tr>";

            }


            /* =============================
               แสดงผล
            ============================= */

            if(rankingElement){

                if(players.length > 0){

                    rankingElement.innerHTML =
                        html;

                }

                else{

                    rankingElement.innerHTML =

                        '<tr>' +

                            '<td colspan="4">' +

                                'ยังไม่มีผู้เล่น' +

                            '</td>' +

                        '</tr>';

                }

            }


            /* =============================
               สถานะ
            ============================= */

            if(onlineElement){

                onlineElement.innerHTML =
                    "🟢 เชื่อมต่อแล้ว • Real-time";

            }

        },


        function(error){

            console.error(
                "โหลด Ranking Error:",
                error
            );


            if(onlineElement){

                onlineElement.innerHTML =
                    "🔴 โหลดคะแนนไม่สำเร็จ";

            }


            if(rankingElement){

                rankingElement.innerHTML =

                    '<tr>' +

                        '<td colspan="4">' +

                            '❌ ไม่สามารถโหลดคะแนนได้' +

                        '</td>' +

                    '</tr>';

            }

        }

    );

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

        .replace(/&/g,"&amp;")

        .replace(/</g,"&lt;")

        .replace(/>/g,"&gt;")

        .replace(/"/g,"&quot;")

        .replace(/'/g,"&#039;");

}
