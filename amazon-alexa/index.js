const municipiosRepository = require('./municipios');
const inputHa = process.argv.slice(2)[0];
const inputTown = 'sevilla';
let diferenciaDeReferencia = 1000000000;
let municipioDeReferencia = {};
let superficieDeReferencia = 0;
municipiosRepository.municipios.forEach(function(item){
    if(isCandidate(item, inputTown)){
        diferenciaEnCurso = Math.abs(item.superficieHa - inputHa);
        if (diferenciaDeReferencia > diferenciaEnCurso) {
            diferenciaDeReferencia = diferenciaEnCurso;
            municipioDeReferencia = item;
            superficieDeReferencia = item.superficieHa;
        }
    }
});

let mensajeMultiplicador = "";
if (municipioDeReferencia.superficieHa > inputHa*2) {
    let multiplicador = Math.round(municipioDeReferencia.superficieHa / inputHa);
    if (multiplicador>1) {
        mensajeMultiplicador = multiplicador + " veces mas pequeño que";
    }
}

if (municipioDeReferencia.superficieHa < inputHa * 2) {
    let multiplicador = Math.round(inputHa / municipioDeReferencia.superficieHa);
    if (multiplicador>1) {
        mensajeMultiplicador = multiplicador + " veces";
    }
}

console.log(inputHa + " hectáreas equivalen a:");
console.log(mensajeMultiplicador + " " + municipioDeReferencia.municipio + " provincia de " + municipioDeReferencia.provincia);
console.log("con una superficie de " + municipioDeReferencia.superficieHa + " y una población de " + municipioDeReferencia.habitantes + " habitantes");

function isCandidate(candidate, inputTown) {
    let output = false;
    if (candidate.comunidad.toLowerCase().includes(inputTown)||
        candidate.provincia.toLowerCase().includes(inputTown)||
        candidate.municipio.toLowerCase().includes(inputTown)){
        output = true;
    }
    return output;
}