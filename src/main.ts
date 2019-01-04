let sidebar_open: boolean = false;

function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

function sidebar_toggle() {
    if (sidebar_open) {
        addStyleString('.sidebar_content { display: none; transition: display 0.2s;} .sidebar { width: 0px !important; transition: width 0.2s;} .sidebar-top { width: 0px !important; transition: width 0.2s;} .sidebar-bottom { width: 0px !important; transition: width 0.2s;} .sidebar_toggle { margin-left: .5rem !important; transition: margin-left 0.2s;} div.sidebar_toggle_x { margin-top: -10rem !important; }')
        sidebar_open = false;
    } else {
        addStyleString('.sidebar_content { display: block; transition: display 0.2s;} .sidebar { width: 20% !important; transition: width 0.2s;} .sidebar-top { width: 16.65% !important; transition: width 0.2s;} .sidebar-bottom { width: 20% !important; transition: width 0.2s;} .sidebar_toggle { margin-left: -3rem !important; transition: margin-left 0.2s;} div.sidebar_toggle_x { margin-top: .85rem !important; }')
        sidebar_open = true;
    }
}