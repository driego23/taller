const frutas = [
    'manzana', 'naranja', 'plátano', 'uva', 'sandía', 'fresa',
    'piña', 'cereza', 'kiwi', 'pera', 'limón', 'arándano'
  ];
  
  let cartasVolteadas = [];
  let bloquearTablero = false;
  let numeroPares = 6; // Número predeterminado de pares de cartas
  
  document.addEventListener('DOMContentLoaded', () => {
    const botonComenzar = document.getElementById('boton-comenzar');
    botonComenzar.addEventListener('click', () => iniciarJuego());
  });
  
  function iniciarJuego() {
    const numeroParesInput = document.getElementById('numero-pares');
    numeroPares = parseInt(numeroParesInput.value);
  
    const memoryGame = document.getElementById('memory-game');
    memoryGame.innerHTML = '';
  
    const cartas = crearCartasAleatorias(numeroPares);
    cartas.forEach(fruta => {
        const cartaElemento = document.createElement('div');
        cartaElemento.className = 'card';
        cartaElemento.dataset.fruta = fruta;
  
        const frontFace = document.createElement('div');
        frontFace.className = 'front-face';
        frontFace.textContent = '?'; // Mostrará '?' para ocultar el texto de la fruta
  
        const backFace = document.createElement('div');
        backFace.className = 'back-face';
        backFace.textContent = fruta; // Mostrará el nombre de la fruta
  
        cartaElemento.appendChild(frontFace);
        cartaElemento.appendChild(backFace);
  
        cartaElemento.addEventListener('click', () => voltearCarta(cartaElemento));
        memoryGame.appendChild(cartaElemento);
    });
  
    // Ocultar la configuración al comenzar el juego
    const configuracion = document.getElementById('configuracion');
    configuracion.style.display = 'none';
  }
  
  function crearCartasAleatorias(numPares) {
    const cartas = frutas.slice(0, numPares); // Obtener las primeras 'numPares' frutas
    const cartasDuplicadas = [...cartas, ...cartas]; // Duplicar para formar pares
  
    return cartasDuplicadas.sort(() => Math.random() - 0.5);
  }
  
  function voltearCarta(carta) {
    if (bloquearTablero || cartasVolteadas.length === 2 || carta === cartasVolteadas[0]) {
        return;
    }
  
    carta.classList.add('flipped');
    cartasVolteadas.push(carta);
  
    // Mostrar el nombre de la fruta al voltear la carta
    const frontFace = carta.querySelector('.front-face');
    frontFace.textContent = ''; // Eliminar el signo "?" al voltear la carta
  
    const backFace = carta.querySelector('.back-face');
    backFace.style.color = '#fff'; // Mostrar el texto en color blanco
    backFace.style.backgroundColor = '#007bff'; // Mostrar el fondo en color azul
  
    if (cartasVolteadas.length === 2) {
        verificarCoincidencia();
    }
  }
  
  function verificarCoincidencia() {
    const [primeraCarta, segundaCarta] = cartasVolteadas;
    const frutaPrimera = primeraCarta.dataset.fruta;
    const frutaSegunda = segundaCarta.dataset.fruta;
  
    bloquearTablero = true;
  
    if (frutaPrimera === frutaSegunda) {
        setTimeout(() => {
            cartasVolteadas.forEach(carta => carta.classList.add('matched'));
            cartasVolteadas = [];
            bloquearTablero = false;
            verificarFinJuego();
        }, 1000);
    } else {
        setTimeout(() => {
            cartasVolteadas.forEach(carta => {
                carta.classList.remove('flipped');
                const frontFace = carta.querySelector('.front-face');
                frontFace.textContent = '?'; // Restaurar el signo "?" en la cara frontal
                const backFace = carta.querySelector('.back-face');
                backFace.style.color = 'transparent'; // Ocultar el texto nuevamente
                backFace.style.backgroundColor = '#007bff'; // Restaurar el fondo azul
            });
            cartasVolteadas = [];
            bloquearTablero = false;
        }, 1000);
    }
  }
  
  function verificarFinJuego() {
    const cartas = document.querySelectorAll('.card');
    const todasEmparejadas = [...cartas].every(carta => carta.classList.contains('matched'));
  
    if (todasEmparejadas) {
        setTimeout(() => {
            const jugarDeNuevo = confirm('¡Has ganado! ¿Quieres jugar de nuevo?');
  
            if (jugarDeNuevo) {
                reiniciarJuego();
            } else {
                mostrarConfiguracion();
            }
        }, 500);
    }
  }
  
  function reiniciarJuego() {
    const memoryGame = document.getElementById('memory-game');
    memoryGame.innerHTML = '';
    iniciarJuego(); // Vuelve a iniciar el juego
  }
  
  function mostrarConfiguracion() {
    const configuracion = document.getElementById('configuracion');
    configuracion.style.display = 'block';
  }
  