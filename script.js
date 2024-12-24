const html = document.querySelector('html');
const imagemBanner = document.querySelector('.app__image');
const botoes = document.querySelectorAll('button:not(#start-pause):not(.app__button--add-task):not(#botao-reiniciar)');
const titulo = document.querySelector('.app__title');
const inputMusica = document.querySelector('.toggle-checkbox');
const botaoComecar = document.getElementById('start-pause');
const botaoReiniciar = document.getElementById('botao-reiniciar');
const imagemBotaoComecar = document.querySelector('.app__card-primary-butto-icon');
const textoBotaoComecar = document.getElementById('texto-botao');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somBotaoPlay = new Audio('/sons/play.wav');
const somBotaoPause = new Audio('/sons/pause.mp3');
const somTarefaTerminada = new Audio('sons/beep.mp3');
const tempoNaTela = document.querySelector('#timer');

musica.loop = true;
somBotaoPlay.volume = 0.3;
somBotaoPause.volume = 0.2;
somTarefaTerminada.volume = 0.1;


let tempoDecorrido = 1500;
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

    zerar();

    botaoComecar.classList.remove('ativo');
    imagemBotaoComecar.setAttribute('src', '/imagens/play_arrow.png');
    textoBotaoComecar.textContent = 'Iniciar';

    switch (contexto)
    {
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            tempoDecorrido = 1500;
            break;
        case "descanso-curto":
            titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
            tempoDecorrido = 300;
            break;
        case "descanso-longo":
            titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
            tempoDecorrido = 900;
            break;
        default:
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            tempoDecorrido = 0;
            break;
    }
    mostrarTempo(tempoDecorrido);
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
    mostrarTempo();
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
    mostrarTempo(tempoDecorrido);
}

function mostrarTempo(tempoEmSegundos = tempoDecorrido)
{
    const minutos = Math.floor(tempoEmSegundos / 60);
    const segundos = tempoEmSegundos % 60;
    const tempoFormatado = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    tempoNaTela.innerHTML = tempoFormatado;
}

botaoReiniciar.addEventListener('click', () => { 
    const contextoAtivo = html.getAttribute('data-contexto');
    
    switch (contextoAtivo) {
        case 'foco':
            tempoDecorrido = 1500;
            break;
        case 'descanso-curto':
            tempoDecorrido = 300;
            break;
        case 'descanso-longo':
            tempoDecorrido = 900;
            break;
        default:
            tempoDecorrido = 0;
            break;
    }
    mostrarTempo(tempoDecorrido);
    zerar();
    
    botaoComecar.classList.remove('ativo');
    imagemBotaoComecar.setAttribute('src', '/imagens/play_arrow.png');
    textoBotaoComecar.textContent = 'Iniciar';
});


mostrarTempo();