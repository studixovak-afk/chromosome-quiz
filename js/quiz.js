/* =========================================
   CHROMOSOME QUIZ
   ระบบเล่นเกม
========================================= */


/* =========================================
   ตรวจสอบว่ามี questions.js
========================================= */

if(
    typeof questions === "undefined" ||
    !Array.isArray(questions) ||
    questions.length === 0
){

    alert(
        "❌ ไม่พบคลังคำถาม\n\n" +
        "กรุณาตรวจสอบว่า quiz.html โหลด\n" +
        "js/questions.js ก่อน js/quiz.js"
    );

    throw new Error(
        "questions.js not found"
    );

}


/* =========================================
   ข้อมูลผู้เล่น
========================================= */

var playerName =
    localStorage.getItem(
        "playerName"
    );


var participantId =
    localStorage.getItem(
        "participantId"
    );


/* =========================================
   ตรวจชื่อผู้เล่น
========================================= */

if(!playerName){

    window.location.href =
        "index.html";

}


/* =========================================
   ตั้งค่าเกม
========================================= */

var totalQuestions = 15;

var currentQuestion = 0;

var score = 0;

var time = 0;

var timerInterval = null;

var answered = false;

var answersLog = [];


/* =========================================
   สุ่มคำถาม
========================================= */

var quizQuestions =
    questions.slice();


quizQuestions.sort(
    function(){

        return Math.random() - 0.5;

    }
);


/* เอา 15 ข้อ */

quizQuestions =
    quizQuestions.slice(
        0,
        Math.min(
            totalQuestions,
            quizQuestions.length
        )
    );


totalQuestions =
    quizQuestions.length;


/* =========================================
   ELEMENTS
========================================= */

var playerNameElement =
    document.getElementById(
        "playerName"
    );


var timeElement =
    document.getElementById(
        "time"
    );


var questionNumberElement =
    document.getElementById(
        "questionNumber"
    );


var questionElement =
    document.getElementById(
        "question"
    );


var answersElement =
    document.getElementById(
        "answers"
    );


var progressBar =
    document.getElementById(
        "progressBar"
    );


/* =========================================
   แสดงชื่อ
========================================= */

if(playerNameElement){

    playerNameElement.innerHTML =
        escapeHTML(
            playerName
        );

}


/* =========================================
   เริ่มจับเวลา
========================================= */

function startTimer(){

    time = 0;

    updateTimer();


    if(timerInterval){

        clearInterval(
            timerInterval
        );

    }


    timerInterval =
        setInterval(

            function(){

                time++;

                updateTimer();

            },

            1000

        );

}


/* =========================================
   แสดงเวลา
========================================= */

function updateTimer(){

    if(!timeElement){

        return;

    }


    var minutes =
        Math.floor(
            time / 60
        );


    var seconds =
        time % 60;


    var minuteText =
        minutes < 10
        ? "0" + minutes
        : minutes;


    var secondText =
        seconds < 10
        ? "0" + seconds
        : seconds;


    timeElement.innerHTML =
        minuteText +
        ":" +
        secondText;

}


/* =========================================
   แสดงคำถาม
========================================= */

function showQuestion(){

    answered = false;


    var q =
        quizQuestions[
            currentQuestion
        ];


    if(!q){

        finishQuiz();

        return;

    }


    /* =========================
       หมายเลขข้อ
    ========================= */

    if(questionNumberElement){

        questionNumberElement.innerHTML =
            "ข้อ " +
            (currentQuestion + 1) +
            " / " +
            totalQuestions;

    }


    /* =========================
       Progress
    ========================= */

    if(progressBar){

        var progress =
            (
                currentQuestion /
                totalQuestions
            ) * 100;


        progressBar.style.width =
            progress + "%";

    }


    /* =========================
       คำถาม
    ========================= */

    if(questionElement){

        questionElement.innerHTML =
            escapeHTML(
                q.question
            );

    }


    /* =========================
       ตัวเลือก
    ========================= */

    if(!answersElement){

        return;

    }


    answersElement.innerHTML =
        "";


    var options =
        q.options.slice();


    /* สุ่มตัวเลือก */

    options.sort(
        function(){

            return Math.random() - 0.5;

        }
    );


    for(
        var i = 0;
        i < options.length;
        i++
    ){

        createAnswerButton(
            options[i]
        );

    }

}


/* =========================================
   สร้างปุ่มคำตอบ
========================================= */

function createAnswerButton(
    answer
){

    var button =
        document.createElement(
            "button"
        );


    button.type =
        "button";


    button.className =
        "answer-button";


    button.innerHTML =
        escapeHTML(
            answer
        );


    button.onclick =
        function(){

            selectAnswer(
                answer,
                button
            );

        };


    answersElement.appendChild(
        button
    );

}


/* =========================================
   เลือกคำตอบ
========================================= */

function selectAnswer(
    answer,
    button
){

    if(answered){

        return;

    }


    answered = true;


    var q =
        quizQuestions[
            currentQuestion
        ];


    var correct =
        answer === q.correct;


    /* =========================
       เก็บคะแนน
    ========================= */

    if(correct){

        score++;

    }


    /* =========================
       เก็บประวัติคำตอบ
    ========================= */

    answersLog.push({

        question:
            q.question,

        selected:
            answer,

        correct:
            q.correct,

        isCorrect:
            correct

    });


    /* =========================
       ปิดปุ่มทั้งหมด
    ========================= */

    var buttons =
        answersElement.querySelectorAll(
            "button"
        );


    for(
        var i = 0;
        i < buttons.length;
        i++
    ){

        buttons[i].disabled =
            true;

    }


    /* =========================
       แสดงถูก / ผิด
    ========================= */

    if(correct){

        button.innerHTML =
            "✅ " +
            escapeHTML(
                answer
            );

    }

    else{

        button.innerHTML =
            "❌ " +
            escapeHTML(
                answer
            );


        /* หาคำตอบที่ถูก */

        for(
            var j = 0;
            j < buttons.length;
            j++
        ){

            if(
                buttons[j].innerText
                .trim() ===
                q.correct
            ){

                buttons[j].innerHTML =
                    "✅ " +
                    escapeHTML(
                        q.correct
                    );

                break;

            }

        }

    }


    /* =========================
       ไปข้อถัดไป
    ========================= */

    setTimeout(

        function(){

            currentQuestion++;

            if(
                currentQuestion <
                totalQuestions
            ){

                showQuestion();

            }

            else{

                finishQuiz();

            }

        },

        700

    );

}


/* =========================================
   จบเกม
========================================= */

function finishQuiz(){

    if(timerInterval){

        clearInterval(
            timerInterval
        );

        timerInterval =
            null;

    }


    /* =========================
       บันทึก LocalStorage
    ========================= */

    localStorage.setItem(
        "score",
        score
    );


    localStorage.setItem(
        "time",
        time
    );


    localStorage.setItem(
        "answersLog",
        JSON.stringify(
            answersLog
        )
    );


    /* ต้องบันทึกใหม่ทุกครั้งที่เล่น */

    localStorage.removeItem(
        "savedScore"
    );


    /* =========================
       อัปเดตสถานะผู้เล่น
       เป็น finished
    ========================= */

    if(
        participantId &&
        typeof db !== "undefined"
    ){

        db.collection(
            "participants"
        )
        .doc(
            participantId
        )
        .set({

            name:
                playerName,

            status:
                "finished",

            score:
                score,

            time:
                time,

            finishedAt:
                firebase.firestore
                .FieldValue
                .serverTimestamp()

        },{

            merge:
                true

        })
        .catch(
            function(error){

                console.log(
                    "Participant update error:",
                    error
                );

            }
        );

    }


    /* =========================
       ไปหน้าสรุปผล
    ========================= */

    window.location.href =
        "result.html";

}


/* =========================================
   ป้องกัน HTML
========================================= */

function escapeHTML(
    text
){

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


/* =========================================
   เริ่มเกม
========================================= */

startTimer();

showQuestion();
