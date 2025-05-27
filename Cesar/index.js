const alfabeto = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

const inputOriginal = document.getElementById('input-original');
const cifrador = document.getElementById('cifrador');
const resultado = document.getElementById('resultado');
const rango = document.getElementById('rango');

/**
 * Procesa el texto ingresado y lo cifra carácter por carácter.
 */
const shiftMessage = () => {
    const texto = inputOriginal.value.toUpperCase();
    const caracteres = [...texto];
    procesarCaracteres(0, caracteres);
};

/**
 * Cifra y muestra cada carácter con animación.
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
 * Simula una animación de mezcla antes de mostrar el carácter cifrado.
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
 * Maneja el envío del formulario, previene recarga y lanza el cifrado.
 */
const manejarEnvio = (e) => {
    e.preventDefault();
    resultado.innerHTML = '';
    shiftMessage();
};

cifrador.addEventListener('submit', manejarEnvio);
