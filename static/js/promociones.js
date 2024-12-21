var swiper = new Swiper('.swiper-container', {
    // Parámetros opcionales
    direction: 'horizontal',
    loop: true,
    // Paginación (si es necesaria)
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    // Botones de navegación (si son necesarios)
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // Habilitar control táctil
    simulateTouch: true,
    // Autoplay (si lo deseas)
    autoplay: {
        delay: 5000,
    },
    // Animación fluida
    speed: 800,
    // Efecto de transición (opcional)
    effect: 'slide', // Puedes cambiar a 'fade', 'cube', 'coverflow', 'flip'
});