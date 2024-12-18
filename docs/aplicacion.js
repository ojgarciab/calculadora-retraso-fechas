var segundosDiferencia = 0;
const ahora = new Date();

const conversionFecha = (fecha) => {
    if (!(fecha instanceof Date) || isNaN(fecha)) return "";
    return fecha.toISOString().replace(/(:?\.\d+)?Z\d*$/, "");
}

const conversionSegundos = (segundos) => {
    let resultado = [];
    const signo = (segundos < 0) ? "-" : "+";
    segundos = Math.abs(segundos);
    const años = Math.trunc(segundos / 31536000);
    segundos %= 31536000;
    const días = Math.trunc(segundos / 86400);
    segundos %= 86400;
    const horas = Math.trunc(segundos / 3600);
    segundos %= 3600;
    const minutos = Math.trunc(segundos / 60);
    segundos %= 60;
    if (años > 0) resultado.push(`${años} años`);
    if (días > 0) resultado.push(`${días} días`);
    if (horas > 0) resultado.push(`${horas} horas`);
    if (minutos > 0) resultado.push(`${minutos} minutos`);
    if (segundos > 0) resultado.push(`${segundos} segundos`);
    return signo + resultado.join(", ");
}

const cambioHoraCamaraCalculo = (evento) => {
    cambioCalculo();
};

const cambioHoraCamara = (evento) => {
    localStorage.setItem("hora-camara", window["hora-camara"].value);
    cambioDiferencia();
    cambioCalculo();
};

const cambioHoraReal = (evento) => {
    localStorage.setItem("hora-real", window["hora-real"].value);
    cambioDiferencia();
    cambioCalculo();
};

const cambioDiferencia = () => {
    segundosDiferencia = (
        (new Date(window["hora-camara"].value).getTime())
        - (new Date(window["hora-real"].value).getTime())
    ) / 1000;
    window["diferencia"].value = conversionSegundos(segundosDiferencia);
};

const cambioCalculo = () => {
    let fecha = new Date(window["hora-camara-calculo"].value);
    fecha.setSeconds(fecha.getSeconds() + segundosDiferencia);
    window["hora-real-calculo"].value = conversionFecha(fecha);
};

document.addEventListener(
    "DOMContentLoaded",
    (evento) => {
        /* Agregamos los manejadores de eventos de los campos del formulario */
        window["hora-camara-calculo"].addEventListener("change", cambioHoraCamaraCalculo);
        window["hora-camara"].addEventListener("change", cambioHoraCamara);
        window["hora-real"].addEventListener("change", cambioHoraReal);
        /* Cargamos los datos almacenados o la fecha actual por defecto */
        window["hora-camara"].value = conversionFecha(new Date(localStorage.getItem("hora-camara") ?? ahora));
        window["hora-real"].value = conversionFecha(new Date(localStorage.getItem("hora-real") ?? ahora));
        /* Provocamos el cálculo de la diferencia */
        cambioDiferencia();
        /* Fijamos la hora actual y provocamos cambio del cálculo */
        window["hora-camara-calculo"].value = conversionFecha(ahora);
        cambioCalculo();
    }
);
