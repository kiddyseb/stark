/**
 * GET /
 * Math page.
 */
exports.getMathChrono = function(req, res) {
  res.render('games/math/math', {
    title: 'Math Chrono'
  });
};