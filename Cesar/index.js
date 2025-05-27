const alfabeto = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

const inputOriginal = document.getElementById('input-original');
const cifrador = document.getElementById('cifrador');
const resultado = document.getElementById('resultado');
const rango = document.getElementById('rango');

/**
 * Ejecuta el proceso de cifrado del texto ingresado.
 */
const shiftMessage = () => {
    const texto = inputOriginal.value.toUpperCase();
    const caracteres = [...texto];
    procesarCaracteres(0, caracteres);
};

/**
 * Cifra y anima cada carácter del texto ingresado.
 * @param {number} index - Índice actual del carácter.
 * @param {string[]} caracteres - Array de caracteres a cifrar.
 */
const procesarCaracteres = (index, caracteres) => {
    if (index >= caracteres.length) return;

    const span = document.createElement('span');
    resultado.appendChild(span);

    animarCaracter(span).then(() => {
        const char = caracteres[index];
        const pos = alfabeto.indexOf(char);

        span.textContent = pos === -1
            ? char
            : alfabeto[(pos + parseInt(rango.value)) % alfabeto.length];

        procesarCaracteres(index + 1, caracteres);
    });
};

/**
 * Realiza animación rápida de "mezcla" antes de mostrar el carácter final cifrado.
 * @param {HTMLElement} span 
 * @returns {Promise}
 */
const animarCaracter = (span) => {
    let cambios = 0;
    return new Promise(resolve => {
        const intervalo = setInterval(() => {
            span.textContent = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            cambios++;
            if (cambios === 3) {
                clearInterval(intervalo);
                resolve();
            }
        }, 50);
    });
};

/**
 * Evento al enviar el formulario.
 * @param {Event} e 
 */
const manejarEnvio = (e) => {
    e.preventDefault();
    resultado.innerHTML = '';
    shiftMessage();
};

cifrador.addEventListener('submit', manejarEnvio);