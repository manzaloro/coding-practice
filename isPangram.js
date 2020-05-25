// A pangram is a sentence that contains every single letter of the alphabet at least once. For example, the sentence "The quick brown fox jumps over the lazy dog" is a pangram, because it uses the letters A-Z at least once (case is irrelevant).

// Given a string, detect whether or not it is a pangram. Return True if it is, False if not. Ignore numbers and punctuation.

function isPangram(string) {
  string = string.toLowerCase();
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < string.length; i++) {
    let c = string[i];
    if (alphabet.includes(c)) {
      let index = alphabet.indexOf(c);
      alphabet = alphabet.slice(0, index) + alphabet.slice(index + 1);
    }
  }
  return alphabet.length === 0;
}

function assertEquals(actual, expected) {
  if (actual === expected) {
    console.log(`passed`);
  } else {
    console.log(`failed Expected "${expected}", but got "${actual}"`);
  }
}

let string = "The quick brown fox jumps over the lazy dog.";
let inputActual = isPangram(string);
let inputExpected = true;
assertEquals(inputActual, inputExpected);
