

let mazo = [];

const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0;
let puntosComputadora = 0;
let sumadorJugador = document.querySelectorAll('small');
let sumadorComputadora = document.querySelectorAll('small');
let divCartasJugador = document.querySelector('#jugador-cartas');
let divCartasComputadora = document.querySelector('#Computadora-cartas');
const botonPedir = document.querySelector('#botonPedir');
const botonDetener = document.querySelector('#botonDetener');
const botonNuevo = document.querySelector('#botonNuevo');



//Esta función crea un mazo aleatorio
const crearMazo = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            mazo.push(i + tipo)
        }
        
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            mazo.push (esp + tipo);
        }
    }
    
    mazo = _.shuffle(mazo);
    return mazo;

}

crearMazo();

// Pide una carta del mazo

const pedirCarta = () => {

    if ( mazo.length === 0) {
        throw 'Ya no hay más cartas en el mazo';
    }
    const carta = mazo.pop();
    return carta;
}

 pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
 
    return (isNaN(valor)) ?  
                (valor === 'A') ? 11 : 10
                : (valor * 1);       

}

// Turno de la computadora

const turnoComputadora = (puntosMinimo) => {

    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        sumadorComputadora[1].innerText = puntosComputadora;
        //<img class="cartas" src="cartas/10D.png" alt="">

        const imgCarta = document.createElement('img');
        imgCarta.src = `cartas/${carta}.png`;
        imgCarta.classList.add('cartas');
        divCartasComputadora.append(imgCarta);
        if (puntosMinimo > 21) {
            break;
        }

    } while ( (puntosComputadora < puntosMinimo) && (puntosMinimo <= 21 ));

    setTimeout(() => {        
    puntosMinimo > 21 ? alert('Lo siento, perdiste. Suerte en la próxima') :
    puntosMinimo > puntosComputadora ? alert('Lo siento, perdiste. Suerte en la próxima') : 
    puntosMinimo === puntosComputadora ? alert('Empataron') : alert('Felicitaciones, ganaste!');        
    }, 30);


}

// Eventos de los clicks de los botones

botonNuevo.addEventListener('click', () => {

    console.clear();
    mazo = [];
    mazo = crearMazo();

    puntosComputadora = 0;
    puntosJugador = 0;
    
    sumadorJugador[0].innerText = 0;
    sumadorComputadora[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    botonPedir.disabled = false;
    botonDetener.disabled = false;


})

botonPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    sumadorJugador[0].innerText = puntosJugador;
    //<img class="cartas" src="cartas/10D.png" alt="">

    const imgCarta = document.createElement('img');
    imgCarta.src = `cartas/${carta}.png`;
    imgCarta.classList.add('cartas');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {        
        botonPedir.disabled = true;
        botonDetener.disabled = true;
        turnoComputadora(puntosJugador);
        
    } else if (puntosJugador === 21) {
        console.warn('21, Grandioso!');
        botonPedir.disabled = true;
        turnoComputadora(puntosJugador);
    }

    
});

botonDetener.addEventListener('click', () => {
    botonPedir.disabled = true;
    botonDetener.disabled = true;
    turnoComputadora(puntosJugador);
})


