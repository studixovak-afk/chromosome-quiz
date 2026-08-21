db.collection("players")

.orderBy("score", "desc")

.limit(50)

.onSnapshot(function(snapshot){

    var players = [];


    snapshot.forEach(function(doc){

        players.push(
            doc.data()
        );

    });


    players.sort(function(a,b){

        if(b.score != a.score){

            return b.score - a.score;

        }


        return a.time - b.time;

    });


    var html = "";


    for(
    var i = 0;
    i < players.length;
    i++
){

        var player =
            players[i];


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


        var rank =
            i + 1;


        var medal = "";


        if(rank == 1){

            medal = "??";

        }

        else if(rank == 2){

            medal = "??";

        }

        else if(rank == 3){

            medal = "??";

        }

        else{

            medal = rank;

        }


        html +=

        "<tr>" +

        "<td>" +
        medal +
        "</td>" +

        "<td>" +
        player.name +
        "</td>" +

        "<td><strong>" +
        player.score +
        "</strong></td>" +

        "<td>" +
        min +
        ":" +
        sec +
        "</td>" +

        "</tr>";

    }


    document.getElementById(
        "ranking"
    ).innerHTML =
        html;


    document.getElementById(
        "online"
    ).innerHTML =
        "?? ????????? Real-time";


})

.catch(function(error){

    console.log(error);

});
