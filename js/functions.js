const checkStringLength = (string, length) => {
  return (string.length === length) ? true : false;
}

const checkForPolindrome = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string.at(i);
  }

  return (reversedString === string) ? true : false;
}

const extractNumbers = (string) => {
  string = string.toString();
  let extractedNumber = '';

  for (let i = 0; i <= string.length - 1; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      extractedNumber += string[i];
    }
  }

  return (extractedNumber === '') ? NaN : +extractedNumber;
}

