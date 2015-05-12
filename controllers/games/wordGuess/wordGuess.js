/**
 * GET /
 * Word Guess
 */
exports.getWordGuess = function(req, res) {
  res.render('games/wordGuess/wordGuess', {
    title: 'Word O Guess'
  });
};