function checkAnagramWithSort(str1, str2) {
  let newStr1 = str1
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .split("")
    .sort()
    .join("");
  let newStr2 = str2
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .split("")
    .sort()
    .join("");

  return newStr1 === newStr2;
}

// check if the number is following the same pattern
export const checkForSamePattern = (num) => {
  let patternLength = num.length;
  let str1 = num.substr(0, patternLength / 2);
  let str2 = num.substr(patternLength, num.length);

  return checkAnagramWithSort(str1, str2);
};

// check if number is repeating twice in a row
export const count_repeating_digits = (num) => {
  let count = 0;
  let str_num = num.toString(); // Convert the number to a string

  if (num.length === 10) {
    for (let i = 0; i < str_num.length; i++) {
      for (let j = i + 1; j < str_num.length; j++) {
        if (str_num[i] == str_num[j]) {
          count++;
          break; // Exit the inner loop once a repeating digit is found
        }
      }
    }
  }

  return count === 5 ? true : false;
};

//  check if number is in assending or descending order
export const checkAscendingOrDescendingBy5 = (number) => {
  const numStr = number.toString();

  if (numStr.length !== 10) {
    return false; // The number should have exactly 10 digits.
  }

  // Check if the digits are in ascending order with a factor of 5.
  let ascending = true;
  let descending = true;

  for (let i = 0; i < numStr.length - 1; i++) {
    const currentDigit = parseInt(numStr[i]);
    const nextDigit = parseInt(numStr[i + 1]);

    if (currentDigit !== nextDigit - 5) {
      ascending = false;
    }

    if (currentDigit !== nextDigit + 5) {
      descending = false;
    }
  }

  return ascending || descending;
};

// capitalize firts character
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const removeHyphenWithSpaces = (string) => {
  return string.replace(/-/g, " ");
};
