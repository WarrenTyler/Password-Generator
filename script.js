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

const passwordRange = {
  min: 10,
  max: 64
}

function getValidPasswordLength(min, max) {
  let length = 0;

  do {
    const message = `Enter Length of Password (Min: ${passwordRange.min}, Max: ${passwordRange.max}): `
    // use short circuit evaluation to populate value of length
    length = parseInt(prompt(message)) || length;
  } while (length < min || length > max);

  return length;
}

function getValidCharacterOptions() {
  const characterOptions = {};

  do {
    alert("You must select at least one character type from the following options");

	  characterOptions.lowercase = confirm("Include Lowercase Characters (OK to include, Cancel to ignore)?");
	  characterOptions.uppercase = confirm("Include Uppercase Characters (OK to include, Cancel to ignore)?");
	  characterOptions.numeric = confirm("Include Numeric Characters (OK to include, Cancel to ignore)?");
	  characterOptions.special = confirm("Include Special Characters (OK to include, Cancel to ignore)?");

  } while (! Object.values(characterOptions).includes(true));
  
  return characterOptions;
}

function getPasswordOptions() {

  return {
    length: getValidPasswordLength(passwordRange.min, passwordRange.max),
    ...getValidCharacterOptions()
  }
}

function getRandomIndex(arr) {

  return Math.floor(Math.random() * arr.length);
}

function getRandomCharacter(arr) {

  return arr[getRandomIndex(arr)];
}

// returns a 2D array containing all selected character option arrays
function getAllSelectedCharacters(passwordOptions) {
  const selectedCharacterArrays = [];

  if(passwordOptions.lowercase) {
    selectedCharacterArrays.push(lowerCasedCharacters);
  }
  if(passwordOptions.uppercase) {
    selectedCharacterArrays.push(upperCasedCharacters);
  }
  if(passwordOptions.numeric) {
    selectedCharacterArrays.push(numericCharacters);
  }
  if(passwordOptions.special) {
    selectedCharacterArrays.push(specialCharacters);
  }

  return selectedCharacterArrays;
}

function getRandomPassword(passwordOptions, allSelectedCharacters) {
  let password = "";
  // generate a string of random character bassed on the length the user selected
  for(let i = 0; i < passwordOptions.length; i++) {
    // randomly select a character array to choose a random character from.
    // this should increase the chances of including at least one character 
    // from each of the selected character arrays.
    password += getRandomCharacter(allSelectedCharacters[getRandomIndex(allSelectedCharacters)]);
  }

  return password;
}

// generate password with user input
function generatePassword() {
  const passwordOptions = getPasswordOptions();

  return getRandomPassword(
    passwordOptions, 
    getAllSelectedCharacters(passwordOptions)
  );
}


// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector('#password');
  
  passwordText.value = password;
}

// Get references to the #generate element
const generateBtn = document.querySelector('#generate');
// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);