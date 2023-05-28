let test = true;

function navigator({href, query}) {
    switch (href) {
        case "/":
            return "index.html";
        case "/login":
            return "login.html";
        case "/game":
            return "game.html";
    }

}