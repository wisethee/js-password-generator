# :file_folder: js-password-generator

[Demo URL](https://wisethee.github.io/js-password-generator/)

![Screenshot](https://github.com/wisethee/js-password-generator/blob/main/assets/images/cover.png?raw=true)

## Why I made this app
I created this password generator to display my JavaScript skills. This website, when the user clicks the "Generate Password" button will display a modal window. The user can select the length of the password between 8 and 64 characters and can choose characters of uppercase, lowercase, numbers or symbols.

**_NOTE:_** I wanted to increase the level of difficulty creating a modal window instead of using prompts.


## What I learned
I learned many important fundamentals of javascript creating this project. I used a combination of objects, arrays, function calls and if statements. I learned how to call functions, return values and many different manipulations that can be performed on objects, arrays and numbers like Math.Floor and Math.random. I also learned commonly used operators like ! and ===. I really enjoyed my time learning and creating this project!

**_NOTE:_** A functionality that I could bring to the application would be to ```removeEventListener``` when the modal is closed.

## Instructions
Your application must:
- Generate a password when the button is clicked.
- Present a series of prompts for password criteria:
  - Length of password:
    - At least 10 characters but no more than 64.
  - Character types:
    - Lowercase
    - Uppercase
    - Numeric
    - Special characters (```$@%&*```, etc.)
    - Code should validate for each input and at least one character type should be selected.
    - Once all prompts are answered, the password should be generated and displayed in an alert or written to the page.

## License
This project is open source and available under the [MIT License](LICENSE.md).