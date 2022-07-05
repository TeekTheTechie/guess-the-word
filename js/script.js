//Guess The Word game - 
//Step 1: Select Elements and Add Placeholders
//Step 2: Accept and Validate Player Guesses
//Step 3: Display Word & Guessed Letters
//Step 4: Fetch Words & Remaining Guesses
//Step 5: Hide "Guess" button, show "Play Again", and click event for new word and restart the guesses


const guessedLetters = document.querySelector(".guessed-letters");//targeting the unordered list where the player’s guessed letters will appear
const guessButton = document.querySelector(".guess");//targeting the button with the text "Guess!" in it
const playerLetter = document.querySelector(".letter");//targeting text input where the player will guess a letter
const wordInProgress = document.querySelector(".word-in-progress");//targeting the empty paragraph where the word in progress will appear
const remainingGuesses = document.querySelector(".remaining"); //targeting the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span"); //targeting the span inside the paragraph where the remaining guesses will display
const message = document.querySelector(".message"); //targeting the empty paragraph where messages will appear when the player guesses a letter
const playAgainButton = document.querySelector(".play-again"); //targeting the hidden button that will appear prompting the player to play again.

let word = "magnolia"; // starting word used to test game
let playerGuessedLetters = [];
let remainingGuessesShown = 8;


//Added Async function
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    gameLetters(word);
  };
  
  // Fire off the game
  getWord();

//Write a function to add placeholders for each letter
const gameLetters = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");

};

//gameLetters(word); //Calling the function and passing the "word" variable as the argument


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
         updateGuessesRemaining(guess);
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
  //console.log(revealWord)

wordInProgress.innerText = revealWord.join('');
checkIfWin();
};

//Function to Count Guesses Remaining

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Oh oh...no ${guess} in this word!`;
        remainingGuessesShown -= 1;
    }  else {
        message.innerText = `Great guess! There's a ${guess}!`;
    }

    if (remainingGuessesShown === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuessesShown === 1) {
        remainingGuessesSpan.innerText = `${remainingGuessesShown} guess` ;
    } else {
      remainingGuessesSpan.innerText = `${remainingGuessesShown} guesses`;
    }
};

     //Function to check for a win
     const checkIfWin = function () {
        if (word.toUpperCase() === wordInProgress.innerText) {
          message.classList.add("win");
          message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

          startOver();
        }
      };     

      //Function created to Hide and Show Elements
      const startOver = function () {
          guessButton.classList.add("hide");
          remainingGuesses.classList.add("hide");
          guessedLetters.classList.add("hide");
          playAgainButton.classList.remove("hide");
      };

      playAgainButton.addEventListener("click", function () {
        // reset all original values - grab new word
        message.classList.remove("win");
        playerGuessedLetters = [];
        remainingGuessesShown = 8;
        remainingGuessesSpan.innerText = `${remainingGuessesShown} guesses`;
        guessedLetters.innerHTML = "";
        message.innerText = "";
        // Grab a new word
        getWord();

        // show the right UI elements
  guessButton.classList.remove("hide");
  playAgainButton.classList.add("hide");
  remainingGuesses.classList.remove("hide");
  guessedLetters.classList.remove("hide");
});