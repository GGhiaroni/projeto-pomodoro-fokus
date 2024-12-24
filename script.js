const html = document.querySelector('html');
const imagemBanner = document.querySelector('.app__image');
const botoes = document.querySelectorAll('button:not(#start-pause)');
const titulo = document.querySelector('.app__title');
const inputMusica = document.querySelector('.toggle-checkbox');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

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