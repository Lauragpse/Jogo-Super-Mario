let contadorPipes = 0;

function pipeCount() {
    contadorPipes++;
    document.getElementById('contador').textContent = contadorPipes; // Atualiza o contador na tela
}

function resetCounter() {
    contadorPipes = 0;
    document.getElementById('contador').textContent = contadorPipes; // Atualiza o contador na tela
}

const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');


const audioStart = new Audio('./sons/mario_soung_audio_theme.mp3');
const audioGameOver = new Audio('sons/mario_soung_audio_gameover.mp3');

const startGame = () => {
    pipe.classList.add('pipe-animation');
    start.style.display = 'none';
    gameOver.style.display = 'none';
    audioStart.play();

}

const restartGame = () => {
    pipe.classList.add('pipe-animation');
    mario.src = './imagens/mario.gif';
    mario.style.width = '150px';
    mario.style.bottom = '0';
    start.style.display = 'none';
    gameOver.style.display = 'none';
    audioGameOver.pause();
    audioGameOver.currentTime = 0;
    audioStart.play();
    audioStart.currentTime = 0;
    resetCounter(); // Reseta o contador de canos pulados
}

const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 800);
}

const loop = () => {
    setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = parseFloat(window.getComputedStyle(mario).bottom);

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.classList.remove('pipe-animation');
            pipe.style.left = `${pipePosition}px`;
            mario.style.bottom = `${marioPosition}px`;
            mario.src = './imagens/game-over.png';
            mario.style.width = '80px';
            mario.style.marginLeft = '50px';
            audioStart.pause();
            audioGameOver.play();
            gameOver.style.display = 'flex';
            resetCounter(); // Reseta o contador de canos pulados
        } else if (pipePosition <= 0) {
            pipeCount(); // Incrementa o contador de canos pulados
            pipe.style.left = ''; // Reseta a posição do cano para reiniciar a animação
        }
    }, 10);
}

loop();

document.addEventListener('keypress', e => {
    const tecla = e.key;
    if (tecla === ' ') {
        jump();
    }
});

document.addEventListener('touchstart', e => {
    if (e.touches.length) {
        jump();
    }
});

document.addEventListener('keypress', e => {
    const tecla = e.key;
    if (tecla === 'Enter') {
        startGame();
    }
});