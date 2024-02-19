function onReady(callback) {
  var intervalId = window.setInterval(function () {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 1000);
}

function setVisible(selector, visible) {
  document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

let ticks = 0;

document.addEventListener("readystatechange", (event) => {
  checkStyle();
  if (document.readyState == "complete") {
    clearInterval(ticksTimer);
    checkStyle();

    if (ticks >= 5) {
      setTimeout(() => {
        setVisible('#content', true);
        document.getElementById('content').classList.add('fade-in-after-load-fast');
        setVisible('#loader', false);
      }, 400)
    } else {
      setVisible('#content', true);
      document.getElementById('content').classList.add('fade-in-after-load');
      setVisible('#loader', false);
    }
  }
});

let ticksTimer = setInterval(() => {
  ticks++;
}, 100);