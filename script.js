window.onload = function () {
    document.getElementById('start-button').onclick = (e) => {
        alienHome.startGame();
        // Desabilitamos el botón para que al pulsar la barra espaciadora no se vuelva a inicializar el juego.
        e.currentTarget.disabled = true
    };
    alienHome.init('myGame');
};