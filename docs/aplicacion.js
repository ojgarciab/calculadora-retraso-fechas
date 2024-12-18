diferencia = 0;

const cambioHoraCamara = (evento) => {
    console.log(window["hora-camara"]);
};

document.addEventListener(
    "DOMContentLoaded",
    (evento) => {
        window["hora-camara"].value = new Date().toISOString();
    }
);
