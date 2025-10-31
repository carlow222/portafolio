// ============================================
// MANEJO DEL FORMULARIO DE CONTACTO
// ============================================

/**
 * Función que se ejecuta cuando el documento HTML está completamente cargado
 * Esto asegura que todos los elementos del DOM estén disponibles antes de ejecutar el código
 */
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario de contacto por su ID
    const contactForm = document.getElementById('contactForm');

    // Verificar que el formulario existe antes de agregar el evento
    if (contactForm) {
        /**
         * Agregar un evento 'submit' al formulario
         * Este evento se dispara cuando el usuario intenta enviar el formulario
         */
        contactForm.addEventListener('submit', function(event) {
            // Prevenir el comportamiento por defecto del formulario
            // Esto evita que la página se recargue cuando se envía el formulario
            event.preventDefault();

            // Obtener los valores de los campos del formulario
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const mensaje = document.getElementById('mensaje').value;

            // Validación básica: verificar que todos los campos estén llenos
            if (nombre.trim() === '' || correo.trim() === '' || mensaje.trim() === '') {
                // Si algún campo está vacío, mostrar un mensaje de error
                alert('Por favor, completa todos los campos del formulario.');
                return; // Detener la ejecución de la función
            }

            // Mostrar mensaje de éxito en la consola del navegador
            // Para ver este mensaje, abre las herramientas de desarrollo (F12) y ve a la pestaña "Console"
            console.log('Formulario enviado correctamente');
            
            // También puedes ver los datos del formulario en la consola
            console.log('Datos del formulario:', {
                nombre: nombre,
                correo: correo,
                mensaje: mensaje
            });

            // Opcional: Mostrar un mensaje visual al usuario
            // Crear un elemento de mensaje de éxito con estilo futurista
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                background: rgba(0, 212, 255, 0.1);
                color: #00d4ff;
                padding: 1.5rem;
                border: 2px solid #00d4ff;
                border-left: 4px solid #00d4ff;
                margin-top: 1.5rem;
                text-align: center;
                font-weight: 500;
                box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
                text-transform: uppercase;
                letter-spacing: 1px;
                font-family: 'Orbitron', 'Poppins', sans-serif;
            `;
            successMessage.innerHTML = '<span style="color: #00d4ff; text-shadow: 0 0 10px #00d4ff;">✓</span> Mensaje enviado correctamente. Te contactaré pronto.';

            // Insertar el mensaje después del formulario
            contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);

            // Limpiar el formulario después de enviarlo
            contactForm.reset();

            // Remover el mensaje de éxito después de 5 segundos
            setTimeout(function() {
                if (successMessage.parentNode) {
                    successMessage.parentNode.removeChild(successMessage);
                }
            }, 5000);
        });
    } else {
        // Si el formulario no existe, mostrar un mensaje en la consola (solo para desarrollo)
        console.warn('El formulario de contacto no fue encontrado en la página.');
    }
});

// ============================================
// SCROLL SUAVE PARA ENLACES DE NAVEGACIÓN
// ============================================

/**
 * Función para hacer que el desplazamiento al hacer clic en los enlaces del menú sea suave
 * Esto mejora la experiencia de usuario al navegar por la página
 */
document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los enlaces del menú de navegación
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Agregar un evento de clic a cada enlace
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // Obtener el atributo href del enlace (ejemplo: #inicio, #experiencia, etc.)
            const href = this.getAttribute('href');

            // Solo procesar si el href comienza con # (es un enlace interno)
            if (href.startsWith('#')) {
                // Prevenir el comportamiento por defecto del enlace
                event.preventDefault();

                // Obtener el ID de la sección destino (removiendo el #)
                const targetId = href.substring(1);
                
                // Buscar el elemento de la sección destino
                const targetSection = document.getElementById(targetId);

                // Si la sección existe, hacer scroll suave hasta ella
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth', // Scroll suave
                        block: 'start'      // Alinear al inicio de la sección
                    });
                }
            }
        });
    });
});

// ============================================
// EFECTO DE APARICIÓN AL HACER SCROLL
// ============================================

/**
 * Función para agregar un efecto visual cuando los elementos aparecen en la pantalla
 * mientras el usuario hace scroll
 */
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los elementos que queremos animar
    const animatedElements = document.querySelectorAll('.experience-card, .skill-card, .project-card');

    // Función que verifica si un elemento está visible en la pantalla
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Función para manejar el scroll
    function handleScroll() {
        animatedElements.forEach(function(element) {
            // Si el elemento está visible en la pantalla, agregar la clase 'visible'
            if (isElementInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Inicializar: ocultar los elementos al cargar la página
    animatedElements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Agregar el evento de scroll a la ventana
    window.addEventListener('scroll', handleScroll);
    
    // Ejecutar una vez al cargar para verificar elementos visibles inicialmente
    handleScroll();
});

