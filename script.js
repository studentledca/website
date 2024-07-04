
const learnMore = document.getElementById('learn-more');

function singleBackspace(element) {
    element.innerText = element.innerText.substr(0, element.innerText.length - 1);
}

function backspaceN(element, n, callback) {
    let i = 0;
    let backspaceTimer = setInterval(() => {
        singleBackspace(element);
        i++;
        if (i == n || element.innerText.length == 0) {
            clearInterval(backspaceTimer);
            if (callback) callback();
        }
    }, 150);

}

function backspaceTillFinished(element, callback) {
    let backspaceTimer = setInterval(() => {
        singleBackspace(element);
        if (element.innerText.length == 0) {
            clearInterval(backspaceTimer);
            done = true;
            if (callback) callback();
        }
    }, 75);
}

function typeLetter(element, letter) {
    element.innerHTML += letter;
}

function typePhrase(element, phrase, emoji, callback) {
    let i = 0;
    let typeTimer = () => {
        if (phrase[i] == " ") {
            typeLetter(element, "&#32;");
        } else if (phrase[i] == "\n") {
            typeLetter(element, '<br>')
        } else {
            typeLetter(element, phrase[i]);
        }
        i++;

        if (i == phrase.length) {
            if (emoji) {
                element.innerHTML += "&nbsp;" + emoji;
            }
            if (callback) callback();
        } else {
            let intervalAmount = Math.round(Math.random() * 50) + 50;
            setTimeout(typeTimer, intervalAmount);
        }
    };

    setTimeout(typeTimer, 100);
}

const random = new Random(); // uses the nativeMath engine


function pickRandom(list) {
    const value = random.integer(0, list.length - 1);
    return list[value];
}

//backspaceTillFinished(learnMore);

function threeDotThing(element) {
    let dots = 0;
    let interval = setInterval(() => {
        if (dots == 3) {
            clearInterval(interval);
            backspaceN(element, 3, () => {
                threeDotThing(element);
            })
            return;
        }
        element.innerHTML += "."
        dots++;
    }, 600);
}

let endings = [
    { link: './events.html', text: 'teach analytical thinking' },

    { link: './events.html', text: 'aid low-income communities' },
    { link: './events.html', text: 'change children’s lives' },
    { link: './events.html', text: 'build lifelong friendships' },
    { link: './events.html', text: 'grow the minds of youth' },
    { link: './events.html', text: 'teach teamwork' },
    { link: './events.html', text: 'foster a sense of belonging' },
    { link: './events.html', text: 'improve communication skills' },
    { link: './events.html', text: 'unlock hidden potential' },
    { link: './events.html', text: 'break down barriers' },
    { link: './events.html', text: 'unite people together' },
];

for (let i = 0; i < 100; i++) {
    console.log(random.integer(0, endings.length - 1));
}


let replaceIntroText = () => {
    let ending = pickRandom(endings);

    learnMore.href = ending.link;
    let emoji;

    backspaceTillFinished(learnMore, () => {
        setTimeout(() => {
            typePhrase(learnMore, ending.text, ending.emoji, () => {
                if (!ending.emoji) {
                    threeDotThing(learnMore);
                }
            });
        }, 300)
    });
}

document.addEventListener("readystatechange", (event) => {
    if (document.readyState == "complete") {
        setTimeout(replaceIntroText, 2300);
    }
});


/*
function makeSticky() {
  const element = document.getElementById('navbar');
  let initialOffset = (window.innerHeight / 100) * 70;
  console.log(window.scrollY, initialOffset, element.style.position, "Hello");
  if (window.scrollY > initialOffset && element.style.position == 'absolute') {
    element.style.animation = 'fadeOut 0.1s';
    setTimeout( () => { element.style.position = 'fixed';
    element.style.animation = '';
    element.offsetHeight; 
    element.style.animation = 'fadeIn 0.4s forwards';
                      }, 100);
  } else if (window.scrollY <= initialOffset && element.style.position == 'fixed') {
    element.style.animation = 'fadeOut 0.1s';
    setTimeout( () => { element.style.position = 'absolute';
    element.style.animation = '';
    element.offsetHeight; 
    element.style.animation = 'fadeIn 0.4s forwards';
                      }, 100);
  } else if (element.style.position != 'fixed' && element.style.position != 'absolute') {
    element.style.position = 'absolute';
  }

  if (window.scrollY > window.innerHeight * 0.80) {
    element.classList.add('floating-nav');
  } else {
    element.classList.remove('floating-nav');
  }
}

setInterval(makeSticky, 15);*/

document.onscroll = () => {
    let op = window.getComputedStyle(document.getElementById('scroll-to-see-more')).getPropertyValue("opacity");
    console.log(op);
    if (window.scrollY > window.innerHeight * 0.5 && op == 1) {
        console.log("deleting");
        document.getElementById('scroll-to-see-more').classList.remove('fade-in-slowly2');
        document.getElementById('scroll-to-see-more').classList.add('fade-out-slowly');
        document.getElementById('scroll-to-see-more').height;
        document.onscroll = () => { };
    }
};

let elem = document.documentElement;