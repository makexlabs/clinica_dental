// Datos de los servicios
const serviciosData = {
    consulta: {
        titulo: "Consulta Dental",
        descripcion: "Evaluación completa de tu salud bucal, incluyendo examen clínico, radiografías y plan de tratamiento personalizado.",
        duracion: "30 minutos",
        costo: "$50"
    },
    resinas: {
        titulo: "Resinas Dentales",
        descripcion: "Restauraciones estéticas del color de tus dientes para reparar caries, fracturas o mejorar la apariencia de tus dientes.",
        duracion: "1 hora",
        costo: "$200"
    },
    limpieza: {
        titulo: "Limpieza Dental Profesional",
        descripcion: "Eliminación de placa bacteriana y sarro, pulido dental y aplicación de flúor para prevenir caries.",
        duracion: "45 minutos",
        costo: "$70"
    },
    blanqueamiento: {
        titulo: "Blanqueamiento Dental",
        descripcion: "Tratamiento para aclarar el color de tus dientes de forma segura y efectiva, mejorando tu sonrisa.",
        duracion: "2 horas",
        costo: "$300"
    },
    ortodoncia: {
        titulo: "Ortodoncia",
        descripcion: "Corrección de la posición de los dientes y la mordida mediante brackets tradicionales o transparentes.",
        duracion: "1 año",
        costo: "$5000"
    },
    endodoncia: {
        titulo: "Endodoncia",
        descripcion: "Tratamiento de conductos para salvar dientes con daño severo o infección en el nervio dental.",
        duracion: "1 hora",
        costo: "$400"
    }
};

// Seleccionar elementos del DOM
const modal = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalDuration = document.getElementById('modalDuration');
const modalCost = document.getElementById('modalCost');
const closeBtn = document.querySelector('.close-btn');
const serviceBtns = document.querySelectorAll('.service-btn');

// Función para abrir el modal
function openModal(serviceId) {
    const service = serviciosData[serviceId];
    if (service) {
        modalTitle.textContent = service.titulo;
        modalDescription.textContent = service.descripcion;
        modalDuration.textContent = `Duración: ${service.duracion}`;
        modalCost.textContent = `Costo Aproximado: ${service.costo}`;
        modal.style.display = 'block';
        // Pequeño delay para asegurar que la transición funcione
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

// Función para cerrar el modal
function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Event listeners
serviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const serviceId = btn.getAttribute('data-service');
        openModal(serviceId);
    });
});

closeBtn.addEventListener('click', closeModal);

// Cerrar modal al hacer click fuera del contenido
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Cerrar modal con la tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});