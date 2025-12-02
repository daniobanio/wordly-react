// Default value of the board 
// A matrix (array of arrays)
// Each array represents a new attempt
export const boardDefault = [
     ["", "", "", "", ""],
     ["", "", "", "", ""],
     ["", "", "", "", ""],
     ["", "", "", "", ""],
     ["", "", "", "", ""],
     ["", "", "", "", ""],
]

export const generateWordSet = async (wordListUrl, encoding = 'utf-8') => {
     let wordSet;
     let correctWord;
     await fetch(wordListUrl)
          .then((res) => res.arrayBuffer())
          .then((buffer) => {
               // Use TextDecoder for reading the word list files
               const decoder = new TextDecoder(encoding);
               const result = decoder.decode(buffer);

               // Seperate each word in the list into an array
               // Split by any line ending (\n, \r\n, or \r) and trim whitespace
               const wordArr = result.split(/\r?\n/)
                    .map(word => word.trim())  // Remove any trailing/leading whitespace
                    .filter(word => word.length > 0);  // Remove empty strings
               
               // Turn the array into a set
               // Like an array but you can't repeat values, no indexes; a data structure
               wordSet = new Set(wordArr);
               
               // Pick a random word
               correctWord = wordArr[Math.floor(Math.random() * wordArr.length)].toUpperCase();
          })
     return { wordSet, correctWord };
}