/**
 * GET /
 * Math page.
 */
exports.getMathChrono2 = function(req, res) {
  res.render('games/math/math2', {
    title: 'Math Chrono 2'
  });
};