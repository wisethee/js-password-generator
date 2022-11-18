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
const getPasswordOptions = () => {};

// Function for getting a random element from an array
const getRandom = (arr) => {};

// Function to generate password with user input
const generatePassword = () => {};

// Get references to the #generate element
const generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");

  passwordText.value = password;

  toggleModal();
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

/** START */

/** DOM References */
const modal = document.getElementById("modal");
const passwordLength = document.getElementById("password-length");
const charactersCheckboxes = document.querySelectorAll(".checkbox");
const passwordHint = document.getElementById("password-hint");
const charactersHint = document.getElementById("characters-hint");
const submit = document.getElementById("submit-button");

/** Variables */
let showModal = false;
let isUnchecked = [];
let passwordCriteria = {};

// show / hide modal
const toggleModal = () => {
  showModal = !showModal;
  showModal ? modal.classList.remove("hidden") : modal.classList.add("hidden");
  showModal
    ? passwordLengthInputListener()
    : removePasswordLengthInputListener();
  showModal ? submitButtonListener() : removeSubmitButtonListener();
  showModal ? checkboxListener() : removeCheckboxListener();
};

const resetAllCheckboxes = () => {
  charactersCheckboxes.forEach((checkbox) => {
    let { id, checked } = checkbox;
    checked = false;
    isUnchecked.push(id);
  });
};

const resetInput = () => {
  passwordLength.value = "";
};

const resetForm = () => {
  resetInput();
  resetAllCheckboxes();
};

const handleSubmitButton = (event) => {
  event.preventDefault();

  // validate passwordLength
  if (
    !passwordLength.value ||
    passwordLength.value < 10 ||
    passwordLength.value > 64
  ) {
    addErrorClass(passwordHint);
    return;
  }

  if (isUnchecked.length === 4) {
    addErrorClass(charactersHint);
    return;
  }

  console.log(passwordCriteria);

  // validate character types
  resetForm();
  toggleModal();
};

const addErrorClass = (el) => {
  el.classList.remove("info");
  el.classList.add("error");
};

const addInfoClass = (el) => {
  el.classList.remove("error");
  el.classList.add("info");
};

// STEP1: Present a series of prompts for password criteria
const handlePasswordLengthInput = (event) => {
  event.preventDefault();

  const { value } = event.target;
  value ? addInfoClass(passwordHint) : addErrorClass(passwordHint);

  // add passwordLength value to passwordCriteria
  passwordCriteria = {
    ...passwordCriteria,
    passwordLength: value,
  };
};

const submitButtonListener = () => {
  submit.addEventListener("click", handleSubmitButton);
};

const removeSubmitButtonListener = () => {
  submit.removeEventListener("click", handleSubmitButton);
};

const passwordLengthInputListener = () =>
  passwordLength.addEventListener("keyup", handlePasswordLengthInput);

const removePasswordLengthInputListener = () => {
  passwordLength.removeEventListener("keyup", handlePasswordLengthInput);
};

const handleCheckbox = (event) => {
  const { id, checked } = event.target;
  !checked
    ? isUnchecked.push(id)
    : (isUnchecked = isUnchecked.filter((item) => item !== id));

  passwordCriteria = {
    ...passwordCriteria,
    [id]: checked,
  };
};

const checkboxListener = () => {
  charactersCheckboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", handleCheckbox)
  );
};

const removeCheckboxListener = () => {
  charactersCheckboxes.forEach((checkbox) =>
    checkbox.removeEventListener("change", handleCheckbox)
  );
};

// Init modal
const initModal = () => {
  modal.classList.add("hidden");
  resetInput();
  resetAllCheckboxes();
};

initModal();
