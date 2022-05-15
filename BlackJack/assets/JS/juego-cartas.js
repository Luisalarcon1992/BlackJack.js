

let mazo = [];

const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0;
let puntosComputadora = 0;
let sumadorJugador = document.querySelectorAll('small');
let divCartasJugador = document.querySelector('#jugador-cartas');
const botonPedir = document.querySelector('#botonPedir');


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

// Eventos de click 

botonPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    sumadorJugador[0].innerText = puntosJugador;
    //<img class="cartas" src="cartas/10D.png" alt="">

    const imgCarta = document.createElement('img');
    imgCarta.src = `cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    
});

