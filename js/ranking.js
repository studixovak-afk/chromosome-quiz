db.collection("players")
.orderBy("score","desc")
.limit(50)
.onSnapshot(function(snapshot){

    var players = [];

    snapshot.forEach(function(doc){

        var data = doc.data();

        data.id = doc.id;

        players.push(data);

    });

    players.sort(function(a,b){

        if(b.score != a.score){

            return b.score - a.score;

        }

        return a.time - b.time;

    });

    var html = "";

    for(var i=0;i<players.length;i++){

        var player = players[i];

        var min =
            Math.floor(player.time / 60);

        var sec =
            player.time % 60;

        if(min < 10){

            min = "0" + min;

        }

        if(sec < 10){

            sec = "0" + sec;

        }

        var medal = i + 1;

        if(i == 0){

            medal = "🥇";

        }
        else if(i == 1){

            medal = "🥈";

        }
        else if(i == 2){

            medal = "🥉";

        }

        html +=

        "<tr>" +

        "<td>" +
        medal +
        "</td>" +

        "<td>" +

        "<a href='#' onclick=\"showPlayer('" +
        player.id +
        "')\">" +

        player.name +

        "</a>" +

        "</td>" +

        "<td>" +
        player.score +
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

    document.getElementById(
        "online"
    ).innerHTML =
    "🟢 เชื่อมต่อ Real-time แล้ว";

});



function showPlayer(playerId){

    db.collection("players")
    .doc(playerId)
    .get()

    .then(function(doc){

        if(!doc.exists){

            return;

        }

        var player = doc.data();

        var html =

        "<h2>" +
        player.name +
        "</h2>";

        html +=

        "<p>คะแนน " +
        player.score +
        "/20</p>";

        html += "<hr>";

        if(
            !player.answersLog ||
            player.answersLog.length == 0
        ){

            html +=
            "ไม่พบข้อมูลคำตอบ";

        }
        else{

            for(
                var i = 0;
                i < player.answersLog.length;
                i++
            ){

                var a =
                    player.answersLog[i];

                html +=

                "<div style='text-align:left;margin-bottom:20px'>";

                html +=

                "<strong>ข้อ " +
                a.questionNumber +
                "</strong><br>";

                html +=
                a.question +
                "<br><br>";

                if(a.isCorrect){

                    html +=
                    "✅ ตอบถูก<br>";

                }
                else{

                    html +=

                    "❌ ตอบ: " +
                    a.selectedAnswer +
                    "<br>";

                    html +=

                    "✅ เฉลย: " +
                    a.correctAnswer +
                    "<br>";

                }

                html +=
                "</div>";

            }

        }

        html +=

        "<button onclick='closePlayer()'>" +

        "ปิด" +

        "</button>";

        document.getElementById(
            "playerDetail"
        ).innerHTML = html;

        document.getElementById(
            "playerDetail"
        ).style.display = "block";

    });

}



function closePlayer(){

    document.getElementById(
        "playerDetail"
    ).style.display = "none";

}
