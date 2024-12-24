const html = document.querySelector('html');
const imagemBanner = document.querySelector('.app__image');
const botoes = document.querySelectorAll('button:not(#start-pause)');
const titulo = document.querySelector('.app__title');
const inputMusica = document.querySelector('.toggle-checkbox');
const botaoComecar = document.getElementById('start-pause');
const imagemBotaoComecar = document.querySelector('.app__card-primary-butto-icon');
const textoBotaoComecar = document.getElementById('texto-botao');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somBotaoPlay = new Audio('/sons/play.wav');
const somBotaoPause = new Audio('/sons/pause.mp3');
const somTarefaTerminada = new Audio('sons/beep.mp3');

musica.loop = true;
somBotaoPlay.volume = 0.3;
somBotaoPause.volume = 0.2;
somTarefaTerminada.volume = 0.1;


let tempoDecorrido = 5;
let intervaloId = null;

botoes.forEach(botao => {
    botao.addEventListener('click', (e) => {
        botoes.forEach(botao => botao.classList.remove('active'));
        e.target.classList.add('active');
        alterarContexto(e.target.getAttribute('data-contexto'));
    });
});

function alterarContexto(contexto)
{
    html.setAttribute('data-contexto', contexto);
    imagemBanner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto)
    {
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case "descanso-curto":
            titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
            break;
        case "descanso-longo":
            titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
            break;
        default:
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
    }
}

inputMusica.addEventListener('change', () => {
    musica.paused ? musica.play() : musica.pause();
});

const contagemRegressiva = () => {
    if (tempoDecorrido <= 0)
    {
        somTarefaTerminada.play();
        zerar();
        alert("Sessão finalizada!");
        return;
    }
    tempoDecorrido -= 1;
    console.log("Temporizador: " + tempoDecorrido);
 };

botaoComecar.addEventListener('click', () => {
    iniciarOuPausar();
    alterarIconeBotao();
});

function alterarIconeBotao() {
    if (botaoComecar.classList.contains('ativo')) {
        botaoComecar.classList.remove('ativo');
        imagemBotaoComecar.setAttribute('src', '/imagens/play_arrow.png');
        textoBotaoComecar.textContent = 'Iniciar';
        somBotaoPause.play();
    } else {
        botaoComecar.classList.add('ativo');
        imagemBotaoComecar.setAttribute('src', '/imagens/pause.png');
        textoBotaoComecar.textContent = 'Pausar';
        somBotaoPlay.play();
    }
}


function iniciarOuPausar()
{
    if (intervaloId)
    {
        zerar();
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar()
{
    clearInterval(intervaloId);
    intervaloId = null;
}