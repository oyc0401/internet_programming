/** environment 만 바꿔서 실행하기*/

const Environment = {
    test: 0, localhost: 1, product: 2
}


let environment = Environment.localhost;

const domainLocal = "http://localhost:8080";
const domainProduct = "http://3.232.322.3";


export function getDomain() {
    const local = (environment !== Environment.product);

    if (local) {
        return `${domainLocal}`;
    } else {
        return `${domainProduct}`;
    }
}

/** url 가져오기 */
export function getUrl(path, query = "") {

    const html = (environment === Environment.localhost || environment === Environment.product);
    const local = (environment !== Environment.product);


    let pathData = getPath(path, html);

    if (local) {
        return `${domainLocal}${pathData}${query}`;
    } else {
        return `${domainProduct}${pathData}${query}`;
    }

}


function getPath(path, server = true) {
    switch (path) {
        case "/":
        case "":
            return (server ? "" : "/index.html");
        case "/login":
            return (server ? "/login" : "/login.html");
        case "/signup":
            return (server ? "/signup" : "/signup.html");
        case "/game":
            return (server ? "/game" : "/game.html");
        case "/admin":
            return (server ? "/admin/home" : "/home.html");
        case "/edit":
            return (server ? "/admin/edit" : "/edit.html");
        default:
            console.log(path)
            throw "Path가 잘못 입력되었습니다.";
    }
}

// environment = Environment.test;
//
// console.log(getUrl("/"));
// console.log(getUrl("/signup"));
// console.log(getUrl("/login"));
// console.log(getUrl("/game", "?stage=2"));
//
//
// environment = Environment.localhost;
//
// console.log(getUrl("/"));
// console.log(getUrl("/signup"));
// console.log(getUrl("/login"));
// console.log(getUrl("/game", "?stage=2"));
//
//
// environment = Environment.product;
//
// console.log(getUrl("/"));
// console.log(getUrl("/signup"));
// console.log(getUrl("/login"));
// console.log(getUrl("/game", "?stage=2"));
