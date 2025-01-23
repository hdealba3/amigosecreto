let amigos = [];

// Función para agregar amigos
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    if (nombre === '') {
        alert('Por favor, escribe un nombre válido.');
        return;
    }

    if (amigos.includes(nombre)) {
        alert('Este nombre ya está en la lista.');
        input.value = '';
        return;
    }

    amigos.push(nombre);
    actualizarLista();
    input.value = '';
}

// Actualizar la lista de amigos en el DOM
function actualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'eliminar';
        botonEliminar.classList.add('button-remove');
        botonEliminar.onclick = () => eliminarAmigo(index);

        li.appendChild(botonEliminar);
        lista.appendChild(li);
    });
}

// Eliminar un amigo de la lista
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarLista();
}

// Función para realizar el sorteo
function sortearAmigo() {
    if (amigos.length < 2) {
        alert('No hay suficientes amigos para sortear.');
        return;
    }

    // Crear copias de los arrays
    const asignaciones = [];
    const disponibles = [...amigos];

    amigos.forEach((amigo) => {
        // Filtrar para evitar que alguien se asigne a sí mismo
        const posibles = disponibles.filter((nombre) => nombre !== amigo);

        // Si no hay opciones válidas, reiniciar el sorteo
        if (posibles.length === 0) {
            
            return sortearAmigo(); // Intentar de nuevo desde el inicio
        }

        // Seleccionar aleatoriamente de las opciones disponibles
        const seleccionado = posibles[Math.floor(Math.random() * posibles.length)];

        // Guardar la asignación y eliminar del array disponible
        asignaciones.push({ de: amigo, para: seleccionado });
        const index = disponibles.indexOf(seleccionado);
        disponibles.splice(index, 1);
    });

    mostrarResultados(asignaciones);
}

// Mostrar resultados corregidos
function mostrarResultados(asignaciones) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = ''; // Limpiar resultados previos

    asignaciones.forEach(({ de, para }) => {
        const li = document.createElement('li');
        li.textContent = `${de}, tu amigo secreto es ${para}`;
        li.style.color = 'green'; // Personalización del estilo
        resultado.appendChild(li);
    });
}
