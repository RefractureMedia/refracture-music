let sidebar_open: boolean = false;
let playing: boolean = false;
let repeating: boolean = false;
let shuffling: boolean = false;
let saved: boolean = false;

function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}
// test
document.onkeydown = function (e) {
    if (e.ctrlKey && e.which == 82) {
        location.reload();
    } else if (e.ctrlKey && e.shiftKey && e.which == 73) {
        window.parent.inspect(); // ignore error, initiates inspect on window correctly
    }
};

function cm() {
    addStyleString('.now_playing>center { margin-left: -' + document.getElementsByClassName('song-info')[0].clientWidth + 'px }')
}
function center_margin() {
    console.log('foo')
    window.setTimeout(cm, 2);
}
window.top.onresize = () => {
    cm();
}

function update_trackbar() {
    let bar_value = document.getElementById('bar').value;
    addStyleString('background-image: -webkit-gradient(linear, left top, right top, color-stop(' + bar_value + ', #2f466b), color-stop(' + bar_value + ', #d3d3db))');
}





function sidebar_toggle() {
    if (sidebar_open) {
        addStyleString('.sidebar_content { display: none; transition: display 0.2s;} .sidebar { width: 0px !important; transition: width 0.2s;} .sidebar-top { width: 0px !important; transition: width 0.2s;} .sidebar-bottom { width: 0px !important; transition: width 0.2s;} .sidebar_toggle { margin-left: .5rem !important; transition: margin-left 0.2s;} div.sidebar_toggle_x { margin-top: -10rem !important; transition: margin-top 0.2s;} .bar { width: 78vw !important; transition: width 0.2s;}')
        sidebar_open = false;
    } else {
        addStyleString('.sidebar_content { display: block; transition: display 0.2s;} .sidebar { width: 20vw !important; transition: width 0.2s;} .sidebar-top { width: 16.65vw !important; transition: width 0.2s;} .sidebar-bottom { width: 20vw !important; transition: width 0.2s;} .sidebar_toggle { margin-left: -3rem !important; transition: margin-left 0.2s;} div.sidebar_toggle_x { margin-top: .85rem !important; transition: margin-top 0.2s;} .bar { width: 61vw !important; transition: width 0.2s;}')
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
    if (playing) {
        console.log('[Media] Paused')
        //media.pause();
        addStyleString('.pause { display: none !important; } .play { display: block !important }');
        playing = false;
    } else {
        console.log('[Media] Playing')
        //media.play();
        addStyleString('.pause { display: block !important; } .play { display: none !important }');
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