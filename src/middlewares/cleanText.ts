const diacritics = require('diacritics');



const cleanText = async (input: string) => {
  const cleanedText = input.replace(/[^\w\s]/gi, ''); // Remove special characters except letters and spaces
  const normalizedText = diacritics.remove(cleanedText); // Normalize accented characters
  return normalizedText.toLowerCase(); // Convert text to lowercase
};

const generateRegex = (word: string) => {
  const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters in the word
  const regexString = escapedWord.split('').join('.*'); // Create a regex that matches any number of characters between each letter of the word
  return new RegExp(regexString, 'i'); // 'i' makes the search case-insensitive
};

export { cleanText, generateRegex };
