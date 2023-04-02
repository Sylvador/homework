// 1.1
function firstCapital(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
// 1.2
function addSpaceAfterCommaAndTrim(str) {
  return str.replaceAll(/\s?([\.,])|[\.,][А-я\w]/g, '$1 ').replaceAll(/\s+/g, ' ');
}

function removeAllSymbolsAndSplit(str) {
  return addSpaceAfterCommaAndTrim(str).replaceAll(/([^А-яЁё \w]|\d)/g, '').replaceAll(/\s+/g, ' ').split(' ');
}

// 1.3
function countWords(str) {
  return removeAllSymbolsAndSplit(str).length;
}

// 1.4
function countUniqueWords(str) {
  let result = [];
  let wordCounter = new Map();
  str = removeAllSymbolsAndSplit(str);
  for (let word of str) {
    wordCounter.set(word, (wordCounter.get(word) ?? 0) + 1)
  }
  for (let [word, count] of wordCounter.entries()) {
    let lastDigits = count.toString().slice(-2);
    if (lastDigits.slice(-1) < 5 && lastDigits.slice(-1) > 1 && !(lastDigits < 15 && lastDigits > 11)) {
      result.push(`${word} - ${count} раза`);
    } else {
      result.push(`${word} - ${count} раз`);
    }
  }
  return result;
}

module.exports = {
  firstCapital,
  addSpaceAfterCommaAndTrim,
}