const tabs = document.querySelectorAll('[data-tab-content]')
var gameButton = document.getElementById("game-button");
console.log(tabs)

gameButton.onclick = function() {
    tabs.forEach(tab => {
        tab.classList.remove('active')
    });
    document.querySelector('#game').classList.add('active');
}