const form = document.getElementById("form");
const fullName = document.getElementById("name");
const errorMsg = document.getElementById("error-msg");
const email = document.getElementById("email");
const emailErrorMsg = document.getElementById("emailErrorMsg");
const password = document.getElementById("password");
const passwordErrorMsg = document.getElementById("passwordErrorMsg");
const confirmPassword = document.getElementById("confirm-password");
const confirmPasswordErrorMsg = document.getElementById(
  "confirmPasswordErrorMsg",
);
const submitMsg = document.getElementById("submitMsg");
const submitBtn = document.getElementById("submit-btn");

///////////////////////////////////////////////////////
// Full Name Validation
///////////////////////////////////////////////////////
// At least 3 characters
function leastThreecharacters(text) {
  return text.value.trim().length >= 3;
}

// At least 2 words
function twoWords(text) {
  const value = text.value.trim();
  let wordsCount = 0;
  let inWord = false;

  for (let i = 0; i < value.length; i++) {
    if (value[i] !== " " && !inWord) {
      wordsCount++;
      inWord = true;
    } else if (value[i] === " ") {
      inWord = false;
    }
  }

  return wordsCount >= 2;
}

// No numbers
function noNumbers(text) {
  const value = text.value;
  for (let i = 0; i < value.length; i++) {
    if (!isNaN(value[i]) && value[i] !== " ") return false;
  }
  return true;
}

// Check full name
function checkFullName(text) {
  if (!leastThreecharacters(text) || !twoWords(text) || !noNumbers(text)) {
    errorMsg.textContent = "Enter full name";
    return false;
  }
  errorMsg.textContent = "";
  return true;
}

///////////////////////////////////////////////////////
// Email Validation
///////////////////////////////////////////////////////
function checkEmail(email) {
  const inputEmail = email.value.trim();

  if (inputEmail === "") {
    emailErrorMsg.textContent = "Please enter a valid email address";
    return false;
  }

  if (!inputEmail.includes("@") || !inputEmail.includes(".")) {
    emailErrorMsg.textContent = "Enter a valid email address";
    return false;
  }

  emailErrorMsg.textContent = "";
  return true;
}

///////////////////////////////////////////////////////
// Password Validation
///////////////////////////////////////////////////////

// At least 1 uppercase letter
function atLeastOneUppercaseLetter(password) {
  const value = password.value.trim();

  for (let i = 0; i < value.length; i++) {
    if (value[i] === value[i].toUpperCase() && value[i] !== " ") return true;
  }
  return false;
}

// At least 1 lowercase letter
function atLeastOneLowercaseLetter(password) {
  const value = password.value.trim();

  for (let i = 0; i < value.length; i++) {
    if (value[i] === value[i].toLowerCase() && value[i] !== " ") return true;
  }
  return false;
}

// At least 1 number
function atLeastOneNumber(password) {
  const value = password.value.trim();

  for (let i = 0; i < value.length; i++) {
    if (!isNaN(value[i]) && value[i] !== " ") return true;
  }
  return false;
}

//  At least 1 special character (!@#$%^&* etc.)
function atLeastOneSpecialCharacter(password) {
  const value = password.value.trim();
  const specialCharacters = "!@#$%^&*";

  for (let i = 0; i < value.length; i++) {
    if (specialCharacters.includes(value[i]) && value[i] !== " ") return true;
  }
  return false;
}

// Password Validation
function checkPassword(password) {
  const value = password.value.trim();

  if (value.length < 8) {
    passwordErrorMsg.textContent = "Password must be at least 8 characters";
  }

  if (value == "") {
    passwordErrorMsg.textContent = "Please enter a password";
  }

  if (
    atLeastOneUppercaseLetter(password) &&
    atLeastOneLowercaseLetter(password) &&
    atLeastOneNumber(password) &&
    atLeastOneSpecialCharacter(password)
  ) {
    passwordErrorMsg.textContent = "";
    return true;
  } else {
    passwordErrorMsg.textContent =
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character";
    return false;
  }
}

///////////////////////////////////////////////////////
// Confirm Password
///////////////////////////////////////////////////////
function checkConfirmPassword(password, confirmPassword) {
  if (password.value !== confirmPassword.value) {
    confirmPasswordErrorMsg.textContent = "Passwords do not match";
    return false;
  }
  confirmPasswordErrorMsg.textContent = "";
  return true;
}

//////////////////////////////////////////////////////
// Event listeners
///////////////////////////////////////////////////////
fullName.addEventListener("input", () => checkFullName(fullName));
email.addEventListener("input", () => checkEmail(email));
password.addEventListener("input", () => checkPassword(password));
confirmPassword.addEventListener("input", () =>
  checkConfirmPassword(password, confirmPassword),
);

//////////////////////////////////////////////////////
// Disable State listeners
///////////////////////////////////////////////////////
function disableStateListeners() {
  const isNameValid = checkFullName(fullName);
  const isEmailValid = checkEmail(email);
  const isPasswordValid = checkPassword(password);
  const isConfirmPasswordValid = checkConfirmPassword(
    password,
    confirmPassword,
  );

  if (
    isNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid
  ) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

fullName.addEventListener("input", disableStateListeners);
email.addEventListener("input", disableStateListeners);
password.addEventListener("input", disableStateListeners);
confirmPassword.addEventListener("input", disableStateListeners);

//////////////////////////////////////////////////////
// Submit Form
///////////////////////////////////////////////////////

let TotalDate = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isNameValid = checkFullName(fullName);
  const isEmailValid = checkEmail(email);
  const isPasswordValid = checkPassword(password);
  const isConfirmPasswordValid = checkConfirmPassword(
    password,
    confirmPassword,
  );

  // If any fail, prevent submission
  if (
    !isNameValid ||
    !isEmailValid ||
    !isPasswordValid ||
    !isConfirmPasswordValid
  ) {
    submitMsg.textContent = "Please fill out all fields.";
    submitMsg.style.color = "red";
  } else {
    submitMsg.textContent = "Form submitted successfully!";
    submitMsg.style.color = "green";
  }

  const DataSave = {
    name: fullName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };

  TotalDate.push(DataSave);
  console.log(TotalDate);
});
