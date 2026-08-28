var questions = [

    {
        question: "มนุษย์ปกติมีโครโมโซมทั้งหมดกี่แท่ง?",
        correct: "46 แท่ง"
    },

    {
        question: "มนุษย์มีโครโมโซมกี่คู่?",
        correct: "23 คู่"
    },

    {
        question: "โครโมโซมเพศของเพศหญิงโดยทั่วไปคืออะไร?",
        correct: "XX"
    },

    {
        question: "โครโมโซมเพศของเพศชายโดยทั่วไปคืออะไร?",
        correct: "XY"
    },

    {
        question: "สารพันธุกรรมหลักที่อยู่บนโครโมโซมคืออะไร?",
        correct: "DNA"
    },

    {
        question: "โครโมโซมอยู่บริเวณใดของเซลล์?",
        correct: "นิวเคลียส"
    },

    {
        question: "Down syndrome เกี่ยวข้องกับโครโมโซมคู่ใด?",
        correct: "คู่ที่ 21"
    },

    {
        question: "Edwards syndrome เกี่ยวข้องกับความผิดปกติของโครโมโซมคู่ใด?",
        correct: "คู่ที่ 18"
    },

    {
        question: "Patau syndrome เกี่ยวข้องกับโครโมโซมคู่ใด?",
        correct: "คู่ที่ 13"
    },

    {
        question: "เซลล์สืบพันธุ์ของมนุษย์มีโครโมโซมกี่แท่ง?",
        correct: "23"
    }

];


/* =====================================
   แสดงเฉลย
===================================== */

var html = "";


for (var i = 0; i < questions.length; i++) {

    html +=

        '<div class="answer-item">' +

            '<h3>ข้อ ' +
                (i + 1) +
            '</h3>' +

            '<p>' +
                questions[i].question +
            '</p>' +

            '<p class="correct-answer">' +

                '✅ เฉลย: ' +

                questions[i].correct +

            '</p>' +

        '</div>';

}


var answersBox =
    document.getElementById("answersBox");


if (answersBox) {

    answersBox.innerHTML = html;

}
