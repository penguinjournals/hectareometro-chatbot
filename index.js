const municipiosRepository = require('./municipios');
const inputHa = process.argv.slice(2)[0];
const inputTown = 'Guipuzkoa';
let diferenciaDeReferencia = 100000;
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
console.log("Consulta: " + inputHa);
console.log("Comunidad: " + municipioDeReferencia.comunidad + " Provincia: " + municipioDeReferencia.provincia + " Municipio: " + municipioDeReferencia.municipio + " superficie: " + superficieDeReferencia);

function isCandidate(candidate, inputTown) {
    let output = false;
    if (candidate.comunidad.includes(inputTown)||
        candidate.provincia.includes(inputTown)||
        candidate.municipio.includes(inputTown)){
        output = true;
    }
    return output;
}