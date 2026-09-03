/* =========================================
   CHROMOSOME QUIZ
   ระบบเล่นเกม
========================================= */


/* =========================================
   ตรวจสอบ questions.js
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
   ตรวจชื่อ
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
   แสดงชื่อผู้เล่น
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
       Progress Bar
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


    /*
       ใช้ทั้ง 2 class
       เพื่อรองรับ CSS เดิมและ CSS ใหม่
    */

    button.className =
        "answer-btn answer-button";


    /*
       เก็บคำตอบจริงไว้ใน data-answer
       ทำให้ตรวจคำตอบได้แม่นยำ
    */

    button.setAttribute(
        "data-answer",
        answer
    );


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
       เพิ่มคะแนน
    ========================= */

    if(correct){

        score++;

    }


    /* =========================
       เก็บประวัติ
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
       ปุ่มทั้งหมด
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
       แสดงผลคำตอบ
    ========================= */

    if(correct){

        /*
           ตอบถูก
        */

        button.classList.add(
            "correct"
        );


        button.innerHTML =
            "✅ " +
            escapeHTML(
                answer
            );

    }

    else{

        /*
           ตอบผิด
        */

        button.classList.add(
            "wrong"
        );


        button.innerHTML =
            "❌ " +
            escapeHTML(
                answer
            );


        /*
           หาปุ่มคำตอบที่ถูก
           จาก data-answer
        */

        for(
            var j = 0;
            j < buttons.length;
            j++
        ){

            var buttonAnswer =
                buttons[j].getAttribute(
                    "data-answer"
                );


            if(
                buttonAnswer ===
                q.correct
            ){

                buttons[j].classList.add(
                    "correct"
                );


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
       Progress เต็ม
    ========================= */

    if(progressBar){

        progressBar.style.width =
            "100%";

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


    /*
       ให้ result.js
       บันทึกคะแนนใหม่
    */

    localStorage.removeItem(
        "savedScore"
    );


    /* =========================
       อัปเดต Firebase
       participants
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
            merge:true
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
   ป้องกัน HTML Injection
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
