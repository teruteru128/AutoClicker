var AC = {};
AC.STACK = [];
Game.ClickCookie = function (e, amount) {
  var now = Date.now();
  if (e) e.preventDefault();
  if (Game.OnAscend || Game.AscendTimer > 0 || Game.T < 3) { }
  else {
    Game.loseShimmeringVeil('click');
    var amount = amount ? amount : Game.computedMouseCps;
    Game.Earn(amount);
    Game.handmadeCookies += amount;
    if (Game.prefs.particles) {
      Game.particleAdd();
      Game.particleAdd(Game.mouseX, Game.mouseY, Math.random() * 4 - 2, Math.random() * -2 - 2, Math.random() * 0.5 + 0.75, 1, 2);
    }
    if (Game.prefs.numbers) Game.particleAdd(Game.mouseX + Math.random() * 8 - 4, Game.mouseY - 8 + Math.random() * 8 - 4, 0, -2, 1, 4, 2, '', '+' + Beautify(amount, 1));

    Game.runModHook('click');

    Game.playCookieClickSound();
    Game.cookieClicks++;
  }
  Game.lastClick = now;
  Game.Click = 0;
};
AC.start = function start() {
  var obj = arguments[0] || {};
  var c_str = obj["clicksAtOnce"] || "1000";
  var d_str = obj["delay"] || "10";
  var i_str = obj["iterations"] || "100";
  var clicksAtOnce = 1000;
  var delay = 10;
  var iterations = 100;

  var buf = null;
  if (!isNaN(buf = parseInt(c_str)) && buf > 0) {
    clicksAtOnce = buf;
  }
  if (!isNaN(buf = parseInt(d_str)) && buf > 0) {
    delay = buf;
  }
  if (!isNaN(buf = parseInt(i_str)) && buf > 0) {
    iterations = buf;
  }
  console.log("[AutoClicker] start: clicksAtOnce : %d, delay : %d, iterations : %d", clicksAtOnce, delay, iterations);
  var intoTheAbyss = function () {
    for (var i = 0; i < clicksAtOnce; i = (i + 1) | 0) {
      Game.ClickCookie();
      //Game.lastClick = 0;
    }
  };
  for (var i = 0; i < iterations; i = (i + 1) | 0) {
    AC.STACK.push(setInterval(intoTheAbyss, delay));
  }
};
AC.stop = function stop() {
  console.log("[AutoClicker] stop");
  while (AC.STACK.length > 0) {
    clearInterval(AC.STACK.pop());
  }
};
Game.lastClick = 0;
setInterval(function () {
  Game.shimmers.forEach(function (shimmer) {
    if (shimmer.type == "golden" || shimmer.type == "reindeer") {
      shimmer.pop();
    } else {
      console.log("shimmer.type = \"%s\"", shimmer.type);
    }
  })
}, 500);

