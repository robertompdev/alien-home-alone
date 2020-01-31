window.onload = function () {
    document.getElementById('start-button').onclick = () => {
        alienHome.startGame();
    };
    alienHome.init('myGame');
};