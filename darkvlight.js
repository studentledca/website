function swapStyleSheet(sheet) {
  document.getElementById("pagestyle").setAttribute("href", sheet);
}

function switchToLight() {
  let elements = document.getElementsByClassName('logo');

  for (let element of elements) {
    element.src = './public/logolight.png';
  }

  swapStyleSheet('./css/lightstyle.css');

  localStorage.setItem('theme', 'light');
}

function switchToDark() {
  let elements = document.getElementsByClassName('logo');

  for (let element of elements) {
    element.src = './public/logodark.png';
  }

  swapStyleSheet('./css/darkstyle.css');

  localStorage.setItem('theme', 'dark');
}

function switchStyle() {
  var sheet = document.getElementById("pagestyle").getAttribute("href");
  if (sheet == './css/darkstyle.css') {
    switchToLight();
    //switchhigh.pause();
    switchlow.currentTime = 0;
    switchlow.play();
    switchhigh = new Audio("public/switchhigh.wav");
  } else {
    //switchlow.pause();
    switchToDark();
    switchhigh.currentTime = 0;
    switchhigh.play();
    switchlow = new Audio("public/switchlow.wav");
  }
}

let switchhigh;
let switchlow;

function checkStyle() {
  switchhigh = new Audio("public/switchhigh.wav");
  switchlow = new Audio("public/switchlow.wav");
  if (localStorage.getItem('theme') == 'light') {
    switchToLight();
  } else if (localStorage.getItem('theme') == 'dark') {
    switchToDark();
  } else {
    localStorage.setItem('theme', 'dark');
    switchToDark();
  }
}

checkStyle();