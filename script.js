function draggablePiece(id) {
    let text = document.getElementById(id);

    text.onmousedown = function(event) {
        let shiftX = event.clientX - text.getBoundingClientRect()
            .left;
        let shiftY = event.clientY - text.getBoundingClientRect()
            .top;
        //text.style.position = 'absolute';
        text.style.zIndex = 2000;
        document.body.append(text);
        moveAt(event.pageX, event.pageY);
        // move the text along the coordinates (pageX, pageY)
        // taking into account the initial shifts
        function moveAt(pageX, pageY) {
            text.style.left = pageX - shiftX + 'px';
            text.style.top = document.documentElement.scrollTop + pageY - shiftY + 'px';
        }
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }
        // move the text to the  mousemove
        document.addEventListener('mousemove', onMouseMove);
        // drop the text, remove unneeded handlers
        text.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            //text.onmouseup = null;
        };
    };
    text.ondragstart = function() {
        return false;
    };
}

//draggablePiece('draggablepiece');

/*document.getElementById('scrollin').addEventListener('scroll', () => {
    let x = document.getElementById('scrollin').scrollTop / (window.innerHeight * 0.8);

    if (x >= 1) {
        x = 0.9999;
    }
    document.body.style.setProperty('--scroll', x);
}, false);*/

/* Quests */
class Quest {
    update() {
        if (this.pages[this.index] != document.location) {
            document.location = this.pages[this.index];
        }

        this.title.innerText = `${this.name}`;
        this.currentPageCounter.innerText = `Page ${this.index + 1}/${this.pages.length}`;

        if (this.index == 0 && document.location.hash == this.pages[0]) {
            this.previousButton.className = 'noclick';
        } else {
            this.previousButton.className = '';
        }

        if (this.index == this.pages.length - 1) {
            this.nextButton.innerText = '⚑';
        } else {
            this.nextButton.innerText = '→';
        }
    }

    next() {
        console.log("NEXT PAGE");
        // Returns true if finished
        this.index++;

        if (this.index >= this.pages.length) {
            Swal.fire({
                title: 'Nice job!', text: 'You completed the "' + this.name + '" quest!', icon: 'success', confirmButtonText: 'Nice!', background: '#FAF4E0', buttonsStyling: 'background-color: #8076C8; color: #FFFFFF;'
            });
            document.body.removeChild(this.element)
            document.location = '#home';
            QUEST = null;
            return;
        }

        this.update();
    }

    previousPage() {
        console.log("PREVIOUS PAGE");
        this.index -= 1;
        if (this.index < 0) {
            this.index = 0;
        }
        this.update();
    }

    constructor(name, pages) {
        this.name = name;
        this.pages = pages;
        this.index = 0;
        this.element = document.createElement('div');
        this.element.id = "amongus";
        this.element.className = 'quest-box';
        //console.log(this.element);

        this.title = document.createElement('h1');
        this.previousButton = document.createElement('button');
        this.previousButton.onclick = function() {
            QUEST.previousPage();
        };
        this.previousButton.innerText = '←';
        this.currentPageCounter = document.createElement('p');
        this.nextButton = document.createElement('button');
        this.nextButton.onclick = function() {
            QUEST.next()
        };
        this.nextButton.innerText = '→';
        let horizontal = document.createElement('div');
        horizontal.className = 'h-flex';
        horizontal.appendChild(this.previousButton);
        horizontal.appendChild(this.currentPageCounter);
        horizontal.appendChild(this.nextButton);
        this.element.appendChild(this.title);
        this.element.appendChild(horizontal);
        console.log(this.element);

        this.update();

        document.body.appendChild(this.element);
    }
}

function initQuest() {
    if (QUEST && document.location.hash) {
        console.log(quest);
        console.log(document.location.hash);
        console.log('searching')
        QUEST.index = Math.min(quest.pages.indexOf(document.location.hash));
        QUEST.update();
    }
}

let QUEST = null;

//draggablePiece("amongus");

function createQuest(questName, questPages) {
    if (!QUEST) {
        QUEST = new Quest(questName, questPages);
    }
}


let ticker = document.getElementsByClassName('ticker-transition')[0];


function resetAnimation() {
    const parent = document.getElementsByClassName('ticker-wrapper')[0];
    console.log(ticker);
    console.log(parent.children)
    var newone = ticker.cloneNode(true);
    parent.innerHTML = '';
    parent.appendChild(newone);
}

//resetAnimation();

//setInterval(resetAnimation, 10000)

switch (screen.orientation.type) {
    case "landscape-primary":
        console.log("That looks good.");
        break;
    case "landscape-secondary":
    case "portrait-secondary":
    case "portrait-primary":
        console.log("oop you should rotate your screen");

        break;
    default:
        console.log("The orientation API isn't supported in this browser :(");
}

document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector(
            "#everythingimportant").style.display = 'none';
        document.querySelector(
            "#loadingindicator").style.display = 'block';

    } else {
        setTimeout(() => {
            location.hash = "#home";
            setTimeout(() => {
                document.querySelector(
                    "#everythingimportant").style.display = 'block';
                console.log("scrolling")
                document.location = "#home";
                document.querySelector(
                    "#loadingspinner").style.display = 'none';
                document.querySelector(
                    "#loadingtext").style.display = 'none';
            }, 200)
        }, 0);
    }
};