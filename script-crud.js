const btnAddTarefa = document.querySelector('.app__button--add-task')
const formAddTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const paragrafoDescTarefa = document.querySelector('.app__section-active-task-description')
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null
let liTarefaSelecionada = null

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))

}

btnRemoverConcluidas.onclick = () => removerTarefas(true)

btnRemoverTodas.onclick = () => removerTarefas(false)

const removerTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item'
    document.querySelectorAll(seletor).forEach(elemento => {
        console.log('Tarefa concluída removida => ', elemento)
        elemento.remove()
    })

    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
    atualizarTarefas()

}

function criarTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    `

    const paragrafo = document.createElement('p')
    paragrafo.classList.add('app__section-task-list-item-description')
    paragrafo.textContent = tarefa.descricao

    const btn = document.createElement('button')
    btn.classList.add('app_button-edit')

    btn.onclick = () => {
        const novaDescricao = prompt('Qual será o novo nome da tarefa?')
        console.log('Nova descrição => ', novaDescricao)
        if (novaDescricao) {
            paragrafo.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            atualizarTarefas()
        }
    }

    const btnImage = document.createElement('img')
    btnImage.setAttribute('src', '/imagens/edit.png')

    btn.append(btnImage)

    li.append(svg)
    li.append(paragrafo)
    li.append(btn)

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')
        btn.setAttribute('disabled', 'disabled')
    } else {
        li.onclick = () => {
            if (tarefaSelecionada == tarefa) {
                paragrafoDescTarefa.textContent = ''
                tarefaSelecionada = null
                document.querySelectorAll('.app__section-task-list-item-active').forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active')
                })
                return
            }
            tarefaSelecionada = tarefa
            console.log('tarefa selecionada => ', tarefaSelecionada)
            liTarefaSelecionada = li
            console.log('li selecionado => ', liTarefaSelecionada)
            paragrafoDescTarefa.textContent = tarefa.descricao
            document.querySelectorAll('.app__section-task-list-item-active').forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active')
            })
            li.classList.add('app__section-task-list-item-active')
        }
    }


    return li
}

btnAddTarefa.addEventListener('click', () => {
    formAddTarefa.classList.toggle('hidden')
})

formAddTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const tarefa = {
        descricao: textarea.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    atualizarTarefas()
    textarea.value = ''
    formAddTarefa.classList.add('hidden')
    console.log('Tarefa criada => ' + JSON.stringify(tarefa))
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
})

document.addEventListener('FocoFinalizado', () => {
    console.log('Evento FocoFinalizado recebido')
    if (tarefaSelecionada && liTarefaSelecionada) {
        console.log('condição verdadeira')
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
        tarefaSelecionada.completa = true
        atualizarTarefas()
    }
})
