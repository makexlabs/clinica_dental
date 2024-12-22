// Datos de los servicios
const serviciosData = {
    consulta: {
        titulo: "Consulta Dental",
        descripcion: "Se realiza Valoración y Diagnóstico completo, revisión con cámara intraoral, Radiografía periapical en caso de ser necesario, Plan de tratamiento y Presupuesto.",
        duracion: "30min a 1h",
        costo: "$300"
    },
    resinas: {
        titulo: "Resinas Dentales",
        descripcion: "Se realiza Valoración y Diagnóstico completo, revisión con cámara intraoral, Radiografía periapical en caso de ser necesario, Plan de tratamiento, Presupuesto, Eliminación de Caries y Obturación con Resina",
        duracion: "1 hora",
        costo: "$500 por Diente"
    },
    limpieza: {
        titulo: "Limpieza Dental Profesional",
        descripcion: "Se realiza Valoración y Diagnóstico completo, revisión con cámara intraoral, Radiografía periapical en caso de ser necesario, Plan de tratamiento, Presupuesto y Limpieza Dental con Ultrasonido y Pulido Dental",
        duracion: "1 Hora",
        costo: "$400"
    },
    blanqueamiento: {
        titulo: "Blanqueamiento Dental",
        descripcion: "Se realiza Valoración y Diagnóstico completo, revisión con cámara intraoral, Radiografía periapical en caso de ser necesario, Plan de tratamiento, Presupuesto, Limpieza Dental con Ultrasonido, Pulido Dental y Blanqueamiento",
        duracion: "1 hora y media a 2 horas",
        costo: "$1650"
    },
    ortodoncia: {
        titulo: "Extracción Dental",
        descripcion: "Se realiza Valoración y Diagnóstico completo, revisión con cámara intraoral, Radiografía periapical en caso de ser necesario, Plan de tratamiento, Presupuesto y Extracción Dental. (No Muelas del Juicio)",
        duracion: "30min a 1 hora",
        costo: "$500 Simple por Diente, $800 Compleja por Diente"
    },
    endodoncia: {
        titulo: "Desmanchado Dental por Fluorosis",
        descripcion: "Se realiza Valoración y Diagnóstico completo, revisión con cámara intraoral, Radiografía periapical en caso de ser necesario, Plan de tratamiento, Presupuesto y Eliminación de manchas por Fluorosis",
        duracion: "1 hora",
        costo: "$350 Por Diente"
    },
    MásServicios: {
        titulo: [
            "Prótesis Fija",
            "Prótesis Removible",
            "Prótesis Total",
            "Incrustaciones",
            "Tratamiento de Encías",
            "Guardas Oclusales",
            "Extracción Muela del juicio Sencilla",
            "Extra Muela Juicio Compleja (Especialista)",
            "Aplicación de selladores (Niños)",
            "Aplicación de Flúor (Niños)",
            "Pulpotomías (Especialista)",
            "Pulpectomias (Especialista)",
            "Endodoncia (Especialista)"
        ],
        descripcion: `Algunos de los tratamientos son realizados por el especialista, por lo que se le refiere a otro consultorio o clínica. Para más información preguntar directamente al personal de la clínica`,
        duracion: "NA",
        costo: "NA"
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
        if (Array.isArray(service.titulo)) {
            modalTitle.innerHTML = service.titulo.map(item => `<li>${item}</li>`).join(''); // Convertir a lista
        } else {
            modalTitle.textContent = service.titulo;
        }
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