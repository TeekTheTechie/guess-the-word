//Guess The Word game - 
//Step 1: Select Elements and Add Placeholders


const guessedLetters = document.querySelector(".guessed-letters");//targeting the unordered list where the player’s guessed letters will appear
const guessButton = document.querySelector(".guess");//targeting the button with the text "Guess!" in it
const playerLetter = document.querySelector(".letter");//targeting text input where the player will guess a letter
const wordInProgress = document.querySelector(".word-in-progress");//targeting the empty paragraph where the word in progress will appear
const remainingGuesses = document.querySelector(".remaining"); //targeting the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span"); //targeting the span inside the paragraph where the remaining guesses will display
const messages = document.querySelector(".messages"); //targeting the empty paragraph where messages will appear when the player guesses a letter
const playAgainButton = document.querySelector(".play-again"); //targeting the hidden button that will appear prompting the player to play again.

const word = "magnolia"; // starting word used to test game

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
    const guess = playerLetter.value; //variable created to capture the value of the input
    console.log(guess);
    playerLetter.value = "";
});