'use strict';

/** PART II **/
function createBlock(obj) {
    console.log(obj);
    //1) create a div with document.createElement
    let block = document.createElement('div');
    //2) set the class to "block" for example,
    block.classList.add('block');

    // block.id = obj.name;
    block.setAttribute('id', obj.name);
    block.style.background = obj.color;

    let p = document.createElement('p');
    let text = document.createTextNode(obj.key.letter);
    p.appendChild(text);
    // equivalent
    // p.textContent = obj.key.letter;
    block.appendChild(p);

    //4) instantiate a new Audio object
    let audio = new Audio();
    // document.createElement('audio');
    if (audio.canPlayType('audio/mpeg')) {
        audio.src = obj.url.path + obj.url.filenames[0];// path vers mp3
    } else {
        audio.src = obj.url.path + obj.url.filenames[1];// path vers oggg
    }

    audio.id = 'audio_' + obj.key.keyCode;

    // audio.controls = true;
    block.appendChild(audio);
    audio.controls = false;

    return block;
}

/*////////////////////
 Event listenner function
/////////////////////*/
function clickBlock() {
    console.log('click');
    console.log(this);
    // div va chercher le premier tag audio dans tes enfants
    let audioElem = this.querySelector('audio');
	playAudio(audioElem)
}

function keyPressed(e) {
    let key = event.which || event.keyCode;
    console.log(key);
    let audioElem = document.querySelector('#audio_' + key);
    playAudio(audioElem);
    // clickBlock.call(/* la div du block correspondant au keyCode */)
}

function keyPressed2(e) {
    let key = event.which || event.keyCode;
    for(let i = 0; i < soundsKit.length; i++) {
        let obj = soundsKit[i];
        if(key === obj.key.keyCode) {
            playSound(obj.el.querySelector('audio'), obj.key.letter);
            // ou
            // playSound.call(obj.el);
        }
    }
}

/*////////////////////
Music & history methods
/////////////////////*/
function playAudio(audio) {
    let p = audio.previousSibling;
	audio.currentTime = 0;
	audio.play();
    // ajout dans l'historique
   addToHistory(p.textContent);
}

function addToHistory(letter) {
    let history = document.querySelector('#history');
    let len = history.textContent.length;
    if (len > 19 ) {
        history.textContent = history.textContent.slice(1, 21);
    }
    history.textContent = history.textContent + letter;
}


// with try catch
function checkAudioSupport() {
    try {
       new Audio().play();
       return true;
    } catch(e) {
        alert('alerte navigateur trop vieux');
        return false;
    }
}

// shorten method
function checkAudioSupport2() {
    return !!(new Audio());
}

(function init() {
    if (!checkAudioSupport()) return;
    let container = document.querySelector('#container');
    console.log('--- Assignment 2 --- ');
    console.log('the soundsKit: ', soundsKit);

    for(let i = 0; i < soundsKit.length; i++) {
        let block = createBlock(soundsKit[i]);
        soundsKit[i].el = block;
        container.appendChild(block);
        block.addEventListener('click', clickBlock);
    }
    console.log(soundsKit);

	// avec une boucle forEach
	/*
	soundsKit.forEach(function(elem, index) {
		let block = createBlock(elem);
		container.appendChild(block);
		block.addEventListener('click', clickBlock);
    });
	*/
    document.addEventListener('keydown', keyPressed);
})();
