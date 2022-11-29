// Array of special characters to be included in password
var specialCharacters = [
  "@",
  "%",
  "+",
  "\\",
  "/",
  "'",
  "!",
  "#",
  "$",
  "^",
  "?",
  ":",
  ",",
  ")",
  "(",
  "}",
  "{",
  "]",
  "[",
  "~",
  "-",
  "_",
  ".",
];

// Array of numeric characters to be included in password
var numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

/**
 * Generate a password when the button is clicked
 * * Present a series of prompts for password criteria
 * * * Length of password
 * * * * At least 10 characters but no more than 64.
 * * * Character types
 * * * * Lowercase
 * * * * Uppercase
 * * * * Numeric
 * * * * Special characters ($@%&*, etc)
 * * Code should validate for each input and at least one character type should be selected
 * * Once prompts are answered then the password should be generated and displayed in an alert or written to the page
 */

// Function to prompt user for password options
const getPasswordOptions = () => {
  if (!hasValidLength) {
    addErrorClass(passwordHint);
    return;
  }

  if (!countChecked) {
    addErrorClass(charactersHint);
    return;
  }

  passwordCriteria = {
    length: Number(passwordLength.value),
    ...hasCheckedValue,
  };

  generatePassword();
  writePassword();
  closeModal();
};

// Function for getting a random element from an array
const getRandom = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

// Function to generate password with user input
const generatePassword = () => {
  const { length, numbers, characters, uppercase, lowercase } =
    passwordCriteria;
  const charsLength = Math.ceil(length / countChecked);
  let chars = [];

  if (characters) {
    const randomSpecialCharacters = [...Array(charsLength)].map(() => {
      return randomCharacter(specialCharacters);
    });
    chars.push(...randomSpecialCharacters);
  }

  if (numbers) {
    const randomNumericCharacters = [...Array(charsLength)].map(() => {
      return randomCharacter(numericCharacters);
    });
    chars.push(...randomNumericCharacters);
  }

  if (uppercase) {
    const randomUpperCasedLetters = [...Array(charsLength)].map(() => {
      return randomCharacter(upperCasedCharacters);
    });
    chars.push(...randomUpperCasedLetters);
  }

  if (lowercase) {
    const randomLowerCasedLetters = [...Array(charsLength)].map(() => {
      return randomCharacter(lowerCasedCharacters);
    });
    chars.push(...randomLowerCasedLetters);
  }

  const sliceChars = chars.slice(0, length);

  const shuffledCharacters = getRandom(sliceChars).join("");

  return shuffledCharacters;
};

// Get references to the #generate element
const generateButton = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateButton.addEventListener("click", writePassword);

/** DOM References */
const modal = document.getElementById("modal");

const passwordLength = document.getElementById("password-length");
const checkboxes = document.querySelectorAll(".checkbox");

const passwordHint = document.getElementById("password-hint");
const charactersHint = document.getElementById("characters-hint");

const submitButton = document.getElementById("submit-button");
const closeButton = document.getElementById("close-button");

/** Variables */
let showModal = false;
let hasValidLength = false;
let countChecked = 0;
let hasCheckedValue = {
  numbers: false,
  lowercase: false,
  uppercase: false,
  characters: false,
};
let passwordCriteria = {};

/** Callbacks */
const generatePasswordHandler = (event) => {
  event.preventDefault();
  openModal();
};

const closeModalHandler = (event) => {
  event.preventDefault();
  closeModal();
};

const passwordLengthHandler = (event) => {
  event.preventDefault();
  const { value } = event.target;

  if (!value || Number(value) < 10 || Number(value) > 64) {
    addErrorClass(passwordHint);
    hasValidLength = false;
  } else {
    addInfoClass(passwordHint);
    hasValidLength = true;
  }
};

const checkboxHandler = (event) => {
  const { id, checked } = event.target;

  checked ? countChecked++ : countChecked--;
  countChecked ? addInfoClass(charactersHint) : addErrorClass(charactersHint);

  hasCheckedValue = {
    ...hasCheckedValue,
    [id]: checked,
  };
};

const submitFormHandler = (event) => {
  event.preventDefault();
  getPasswordOptions();
};

/** Listeners */
generateButton.addEventListener("click", generatePasswordHandler);
closeButton.addEventListener("click", closeModalHandler);
passwordLength.addEventListener("keyup", passwordLengthHandler);
checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", checkboxHandler)
);
submitButton.addEventListener("click", submitFormHandler);

// STEP 1: "openModal" and "closeModal" functions control modal visibility
// when "openModal" is triggered first will reset the form after will remove hidden class
const openModal = () => {
  resetPasswordLength();
  resetCheckboxes();
  addInfoClass(passwordHint);
  addInfoClass(charactersHint);
  hasValidLength = false;
  countChecked = 0;
  hasCheckedValue = {
    numbers: false,
    lowercase: false,
    uppercase: false,
    characters: false,
  };
  showModal = true;
  modal.classList.remove("hidden");
};

const closeModal = () => {
  showModal = false;
  modal.classList.add("hidden");
};

/** Resetters */
const resetPasswordLength = () => {
  passwordLength.value = "";
};

const resetCheckboxes = () => {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
};

/** Validation */
const addErrorClass = (el) => {
  el.classList.remove("info");
  el.classList.add("error");
};

const addInfoClass = (el) => {
  el.classList.remove("error");
  el.classList.add("info");
};

/** Return a random character from data / array  */
const randomCharacter = (data) => {
  return data[Math.floor(Math.random() * data.length)];
};
