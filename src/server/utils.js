module.exports.getYearFromTitle = (title) => {
  let year = ''
  const firstWord = title.split(' ')[0]

  if (parseInt(firstWord)) {
    if (firstWord.length == 4) {
      year = firstWord
    } else if(firstWord.length == 2) {
      year = (parseInt(firstWord) > 30)
        ? '19' + firstWord
        : '20' + firstWord
    }
  }

  return year
}
