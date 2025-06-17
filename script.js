document.getElementById('iniciar').addEventListener('click', function () {
    // Limpiar resultados anteriores
    document.getElementById('columnas').innerHTML = '';
    document.getElementById('estadoInicial').innerText = '';

    let inputArreglo = document.getElementById('inputArreglo').value;

    // Validar entrada
    let arreglo = inputArreglo.split(',')
        .map(s => s.trim())
        .filter(s => s !== '')
        .map(Number);

    if (arreglo.some(isNaN)) {
        alert("Por favor, ingresa solo números separados por comas.");
        return;
    }

    let intercambio = 1;
    let pausar = false;

    // Botón de pausa/reanudar
    document.getElementById('pausar').addEventListener('click', function () {
        pausar = !pausar;
    });

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

        // Mostrar estado final
        const resultadoFinal = document.createElement('div');
        resultadoFinal.classList.add('columna');
        resultadoFinal.innerText = `Resultado final: [${arr.join(', ')}]`;
        document.getElementById('columnas').appendChild(resultadoFinal);
    }

    function mostrarEstadoInicial(arr) {
        document.getElementById('estadoInicial').innerText = `Estado inicial del arreglo: [${arr.join(', ')}]`;
    }

    function mostrarPaso(iteracion, tipo, arr) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let columna = document.createElement('div');
                columna.classList.add('columna', tipo === 'Nones' ? 'nones' : 'pares');
                columna.innerText = `Intercambio ${iteracion} (${tipo}): [${arr.join(', ')}]`;
                document.getElementById('columnas').appendChild(columna);
                resolve();
            }, 500); // Puedes ajustar velocidad aquí
        });
    }

    trasposicionParesNones(arreglo);
});
