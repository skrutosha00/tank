import { animateOnce } from "./animate.js"

let betCont = document.querySelector('.bet_cont')
let betAmountCont = document.querySelector('.left')
let betButton = document.querySelector('.tick')
let historyCont = document.querySelector('.history')

let playAgainButton = document.querySelector('.again')
let warning = document.querySelector('.warning')

let glove = document.querySelector('.glove')
let cards = document.querySelectorAll('.card')

let active = true
let chosenTicks = []
let bet = 0

for (let i = 0; i < 8; i++) {
    let bet = document.createElement('div')
    bet.classList.add('bet')

    let picCont = document.createElement('div')
    picCont.classList.add('pic_cont')

    let pic = document.createElement('img')
    pic.src = '../png/slot_' + (i + 1) + '.png'
    picCont.appendChild(pic)

    let submit = document.createElement('div')
    submit.dataset.slot = i + 1
    submit.classList.add('submit')

    let tick = document.createElement('img')
    tick.src = '../png/tick.png'
    tick.classList.add('hidden')
    submit.appendChild(tick)

    submit.onclick = () => {
        if (!active) { return }
        submitHandler(submit)
    }

    bet.appendChild(picCont)
    bet.appendChild(submit)

    betCont.appendChild(bet)
}

for (let betAmount of [10, 20, 40, 50]) {
    let betAmountDiv = document.createElement('div')
    betAmountDiv.innerHTML = betAmount

    betAmountDiv.onclick = () => {
        if (!active) { return }
        for (let b of document.querySelectorAll('.left div')) {
            b.classList.remove('active')
        }
        betAmountDiv.classList.add('active')
        bet = Number(betAmountDiv.innerHTML)
    }

    betAmountCont.appendChild(betAmountDiv)
}

betButton.onclick = () => {
    if (!bet || Number(balance.innerHTML) < bet || !active || chosenTicks.length != 3) { return }
    changeBalance(-bet)
    active = false

    glove.style.animation = 'glove 2s linear'
    setTimeout(() => {
        glove.style.animation = ''
    }, 2000);

    let randomSlots = shuffle([1, 2, 3, 4, 5, 6, 7, 8]).slice(0, 3)
    for (let i = 0; i < 3; i++) {
        let img = document.createElement('img')
        img.src = '../png/slot_' + randomSlots[i] + '.png'

        setTimeout(() => {
            cards[i].innerHTML = ''
            cards[i].appendChild(img)
        }, 1000);
    }

    setTimeout(() => {
        let score = countScore(randomSlots, chosenTicks)
        let prize = score == 0 ? 0 : bet * (score + 1)

        changeBalance(prize)
        animateOnce('.balance')
        appendHistory(randomSlots)

        warning.firstElementChild.innerHTML = prize != 0 ? 'Congrats!<br/>You have won<br/>' + prize : 'No way!<br/>Try again right now'
        warning.style.top = '300px'
    }, 2000);
}

playAgainButton.onclick = () => {
    warning.style.top = '-50%'
    active = true
}

function submitHandler(submit) {
    if (submit.firstElementChild.classList.contains('hidden')) {
        if (chosenTicks.length == 3) { return }
        submit.firstElementChild.classList.remove('hidden')
        chosenTicks.push(submit.dataset.slot)
    } else {
        submit.firstElementChild.classList.add('hidden')
        chosenTicks.splice(chosenTicks.indexOf(submit.dataset.slot), 1)
    }
}

function changeBalance(amount) {
    localStorage.setItem('balance_tank', Number(localStorage.getItem('balance_tank')) + amount)
    balance.innerHTML = localStorage.getItem('balance_tank')
}

function shuffle(arr) {
    let array = [...arr]
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function countScore(arr1, arr2) {
    let score = 0
    for (let el1 of arr1) {
        for (let el2 of arr2) {
            if (el1 == el2) { score += 1 }
        }
    }
    return score;
}

function appendHistory(randomSlots) {
    if (historyCont.childElementCount == 6) {
        historyCont.firstElementChild.remove()
    }

    let historyBlock = document.createElement('div')
    for (let ind of randomSlots) {
        let historyUnit = document.createElement('div')
        historyUnit.classList.add('history_unit')

        let img = document.createElement('img')
        img.src = '../png/slot_' + ind + '.png'

        historyUnit.appendChild(img)
        historyBlock.appendChild(historyUnit)
    }

    historyCont.appendChild(historyBlock)
}