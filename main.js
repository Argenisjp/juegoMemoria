// Inicializacion de variables
let targetasDestapadas = 0;
let targeta1 = null;
let targeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerInicial = 60;
let tiempoRegresivoId = null;


let victoriaAudio = new Audio('./sonidos/victoria.mp3');
let fatalityAudio = new Audio('./sonidos/fatality.mp3');
let overAudio = new Audio('./sonidos/mario-game-over.mp3');
let yajuAudio = new Audio('./sonidos/yaju.mp3');
let fallaAudio = new Audio('./sonidos/falla.mp3');
let click2Audio = new Audio('./sonidos/click2.mp3');



// Apuntando a Movimientos de HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostraraciertos = document.getElementById('aciertos')
let mostrarTiempo = document.getElementById('t-restante')

// Generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
numeros = numeros.sort(()=> {return Math.random()-0.5});

// Funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer --;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTargetas();
            overAudio.play();
        }
    },1000)
}

function bloquearTargetas(){
    for (let i = 0  ; i <= 15;   i++)  {
        let targetaBloqueada = document.getElementById(i);
        targetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png">`;
        targetaBloqueada.disabled = true;


    }
}


// Funcion principal
function destapar(id){

    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
       
    }

    targetasDestapadas ++;
    console.log(targetasDestapadas);


    if (targetasDestapadas == 1) {
        
        // Mostramos primer numero
        targeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        targeta1.innerHTML = `<img src="./img/${primerResultado}.png">`;
        click2Audio.play();
        
        // Desabilitamos primer boton
        targeta1.disabled = true;

    }else if (targetasDestapadas == 2) {
        click2Audio.play();
        targeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        targeta2.innerHTML = `<img src="./img/${segundoResultado}.png">`;
       

        targeta2.disabled = true;
        // Incrementamos movimientos
        movimientos ++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;


        if (primerResultado == segundoResultado) {
             yajuAudio.play();
            // encerrar contador tagetas destapadas
            targetasDestapadas = 0;

            aciertos ++;
            mostraraciertos.innerHTML = `Aciertos: ${aciertos}`;
           

            if (aciertos == 8) {
                victoriaAudio.play(); //sonido cuando se gana el juego
                clearInterval(tiempoRegresivoId);
                mostraraciertos.innerHTML = `Aciertos: ${aciertos} 🎈🎉🎊😁` ;
                mostrarTiempo.innerHTML = `Coño ganaste 😎 solo te demoraste ${timerInicial - timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😎`;
                
            }

        }else{
            fallaAudio.play();
            // Mostrar momentaneamente y volver a tapar 
            setTimeout(()=>{
                targeta1.innerHTML = ' ';
                targeta2.innerHTML = ' ';
                targeta1.disabled = false;
                targeta2.disabled = false;
                targetasDestapadas = 0;
            },800);
        } 

    }

    console.log(numeros);
}
