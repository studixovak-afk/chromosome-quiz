/* =========================================
   CHROMOSOME QUIZ
   ระบบเล่นเกม
   สุ่ม 15 ข้อจากคลังคำถาม
========================================= */


/* =========================================
   ข้อมูลผู้เล่น
========================================= */

var playerName =
    localStorage.getItem("playerName");

var participantId =
    localStorage.getItem("participantId");


/* =========================================
   ตรวจสอบผู้เล่น
========================================= */

if(!playerName){

    window.location.href =
        "index.html";

}


/* =========================================
   ตรวจสอบคลังคำถาม
========================================= */

/*
   รองรับกรณี questions.js ใช้

   var questions = [...]

   หรือ

   const questions = [...]

   หรือ

   window.questions = [...]
*/

var questionBank = null;


if(
    typeof questions !== "undefined" &&
    Array.isArray(questions)
){

    questionBank = questions;

}

else if(
    typeof window.questions !== "undefined" &&
    Array.isArray(window.questions)
){

    questionBank = window.questions;

}


/* =========================================
   ถ้าไม่พบคลังคำถาม
========================================= */

if(
    !questionBank ||
    questionBank.length === 0
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
   ตรวจรูปแบบคำถาม
========================================= */

var validQuestions = [];


for(
    var qIndex = 0;
    qIndex < questionBank.length;
    qIndex++
){

    var q =
        questionBank[qIndex];


    if(
        q &&
        typeof q.question === "string" &&
        Array.isArray(q.options) &&
        q.options.length >= 2 &&
        typeof q.correct === "string"
    ){

        validQuestions.push(q);

    }

}


if(validQuestions.length === 0){

    alert(
        "❌ คลังคำถามมีข้อมูลไม่ถูกต้อง\n\n" +
        "แต่ละข้อควรมี question, options และ correct"
    );

    throw new Error(
        "Invalid question format"
    );

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
   สุ่มแบบ Fisher-Yates
========================================= */

function shuffleArray(array){

    var result =
        array.slice();


    for(
        var i = result.length - 1;
        i > 0;
        i--
    ){

        var j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        var temp =
            result[i];


        result[i] =
            result[j];


        result[j] =
            temp;

    }


    return result;

}


/* =========================================
   สุ่มคำถาม
========================================= */

/*
   แต่ละคนที่เปิดเกม
   จะสุ่มได้ชุดคำถามของตัวเอง
*/

var quizQuestions =
    shuffleArray(
        validQuestions
    );


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
   Debug
========================================= */

console.log(
    "📚 จำนวนคำถามทั้งหมด:",
    validQuestions.length
);

console.log(
    "🎯 จำนวนคำถามที่ใช้:",
    totalQuestions
);

console.log(
    "👤 ผู้เล่น:",
    playerName
);

console.log(
    "📝 ชุดคำถามของผู้เล่น:",
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

    playerNameElement.textContent =
        playerName;

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
        : String(minutes);


    var secondText =
        seconds < 10
        ? "0" + seconds
        : String(seconds);


    timeElement.textContent =
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

        questionNumberElement.textContent =
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

        questionElement.textContent =
            q.question;

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
        shuffleArray(
            q.options
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
        "answer-btn answer-button";


    /*
       เก็บคำตอบจริง
       ป้องกันปัญหา HTML
    */

    button.setAttribute(
        "data-answer",
        answer
    );


    button.textContent =
        answer;


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
       บันทึกประวัติ
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
       แสดงคำตอบ
    ========================= */

    if(correct){

        button.classList.add(
            "correct"
        );


        button.textContent =
            "✅ " + answer;

    }

    else{

        button.classList.add(
            "wrong"
        );


        button.textContent =
            "❌ " + answer;


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
                q.correct
            ){

                buttons[j].classList.add(
                    "correct"
                );


                buttons[j].textContent =
                    "✅ " +
                    q.correct;


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


    console.log(
        "🏁 จบเกม"
    );

    console.log(
        "คะแนน:",
        score
    );

    console.log(
        "เวลา:",
        time
    );


    /* =========================
       อัปเดต participants
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

            answersLog:
                answersLog,

            finishedAt:
                firebase.firestore
                .FieldValue
                .serverTimestamp()

        },{
            merge:true

        })
        .then(

            function(){

                console.log(
                    "✅ อัปเดตข้อมูลผู้เล่นสำเร็จ"
                );


                /*
                   รอ Firebase บันทึกเสร็จ
                   แล้วค่อยไป result
                */

                window.location.href =
                    "result.html";

            }

        )
        .catch(

            function(error){

                console.error(
                    "Participant update error:",
                    error
                );


                /*
                   ถึง Firebase มีปัญหา
                   ก็ยังให้ผู้เล่นดูผลได้
                */

                window.location.href =
                    "result.html";

            }

        );

    }

    else{

        /*
           ถ้าไม่มี participantId
           ก็ยังไปหน้าผลลัพธ์
        */

        window.location.href =
            "result.html";

    }

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
