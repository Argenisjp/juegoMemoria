// Inicializacion de variables
let targetasDestapadas = 0;

// Generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
numeros = numeros.sort(()=> {return Math.random()-0.5});

// Funcion principal
function destapar(id){
    targetasDestapadas ++;
    console.log(targetasDestapadas);
}
