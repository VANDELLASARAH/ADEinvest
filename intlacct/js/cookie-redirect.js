function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + ";path=/;";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function checkCookie() {
    var agree = readCookie("ia");
    if (agree != null && agree != "") {
        location.replace('https://www.fidelity.com/');
        return false;
    }
}

function acceptAgreement() {
    createCookie("ia", "1", 30);
    location.replace('https://www.fidelity.com/');
}

checkCookie();