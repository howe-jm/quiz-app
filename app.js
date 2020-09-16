/* eslint-disable no-console */
/* global $ */

'use strict';

/**
 * Example store structure
 */
const STORE = {
  // 5 or more questions are required
  questions: [
    {
      question: 'Q1',
      answers: ['A1', 'A2', 'A3', 'A4'],
      correctAnswer: 'A2',
    },
    {
      question: 'Q2',
      answers: ['A1', 'A2', 'A3', 'A4'],
      correctAnswer: 'A4',
    },
    {
      question: 'Q3',
      answers: ['A1', 'A2', 'A3', 'A4'],
      correctAnswer: 'A3',
    },
    {
      question: 'Q4',
      answers: ['A1', 'A2', 'A3', 'A4'],
      correctAnswer: 'A2',
    },
    {
      question: 'Q5',
      answers: ['A1', 'A2', 'A3', 'A4'],
      correctAnswer: 'A1',
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
};

/*
// Create the question HTML string
// Display the beginning HTML
// Display the results HTML

/* Present each question with:
    - 4 potential answers
    - A running count of correct questions
    - Total questions
    - A button to submit the answer
*/

// A function that chooses what to display based on where the user is (Beginning, questions, results)
function render() {
  // console.log(STORE.questions.length);
  // console.log(STORE.questionNumber);
  if (STORE.quizStarted === false) {
    $('.js-main').html(quizStartPage());
  } else {
    if (STORE.questionNumber < STORE.questions.length) {
      $('.js-main').html(QuizQuestionPage(STORE, STORE.questionNumber));
    } else {
      $('.js-main').html(QuizResultsPage());
    }
  }
}

function quizStartPage() {
  // console.log('quizStartPage ran');
  const QuizzStartPageHTML = quizStartPageString();
  return QuizzStartPageHTML;
}

function quizStartPageStartButton() {
  // console.log('quizStartPageStartButton ran');
  $('.js-main').on('click', '.js-start-page-submit', (evt) => {
    evt.preventDefault();
    STORE.quizStarted = true;
    render();
  });
}

function quizStartPageString() {
  // console.log('quizStartPageStringGenerator ran');
  return `
  <section class="quiz-container">
  <form class="quiz-form">
    <button class="js-start-page-submit">START</button>
  </form>
  </section>
`;
}

function QuizQuestionPage(array, qNum) {
  // console.log('QuizQuestionPage ran');
  const question = array.questions[qNum];
  // console.log(question);
  const questionHTML = quizQuestionStringGenerator(question);
  return questionHTML;
  // const quizQuestionString = quizQuestionStringGenerator();
  // return quizQuestionString;
}

function questionSubmitButton() {
  // console.log('quizSubmitButton ran');
  $('.js-main').on('click', '.js-question-page-submit', (evt) => {
    evt.preventDefault();
    if ($('form input[type=radio]:checked').val() === STORE.questions[STORE.questionNumber].correctAnswer) {
      STORE.score++;
    }
    STORE.questionNumber++;
    render();
  });
}

function quizQuestionStringGenerator(quest) {
  // console.log(STORE.questions[STORE.questionNumber].correctAnswer)
  return `
  <section class="quiz-container">
  <p>Cheat Mode Answer: ${STORE.questions[STORE.questionNumber].correctAnswer}</p>
  <form id="quiz-form"><h4>${quest.question}</h4>
    <input type="radio" id="ans1" name="answers" value="${quest.answers[0]}">
    <label for="ans1">${quest.answers[0]}</label><br>
    <input type="radio" id="ans1" name="answers" value="${quest.answers[1]}">
    <label for="ans1">${quest.answers[1]}</label><br>
    <input type="radio" id="ans1" name="answers" value="${quest.answers[2]}">
    <label for="ans1">${quest.answers[2]}</label><br>
    <input type="radio" id="ans1" name="answers" value="${quest.answers[3]}">
    <label for="ans1">${quest.answers[3]}</label><br>
    <button class="js-question-page-submit">SUBMIT ANSWER</button>
  </form>
  <p>Current score is ${STORE.score} out of ${STORE.questions.length}</p>
  </section>
  `;
}

function QuizResultsPage() {
  // console.log('QuizResultsPage ran');
  return `
  <section class="quiz-container">
  <p>Results Page</p>
  <p>Final score is ${STORE.score} out of ${STORE.questions.length}</p>
  <form class="quiz-form">
    <button class="js-results-page-submit">Restart</button>
  </form>
  </section>
  `;
}

function main() {
  render();
  quizStartPageStartButton();
  questionSubmitButton();
}

$(main);

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
