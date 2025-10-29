 var firebaseConfig = {
    apiKey: "AIzaSyDhKWFe4ZPZpN2d906OC80U02cLYIZAwCI",
    authDomain: "quiz-application-b9a66.firebaseapp.com",
    projectId: "quiz-application-b9a66",
    storageBucket: "quiz-application-b9a66.firebasestorage.app",
    messagingSenderId: "113612124629",
    appId: "1:113612124629:web:5d0b98310d5bf703d24d5c",
    measurementId: "G-DEN287DBP6"
  };

  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);
  var db = firebase.database();


var questions = [
  {
    question: "Q1: HTML Stands for?",
    option1: "Hyper Text Markup Language",
    option2: "Hyper Tech Markup Language",
    option3: "Hyper Touch Markup Language",
    corrAnswer: "Hyper Text Markup Language",
  },
  {
    question: "CSS Stands for",
    option1: "Cascoding Style Sheets",
    option2: "Cascading Style Sheets",
    option3: "Cascating Style Sheets",
    corrAnswer: "Cascading Style Sheets",
  },
  {
    question: "Which tag is used for most large heading",
    option1: "<h6>",
    option2: "<h2>",
    option3: "<h1>",
    corrAnswer: "<h1>",
  },
  {
    question: "Which tag is used to make element unique ",
    option1: "id",
    option2: "class  ",
    option3: "label",
    corrAnswer: "id",
  },
  {
    question: "Any element assigned with id, can be get in css ",
    option1: "by # tag",
    option2: "by @ tag",
    option3: "by & tag",
    corrAnswer: "by # tag",
  },
  {
    question: "CSS can be used with ______ methods ",
    option1: "8",
    option2: "3",
    option3: "4",
    corrAnswer: "3",
  },
  {
    question: "In JS variable types are ____________ ",
    option1: "6",
    option2: "3",
    option3: "8",
    corrAnswer: "8",
  },
  {
    question: "In array we can use key name and value ",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
  {
    question: "toFixed() is used to define length of decimal ",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "True",
  },
  {
    question: "push() method is used to add element in the start of array ",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
];

var quesElement = document.getElementById("ques");
quesElement.style.fontSize = "30px";
quesElement.style.fontFamily = "'Trebuchet Ms', Helvetica, sans-serif";
var option1 = document.getElementById("opt1");
option1.style.fontFamily = 'Nunito'
option1.style.fontFamily = 'Times New Roman, Times, serif';
option1.style.fontSize = "20px";
var option2 = document.getElementById("opt2");
option2.style.fontSize = "20px";
var option3 = document.getElementById("opt3");
option3.style.fontSize = "20px";
var index = 0;
var nextBtn = document.getElementById("btn");
nextBtn.style.paddingLeft =  "20px";
nextBtn.style.paddingRight = "20px";
nextBtn.style.borderRadius = "20px";
nextBtn.style.fontSize = "20px";
var score = 0;
var min = 1;
var sec = 59;

function timer() {
  var pElement = document.getElementById("time");
  pElement.innerHTML = min + ":" + sec;
  sec--;
  if (sec < 0) {
    min--;
    sec = 59;
    if (min < 0) {
      min = 1;
      sec = 59;
      nextQuestion();
    }
  }
}

setInterval(timer, 100);

function nextQuestion() {
  var allInputs = document.getElementsByTagName("input");

  for (var i = 0; i < allInputs.length; i++) {
    if (allInputs[i].checked) {
      allInputs[i].checked = false;
      var userSelectedValue = allInputs[i].value;

      var selectedOption = questions[index - 1]["option" + userSelectedValue];
      var correctAnswer = questions[index - 1]["corrAnswer"];
      var currentQuestion = questions[index - 1]["question"];

       db.ref("quizResponses").push({
         question: currentQuestion,
         userAnswer: selectedOption,
         correctAnswer: correctAnswer,
         timestamp: new Date().toLocaleString()
  });
      if (correctAnswer === selectedOption) {
        score++;
      }

      console.log("Saved:", currentQuestion, selectedOption, correctAnswer);

    }
    nextBtn.disabled = true;
  }

 if (index >= questions.length) {
  if (!window.quizFinished) {
    window.quizFinished = true; 
    
    var percentage = ((score / questions.length) * 100).toFixed(2);

    db.ref("quizResults").push({
      totalQuestions: questions.length,
      correctAnswers: score,
      percentage: percentage,
      timestamp: new Date().toLocaleString()
    });

    Swal.fire({
      title: "Good job!",
      text: "Your score: " + percentage + "%",
      icon: "success",
    });
  }
  return; 
} else {
  quesElement.innerText = questions[index].question;
  option1.innerText = questions[index].option1;
  option2.innerText = questions[index].option2;
  option3.innerText = questions[index].option3;
  index++;
}

}
nextQuestion();

function trigger() {
  nextBtn.disabled = false;
}

window.addEventListener("beforeunload", function () {
  db.ref().remove();
});

