const botaoAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const botaoCancelar = document.querySelector('.app__form-footer__button--cancel');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function atualizarTarefas()
{
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function criarTarefa(tarefa)
{
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    ` ;

    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description');

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    botao.onclick = () => {
        const novaDescricao = prompt("Qual o novo nome da tarefa?");
        if(novaDescricao.trim() !== "") {
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();
        } else {
            alert("Favor preencher o novo nome da tarefa!");
        }
    };

    const imagemButton = document.createElement('img');
    imagemButton.setAttribute('src', '/imagens/edit.png');

    botao.append(imagemButton);

    svg.onclick = () => {
        const isComplete = svg.classList.toggle('app__section-task-list-item-complete');

        if (isComplete) {
            li.classList.add('app__section-task-list-item-complete');
            li.classList.remove('app__section-task-list-item-active');
            li.style.textDecoration = 'line-through';
            li.style.color = '#000';
        } else {
            li.classList.remove('app__section-task-list-item-complete');
            li.classList.add('app__section-task-list-item-active');
            li.style.textDecoration = 'none';
            li.style.color = 'none';
        }
    };

    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    li.onclick = () => {
        if (tarefaSelecionada == tarefa)
        {
            paragrafoDescricaoTarefa.textContent = '';
            tarefaSelecionada = null;
            liTarefaSelecionada = null;
            li.classList.remove('app__section-task-list-item-active');
            return;
        }
        tarefaSelecionada = tarefa;
        paragrafoDescricaoTarefa.textContent = tarefa.descricao;
        const tarefasRegistradas = document.querySelectorAll('.app__section-task-list-item-active');
        tarefasRegistradas.forEach(elemento => elemento.classList.remove('app__section-task-list-item-active'));
        li.classList.add('app__section-task-list-item-active');
    }

    return li;
}

botaoAdicionarTarefa.addEventListener('click', () => {
    const isHidden = formAdicionarTarefa.classList.toggle('hidden');
    formAdicionarTarefa.setAttribute('aria-hidden', isHidden.toString());
});

formAdicionarTarefa.addEventListener('submit', (e) => {
    e.preventDefault();
    const tarefa = {
        descricao: textArea.value
    };
    tarefas.push(tarefa);
    const tarefaCriada = criarTarefa(tarefa);
    ulTarefas.append(tarefaCriada);
    atualizarTarefas();
    textArea.value = '';
    formAdicionarTarefa.classList.add('hidden');
});

tarefas.forEach(tarefa => {
    const elementoTarefa = criarTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

botaoCancelar.addEventListener('click', () => {
    textArea.value = '';
    botaoAdicionarTarefa.focus();
    formAdicionarTarefa.classList.add('hidden');
});