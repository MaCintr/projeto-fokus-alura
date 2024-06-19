const html = document.querySelector('html')
const btnFoco = document.querySelector('.app__card-button--foco')
const btnCurto = document.querySelector('.app__card-button--curto')
const btnLongo = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const btns = document.querySelectorAll('.app__card-button')
const musicaInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const somInicio = new Audio('/sons/play.wav')
const somPausar = new Audio('/sons/pause.mp3')
const somAlarme = new Audio('/sons/beep.mp3')
const btnStartPause = document.querySelector('#start-pause')
const btnStartPauseText = document.querySelector('#start-pause span')
const iconeStartPause = document.querySelector('#start-pause img')
const divTimer = document.querySelector('#timer')

let tempoSegundos = 1500
let intervaloId = null

musica.loop = true

mostrarTempo()

musicaInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

btnFoco.addEventListener('click', () => {
    tempoSegundos = 1500
    alterarContexto('foco')
    btnFoco.classList.add('active')
})

btnCurto.addEventListener('click', () => {
    tempoSegundos = 300
    alterarContexto('descanso-curto')
    btnCurto.classList.add('active')
})

btnLongo.addEventListener('click', () => {
    tempoSegundos = 900
    alterarContexto('descanso-longo')
    btnLongo.classList.add('active')
})

function alterarContexto(contexto) {

    mostrarTempo()
    btns.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break

        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break
        default:
            break
    }
}

const contagemRegressiva = () => {
    if (tempoSegundos <= 0) {
        somAlarme.play()
        btnStartPauseText.textContent = "Começar"
        iconeStartPause.setAttribute('src', '/imagens/play_arrow.png')
        mostrarTempo()
        alert('Tempo encerrado!')
        zerar()
        mostrarTempo()
        return
        }
        tempoSegundos -= 1
        mostrarTempo()
        }
        
        btnStartPause.addEventListener('click', iniciarPausar)

function iniciarPausar() {
    if (intervaloId) {
        btnStartPauseText.textContent = "Começar"
        iconeStartPause.setAttribute('src', '/imagens/play_arrow.png')
        somPausar.play()
        zerar()
        return
    }
    btnStartPauseText.textContent = "Pausar"
    iconeStartPause.setAttribute('src', '/imagens/pause.png')
    somInicio.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoSegundos * 1000).toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    divTimer.innerHTML = `<p>${tempo}</p>`
}
