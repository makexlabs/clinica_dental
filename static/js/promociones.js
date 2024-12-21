var swiper = new Swiper('.swiper-container', {
    // Par�metros opcionales
    direction: 'horizontal',
    loop: true,
    // Paginaci�n (si es necesaria)
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    // Botones de navegaci�n (si son necesarios)
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // Habilitar control t�ctil
    simulateTouch: true,
    // Autoplay (si lo deseas)
    autoplay: {
        delay: 5000,
    },
    // Animaci�n fluida
    speed: 800,
    // Efecto de transici�n (opcional)
    effect: 'slide', // Puedes cambiar a 'fade', 'cube', 'coverflow', 'flip'
});