/* =========================================
   CHROMOSOME QUIZ
   จำนวน 10 ข้อ
========================================= */


/* =========================================
   คำถาม
========================================= */

var questions = [

    {
        question: "มนุษย์ปกติมีโครโมโซมทั้งหมดกี่แท่ง?",
        answers: [
            "23 แท่ง",
            "44 แท่ง",
            "46 แท่ง",
            "48 แท่ง"
        ],
        correct: 2
    },

    {
        question: "มนุษย์มีโครโมโซมกี่คู่?",
        answers: [
            "22 คู่",
            "23 คู่",
            "24 คู่",
            "46 คู่"
        ],
        correct: 1
    },

    {
        question: "โครโมโซมเพศของเพศหญิงโดยทั่วไปคืออะไร?",
        answers: [
            "XY",
            "XX",
            "YY",
            "XO"
        ],
        correct: 1
    },

    {
        question: "โครโมโซมเพศของเพศชายโดยทั่วไปคืออะไร?",
        answers: [
            "XX",
            "XY",
            "YY",
            "XO"
        ],
        correct: 1
    },

    {
        question: "สารพันธุกรรมหลักที่อยู่บนโครโมโซมคืออะไร?",
        answers: [
            "DNA",
            "RNA",
            "โปรตีน",
            "ไขมัน"
        ],
        correct: 0
    },

    {
        question: "โครโมโซมอยู่บริเวณใดของเซลล์?",
        answers: [
            "เยื่อหุ้มเซลล์",
            "ไซโทพลาซึม",
            "นิวเคลียส",
            "ไมโทคอนเดรียเท่านั้น"
        ],
        correct: 2
    },

    {
        question: "Down syndrome เกี่ยวข้องกับโครโมโซมคู่ใด?",
        answers: [
            "คู่ที่ 13",
            "คู่ที่ 18",
            "คู่ที่ 21",
            "คู่ที่ 23"
        ],
        correct: 2
    },

    {
        question: "Edwards syndrome เกี่ยวข้องกับความผิดปกติของโครโมโซมคู่ใด?",
        answers: [
            "คู่ที่ 13",
            "คู่ที่ 18",
            "คู่ที่ 21",
            "คู่ที่ 23"
        ],
        correct: 1
    },

    {
        question: "Patau syndrome เกี่ยวข้องกับโครโมโซมคู่ใด?",
        answers: [
            "คู่ที่ 13",
            "คู่ที่ 18",
            "คู่ที่ 21",
            "คู่ที่ 22"
        ],
        correct: 0
    },

    {
        question: "เซลล์สืบพันธุ์ของมนุษย์มีโครโมโซมกี่แท่ง?",
        answers: [
            "23",
            "46",
            "44",
            "92"
        ],
        correct: 0
    }

];



/* =========================================
   ตัวแปรเกม
========================================= */

var currentQuestion = 0;

var score = 0;

var answersLog = [];

var seconds = 0;

var timer;

var gameStarted = false;

var finished = false;



/* =========================================
   ข้อมูลผู้เล่น
========================================= */

var playerName =
    localStorage.getItem("playerName");

var participantId =
    localStorage.getItem("participantId");



/* =========================================
   ตรวจสอบชื่อ
========================================= */

if(!playerName){

    window.location.href =
        "index.html";

}



/* =========================================
   ตรวจสอบ participantId
========================================= */

if(!participantId){

    alert(
        "ไม่พบข้อมูลผู้เล่น กรุณากลับไปเข้าร่วมห้องใหม่"
    );

    window.location.href =
        "index.html";

}



/* =========================================
   แสดงชื่อผู้เล่น
========================================= */

var nameElement =
    document.getElementById(
        "playerName"
    );


if(nameElement){

    nameElement.innerHTML =
        escapeHTML(playerName);

}



/* =========================================
   ตรวจสอบว่าเกมเริ่มหรือยัง
========================================= */

var gameRef =
    db.collection("settings")
      .doc("game");


gameRef.onSnapshot(function(doc){

    if(!doc.exists){

        gameStarted = false;

        showWaiting();

        return;

    }


    var data =
        doc.data();


    gameStarted =
        data.started === true;


    if(gameStarted){

        if(
            !finished &&
            currentQuestion === 0 &&
            seconds === 0
        ){

            startQuiz();

        }

    }
    else{

        if(
            !finished &&
            currentQuestion === 0
        ){

            showWaiting();

        }

    }

}, function(error){

    console.log(
        "Game status error:",
        error
    );

    alert(
        "ไม่สามารถเชื่อมต่อสถานะการแข่งขันได้"
    );

});



/* =========================================
   หน้ารอเริ่ม
========================================= */

function showWaiting(){

    var questionElement =
        document.getElementById(
            "question"
        );


    var answersElement =
        document.getElementById(
            "answers"
        );


    if(questionElement){

        questionElement.innerHTML =
            "⏳ รอหัวหน้าห้องเริ่มการแข่งขัน...";

    }


    if(answersElement){

        answersElement.innerHTML =
            "<p style='text-align:center;'>" +
            "เมื่อหัวหน้าห้องกดเริ่ม " +
            "เกมจะเริ่มโดยอัตโนมัติ" +
            "</p>";

    }


    var numberElement =
        document.getElementById(
            "questionNumber"
        );


    if(numberElement){

        numberElement.innerHTML =
            "กำลังรอเริ่มการแข่งขัน";

    }


    var progressBar =
        document.getElementById(
            "progressBar"
        );


    if(progressBar){

        progressBar.style.width =
            "0%";

    }

}



/* =========================================
   เริ่มเกม
========================================= */

function startQuiz(){

    if(finished){

        return;

    }


    if(seconds > 0){

        return;

    }


    updateParticipantStatus(
        "playing"
    );


    startTimer();

    showQuestion();

}



/* =========================================
   TIMER
========================================= */

function startTimer(){

    if(timer){

        clearInterval(timer);

    }


    timer =
        setInterval(function(){

            seconds++;


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


            var timeElement =
                document.getElementById(
                    "time"
                );


            if(timeElement){

                timeElement.innerHTML =
                    min + ":" + sec;

            }


        },1000);

}



/* =========================================
   แสดงคำถาม
========================================= */

function showQuestion(){

    if(!gameStarted){

        showWaiting();

        return;

    }


    var q =
        questions[currentQuestion];


    if(!q){

        finishGame();

        return;

    }


    /* -----------------------------
       หมายเลขข้อ
    ----------------------------- */

    var numberElement =
        document.getElementById(
            "questionNumber"
        );


    if(numberElement){

        numberElement.innerHTML =
            "ข้อ " +
            (currentQuestion + 1) +
            " / " +
            questions.length;

    }



    /* -----------------------------
       คำถาม
    ----------------------------- */

    var questionElement =
        document.getElementById(
            "question"
        );


    if(questionElement){

        questionElement.innerHTML =
            escapeHTML(
                q.question
            );

    }



    /* -----------------------------
       ตัวเลือก
    ----------------------------- */

    var html = "";


    for(
        var i = 0;
        i < q.answers.length;
        i++
    ){

        html +=

            '<button ' +

            'class="answer" ' +

            'onclick="checkAnswer(' +
            i +
            ')">' +

            escapeHTML(
                q.answers[i]
            ) +

            '</button>';

    }


    var answersElement =
        document.getElementById(
            "answers"
        );


    if(answersElement){

        answersElement.innerHTML =
            html;

    }



    /* -----------------------------
       Progress Bar
    ----------------------------- */

    var progress =
        ((currentQuestion + 1) /
        questions.length) * 100;


    var progressBar =
        document.getElementById(
            "progressBar"
        );


    if(progressBar){

        progressBar.style.width =
            progress + "%";

    }

}



/* =========================================
   ตรวจคำตอบ
========================================= */

function checkAnswer(answer){

    if(!gameStarted){

        return;

    }


    if(finished){

        return;

    }


    var q =
        questions[currentQuestion];


    if(!q){

        return;

    }


    var buttons =
        document.getElementsByClassName(
            "answer"
        );


    /* ป้องกันการกดซ้ำ */

    for(
        var i = 0;
        i < buttons.length;
        i++
    ){

        buttons[i].disabled =
            true;

    }


    var isCorrect =
        answer == q.correct;


    /* -----------------------------
       คะแนน
    ----------------------------- */

    if(isCorrect){

        score++;


        buttons[answer]
        .className =
            "answer correct";

    }

    else{

        buttons[answer]
        .className =
            "answer wrong";


        buttons[q.correct]
        .className =
            "answer correct";

    }



    /* -----------------------------
       บันทึกคำตอบ
    ----------------------------- */

    answersLog.push({

        questionNumber:
            currentQuestion + 1,

        question:
            q.question,

        selectedAnswer:
            q.answers[answer],

        selectedIndex:
            answer,

        correctAnswer:
            q.answers[q.correct],

        correctIndex:
            q.correct,

        isCorrect:
            isCorrect

    });



    /* -----------------------------
       ไปข้อถัดไป
    ----------------------------- */

    setTimeout(function(){

        currentQuestion++;


        if(
            currentQuestion >=
            questions.length
        ){

            finishGame();

        }

        else{

            showQuestion();

        }


    },700);

}



/* =========================================
   จบเกม
========================================= */

function finishGame(){

    if(finished){

        return;

    }


    finished = true;


    /* หยุดเวลา */

    if(timer){

        clearInterval(timer);

    }



    /* -----------------------------
       บันทึกคะแนน LocalStorage
    ----------------------------- */

    localStorage.setItem(
        "score",
        score
    );


    localStorage.setItem(
        "time",
        seconds
    );


    localStorage.setItem(
        "answersLog",
        JSON.stringify(
            answersLog
        )
    );



    /* -----------------------------
       เปลี่ยนสถานะผู้เล่น
       เป็น finished
    ----------------------------- */

    updateParticipantStatus(
        "finished"
    );



    /* -----------------------------
       ไปหน้าผลคะแนน
    ----------------------------- */

    setTimeout(function(){

        window.location.href =
            "result.html";

    },300);

}



/* =========================================
   อัปเดตสถานะผู้เล่น Firebase
========================================= */

function updateParticipantStatus(
    status
){

    if(!participantId){

        return;

    }


    db.collection(
        "participants"
    )
    .doc(participantId)
    .update({

        status: status,

        score: score,

        time: seconds,

        updatedAt:
            firebase.firestore
            .FieldValue
            .serverTimestamp()

    })
    .then(function(){

        console.log(
            "Participant status:",
            status
        );

    })
    .catch(function(error){

        console.log(
            "Participant status error:",
            error
        );

    });

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
