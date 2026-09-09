/* =========================================
   CHROMOSOME QUIZ
   ระบบเล่นเกม
   เวอร์ชันแก้ไขการโหลดคลังคำถาม
========================================= */


/* =========================================
   ตรวจสอบคลังคำถาม
========================================= */

var questionList = null;


/*
   รองรับหลายชื่อ
   เพื่อป้องกันปัญหา questions.js
*/

if(
    typeof questions !== "undefined" &&
    Array.isArray(questions)
){

    questionList = questions;

}

else if(
    typeof questionBank !== "undefined" &&
    Array.isArray(questionBank)
){

    questionList = questionBank;

}

else if(
    typeof QUESTIONS !== "undefined" &&
    Array.isArray(QUESTIONS)
){

    questionList = QUESTIONS;

}


/* =========================================
   ถ้าไม่พบคำถาม
========================================= */

if(
    !questionList ||
    questionList.length === 0
){

    console.error(
        "ไม่พบคลังคำถาม"
    );

    alert(
        "❌ ไม่พบคลังคำถาม\n\n" +
        "กรุณาตรวจสอบว่า quiz.html โหลด\n" +
        "js/questions.js ก่อน js/quiz.js"
    );

    throw new Error(
        "Question bank not found"
    );

}


/* =========================================
   แสดงจำนวนคำถามใน Console
========================================= */

console.log(
    "โหลดคลังคำถามสำเร็จ:",
    questionList.length,
    "ข้อ"
);


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

var totalQuestions = 20;

var currentQuestion = 0;

var score = 0;

var time = 0;

var timerInterval = null;

var answered = false;

var answersLog = [];


/* =========================================
   สุ่มแบบ Fisher-Yates
   ดีกว่า sort(Math.random)
========================================= */

function shuffle(array){

    var arr =
        array.slice();

    for(
        var i = arr.length - 1;
        i > 0;
        i--
    ){

        var j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        var temp =
            arr[i];

        arr[i] =
            arr[j];

        arr[j] =
            temp;

    }

    return arr;

}


/* =========================================
   สุ่มคำถาม
========================================= */

var quizQuestions =
    shuffle(questionList);


/* =========================================
   เอา 15 ข้อ
========================================= */

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


console.log(
    "คำถามที่สุ่มได้:",
    quizQuestions
);


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


    /* =====================================
       ตรวจโครงสร้างคำถาม
    ===================================== */

    if(
        !q.question ||
        !Array.isArray(q.options) ||
        q.options.length === 0 ||
        q.correct === undefined
    ){

        console.error(
            "รูปแบบคำถามไม่ถูกต้อง:",
            q
        );

        alert(
            "❌ รูปแบบคำถามไม่ถูกต้อง\n\n" +
            "กรุณาตรวจสอบ questions.js"
        );

        return;

    }


    /* =====================================
       หมายเลขข้อ
    ===================================== */

    if(questionNumberElement){

        questionNumberElement.innerHTML =
            "ข้อ " +
            (currentQuestion + 1) +
            " / " +
            totalQuestions;

    }


    /* =====================================
       Progress Bar
    ===================================== */

    if(progressBar){

        var progress =
            (
                currentQuestion /
                totalQuestions
            ) * 100;


        progressBar.style.width =
            progress + "%";

    }


    /* =====================================
       แสดงคำถาม
    ===================================== */

    if(questionElement){

        questionElement.innerHTML =
            escapeHTML(
                q.question
            );

    }


    /* =====================================
       ล้างตัวเลือกเดิม
    ===================================== */

    if(!answersElement){

        return;

    }


    answersElement.innerHTML =
        "";


    /* =====================================
       สุ่มตัวเลือก
    ===================================== */

    var options =
        shuffle(
            q.options
        );


    /* =====================================
       สร้างปุ่ม
    ===================================== */

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
       รองรับ CSS ใหม่
    */

    button.className =
        "answer-btn answer-button";


    /*
       เก็บคำตอบจริง
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


    /* =====================================
       เพิ่มคะแนน
    ===================================== */

    if(correct){

        score++;

    }


    /* =====================================
       เก็บประวัติ
    ===================================== */

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


    /* =====================================
       ปิดปุ่มทั้งหมด
    ===================================== */

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


    /* =====================================
       แสดงถูก / ผิด
    ===================================== */

    if(correct){

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

        button.classList.add(
            "wrong"
        );


        button.innerHTML =
            "❌ " +
            escapeHTML(
                answer
            );


        /*
           หาคำตอบที่ถูก
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
                String(q.correct)
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


    /* =====================================
       ไปข้อถัดไป
    ===================================== */

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

    /* =====================================
       หยุดเวลา
    ===================================== */

    if(timerInterval){

        clearInterval(
            timerInterval
        );

        timerInterval =
            null;

    }


    /* =====================================
       Progress เต็ม
    ===================================== */

    if(progressBar){

        progressBar.style.width =
            "100%";

    }


    /* =====================================
       บันทึก LocalStorage
    ===================================== */

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


    /* =====================================
       อัปเดต participants
    ===================================== */

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

                console.error(
                    "Participant update error:",
                    error
                );

            }
        );

    }


    /* =====================================
       ไปหน้าสรุปผล
    ===================================== */

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
