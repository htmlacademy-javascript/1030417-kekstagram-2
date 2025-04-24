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

const getRandomIntegerInRange = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.round(Math.random() * (upper - lower) + lower);
}

const getUniqueNumber = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomIntegerInRange(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.log('Перебраны все числа!');
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomIntegerInRange(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  }
}

const getRandomArrayElement = (array) => {
  return array[getRandomIntegerInRange(0, array.length - 1)];
}

const getTimeInMinutes = (time) => {
  const [hours, minutes] = time.split(':');
  time = (+hours)*60+(+minutes);
  return time;
}

const getAvailability = (startTime, finishTime, apointmentTime, duration) => {
  const workStartTime = getTimeInMinutes(startTime);
  const workFinishTime = getTimeInMinutes(finishTime);
  const apointmentStart = getTimeInMinutes(apointmentTime);
  const apointmentFinish = apointmentStart + duration;
  console.log(workFinishTime, apointmentFinish)
  if (apointmentStart >= workStartTime && apointmentFinish <= workFinishTime ) {
    return true;
  }
  return false;
}

const onEscapeKey = (evt) => {
  return evt.key === 'Escape';
};

const onEnterKey = (evt) => {
  return evt.key === 'Enter';
};

export {getUniqueNumber, getRandomArrayElement, getRandomIntegerInRange, onEscapeKey, onEnterKey}
