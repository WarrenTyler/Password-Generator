// Array of special characters to be included in password
const specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
const lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
const upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function to prompt user for password options
function getPasswordOptions() {
  const options = {};

  options.length = parseInt(prompt("Enter Length (10-64): "));
  options.lowercase = confirm("Include Lowercase Characters?");
  options.uppercase = confirm("Include Uppercase Characters?");
  options.numeric = confirm("Include Numeric Characters?");
  options.special = confirm("Include Special Characters?");
  
  return options;
}

// Function for getting a random element from an array
function getRandom(arr) {
  let randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Function for getting an array containing all selected character options
function getAllSelectedCharacters(passwordOptions) {
  let bigArray = [];

  if(passwordOptions.lowercase) {
    bigArray = bigArray.concat(lowerCasedCharacters);
  }
  if(passwordOptions.uppercase) {
    bigArray = bigArray.concat(upperCasedCharacters);
  }
  if(passwordOptions.numeric) {
    bigArray = bigArray.concat(numericCharacters);
  }
  if(passwordOptions.special) {
    bigArray = bigArray.concat(specialCharacters);
  }

  return bigArray;
}

// Function to generate password with user input
function generatePassword() {
  const passwordOptions = getPasswordOptions();
  const allSelectedCharacters = getAllSelectedCharacters(passwordOptions);
  
  let password = "";
  // choose a random character from the bigArray bassed on the length the user selected
  for(let i = 0; i < passwordOptions.length; i++) {
    password += getRandom(allSelectedCharacters);
  }
  
  console.log(`Generated Password: ${password}     IS ${password.length} LONG`);
  console.log(allSelectedCharacters);
  console.log(passwordOptions);

  return password;
}

// Get references to the #generate element
const generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector('#password');
  
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);