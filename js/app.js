// Definir la función createCard para mostrar los servicios en tarjetas
function createCard(servicio) {
    return `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${servicio.nombre}</h5>
                <p class="card-text"><strong>Cliente:</strong> ${servicio.cliente}</p>
                <p class="card-text"><strong>Estado:</strong> ${servicio.estado}</p>
                <p class="card-text"><strong>Descripción:</strong> ${servicio.descripcion}</p>
                <p class="card-text"><strong>Encargado:</strong> ${servicio.encargado}</p>
                <p class="card-text"><strong>Fecha:</strong> ${servicio.fecha}</p>
            </div>
        </div>
    `;
}

document.getElementById('servicioForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const servicioData = {
        nombre: formData.get('nombre'),
        cliente: formData.get('cliente'),
        estado: formData.get('estado'),
        descripcion: formData.get('descripcion'),
        encargado: formData.get('encargado'),
        fecha: formData.get('fecha')
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/api/servicios/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value
            },
            body: JSON.stringify(servicioData)
        });

        const data = await response.json();
        document.getElementById('response').innerHTML = response.ok 
            ? createCard(data.servicio) 
            : `<p>Error: ${data.message}</p>`;
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('getServiciosBtn').addEventListener('click', async function() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/servicios/');
        const data = await response.json();
        if (response.ok) {
            const cards = data.servicio.map(createCard).join('');
            document.getElementById('response').innerHTML = cards;
        } else {
            document.getElementById('response').innerHTML = `<p>Error: ${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('getServicioBtn').addEventListener('click', async function() {
    const servicioId = document.getElementById('servicioId').value;
    try {  
        const response = await fetch(`http://127.0.0.1:8000/api/servicios/${servicioId}`);
        const data = await response.json();
        if (response.ok) {
            document.getElementById('response').innerHTML = createCard(data.servicio);
        } else {
            document.getElementById('response').innerHTML = `<p>Error: ${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('updateServicioBtn').addEventListener('click', async function() {
    const servicioId = document.getElementById('servicioId').value;
    const formData = new FormData(document.getElementById('servicioForm'));
    const servicioData = {
        nombre: formData.get('nombre'),
        cliente: formData.get('cliente'),
        estado: formData.get('estado'),
        descripcion: formData.get('descripcion'),
        encargado: formData.get('encargado'),
        fecha: formData.get('fecha')
    };

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/servicios/${servicioId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value
            },
            body: JSON.stringify(servicioData)
        });

        const data = await response.json();
        document.getElementById('response').innerHTML = response.ok 
            ? createCard(data.servicio) 
            : `<p>Error: ${data.message}</p>`;
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('deleteServicioBtn').addEventListener('click', async function() {
    const servicioId = document.getElementById('servicioId').value;

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/servicios/${servicioId}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value
            }
        });

        const data = await response.json();
        document.getElementById('response').innerHTML = response.ok 
            ? `<p>Servicio eliminado</p>` 
            : `<p>Error: ${data.message}</p>`;
    } catch (error) {
        console.error('Error:', error);
    }
});