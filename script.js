const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const descansoCurtoBtn = document.querySelector('.app__card-button--curto');
const descansoLongoBtn = document.querySelector('.app__card-button--longo');
const imagemBanner = document.querySelector('.app__image');

focoBtn.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco');
    imagemBanner.setAttribute('src', '/imagens/foco.png');
});

descansoCurtoBtn.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto');
    imagemBanner.setAttribute('src', '/imagens/descanso-curto.png');
});

descansoLongoBtn.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo');
    imagemBanner.setAttribute('src', '/imagens/descanso-longo.png');
});