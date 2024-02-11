let sock = io();

function start() {
    document.getElementById("gioca").disabled = true;
    document.getElementById("giocaPrivato").disabled = true;
}

function control() {
    let user = document.getElementById("username").value;
    if (user !== "") {
        document.getElementById("gioca").disabled = false;
        document.getElementById("giocaPrivato").disabled = false;
    } else {
        document.getElementById("gioca").disabled = true;
        document.getElementById("giocaPrivato").disabled = true;
    }
}

function controlOnChangePrivate() {
    let user = document.getElementById("username").value;
    let cod = document.getElementById("cod").value;
    if (user !== "" && cod !== "") {
        document.getElementById("giocaPrivato_1").disabled = false;
    } else {
        document.getElementById("giocaPrivato_1").disabled = true;
    }
}

function startPublic() {
    let user = document.getElementById("username").value;
    let cod = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    let id = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
    sessionStorage.setItem("user", user);
    sessionStorage.setItem("cod", cod);
    sessionStorage.setItem("p", "p");
    sessionStorage.setItem("id", id);
    window.location.href = './gioca.html'
}

function controlPrivate() {
    document.getElementById("mess2").style.display = "block";
    document.getElementById("mess3").style.display = "block";
}

function startPrivate() {
    let user = document.getElementById("username").value;
    let cod = document.getElementById("cod").value;
    let id = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
    sessionStorage.setItem("user", user);
    sessionStorage.setItem("cod", cod);
    sessionStorage.setItem("p", "");
    sessionStorage.setItem("id", id);
    window.location.href = './gioca.html';
}