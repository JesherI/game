let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 10;
let timer2 = 0;
let tiempoRegresivoId = null;

let winAudio = new Audio('./sound/win.wav');
let loseAudio = new Audio('./sound/lose.wav');
let clickAudio = new Audio('./sound/click.wav');
let rightAudio = new Audio('./sound/right.wav');
let wrongAudio = new Audio('./sound/wrong.wav');

let mostrarMovimientos = document.getElementById('movimientos')
let mostrarAciertos = document.getElementById('aciertos')
let mostrarTiempo = document.getElementById('t-restante')

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5 })
console.log(numeros);

function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        timer2++;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer <= 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            mostrarMensajeDerrota();
            loseAudio.play();
        }
    }, 800);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}

function destapar(id) {
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1) {
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png" alt="">`;
        tarjeta1.disabled = true;
        clickAudio.play();
    } else if (tarjetasDestapadas == 2) {
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png" alt="">`;
        clickAudio.play();

        tarjeta2.disabled = true;

        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            tarjetasDestapadas = 0;
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            rightAudio.play();
            sumarTiempo(10);

            if (aciertos == 8) {
                mostrarMensajeVictoria();
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😎`;
                mostrarTiempo.innerHTML = `Fantastico 🎉 Solo demoraste ${timer2} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤙😊🎊`;
                winAudio.play();
            }
        } else {
            setTimeout(() => {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
                wrongAudio.play();
            }, 300)
        }
    }

}

function sumarTiempo(segundos) {
    timer += segundos;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
}

function mostrarMensajeVictoria() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';

    const overlayContent = document.getElementById('overlay-content');
    overlayContent.innerHTML = '<h2>¡Ganaste!</h2><p>¿Quieres jugar de nuevo?</p>';

    const replayButton = document.createElement('button');
    replayButton.innerHTML = '¡Sí, quiero!';
    replayButton.id = 'replay-button';
    replayButton.addEventListener('click', function () {
        location.reload();
    });

    overlayContent.appendChild(replayButton);
}


function mostrarMensajeDerrota() {
    const loseOverlay = document.getElementById('lose-overlay');
    loseOverlay.style.display = 'flex';

    const loseOverlayContent = document.getElementById('lose-overlay-content');
    loseOverlayContent.innerHTML = '<h2>¡Perdiste!</h2><p>¿Quieres intentarlo de nuevo?</p>';

    const retryButton = document.createElement('button');
    retryButton.innerHTML = '¡Sí, intentarlo de nuevo!';
    retryButton.id = 'retry-button';
    retryButton.addEventListener('click', function () {
        location.reload();
    });

    loseOverlayContent.appendChild(retryButton);
}
