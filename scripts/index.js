const palabras = ['manzana','trueno','etiqueta','zafiro','afuera','rodar','hueso','pulpo','arrestar','tortilla','semana','sofocar','horrible','sombrero','beisbol','europa','alrededor','cianuro','fiscal','circo','apresar','eludir','sonambulo','proyecto','diario','lubricante','examen','contagioso','alfajor','humor','abejas','pulsera','venda','ocupar','golosinas','roca','desperdiciar','robo','corta'];
let palabra;
let errores = 0;
let aciertos = 0;
let acerto = false;
let error = false;

const letras = document.getElementsByClassName('botones');
const containerBotones = document.getElementById('container-botones');
const jugar = document.getElementById('jugar');
const palabraAdivinar = document.getElementById('palabra-adivinar');
const imagen = document.getElementById('img');


jugar.addEventListener('click', iniciarJuego);

for(i = 0; i < letras.length; i++){
    letras[i].disabled = true;
}


function iniciarJuego(){

    setearJuego();

    const numeroAleatorio = numeroAlAzar();
    palabra = palabras[numeroAleatorio];


    for(i = 0; i < palabra.length; i++){
        const span = document.createElement('span');
        palabraAdivinar.appendChild(span);
    }

    for(i = 0; i < letras.length; i++){
        letras[i].addEventListener('click',clickLetras);
    }
}

function setearJuego () {

    errores = 0;
    aciertos = 0;
    palabra = '';

    const src = `./images/img${errores}.png`;
    imagen.src= src;

    for(i = 0; i < letras.length; i++){
        letras[i].disabled = false;
        letras[i].classList.remove('opaco')
    }

    palabraAdivinar.innerHTML='';
    jugar.disabled=true;
    jugar.classList.add('opaco');
}


function numeroAlAzar() {
    const numero = Math.floor(Math.random() * palabras.length);
    return numero;
}

function clickLetras(e){
    const boton = e.target;
    boton.disabled = true;
    boton.classList.add('opaco')
    const spans = document.querySelectorAll('span')

    acerto = false;
    error = false;

    for(i=0; i < palabra.length; i++){
        const letra = e.target.innerHTML;
        if(letra == palabra[i]){
            spans[i].innerHTML = letra;
            acerto = true;
            aciertos++;
        }
        
    }

    if(acerto == false) {
        error = true;
        errores ++;
        const src = `./images/img${errores}.png`;
        imagen.src= src;
    }

    if(errores == 7) {
        setTimeout(() => {
            Swal.fire({
            title:`Perdiste<br> La palabra era ${palabra}`,
            confirmButtonColor: '#111',
            confirmButtonText: 'Continuar'
            });
        },500)
        termino();
    }else if (aciertos == palabra.length) {
        setTimeout(() => {
            Swal.fire({
            title:`Ganaste<br> La palabra era ${palabra}`,
            confirmButtonColor: '#111',
            confirmButtonText: 'Continuar'
            });
        },500)
        termino();
    }
}

function termino() {
    for(i = 0; i < letras.length; i++){
        letras[i].disabled = true;
        letras[i].classList.add('opaco')
    }
    jugar.disabled=false;
    jugar.classList.remove('opaco');
}








