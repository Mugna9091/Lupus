let user;
let cod;
let p;
let id;
let n_player
let sock = io();

export function start() {
    user = sessionStorage.getItem("user");
    cod = sessionStorage.getItem("cod");
    p = sessionStorage.getItem("p");
    id = sessionStorage.getItem("id");
    document.getElementById("code").innerHTML = cod
    if (p === "") {
        conPrivate();
    } else {
        conPublic();
    }
}

export function fine() {
    window.location.href = '../index.html'
}

export function startGame() {
    let carte = []
    carte.push("Veggente")
    carte.push("Puttana")
    for (let i = 0; i < document.getElementById("lupi").value; i++) {
        carte.push("Lupo")
    }
    for (let i = 0; i < document.getElementById("lupiManari").value; i++) {
        carte.push("LupoMannaro")
    }
    let con = n_player - document.getElementById("lupi").value - document.getElementById("lupiManari").value - 2;
    for (let i = 0; i < con; i++) {
        carte.push("Contadino")
    }
    sock.emit("start", cod, carte)
}

export function controlLupi() {

}

function conPublic() {
    sock.emit('public', user, cod, id);
    document.getElementById("start").style.display = "block";
    document.getElementById("start").disabled = true;
    document.getElementById("lupi").disabled = true;
    document.getElementById("lupiManari").disabled = true;
    addUserListener();
    addCardListener();
}

function conPrivate() {
    sock.emit('private', user, cod, id);
    document.getElementById("start").style.display = "none";
    document.getElementById("lupi").disabled = true;
    document.getElementById("lupiManari").disabled = true;
    addUserListener();
    addCardListener();
}

const addUserListener = () => {
    sock.on('user_list', (user, num) => {
        n_player = num
        document.getElementById("user").innerHTML = user;
        if (n_player >= 2) {
            document.getElementById("start").disabled = false;
        } else {
            document.getElementById("start").disabled = true;
        }
        if (n_player >= 4 && p !== "") {
            document.getElementById("lupi").disabled = false;
        }
        if (n_player >= 5 && p !== "") {
            document.getElementById("lupiManari").disabled = false;
        }
        addUserListener();
    });
}

const addCardListener = () => {
    sock.on('card', (card) => {
        document.getElementById("content").style.display = "none";
        if (card === "Lupo") {
            document.getElementById("lupo").style.display = "block";
        } else if (card === "Contadino") {
            document.getElementById("contadino").style.display = "block";
        } else if (card === "Puttana") {
            document.getElementById("puttana").style.display = "block";
        } else if (card === "Veggente") {
            document.getElementById("veggente").style.display = "block";
        } else if (card === "LupoMannaro") {
            document.getElementById("lupoMannaro").style.display = "block";
        }
        document.getElementById("card").innerHTML = card;
    });
}