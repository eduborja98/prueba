document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica del Selector de Habitaciones
    const roomSelect = document.getElementById('roomNumber');
    
    // Limpiamos contenido e insertamos la opción por defecto
    roomSelect.innerHTML = '<option value="" disabled selected>Selecciona una habitación...</option>';
    
    // Ciclo del 1 al 25 excluyendo el 4 y 14
    for (let i = 1; i <= 25; i++) {
        if (i !== 4 && i !== 14) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Habitación ${i}`;
            roomSelect.appendChild(option);
        }
    }

    // 2. Control de Fechas Mínimas para el formulario (UX simple)
    const todayStr = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById('checkIn');
    
    // La fecha mínima de entrada es hoy
    checkInInput.min = todayStr;

    // 3. Envío de formulario y Redirección a WhatsApp
    const bookingForm = document.getElementById('booking-form');
    
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitamos que la página se recargue
        
        // Obtener valores de los campos
        const fullName = document.getElementById('fullName').value.trim();
        const checkIn = document.getElementById('checkIn').value;
        const parking = document.getElementById('parking').value;
        const roomType = document.getElementById('roomType').value;
        const roomNumber = document.getElementById('roomNumber').value;
        
        // Formatear las fechas para que sean fáciles de leer (DD/MM/YYYY)
        const formatDt = (dtStr) => {
            if (!dtStr) return '';
            const parts = dtStr.split('-');
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        };
        
        const fCheckIn = formatDt(checkIn);
        
        // Construir el mensaje formateado para WhatsApp (usando %0A para saltos de línea y * para negrita)
        const message = `*¡Hola! Deseo confirmar mi reserva en el Hospedaje.*%0A%0A` +
                        `👤 *Nombre:* ${fullName}%0A` +
                        `📅 *Fecha de Entrada:* ${fCheckIn}%0A` +
                        `🛏️ *Habitación:* ${roomType} (Número ${roomNumber})%0A` +
                        `🚛 *Parqueadero:* ${parking}%0A%0A` +
                        `📍 *Nota:* Confirmo ser adulto y llegaré por labor de transporte/viaje de paso.%0A%0A` +
                        `¿Me confirman la disponibilidad por favor?`;
        
        // Número de contacto de prueba provisto por el usuario
        const phoneNumber = '573107469721';
        
        // URL universal de API WhatsApp
        const waURL = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // Redirigir al cliente (abre en pestaña nueva por si el usuario está en móvil)
        window.open(waURL, '_blank');
    });

    // 4. Utilidad para poner el año actual en el Footer
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    // 5. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            });
        });
    }
});
