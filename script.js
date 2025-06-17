document.getElementById('iniciar').addEventListener('click', function () {
    let inputArreglo = document.getElementById('inputArreglo').value;
    let arreglo = inputArreglo.split(',').map(Number);

    let intercambio = 1;
    let pausar = false;

async function trasposicionParesNones(arr) {
    let intercambioNones, intercambioPares;

    mostrarEstadoInicial(arr);

    do {
        intercambioNones = false;
        intercambioPares = false;

        // Comparar nones
        for (let i = 0; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                intercambioNones = true;
            }
        }
        await mostrarPaso(intercambio, 'Nones', arr);

        // Comparar pares
        for (let i = 1; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                intercambioPares = true;
            }
        }
        await mostrarPaso(intercambio, 'Pares', arr);

        intercambio++;

        while (pausar) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    } while (intercambioNones || intercambioPares);
}

function mostrarPaso(iteracion, tipo, arr) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let columna = document.createElement('div');
            columna.classList.add('columna');
            columna.innerText = `Intercambio ${iteracion} (${tipo}): [${arr.join(', ')}]`;
            document.getElementById('columnas').appendChild(columna);
            resolve();
        }, 500); // puedes ajustar velocidad
    });
}
    
    document.getElementById('iniciar').addEventListener('click', function () {
        document.getElementById('columnas').innerHTML = '';
    });

    trasposicionParesNones(arreglo);
});
