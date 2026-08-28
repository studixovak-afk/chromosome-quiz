/* =========================
   โหลดคะแนนจาก Firebase
========================= */

db.collection("players")

.onSnapshot(function(snapshot){

    var players = [];


    /* =========================
       อ่านข้อมูลผู้เล่น
    ========================= */

    snapshot.forEach(function(doc){

        var data = doc.data();


        /*
           ตรวจสอบว่ามีข้อมูล
           ที่จำเป็นหรือไม่
        */

        if(
            data.name !== undefined &&
            data.score !== undefined
        ){

            players.push({

                id: doc.id,

                name: data.name,

                score:
                    Number(data.score) || 0,

                time:
                    Number(data.time) || 0

            });

        }

    });


    /* =========================
       เรียงคะแนน
       
       คะแนนมากอยู่บน
       ถ้าคะแนนเท่ากัน
       คนที่ใช้เวลาน้อยกว่าอยู่บน
    ========================= */

    players.sort(function(a,b){

        if(
            b.score !==
            a.score
        ){

            return b.score - a.score;

        }


        return a.time - b.time;

    });


    /* =========================
       แสดงเฉพาะ 50 อันดับแรก
    ========================= */

    players =
        players.slice(0,50);


    var html = "";


    /* =========================
       สร้างตาราง
    ========================= */

    for(
        var i = 0;
        i < players.length;
        i++
    ){

        var player =
            players[i];


        /* =========================
           แปลงเวลา
        ========================= */

        var min =
            Math.floor(
                player.time / 60
            );


        var sec =
            player.time % 60;


        if(min < 10){

            min =
                "0" + min;

        }


        if(sec < 10){

            sec =
                "0" + sec;

        }


        /* =========================
           อันดับ
        ========================= */

        var rank =
            i + 1;


        var medal =
            "";


        if(rank == 1){

            medal = "🥇";

        }

        else if(rank == 2){

            medal = "🥈";

        }

        else if(rank == 3){

            medal = "🥉";

        }

        else{

            medal =
                rank;

        }


        /* =========================
           เพิ่มแถว
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


    /* =========================
       แสดงข้อมูล
    ========================= */

    var rankingElement =
        document.getElementById(
            "ranking"
        );


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


    /* =========================
       สถานะ Firebase
    ========================= */

    var onlineElement =
        document.getElementById(
            "online"
        );


    if(onlineElement){

        onlineElement.innerHTML =
            "🟢 เชื่อมต่อแล้ว • Real-time";

    }


})


.catch(function(error){

    console.error(
        "Firebase Error:",
        error
    );


    var onlineElement =
        document.getElementById(
            "online"
        );


    if(onlineElement){

        onlineElement.innerHTML =
            "🔴 ไม่สามารถเชื่อมต่อ Firebase";

    }

});


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
