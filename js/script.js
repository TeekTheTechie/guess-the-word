//Guess The Word game - 
//Step 1: Select Elements and Add Placeholders


const guessedLetters = document.querySelector(".guessed-letters");//targeting the unordered list where the player’s guessed letters will appear
const guessButton = document.querySelector(".guess");//targeting the button with the text "Guess!" in it
const playerLetter = document.querySelector(".letter");//targeting text input where the player will guess a letter
const wordInProgress = document.querySelector(".word-in-progress");//targeting the empty paragraph where the word in progress will appear
const remainingGuesses = document.querySelector(".remaining"); //targeting the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span"); //targeting the span inside the paragraph where the remaining guesses will display
const message = document.querySelector(".message"); //targeting the empty paragraph where messages will appear when the player guesses a letter
const playAgainButton = document.querySelector(".play-again"); //targeting the hidden button that will appear prompting the player to play again.

const word = "magnolia"; // starting word used to test game
const playerGuessedLetters = [];

//Write a function to add placeholders for each letter
const gameLetters = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");

};

gameLetters(word); //Calling the function and passing the "word" variable as the argument


//Add an event listener for the button
guessButton.addEventListener("click", function(e) {
    e.preventDefault(); //prevents the page from reloading every time the button is clicked
    message.innerText = ""; //empty message paragraph
    const guess = playerLetter.value; //variable created to capture the value of the input
    const goodGuess = playerInputCheck(guess); //make sure it's a single letter

    if (goodGuess) {
        makeGuess(guess);
    }
    playerLetter.value = "";
});

const playerInputCheck = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){ //Empty input
        message.innerText = "Enter a letter.";
    } else if (input.length > 1){ //Only one letter
        message.innerText = "Only 1 letter at a time!";
    }else if (!input.match(acceptedLetter)) { //Only letters...no other special characters
        message.innerText = "Please enter letters only.";
    } else { //Single letter entered
        return input;
    }
};    

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
     if (playerGuessedLetters.includes(guess)) {
         message.innerText = "You've guessed that before! Try again!";
     } else {
         playerGuessedLetters.push(guess);
         console.log(playerGuessedLetters);
         guessedLettersShown();
         updateWordInProgress(playerGuessedLetters);
        
     }
};
      //Function to Show Guessed Letters
const guessedLettersShown = function () {
    guessedLetters.innerHTML = "";
    for (const letter of playerGuessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLetters.append(li);
    }
};

      //Function to Update Word in Progress
const updateWordInProgress = function (playerGuessedLetters) {
    const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (playerGuessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  console.log(revealWord)

wordInProgress.innerText = revealWord.join('');
checkIfWin();
};

     //Function to check for a win
     const checkIfWin = function () {
        if (word.toUpperCase() === wordInProgress.innerText) {
          message.classList.add("win");
          message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        }
      };     