window.onload = function () {
    document.getElementById('start-button').onclick = (e) => {
        alienHome.startGame();
        e.currentTarget.disabled = true
    };
    alienHome.init('myGame');
};