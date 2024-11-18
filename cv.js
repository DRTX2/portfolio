document.addEventListener('scroll', () => {
    const menu = document.querySelector('.main-menu');
    if (window.scrollY > 50) {
        menu.classList.add('sticky'); 
    } else {
        menu.classList.remove('sticky');
    }
});

 const options = {
    strings: ["Web Development.", "Frontend Development.", "Backend Development."],
    typeSpeed: 50, // Velocidad de escritura (ms por carácter)
    backSpeed: 30, // Velocidad de borrado (ms por carácter)
    backDelay: 1000, // Tiempo antes de empezar a borrar
    startDelay: 500, // Tiempo antes de empezar a escribir
    loop: false // Si debe reiniciar el ciclo después de terminar
  };

  const typed = new Typed(".develop-areas", options);