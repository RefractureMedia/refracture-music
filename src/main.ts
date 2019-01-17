let sidebar_open: boolean = false;
let playing: boolean = true;
let repeating: boolean = false;
let shuffling: boolean = false;
let saved: boolean = false;
let time_set: boolean = false;


function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

document.onkeydown = function (e) {
    if (e.ctrlKey && e.which == 82) {
        location.reload();
        setTimeout(cm, 100);
    } else if (e.ctrlKey && e.shiftKey && e.which == 73) {
        //@ts-ignore
        window.parent.inspect(); // ignore error, initiates inspect on window correctly
    }
};

function cm() {
    addStyleString('.now_playing>center { margin-left: -' + document.getElementsByClassName('song-info')[0].clientWidth + 'px }')
    console.log('cm')
}

window.top.onresize = () => {
    cm();
}

function ms() {
    setTimeout(ms, 1);
}

function init() {
    cm();
    ms();
    console.log('init')
}

window.onload = () => {
    setTimeout(init, 3);
}

function update_trackbar() {
    let audioelement = <HTMLAudioElement>document.getElementById("playing");
    //@ts-ignore
    let bar_value: number = <HTMLInputElement>document.getElementById('bar').value;
    addStyleString('background-image: -webkit-gradient(linear, left top, right top, color-stop(' + bar_value + ', #2f466b), color-stop(' + bar_value + ', #d3d3db))');

    audioelement.currentTime = bar_value; //test
    time_set = true;
}

function set_duration() {
    let audioelement = <HTMLAudioElement>document.getElementById("playing");
    let bar_element = <HTMLInputElement>document.getElementById("bar");
    let dur_element = <HTMLParagraphElement>document.getElementsByClassName("total")[0];
    let seconds: number = Math.floor(audioelement.duration % 60);
    let minutes: number = Math.floor((audioelement.duration / 60) % 60);
    let time: string = '';
    if (minutes != 0) {
        time = minutes + ':' + seconds;
    } else {
        if (seconds < 10) {
            time = '0:0' + seconds;
        } else {
            time = '0:' + seconds;
        }
    }

    bar_element.min = '0';
    bar_element.max = audioelement.duration.toString();

    dur_element.textContent = time;
}

function update_timestamp() {
    let audioelement = <HTMLAudioElement>document.getElementById("playing");
    let bar_element = <HTMLInputElement>document.getElementById("bar");
    let through_element = <HTMLParagraphElement>document.getElementsByClassName("through")[0];
    let seconds: number = Math.floor(audioelement.currentTime % 60);
    let minutes: number = Math.floor((audioelement.currentTime / 60) % 60);
    let time: string = '';
    if (minutes != 0) {
        if (seconds < 10) {
            time = minutes + ':0' + seconds;
        } else {
            time = minutes + ':' + seconds;
        }
    } else {
        if (seconds < 10) {
            time = '0:0' + seconds;
        } else {
            time = '0:' + seconds;
        }
    }

    if (!time_set) {
        bar_element.value = audioelement.currentTime.toString();
    } else {
        time_set = false;
    }

    through_element.textContent = time;

    if (audioelement.currentTime == audioelement.duration) {
        if (!repeating) {
            console.log('[Media] Song Ended')
            addStyleString('.pause { display: none !important; } .play { display: block !important }');
            playing = false;
        } else {
            console.log('[Media] Song Repeated')
            play_pause();
            play_pause();
        }

    }

    set_duration();
}

function sidebar_toggle() {
    if (sidebar_open) {
        addStyleString('.sidebar_content { display: none; transition: display 0.2s;} .sidebar { width: 0px !important; transition: width 0.2s;} .sidebar-top { width: 0px !important; transition: width 0.2s;} .sidebar-bottom { width: 0px !important; transition: width 0.2s;} .sidebar_toggle { margin-left: .5rem !important; transition: margin-left 0.2s;} div.sidebar_toggle_x { margin-top: -10rem !important; transition: margin-top 0.2s;} .bar { width: 78vw !important; transition: width 0.2s;}')
        sidebar_open = false;
    } else {
        addStyleString('.sidebar_content { display: block; transition: display 0.2s;} .sidebar { width: 20vw !important; transition: width 0.2s;} .sidebar-top { width: 16.65vw !important; transition: width 0.2s;} .sidebar-bottom { width: 20vw !important; transition: width 0.2s;} .sidebar_toggle { margin-left: -3rem !important; transition: margin-left 0.2s;} div.sidebar_toggle_x { margin-top: 1.7rem !important; transition: margin-top 0.2s;} .bar { width: 61vw !important; transition: width 0.2s;}')
        sidebar_open = true;
    }
}

function save() {
    if (/*current_song.*/saved) {
        console.log('[Media] Removing Song From Library')
        //media.remove();
        addStyleString('.saved { display: none !important; } .save > .save { display: block !important }');
        saved = false;
    } else {
        console.log('[Media] Adding Song To Library')
        //media.save();
        addStyleString('.saved { display: block !important; } .save > .save { display: none !important }');
        saved = true;
    }
}

function repeat() {
    if (repeating) {
        console.log('[Media] Repeat Off')
        addStyleString('.repeat { color: #1A6B68; } .repeat:hover { color: #2FC8C3; }');
        repeating = false;
    } else {
        console.log('[Media] RepeatThisRepeatThisRepeatThisRepeatThisRepeatThisRepeatThis')
        addStyleString('.repeat { color: #2FC8C3; } .repeat:hover { color: #1A6B68; }');
        repeating = true;
    }
}

function back() {
    console.log('[Media] Previous Song')
    //media.backward();
}

function play_pause() {
    const audioelement = <HTMLAudioElement>document.getElementById("playing");
    if (playing) {
        console.log('[Media] Paused')
        addStyleString('.pause { display: none !important; } .play { display: block !important }');
        audioelement.pause();
        playing = false;
    } else {
        console.log('[Media] Playing')
        addStyleString('.pause { display: block !important; } .play { display: none !important }');
        audioelement.play();
        playing = true;
    }
}

function skip() {
    console.log('[Media] Song Skipped')
    //media.forward();
}

function shuffle() {
    if (shuffling) {
        console.log('[Media] Shuffle Off')
        addStyleString('.shuffle { color: #1A6B68; } .shuffle:hover { color: #2FC8C3; }');
        shuffling = false;
    } else {
        console.log('[Media] Everybody\'s Shuffling! *beat drop*')
        addStyleString('.shuffle { color: #2FC8C3; } .shuffle:hover { color: #1A6B68; }');
        shuffling = true;
    }
}

function more() {
    console.log('[Options] More')
    //interface.more.currentSong();
}