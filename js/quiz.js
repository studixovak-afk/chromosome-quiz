/* =========================================================
   CHROMOSOME QUIZ
   เวอร์ชันคำถามฮา + ความรู้ทั่วไป
   ผู้เล่นแต่ละคนได้ 15 ข้อ
   - คำถามฮา 7 ข้อ
   - ความรู้ทั่วไป 8 ข้อ
   - สุ่มชุดคำถามให้แต่ละคน
========================================================= */


/* =========================================================
   คลังคำถามฮา
========================================================= */

var funnyQuestions = [

    {
        question: "อะไรเอ่ย ยิ่งเช็ดยิ่งเปียก?",
        answers: [
            "ผ้าเช็ดตัว",
            "กระดาษ",
            "สบู่",
            "รองเท้า"
        ],
        correct: 0
    },

    {
        question: "ถ้าตื่นสาย สิ่งแรกที่ควรทำคืออะไร?",
        answers: [
            "นอนต่อ",
            "รีบลุก",
            "ร้องไห้",
            "ปิดนาฬิกาแล้วหลับต่อ"
        ],
        correct: 1
    },

    {
        question: "ถ้าแบตมือถือเหลือ 1% สิ่งที่ควรทำที่สุดคืออะไร?",
        answers: [
            "หาที่ชาร์จ",
            "เปิดเกม",
            "ดูคลิปต่อ",
            "เปิดไฟฉาย"
        ],
        correct: 0
    },

    {
        question: "อะไรเอ่ย มีฟันมากแต่กัดไม่ได้?",
        answers: [
            "หวี",
            "สิงโต",
            "ฉลาม",
            "จระเข้"
        ],
        correct: 0
    },

    {
        question: "ถ้าเพื่อนบอกว่า 'เดี๋ยวมา' คำว่าเดี๋ยวอาจหมายถึงอะไร?",
        answers: [
            "1 วินาที",
            "5 นาที",
            "30 นาที",
            "แล้วแต่เพื่อน"
        ],
        correct: 3
    },

    {
        question: "อะไรเอ่ย ยิ่งวิ่งยิ่งอยู่ที่เดิม?",
        answers: [
            "รถยนต์",
            "ลู่วิ่ง",
            "จักรยาน",
            "เครื่องบิน"
        ],
        correct: 1
    },

    {
        question: "อะไรเอ่ย มีคอแต่ไม่มีหัว?",
        answers: [
            "เสื้อ",
            "ไก่",
            "คน",
            "ยีราฟ"
        ],
        correct: 0
    },

    {
        question: "ถ้าหิวตอนเที่ยงคืน สิ่งแรกที่หลายคนมักทำคืออะไร?",
        answers: [
            "เปิดตู้เย็น",
            "ออกกำลังกาย",
            "อ่านหนังสือ",
            "วิ่งรอบบ้าน"
        ],
        correct: 0
    },

    {
        question: "อะไรเอ่ย มีตาแต่ดูไม่เห็น?",
        answers: [
            "เข็ม",
            "มันฝรั่ง",
            "พายุ",
            "ถูกทุกข้อ"
        ],
        correct: 3
    },

    {
        question: "ถ้าเดินเข้าห้องเรียนแล้วลืมว่ามาทำอะไร สิ่งที่เป็นไปได้มากที่สุดคืออะไร?",
        answers: [
            "สมองกำลังโหลด",
            "เดินผิดห้อง",
            "ลืมการบ้าน",
            "ถูกทุกข้อ"
        ],
        correct: 3
    }

];


/* =========================================================
   คลังคำถามความรู้ทั่วไป
========================================================= */

var knowledgeQuestions = [

    {
        question: "ลูกขนไก่สำหรับกีฬาแบดมินตันแบบดั้งเดิมทำจากอะไร?",
        answers: [
            "ขนไก่",
            "ขนเป็ดหรือขนห่าน",
            "ขนหมา",
            "ขนแมว"
        ],
        correct: 1
    },

    {
        question: "ประเทศไทยมีกี่จังหวัด?",
        answers: [
            "76 จังหวัด",
            "77 จังหวัด",
            "78 จังหวัด",
            "80 จังหวัด"
        ],
        correct: 1
    },

    {
        question: "ดาวเคราะห์ดวงใดอยู่ใกล้ดวงอาทิตย์ที่สุด?",
        answers: [
            "โลก",
            "ดาวศุกร์",
            "ดาวพุธ",
            "ดาวอังคาร"
        ],
        correct: 2
    },

    {
        question: "น้ำบริสุทธิ์เดือดที่อุณหภูมิประมาณเท่าไรที่ระดับน้ำทะเล?",
        answers: [
            "50°C",
            "80°C",
            "100°C",
            "150°C"
        ],
        correct: 2
    },

    {
        question: "สัตว์บกชนิดใดมีขนาดใหญ่ที่สุด?",
        answers: [
            "ยีราฟ",
            "ช้างแอฟริกา",
            "ฮิปโป",
            "แรด"
        ],
        correct: 1
    },

    {
        question: "ประเทศไทยใช้สกุลเงินอะไร?",
        answers: [
            "ดอลลาร์",
            "เยน",
            "บาท",
            "ยูโร"
        ],
        correct: 2
    },

    {
        question: "ปลาหมึกมีหัวใจกี่ดวง?",
        answers: [
            "1 ดวง",
            "2 ดวง",
            "3 ดวง",
            "4 ดวง"
        ],
        correct: 2
    },

    {
        question: "โลกโคจรรอบดวงอาทิตย์ใช้เวลาประมาณกี่วัน?",
        answers: [
            "30 วัน",
            "180 วัน",
            "365 วัน",
            "730 วัน"
        ],
        correct: 2
    },

    {
        question: "สีที่เกิดจากการผสมสีแดงกับสีเหลืองคือสีอะไร?",
        answers: [
            "สีเขียว",
            "สีม่วง",
            "สีส้ม",
            "สีน้ำเงิน"
        ],
        correct: 2
    },

    {
        question: "ประเทศใดมีรูปร่างคล้ายรองเท้าบูต?",
        answers: [
            "ฝรั่งเศส",
            "อิตาลี",
            "ญี่ปุ่น",
            "อินเดีย"
        ],
        correct: 1
    }

];


/* =========================================================
   สุ่มคำถาม
========================================================= */

function shuffleArray(array) {

    var newArray =
        array.slice();

    for(
        var i = newArray.length - 1;
        i > 0;
        i--
    ){

        var j =
            Math.floor(
                Math.random() * (i + 1)
            );

        var temp =
            newArray[i];

        newArray[i] =
            newArray[j];

        newArray[j] =
            temp;

    }

    return newArray;
}


/* =========================================================
   สร้างชุดคำถามสำหรับผู้เล่นคนนี้
========================================================= */

/*
   ฮา 7 ข้อ
   ความรู้ 8 ข้อ
   รวม 15 ข้อ
*/

var selectedFunny =
    shuffleArray(
        funnyQuestions
    ).slice(0, 7);


var selectedKnowledge =
    shuffleArray(
        knowledgeQuestions
    ).slice(0, 8);


/*
   รวมคำถาม
*/

var questions =
    selectedFunny.concat(
        selectedKnowledge
    );


/*
   สลับลำดับคำถามอีกครั้ง
*/

questions =
    shuffleArray(
        questions
    );


/* =========================================================
   ตัวแปรเกม
========================================================= */

var currentQuestion = 0;

var score = 0;

var answersLog = [];

var seconds = 0;

var timer;


/* =========================================================
   ชื่อผู้เล่น
========================================================= */

var playerName =
    localStorage.getItem(
        "playerName"
    );


if(!playerName){

    window.location.href =
        "index.html";

}


/* =========================================================
   Participant ID
========================================================= */

var participantId =
    localStorage.getItem(
        "participantId"
    );


/* =========================================================
   แสดงชื่อ
========================================================= */

var nameElement =
    document.getElementById(
        "playerName"
    );


if(nameElement){

    nameElement.innerHTML =
        escapeHTML(
            playerName
        );

}


/* =========================================================
   อัปเดตสถานะผู้เล่นเป็น playing
========================================================= */

if(
    typeof db !== "undefined" &&
    participantId
){

    db.collection(
        "participants"
    )
    .doc(participantId)
    .update({

        status: "playing"

    })
    .catch(function(error){

        console.log(
            "ไม่สามารถอัปเดตสถานะ playing:",
            error
        );

    });

}


/* =========================================================
   TIMER
========================================================= */

function startTimer(){

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

        }, 1000);

}


/* =========================================================
   แสดงคำถาม
========================================================= */

function showQuestion(){

    var q =
        questions[
            currentQuestion
        ];


    if(!q){

        finishGame();

        return;

    }


    /* -------------------------
       เลขข้อ
    ------------------------- */

    var numberElement =
        document.getElementById(
            "questionNumber"
        );


    if(numberElement){

        numberElement.innerHTML =

            "ข้อ " +

            (
                currentQuestion + 1
            ) +

            " / " +

            questions.length;

    }


    /* -------------------------
       คำถาม
    ------------------------- */

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


    /* -------------------------
       ตัวเลือก
    ------------------------- */

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


    /* -------------------------
       Progress Bar
    ------------------------- */

    var progress =
        (
            (currentQuestion + 1)
            /
            questions.length
        ) * 100;


    var progressBar =
        document.getElementById(
            "progressBar"
        );


    if(progressBar){

        progressBar.style.width =
            progress + "%";

    }

}


/* =========================================================
   ตรวจคำตอบ
========================================================= */

function checkAnswer(answer){

    var q =
        questions[
            currentQuestion
        ];


    if(!q){

        return;

    }


    var buttons =
        document.getElementsByClassName(
            "answer"
        );


    /*
       ป้องกันกดคำตอบซ้ำ
    */

    for(
        var i = 0;
        i < buttons.length;
        i++
    ){

        buttons[i].disabled =
            true;

    }


    var isCorrect =
        answer === q.correct;


    /* -------------------------
       เพิ่มคะแนน
    ------------------------- */

    if(isCorrect){

        score++;

        if(buttons[answer]){

            buttons[answer].className =
                "answer correct";

        }

    }

    else{

        if(buttons[answer]){

            buttons[answer].className =
                "answer wrong";

        }


        if(buttons[q.correct]){

            buttons[q.correct].className =
                "answer correct";

        }

    }


    /* =====================================================
       บันทึกเฉลยของผู้เล่นคนนี้
       สำคัญมากสำหรับหน้า Host
    ===================================================== */

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


    /* -------------------------
       ไปข้อถัดไป
    ------------------------- */

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

    }, 700);

}


/* =========================================================
   จบเกม
========================================================= */

function finishGame(){

    clearInterval(timer);


    /*
       บันทึกคะแนนในเครื่อง
    */

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


    /*
       บันทึกคะแนน Firebase
       และเปลี่ยนสถานะ participant เป็น finished
    */

    if(
        typeof db !== "undefined" &&
        participantId
    ){

        db.collection(
            "participants"
        )
        .doc(participantId)
        .set({

            name:
                playerName,

            score:
                score,

            time:
                seconds,

            status:
                "finished",

            answersLog:
                answersLog,

            finishedAt:
                firebase.firestore
                .FieldValue
                .serverTimestamp()

        }, {

            merge: true

        })
        .then(function(){

            console.log(
                "บันทึกผลผู้เล่นสำเร็จ"
            );

            savePlayerScore();

        })
        .catch(function(error){

            console.log(
                "บันทึก participant ไม่สำเร็จ:",
                error
            );

            /*
               ถึง participant จะบันทึกไม่ได้
               ก็ยังพยายามบันทึก players
            */

            savePlayerScore();

        });

    }

    else{

        savePlayerScore();

    }

}


/* =========================================================
   บันทึกคะแนนลง players
========================================================= */

function savePlayerScore(){

    /*
       ป้องกันการบันทึกซ้ำ
    */

    if(
        localStorage.getItem(
            "savedScore"
        ) === "true"
    ){

        window.location.href =
            "result.html";

        return;

    }


    if(
        typeof db === "undefined"
    ){

        console.log(
            "ไม่พบ Firebase"
        );

        window.location.href =
            "result.html";

        return;

    }


    db.collection(
        "players"
    )
    .add({

        name:
            playerName,

        score:
            score,

        time:
            seconds,

        answersLog:
            answersLog,

        createdAt:
            firebase.firestore
            .FieldValue
            .serverTimestamp()

    })
    .then(function(docRef){

        console.log(
            "บันทึกคะแนนสำเร็จ:",
            docRef.id
        );


        localStorage.setItem(
            "savedScore",
            "true"
        );


        window.location.href =
            "result.html";

    })
    .catch(function(error){

        console.log(
            "Firebase Error:",
            error
        );


        /*
           ยังไปหน้า Result ได้
           แม้ Firebase มีปัญหา
        */

        window.location.href =
            "result.html";

    });

}


/* =========================================================
   ป้องกัน HTML
========================================================= */

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


/* =========================================================
   เริ่มเกม
========================================================= */

startTimer();

showQuestion();
