const municipiosRepository = require('./municipios');

function calculate(hectareas, sitio) {
    let speechText = 'Lo siento pero no te he entendido asi que no puedo darte una comparación prueba a preguntarme de esta manera ¿A que equivalen docemil hectáreas cerca de Sevilla?';
    const inputHa = hectareas;
    const inputTown = sitio;
    let diferenciaDeReferencia = 1000000000;
    let municipioDeReferencia = null;
    municipiosRepository.municipios.forEach(function (item) {
        if (isCandidate(item, inputTown)) {
            diferenciaEnCurso = Math.abs(item.superficieHa - inputHa);
            if (diferenciaDeReferencia > diferenciaEnCurso) {
                diferenciaDeReferencia = diferenciaEnCurso;
                municipioDeReferencia = item;
                superficieDeReferencia = item.superficieHa;
            }
        }
    });

    if (municipioDeReferencia !== null) {
        speechText = message(municipioDeReferencia, inputHa, inputTown);
    }

    return speechText;
}

function message(municipioDeReferencia, inputHa, inputTown) {
    let mensajeMultiplicador = "";
    if (municipioDeReferencia.superficieHa > inputHa * 2) {
        let multiplicador = Math.round(municipioDeReferencia.superficieHa / inputHa);
        if (multiplicador > 1) {
            mensajeMultiplicador = "una superficie " + multiplicador + " veces mas pequeña que";
        }
    }

    if (municipioDeReferencia.superficieHa < inputHa * 2) {
        let multiplicador = Math.round(inputHa / municipioDeReferencia.superficieHa);
        if (multiplicador > 1) {
            mensajeMultiplicador = multiplicador + " veces";
        }
    }

    speechText = inputHa + ' hectáreas cerca de ' + inputTown + ' equivalen a';
    speechText = speechText + ' ' + mensajeMultiplicador + ' ' + municipioDeReferencia.municipio + ' que tiene una superficie de ' + municipioDeReferencia.superficieHa + ' hectáreas ';
    speechText = speechText + ' y una población de ' + municipioDeReferencia.habitantes + ' habitantes.';
    return speechText;
}
function isCandidate(candidate, inputTown) {
    let output = false;
    if (candidate.comunidad.toLowerCase().includes(inputTown.toLowerCase()) ||
        candidate.provincia.toLowerCase().includes(inputTown.toLowerCase()) ||
        candidate.municipio.toLowerCase().includes(inputTown.toLowerCase())) {
        output = true;
    }
    return output;
}

module.exports = {
    calculate
}