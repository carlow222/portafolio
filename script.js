// ========================================
// MODAL DE BIENVENIDA
// ========================================

// Función para cerrar el modal de bienvenida
// Esta función se llama desde el botón en el HTML
function cerrarModal() {
    const modal = document.getElementById('modal-bienvenida');
    if (modal) {
        // Agregar clase para animación de salida
        modal.classList.add('oculto');
        
        // Después de la animación, ocultar completamente el modal
        setTimeout(function() {
            modal.style.display = 'none';
            // Habilitar el scroll del body
            document.body.style.overflow = 'auto';
        }, 500); // 500ms = duración de la animación fadeOut
    }
}

// ========================================
// MANEJO DEL FORMULARIO DE CONTACTO
// ========================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Prevenir el scroll cuando el modal esté visible (solo en index.html)
    const modal = document.getElementById('modal-bienvenida');
    if (modal) {
        // Deshabilitar scroll cuando el modal esté visible
        document.body.style.overflow = 'hidden';
    }
    
    // Obtener referencia al formulario usando su ID (si existe en esta página)
    const formulario = document.getElementById('formulario-contacto');
    
    // Solo agregar el listener si el formulario existe (solo en contacto.html)
    if (formulario) {
        // Agregar un event listener para el evento 'submit'
        // Este evento se dispara cuando el usuario intenta enviar el formulario
        formulario.addEventListener('submit', function(evento) {
        
        // Prevenir el comportamiento por defecto del formulario
        // Normalmente, un formulario recargaría la página al enviarse
        // Con preventDefault() evitamos eso y manejamos el envío manualmente
        evento.preventDefault();
        
        // Obtener los valores de los campos del formulario
        // Usamos .value para obtener el texto que el usuario escribió
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Validación básica: verificar que todos los campos tengan contenido
        // trim() elimina espacios en blanco al inicio y final del texto
        if (nombre.trim() === '' || correo.trim() === '' || mensaje.trim() === '') {
            // Si algún campo está vacío, mostrar un mensaje al usuario
            alert('Por favor, completa todos los campos del formulario.');
            return; // Detener la ejecución aquí
        }
        
        // Mostrar mensaje en la consola del navegador
        // Para ver esto, el usuario debe abrir las herramientas de desarrollador (F12)
        console.log('Formulario enviado correctamente');
        
        // También mostrar información detallada de lo que se envió
        console.log('Datos del formulario:');
        console.log('Nombre:', nombre);
        console.log('Correo:', correo);
        console.log('Mensaje:', mensaje);
        
        // Opcional: Mostrar un mensaje de confirmación al usuario
        // alert() muestra un cuadro de diálogo en el navegador
        alert('¡Mensaje enviado correctamente! Revisa la consola para ver los detalles.');
        
        // Limpiar el formulario después de enviarlo
        // Esto deja los campos vacíos para un nuevo envío
        formulario.reset();
        
        // Nota: En una aplicación real, aquí normalmente enviarías los datos
        // a un servidor usando fetch() o XMLHttpRequest()
        // Ejemplo de cómo sería:
        /*
        fetch('/api/contacto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: nombre,
                correo: correo,
                mensaje: mensaje
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        */
        });
    }
    
    // ========================================
    // ANIMACIÓN DE BARRAS DE PROGRESO AL HACER SCROLL
    // ========================================
    
    // Función para animar las barras de progreso cuando sean visibles
    function animarBarrasProgreso() {
        // Obtener todas las barras de progreso
        const barras = document.querySelectorAll('.habilidad-progress');
        
        // Crear un observador que detecta cuando los elementos entran en la vista
        const observador = new IntersectionObserver(function(entradas) {
            entradas.forEach(function(entrada) {
                // Si el elemento está visible en la pantalla
                if (entrada.isIntersecting) {
                    // Obtener el ancho guardado en el atributo data-width
                    // o calcularlo desde el estilo inline
                    const barra = entrada.target;
                    const ancho = barra.style.width;
                    
                    // Si la barra no ha sido animada aún
                    if (!barra.classList.contains('animada')) {
                        barra.style.width = '0%'; // Iniciar en 0
                        // Agregar clase para marcar como animada
                        barra.classList.add('animada');
                        
                        // Animar hasta el ancho objetivo
                        setTimeout(function() {
                            barra.style.width = ancho;
                        }, 100);
                    }
                }
            });
        }, {
            threshold: 0.5 // Disparar cuando el 50% del elemento es visible
        });
        
        // Observar cada barra de progreso
        barras.forEach(function(barra) {
            observador.observe(barra);
        });
    }
    
    // Llamar a la función cuando la página cargue
    animarBarrasProgreso();
    
    // ========================================
    // MENSAJE DE BIENVENIDA EN LA CONSOLA
    // ========================================
    
    // Mensaje decorativo en la consola
    console.log('%c¡Bienvenido al portafolio de Carlos Prieto!', 
                'color: #00f0ff; font-size: 20px; font-weight: bold;');
    console.log('%cEste portafolio fue desarrollado con HTML, CSS y JavaScript puro.', 
                'color: #0099ff; font-size: 14px;');
    
});

