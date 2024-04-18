var numSeleccionado = null;
var casillaSeleccionada = null;

var errores = 0;

var tablero1 = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
    
];

var solucion1 = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]
var tablero2= [
    "----71-93",
    "9---3---8",
    "4---5--7-",
    "86-3-95-4",
    "--3-7-4--",
    "7-15-9-36",
    "-1--6---2",
    "5---8---7",
    "78-54----"
]
var solucion2= [
    "256471893",
    "913683452",
    "487259176",
    "861342957",
    "523978641",
    "741569283",
    "391726548",
    "542813769",
    "678145329"
]


var tablero3= [
    "--7-21---",
    "21-----73",
    "38--7-5--",
    "8-----7-2",
    "--2-5-8--",
    "7-6-----5",
    "--1-9--68",
    "43-----25",
    "---53-9--"
]
var solucion3= [
    "497821356",
    "216435873",
    "385679142",
    "851346792",
    "962758431",
    "734192685",
    "971284563",
    "438967125",
    "625513978"
]
var tablero4  = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];

var solucion4 = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];

var tablero5 = [
    "----71-93",
    "9---3---8",
    "4---5--7-",
    "86-3-95-4",
    "--3-7-4--",
    "7-15-9-36",
    "-1--6---2",
    "5---8---7",
    "78-54----"
];

var solucion5 = [
    "256471893",
    "913683452",
    "487259176",
    "861342957",
    "523978641",
    "741569283",
    "391726548",
    "542813769",
    "678145329"
];


var tablero6 = [
    "--8--5--6",
    "5---4----",
    "6-2--8--7",
    "-6-9---4-",
    "--5-8-1--",
    "-3---6-9-",
    "9--7--4-6",
    "----9---1",
    "2--3--8--"
];

var solucion6 = [
    "148735926",
    "597684231",
    "362198547",
    "816923754",
    "734568192",
    "253417689",
    "981752463",
    "475296318",
    "629341875"
];

let tableros = [
    { tablero: tablero1, solucion: solucion1 },
    { tablero: tablero2, solucion: solucion2 },
    { tablero: tablero3, solucion: solucion3 },
    { tablero: tablero4, solucion: solucion4 },
    { tablero: tablero5, solucion: solucion5 },
    { tablero: tablero6, solucion: solucion6 }
];

let tableroActual = 1;

// Función para cambiar al siguiente tablero
function cambiarTablero() {
    tableroActual = (tableroActual + 1) % tableros.length;
    reiniciarJuego();
}

// Función para reiniciar el juego con el tablero actual
function reiniciarJuego() {
    // Limpiar el tablero actual
    document.getElementById("tablero").innerHTML = "";

    // Cargar el nuevo tablero y solución
    tablero = tableros[tableroActual].tablero;
    solucion = tableros[tableroActual].solucion;
    iniciarJuego();
}

// Asignar el evento 'click' al botón para cambiar de tablero
document.getElementById("cambiarTablero").addEventListener("click", cambiarTablero);


window.onload = function() {
    iniciarJuego();
};


window.onload = function() {
    iniciarJuego();

    // Obtener el botón de resolver
    const resolverButton = document.getElementById("resolver");
    resolverButton.addEventListener("click", resolverSudoku);
};



function iniciarJuego() {
    // Limpiar el contenedor de botones antes de crear nuevos
    const digitosContainer = document.getElementById("digitos");
    digitosContainer.innerHTML = '';

    // Dígitos del 1 al 9
    for (let i = 1; i <= 9; i++) {
        let numero = document.createElement("div");
        numero.id = i.toString();
        numero.innerText = i;
        numero.addEventListener("click", seleccionarNumero);
        numero.classList.add("numero");
        digitosContainer.appendChild(numero);
    }

    // Tablero 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let casilla = document.createElement("div");
            casilla.id = r.toString() + "-" + c.toString();
            if (tablero[r][c] != "-") {
                casilla.innerText = tablero[r][c];
                casilla.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                casilla.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                casilla.classList.add("vertical-line");
            }
            casilla.addEventListener("click", seleccionarCasilla);
            casilla.classList.add("tile");
            document.getElementById("tablero").appendChild(casilla);
        }
    }
}


function seleccionarNumero() {
    if (numSeleccionado != null) {
        numSeleccionado.classList.remove("numero-seleccionado");
    }
    numSeleccionado = this;
    numSeleccionado.classList.add("numero-seleccionado");
}

function seleccionarCasilla() {
    if (numSeleccionado) {
        if (this.innerText != "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solucion[r][c] == numSeleccionado.id) {
            this.innerText = numSeleccionado.id;
        }
        else {
            errores += 1;
            document.getElementById("errores").innerText = errores;
        }
    }
}
