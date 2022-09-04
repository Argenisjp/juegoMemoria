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
        }
    },1000)
}

function bloquearTargetas(){
    for (let i = 0  ; i <= 15;   i++)  {
        let targetaBloqueada = document.getElementById(i);
        targetaBloqueada.innerHTML = numeros[i];
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
        targeta1.innerHTML = primerResultado;

        // Desabilitamos primer boton
        targeta1.disabled = true;

    }else if (targetasDestapadas == 2) {
        targeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        targeta2.innerHTML = segundoResultado;

        targeta2.disabled = true;

        // Incrementamos movimientos
        movimientos ++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;


        if (primerResultado == segundoResultado) {
            // encerrar contador tagetas destapadas
            targetasDestapadas = 0;

            aciertos ++;
            mostraraciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos == 8) {
                clearInterval(tiempoRegresivoId);
                mostraraciertos.innerHTML = `Aciertos: ${aciertos} 🎈🎉🎊😁` ;
                mostrarTiempo.innerHTML = `Coño ganaste 😎 solo te demoraste ${timerInicial - timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😎`;
            }

        }else{
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
