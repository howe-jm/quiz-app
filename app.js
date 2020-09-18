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
      question: 'Where did Yoda exile to after the fall of the Republic?',
      answers: ['Tattooine', 'Dagobah', 'Kashyyk', 'Coruscant'],
      correctAnswer: 'Dagobah',
    },
    {
      question: 'Where is the capital of the Republic?',
      answers: ['Naboo', 'Geonosis', 'Coruscant', 'Kamino'],
      correctAnswer: 'Coruscant',
    },
    {
      question: 'What was Han Solo\'s original job title?',
      answers: ['Pirate', 'Trooper', 'Gambler', 'Smuggler'],
      correctAnswer: 'Smuggler',
    },
    {
      question: 'Who brought about the end of the Republic?',
      answers: ['Yoda', 'Palpatine', 'Dooku', 'Anakin'],
      correctAnswer: 'Palpatine',
    },
    {
      question: 'What is the name of Luke Skywalker\'s ship?',
      answers: ['X-wing', 'Y-wing', 'Millenium Falcon', 'Tie fighter'],
      correctAnswer: 'X-wing',
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  correct: false,
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
      $('.js-main').html(quizQuestionStringGenerator(STORE.questions[STORE.questionNumber]));
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
  <section>
  <form class="quiz-form">
    <div class="start-button">
      <button class="js-start-page-submit" type="submit">START</button>
    </div>
  </form>
  </section>
`;
}

// Quiz question page functions.

/*
    This function is a callback of the 'main' function and monitors
    for a click of the Submit button on the question page. When the
    button is clicked, it checks to see if the answer the user gives
    matches the correct answer. If it does, it adds 1 to the
    STORE.score. Either way, it increases the STORE.questionNumber
    variable by one at the end, and triggers a re-render of the page.
*/

function questionSubmitButton() {
  $('.js-main').submit('.js-question-page-submit', (evt) => {
    evt.preventDefault();
    if ($('form input[type=radio]:checked').val() === STORE.questions[STORE.questionNumber].correctAnswer) {
      STORE.score++;
      STORE.correct = true;
      $('.post-question').html(generatePostQuestionString(STORE.correct));
      $('.post-question').removeClass('hidden');
      $('.answer-select').addClass('hidden');
      $('.question-stats').addClass('hidden');
      $('.js-question-page-submit').addClass('hidden');
    } else {
      STORE.correct = false;
      $('.post-question').html(generatePostQuestionString(STORE.correct));
      $('.post-question').removeClass('hidden');
      $('.answer-select').addClass('hidden');
      $('.question-stats').addClass('hidden');
      $('.js-question-page-submit').addClass('hidden');
    }
  });
}

function generatePostQuestionString(correct) {
  const string = correct
    ? `<p>The correct answer was ${STORE.questions[STORE.questionNumber].correctAnswer}.</p><p>You answered <span class="blue">RIGHT!</span></p> <input type="submit" value="proceed" class="js-question-page-next"></input>`
    : `<p>The correct answer was ${STORE.questions[STORE.questionNumber].correctAnswer}</p><p>You answered <span class="red">WRONG!</span></p></p> <input type="submit" value="proceed" class="js-question-page-next"></input>`;
  return string;
}

function nextQuestionButton() {
  $('.js-main').on('click', '.js-question-page-next', (evt) => {
    evt.preventDefault();
    STORE.questionNumber++;
    $('.post-question').addClass('hidden');
    $('.answer-select').removeClass('hidden');
    $('.question-stats p').removeClass('hidden');
    $('.js-question-page-submit').removeClass('hidden');
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
  <h2>${quest.question}</h2>
  <form id="quiz-form">
    <ul class="answer-select">
    <li>
      <input type="radio" id="ans1" name="answers" value="${quest.answers[0]}" required>
      <label for="ans1">${quest.answers[0]}</label><br>
    </li>
    <li>
      <input type="radio" id="ans2" name="answers" value="${quest.answers[1]}">
      <label for="ans2">${quest.answers[1]}</label><br>
    </li>
    <li>
      <input type="radio" id="ans3" name="answers" value="${quest.answers[2]}">
      <label for="ans3">${quest.answers[2]}</label><br>
    </li>
    <li>
      <input type="radio" id="ans4" name="answers" value="${quest.answers[3]}">
      <label for="ans4">${quest.answers[3]}</label><br>
    </li>
      <input type="submit" value="SuBMiT ANSWER" class="js-question-page-submit">
    </ul>
    <div class="post-question hidden"></div>
  </form>
  <p class="question-stats">Answered Correctly: ${STORE.score}</p><p class="question-stats">Answered Incorrectly: ${STORE.questionNumber - STORE.score}</p>
  <p class="question-stats">Question ${STORE.questionNumber + 1} out of ${STORE.questions.length}</p>
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
  <form class="results-box">
  <p>The correct answer was ${STORE.questions[4].correctAnswer}.</p>
  ${STORE.correct ? '<p>You answered <span class="blue">RIGHT!</span></p>' : '<p>You answered <span class="red">WRONG!<span></p>'}
  <p>Final score is ${STORE.score} out of ${STORE.questions.length}</p>
  <button class="js-results-page-submit restart-button">Restart</button>
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
  nextQuestionButton();
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
