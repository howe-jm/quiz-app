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
      question: 'What day starts with W?',
      answers: ['Sunday', 'Wednesday', 'April', 'Bacon'],
      correctAnswer: 'Wednesday',
    },
    {
      question: 'What\'s the coldest month of the year?',
      answers: ['February', 'June', 'August', 'May'],
      correctAnswer: 'February',
    },
    {
      question: 'What continent is mostly frozen?',
      answers: ['Asia', 'Antarctica', 'Australia', 'South America'],
      correctAnswer: 'Antarctica',
    },
    {
      question: 'When is a door not a door?',
      answers: ['When it\'s open.', 'When it\'s closed.', 'When it\'s ajar.', 'When it\'s cracked.'],
      correctAnswer: 'When it\'s ajar.',
    },
    {
      question: 'What does lava do?',
      answers: ['Dance', 'Jump', 'Cool', 'Burn'],
      correctAnswer: 'Burn',
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
};

/*  The rendering function, which checks to see which stage of the quiz the
    user is on and generates the appropriate HTML template accordingly.
    Since the start page doesn't need to dynamically change, we directly
    reference its string generation function (which is really more of a
    template storage function).
*/
function render() {
  // If the quizStarted property of STORE is false, we display the quiz start page.
  if (STORE.quizStarted === false) {
    $('.js-main').html(quizStartPageString());
    /* Otherwise, we check that the current questionNumber value is less than the
  length of the questions array. If it is, we call the QuizQuestionPage function
  with the STORE object, and the STORE.questionNumber value as arguments.
  */
  } else {
    if (STORE.questionNumber < STORE.questions.length) {
      $('.js-main').html(QuizQuestionPage(STORE, STORE.questionNumber));
      /*  And if STORE.questionNumber is equal to or greater than STORE.questions.length,
        we move on and display the quiz results page. It is dynamically generated (it 
        displays the total amount of questions the user answered correctly), but since
        it displays global variables, it does not need its own function.
    */
    } else {
      $('.js-main').html(QuizResultsPage());
    }
  }
}

// The start page functions.

/*  Function for monitoring the start page button
    and updating the quizStarted value once it's pressed, then
    triggers a re-render of the page.

    This function is run as a callback in the 'main' function.
*/

function quizStartPageStartButton() {
  $('.js-main').on('click', '.js-start-page-submit', (evt) => {
    evt.preventDefault();
    STORE.quizStarted = true;
    render();
  });
}

//  This function stores the template for the starting page

function quizStartPageString() {
  return `
  <section class="quiz-container">
  <form class="quiz-form">
    <button class="js-start-page-submit">START</button>
  </form>
  </section>
`;
}

// Quiz question page functions.

/*  This function takes arguments from the 'render' function
    and dynamically generates a question page based on the
    arguments. It then feeds the array and the number of the
    question in to the quizQuestionStringGenerator as one argument
    and generates the HTML for the question that needs to be displayed.
    This way, the template (and no other code) can be stored, easily
    found, and manipulated later.
*/

function QuizQuestionPage(array, qNum) {
  const question = array.questions[qNum];
  const questionHTML = quizQuestionStringGenerator(question);
  return questionHTML;
}

/*
    This function is a callback of the 'main' function and monitors
    for a click of the Submit button on the question page. When the
    button is clicked, it checks to see if the answer the user gives
    matches the correct answer. If it does, it adds 1 to the
    STORE.score. Either way, it increases the STORE.questionNumber
    variable by one at the end, and triggers a re-render of the page.
*/

function questionSubmitButton() {
  $('.js-main').submit('#quiz-form', (evt) => {
    evt.preventDefault();
    if ($('form input[type=radio]:checked').val() === STORE.questions[STORE.questionNumber].correctAnswer) {
      STORE.score++;
    }
    STORE.questionNumber++;
    render();
  });
}

/*
    This function stores the template for the questions. Since all of
    our questions have only four potential answers, there is no need
    to iterate through them and dynamically generate each question.
    It also generates the Submit button for the function above, and
    displays a running count of correct vs. total questions.
*/

function quizQuestionStringGenerator(quest) {
  return `
  <section class="quiz-container">
  <p>Cheat Mode Answer: ${STORE.questions[STORE.questionNumber].correctAnswer}</p>
  <form id="quiz-form"><h4>${quest.question}</h4>
    <input type="radio" id="ans1" name="answers" value="${quest.answers[0]}" required>
    <label for="ans1">${quest.answers[0]}</label><br>
    <input type="radio" id="ans2" name="answers" value="${quest.answers[1]}">
    <label for="ans2">${quest.answers[1]}</label><br>
    <input type="radio" id="ans3" name="answers" value="${quest.answers[2]}">
    <label for="ans3">${quest.answers[2]}</label><br>
    <input type="radio" id="ans4" name="answers" value="${quest.answers[3]}">
    <label for="ans4">${quest.answers[3]}</label><br>
    <input type="submit" value="SUBMIT ANSWER" class="js-question-page-submit">
  </form>
  <p>Current score is ${STORE.score} out of ${STORE.questions.length}</p>
  </section>
  `;
}

/*
    This function displays the results of the quiz. It calls on global
    variables, so it doesn't need a seperate function to isolate those
    variables from the template. It features a restart button, which
    will restart the quiz from the beginning, which it accomplishes by
    simply using the button's default behavior: Refereshing the page.
*/

function QuizResultsPage() {
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

function resultsResetButton() {
  $('.js-main').on('click', '.js-results-page-submit', () => location.reload());
}
/*
    This is the main callback function. It triggers the initial render
    of the page, as well as runs the button functions. Even though the
    Submit button won't exist when the page is first loaded, using
    proper delegation in that function and running it here will ensure
    that the user doesn't crash their browser with compounding loops, 
    which I discovered was possible the hard way.
*/

function main() {
  render();
  quizStartPageStartButton();
  questionSubmitButton();
  resultsResetButton();
}

// And finally, the main callback, loaded when the page is finished loading.
// This is what starts the show!

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
