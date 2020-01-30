window.onload = function () {
    document.getElementById('start-button').onclick = function () {
        alienHome.startGame();
    };
    alienHome.init('myGame');
};